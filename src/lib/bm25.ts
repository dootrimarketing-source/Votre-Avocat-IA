/**
 * MOTEUR DE RECHERCHE ET CLASSEMENT PROBABILISTE OKAPI BM25 / BM25F
 * Conçu pour le système RAG Juridique Haute Précision de LexIIA
 * 
 * Implémente la formule standard Okapi BM25 avec support multi-champs (BM25F),
 * tokenisation juridique adaptée (préservation des numéros d'articles et codes)
 * et filtrage des mots vides (stopwords) français et juridiques.
 */

export interface LegalTemporalMetadata {
  exactDate?: string; // Format: YYYY-MM-DD (ex: "2025-02-14")
  exactTime?: string; // Format: HH:mm:ss ou HH:mm (ex: "09:30:00")
  author?: string; // Ex: "Cour de cassation, Chambre commerciale", "Législateur (Code civil)", etc.
  timestamp?: number; // Millisecondes Unix
}

export interface BM25FieldWeight<T> {
  field: keyof T | ((item: T) => string);
  weight: number;
}

export interface BM25Config<T> {
  k1?: number; // Saturation de fréquence des termes (défaut: 1.2)
  b?: number;  // Normalisation par la longueur du document (défaut: 0.75)
  fields: BM25FieldWeight<T>[];
  idField?: keyof T | ((item: T) => string);
  dateGetter?: (item: T) => string | undefined;
  timeGetter?: (item: T) => string | undefined;
  authorGetter?: (item: T) => string | undefined;
}

export interface BM25SearchResult<T> {
  item: T;
  score: number;
  normalizedScore: number; // 0.0 à 1.0 (pour affichage et fusion hybride)
  matchedTerms: string[];
  fieldContributions: Record<string, number>;
  rank: number;
  exactDate?: string;
  exactTime?: string;
  author?: string;
  timestamp?: number;
  hasValidMetadata: boolean;
}

export interface BM25SearchOptions {
  limit?: number;
  minScore?: number;
  boostExactPhrase?: boolean;
  filterMissingMetadata?: boolean; // Exclure impérativement les références sans date, ni heure, ni auteur
  sortBy?: 'score' | 'dateTimeDesc' | 'hybrid'; // Mode de classement (par score BM25, par date et heure exacte décroissante, ou hybride)
}

export interface BM25Explanation {
  docId: string;
  totalScore: number;
  queryTerms: string[];
  avgDocLength: number;
  docLength: number;
  termBreakdowns: {
    term: string;
    tf: number;
    idf: number;
    numerator: number;
    denominator: number;
    termScore: number;
  }[];
}

// Stopwords français standards et mots de liaison non-discriminants en droit
const FRENCH_LEGAL_STOPWORDS = new Set([
  "a", "au", "aux", "avec", "ce", "ces", "dans", "de", "des", "du", "elle", "en", "et", "eux",
  "il", "ils", "je", "la", "le", "les", "leur", "lui", "ma", "mais", "me", "meme", "mes", "moi",
  "mon", "ne", "nos", "notre", "nous", "on", "ou", "par", "pas", "pour", "qu", "que", "qui",
  "sa", "se", "ses", "son", "sur", "ta", "te", "tes", "toi", "ton", "tu", "un", "une", "vos",
  "votre", "vous", "c", "d", "j", "l", "m", "n", "s", "t", "y", "est", "sont", "ete", "etre",
  "avoir", "ayant", "fait", "faire", "plus", "tout", "tous", "toute", "toutes", "sans", "sous"
]);

/**
 * Tokeniseur juridique optimisé :
 * - Normalise les accents (é -> e, etc.)
 * - Préserve les références d'articles (ex: "l.1221-1", "1231-5", "20-14.888", "rgpd")
 * - Supprime les caractères non pertinents tout en gardant les traits d'union dans les numéros
 */
export function tokenizeLegalText(text: string, removeStopwords = true): string[] {
  if (!text || typeof text !== "string") return [];

  // Normalisation Unicode NFD pour supprimer les diacritiques
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Remplacement des séparateurs tout en protégeant les notations d'articles
  // "art. 1231-5" -> "art" "1231-5", "c. civ." -> "c" "civ"
  const tokens = normalized
    .replace(/['’`«»""()[\]{}:;,!?*+~^/\\|]/g, " ")
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 0);

  if (!removeStopwords) return tokens;

  return tokens.filter(t => {
    // Si c'est un numéro ou un article (chiffres), toujours garder
    if (/\d/.test(t)) return true;
    // Si longueur <= 1 et pas chiffre, éliminer
    if (t.length <= 1) return false;
    // Vérifier contre la liste de stopwords
    return !FRENCH_LEGAL_STOPWORDS.has(t);
  });
}

/**
 * Moteur Okapi BM25 générique
 */
export class BM25Engine<T> {
  private items: T[] = [];
  private k1: number;
  private b: number;
  private fields: BM25FieldWeight<T>[];
  private idGetter: (item: T, index: number) => string;
  private dateGetter?: (item: T) => string | undefined;
  private timeGetter?: (item: T) => string | undefined;
  private authorGetter?: (item: T) => string | undefined;

  // Statistiques du corpus
  private docCount = 0;
  private avgDocLength = 0;
  private docLengths: number[] = [];
  
  // Tables d'index inversé et de fréquences
  // term -> Map(docIndex, weightedTermFrequency)
  private invertedIndex: Map<string, Map<number, number>> = new Map();
  // term -> nombre de documents contenant ce terme
  private docFrequencies: Map<string, number> = new Map();
  // term -> valeur IDF précalculée
  private idfCache: Map<string, number> = new Map();

  constructor(config: BM25Config<T>, initialItems: T[] = []) {
    this.k1 = config.k1 ?? 1.2;
    this.b = config.b ?? 0.75;
    this.fields = config.fields;
    this.dateGetter = config.dateGetter;
    this.timeGetter = config.timeGetter;
    this.authorGetter = config.authorGetter;

    if (config.idField) {
      if (typeof config.idField === "function") {
        this.idGetter = config.idField as any;
      } else {
        const key = config.idField;
        this.idGetter = (item: T, idx: number) => String((item as any)[key] ?? idx);
      }
    } else {
      this.idGetter = (_: T, idx: number) => String(idx);
    }

    if (initialItems.length > 0) {
      this.buildIndex(initialItems);
    }
  }

  /**
   * Extrait les métadonnées temporelles et d'auteur d'un document
   */
  public extractMetadata(item: T): { exactDate?: string; exactTime?: string; author?: string; timestamp?: number; hasValidMetadata: boolean } {
    let exactDate = this.dateGetter ? this.dateGetter(item) : (item as any)?.exactDate || (item as any)?.publicationDate;
    let exactTime = this.timeGetter ? this.timeGetter(item) : (item as any)?.exactTime || (item as any)?.publicationTime;
    let author = this.authorGetter ? this.authorGetter(item) : (item as any)?.author || (item as any)?.officialSource || (item as any)?.jurisdiction;

    const hasDate = Boolean(exactDate && typeof exactDate === 'string' && exactDate.trim().length >= 4);
    const hasTime = Boolean(exactTime && typeof exactTime === 'string' && exactTime.trim().length >= 2);
    const hasAuthor = Boolean(author && typeof author === 'string' && author.trim().length >= 2);

    let timestamp: number | undefined;
    if (hasDate) {
      try {
        const dateStr = exactDate.trim();
        const timeStr = hasTime ? exactTime.trim() : '00:00:00';
        const parsed = Date.parse(`${dateStr}T${timeStr}`);
        if (!isNaN(parsed)) {
          timestamp = parsed;
        }
      } catch {
        // ignore timestamp parse error
      }
    }

    return {
      exactDate: hasDate ? exactDate.trim() : undefined,
      exactTime: hasTime ? exactTime.trim() : undefined,
      author: hasAuthor ? author.trim() : undefined,
      timestamp,
      hasValidMetadata: Boolean(hasDate && hasTime && hasAuthor)
    };
  }

  /**
   * Construit ou reconstruit l'index BM25 sur la collection
   */
  public buildIndex(items: T[]): void {
    this.items = [...items];
    this.docCount = items.length;
    this.invertedIndex.clear();
    this.docFrequencies.clear();
    this.idfCache.clear();
    this.docLengths = new Array(this.docCount).fill(0);

    if (this.docCount === 0) {
      this.avgDocLength = 0;
      return;
    }

    let totalLength = 0;

    // Phase 1 : Indexation des documents et calcul des longueurs pondérées
    for (let i = 0; i < this.docCount; i++) {
      const item = this.items[i];
      let docLen = 0;
      const termFreqsInDoc = new Map<string, number>();

      for (const fieldWeight of this.fields) {
        let fieldText = "";
        if (typeof fieldWeight.field === "function") {
          fieldText = fieldWeight.field(item) || "";
        } else {
          fieldText = String((item as any)[fieldWeight.field] || "");
        }

        const tokens = tokenizeLegalText(fieldText, true);
        docLen += tokens.length * fieldWeight.weight;

        // Calcul de la fréquence de terme pondérée par l'importance du champ (BM25F)
        for (const token of tokens) {
          const currentFreq = termFreqsInDoc.get(token) || 0;
          termFreqsInDoc.set(token, currentFreq + (1 * fieldWeight.weight));
        }
      }

      this.docLengths[i] = docLen;
      totalLength += docLen;

      // Mise à jour de l'index inversé
      for (const [token, weightedFreq] of termFreqsInDoc.entries()) {
        let postings = this.invertedIndex.get(token);
        if (!postings) {
          postings = new Map();
          this.invertedIndex.set(token, postings);
        }
        postings.set(i, weightedFreq);

        const currentDf = this.docFrequencies.get(token) || 0;
        this.docFrequencies.set(token, currentDf + 1);
      }
    }

    this.avgDocLength = this.docCount > 0 ? totalLength / this.docCount : 0;

    // Phase 2 : Précalcul de l'IDF (Inverse Document Frequency) selon la formule Robertson-Spärck Jones
    // IDF(q) = ln( (N - n(q) + 0.5) / (n(q) + 0.5) + 1 )
    for (const [token, df] of this.docFrequencies.entries()) {
      const idf = Math.log(1 + (this.docCount - df + 0.5) / (df + 0.5));
      // Toujours garantir une valeur d'IDF positive (non-negative IDF floor)
      this.idfCache.set(token, Math.max(0.05, idf));
    }
  }

  /**
   * Calcule l'IDF pour un terme donné
   */
  public getIDF(term: string): number {
    const cached = this.idfCache.get(term);
    if (cached !== undefined) return cached;

    // Pour un terme hors vocabulaire, calcul estimatif
    const df = this.docFrequencies.get(term) || 0;
    const idf = Math.log(1 + (this.docCount - df + 0.5) / (df + 0.5));
    const finalIdf = Math.max(0.05, idf);
    this.idfCache.set(term, finalIdf);
    return finalIdf;
  }

  /**
   * Recherche et classe les documents selon le score Okapi BM25
   * avec support du filtrage strict des références sans date/heure/auteur
   * et classement par date/heure exacte ou score de pertinence
   */
  public search(
    query: string,
    options: BM25SearchOptions = {}
  ): BM25SearchResult<T>[] {
    if (!query || !query.trim() || this.docCount === 0) {
      return [];
    }

    const limit = options.limit ?? 20;
    const minScore = options.minScore ?? 0.01;
    const boostExactPhrase = options.boostExactPhrase ?? true;
    const filterMissingMetadata = options.filterMissingMetadata ?? false;
    const sortBy = options.sortBy ?? 'dateTimeDesc';

    const queryTokens = tokenizeLegalText(query, true);
    if (queryTokens.length === 0) {
      // Si tous les termes étaient des stopwords, faire une passe sans suppression de stopwords
      const fallbackTokens = tokenizeLegalText(query, false);
      if (fallbackTokens.length === 0) return [];
      queryTokens.push(...fallbackTokens);
    }

    const scores = new Float64Array(this.docCount);
    const matchedTermsMap: Map<number, Set<string>> = new Map();
    const cleanNormalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    // Pour chaque terme de la requête
    for (const term of queryTokens) {
      const postings = this.invertedIndex.get(term);
      if (!postings) {
        // Recherche de préfixe ou sous-chaîne pour les termes juridiques complexes
        for (const [indexedTerm, termPostings] of this.invertedIndex.entries()) {
          if (indexedTerm.startsWith(term) || (term.length >= 4 && indexedTerm.includes(term))) {
            const idf = this.getIDF(indexedTerm) * 0.7; // Légère pénalité pour match partiel
            for (const [docIdx, tf] of termPostings.entries()) {
              const docLen = this.docLengths[docIdx];
              const lenNorm = 1 - this.b + this.b * (this.avgDocLength > 0 ? docLen / this.avgDocLength : 1);
              const termScore = idf * ((tf * (this.k1 + 1)) / (tf + this.k1 * lenNorm));

              scores[docIdx] += termScore;
              let termSet = matchedTermsMap.get(docIdx);
              if (!termSet) {
                termSet = new Set();
                matchedTermsMap.set(docIdx, termSet);
              }
              termSet.add(indexedTerm);
            }
          }
        }
        continue;
      }

      const idf = this.getIDF(term);

      for (const [docIdx, tf] of postings.entries()) {
        const docLen = this.docLengths[docIdx];
        const lenNorm = 1 - this.b + this.b * (this.avgDocLength > 0 ? docLen / this.avgDocLength : 1);
        const termScore = idf * ((tf * (this.k1 + 1)) / (tf + this.k1 * lenNorm));

        scores[docIdx] += termScore;

        let termSet = matchedTermsMap.get(docIdx);
        if (!termSet) {
          termSet = new Set();
          matchedTermsMap.set(docIdx, termSet);
        }
        termSet.add(term);
      }
    }

    // Bonus pour correspondance exacte de phrase / code d'article
    if (boostExactPhrase) {
      for (let i = 0; i < this.docCount; i++) {
        if (scores[i] <= 0) continue;
        const item = this.items[i];
        
        let hasExactMatchInTitle = false;
        let hasExactMatchInRef = false;

        for (const fieldWeight of this.fields) {
          const text = (typeof fieldWeight.field === "function" 
            ? fieldWeight.field(item) 
            : String((item as any)[fieldWeight.field] || "")
          ).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

          if (text.includes(cleanNormalizedQuery)) {
            if (fieldWeight.weight >= 2.5) {
              hasExactMatchInTitle = true;
            } else {
              hasExactMatchInRef = true;
            }
          }
        }

        if (hasExactMatchInTitle) {
          scores[i] *= 1.5; // +50% boost pour exact match dans le titre / terme
        } else if (hasExactMatchInRef) {
          scores[i] *= 1.25; // +25% boost pour exact match dans la référence
        }
      }
    }

    // Rassemblement et filtrage des résultats
    type Candidate = { idx: number; score: number; meta: ReturnType<BM25Engine<T>['extractMetadata']> };
    const results: Candidate[] = [];
    let maxScore = 0.0001;

    for (let i = 0; i < this.docCount; i++) {
      const s = scores[i];
      if (s >= minScore) {
        const item = this.items[i];
        const meta = this.extractMetadata(item);

        // RÈGLE D'EXCLUSION STRICTE : Ne jamais retenir de références sans date, ni heure, ni auteur si le filtre est actif
        if (filterMissingMetadata && !meta.hasValidMetadata) {
          continue;
        }

        results.push({ idx: i, score: s, meta });
        if (s > maxScore) maxScore = s;
      }
    }

    // Classement selon le critère choisi
    if (sortBy === 'dateTimeDesc') {
      // Tri prioritaire par date et heure exacte décroissante, puis par score BM25
      results.sort((a, b) => {
        const timeA = a.meta.timestamp ?? 0;
        const timeB = b.meta.timestamp ?? 0;
        if (timeB !== timeA) {
          return timeB - timeA;
        }
        return b.score - a.score;
      });
    } else if (sortBy === 'hybrid') {
      // Combinaison pondérée BM25 + fraîcheur chronologique
      const now = Date.now();
      const maxAgeMs = 365 * 24 * 60 * 60 * 1000; // 1 an
      results.sort((a, b) => {
        const normScoreA = a.score / maxScore;
        const normScoreB = b.score / maxScore;
        const recencyA = a.meta.timestamp ? Math.max(0, 1 - (now - a.meta.timestamp) / maxAgeMs) : 0;
        const recencyB = b.meta.timestamp ? Math.max(0, 1 - (now - b.meta.timestamp) / maxAgeMs) : 0;
        const hybridA = 0.65 * normScoreA + 0.35 * recencyA;
        const hybridB = 0.65 * normScoreB + 0.35 * recencyB;
        return hybridB - hybridA;
      });
    } else {
      // Tri par score BM25 pur
      results.sort((a, b) => b.score - a.score);
    }

    const limited = results.slice(0, limit);

    return limited.map((res, rank) => {
      const item = this.items[res.idx];
      const matchedTerms = Array.from(matchedTermsMap.get(res.idx) || []);
      const normalizedScore = Math.min(1.0, Number((res.score / maxScore).toFixed(4)));

      return {
        item,
        score: Number(res.score.toFixed(3)),
        normalizedScore,
        matchedTerms,
        fieldContributions: {},
        rank: rank + 1,
        exactDate: res.meta.exactDate,
        exactTime: res.meta.exactTime,
        author: res.meta.author,
        timestamp: res.meta.timestamp,
        hasValidMetadata: res.meta.hasValidMetadata
      };
    });
  }

  /**
   * Fournit une explication mathématique détaillée du calcul BM25 pour un document
   */
  public explain(query: string, docIndex: number): BM25Explanation | null {
    if (docIndex < 0 || docIndex >= this.docCount) return null;

    const item = this.items[docIndex];
    const docId = this.idGetter(item, docIndex);
    const queryTokens = tokenizeLegalText(query, true);
    const docLen = this.docLengths[docIndex];
    const lenNorm = 1 - this.b + this.b * (this.avgDocLength > 0 ? docLen / this.avgDocLength : 1);

    let totalScore = 0;
    const termBreakdowns: BM25Explanation["termBreakdowns"] = [];

    for (const term of queryTokens) {
      const postings = this.invertedIndex.get(term);
      const tf = postings ? (postings.get(docIndex) || 0) : 0;
      const idf = this.getIDF(term);
      const numerator = tf * (this.k1 + 1);
      const denominator = tf + this.k1 * lenNorm;
      const termScore = tf > 0 ? idf * (numerator / denominator) : 0;

      totalScore += termScore;

      termBreakdowns.push({
        term,
        tf: Number(tf.toFixed(2)),
        idf: Number(idf.toFixed(3)),
        numerator: Number(numerator.toFixed(3)),
        denominator: Number(denominator.toFixed(3)),
        termScore: Number(termScore.toFixed(3))
      });
    }

    return {
      docId,
      totalScore: Number(totalScore.toFixed(3)),
      queryTerms: queryTokens,
      avgDocLength: Number(this.avgDocLength.toFixed(1)),
      docLength: Number(docLen.toFixed(1)),
      termBreakdowns
    };
  }

  public getCorpusStats() {
    return {
      totalDocuments: this.docCount,
      uniqueTerms: this.invertedIndex.size,
      avgDocumentLength: Number(this.avgDocLength.toFixed(1)),
      k1: this.k1,
      b: this.b
    };
  }
}
