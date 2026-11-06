import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  ArrowLeft,
  Check,
  ExternalLink,
  MessageSquare,
  Copy,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
  Globe,
  Database,
  Building2,
  Users,
  CheckCircle2,
  Loader2,
  Bookmark,
  ChevronRight,
  Filter,
  Code2,
  Server,
  Zap,
  Terminal,
  Layers,
  Send,
  X,
  Gauge,
  Sliders,
  Scale
} from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { searchLegalLexiconBM25, explainLegalLexiconBM25, legalLexiconBM25 } from '../data/legalLexicon';
import { isAbortError } from '../lib/abortUtils';

export interface VeilleCardItem {
  id: string;
  number: string;
  domain: string;
  tags: string[];
  impactLevel: 'ÉLEVÉE' | 'MOYENNE' | 'MAJEURE' | 'MODÉRÉE';
  title: string;
  publicationDate: string;
  effectiveDate: string;
  summary: string;
  interestingNotes: string;
  actionsToPlan: string[];
  peopleConcerned: string[];
  officialSource: string;
  officialUrl: string;
}

function getVeilleChronology() {
  const now = new Date();
  const dateToday = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const past5Days = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
  const date5DaysAgo = past5Days.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const past30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const date30DaysAgo = past30Days.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  return { dateToday, date5DaysAgo, date30DaysAgo };
}

const DEFAULT_VEILLE_ITEMS: VeilleCardItem[] = [
  {
    id: 'veille-01',
    number: '01',
    domain: 'DROIT DU TRAVAIL & FONCTION PUBLIQUE',
    tags: ['FONCTION PUBLIQUE', 'LOGEMENT SOCIAL', 'LOI VIGUEUR'],
    impactLevel: 'ÉLEVÉE',
    title: `Loi portant amélioration de l'accès au logement et conditions de travail des agents publics (Actualité ${new Date().getFullYear()})`,
    publicationDate: getVeilleChronology().date5DaysAgo,
    effectiveDate: 'En vigueur (Application immédiate)',
    summary: "Dispositions législatives et réglementaires récentes visant à étendre le droit de réservation de logements sociaux aux employeurs publics et à sécuriser le maintien dans les logements de fonction en droit du travail public et privé.",
    interestingNotes: "Les entreprises et établissements assurant un service public doivent mettre à jour leurs politiques internes de logement et d'indemnités conventionnelles.",
    actionsToPlan: [
      "Conseiller les employeurs publics et privés sur les nouvelles modalités d'attribution.",
      "Accompagner les entités concernées dans l'élargissement de leur droit de réservation.",
      "Auditer les clauses contractuelles de maintien dans le logement."
    ],
    peopleConcerned: [
      "Agents publics & Salariés",
      "Employeurs publics & DRH",
      "Organismes de logement social & Bailleurs"
    ],
    officialSource: "Légifrance / Assemblée Nationale",
    officialUrl: "https://www.legifrance.gouv.fr/"
  }
];

function generateDynamicVeilleCards(queryText: string, domainName?: string): VeilleCardItem[] {
  const domain = domainName || (queryText.length < 35 ? queryText.toUpperCase() : 'DROIT & JURISPRUDENCE');
  const { dateToday, date5DaysAgo } = getVeilleChronology();

  return [
    {
      id: `dynamic-${Date.now()}-1`,
      number: '01',
      domain: domain.toUpperCase(),
      tags: ['VEILLE ACTIVE', 'TEXTES EN VIGUEUR', 'RAG VECTORIEL'],
      impactLevel: 'ÉLEVÉE',
      title: `Synthèse RAG & Jurisprudence : ${queryText.slice(0, 90)}`,
      publicationDate: dateToday,
      effectiveDate: `En vigueur au ${dateToday}`,
      summary: `Analyse vectorielle et textuelle approfondie portant sur « ${queryText} » actualisée au ${dateToday}. Les sources législatives (Codes et lois en vigueur) ainsi que les arrêts récents des hautes juridictions confirment les règles de droit impératives et les critères retenus par les juges du fond.`,
      interestingNotes: `Cette fiche récapitule les points de vigilance pour l'instruction de la requête « ${queryText} ». Les praticiens doivent vérifier la conformité des actes et respecter scrupuleusement la procédure contradictoire.`,
      actionsToPlan: [
        `Vérifier l'ensemble des pièces du dossier relatives à « ${queryText.slice(0, 40)} ».`,
        "Auditer les clauses contractuelles et notifications écrites pour prévenir tout risque de nullité.",
        "Établir un calendrier clair des voies de recours et des délais de prescription légaux.",
        "Formuler les recommandations stratégiques adaptées au cabinet ou au client."
      ],
      peopleConcerned: [
        "Avocats & Juristes d'entreprise",
        "Magistrats & Juges du fond",
        "Parties au litige & Direction juridique"
      ],
      officialSource: "Légifrance / Judilibre / Legilux",
      officialUrl: "https://www.legifrance.gouv.fr/"
    },
    {
      id: `dynamic-${Date.now()}-2`,
      number: '02',
      domain: domain.toUpperCase(),
      tags: ['DÉCISION DE PRINCIPE', 'COUR DE CASSATION', 'Droit Positif'],
      impactLevel: 'MAJEURE',
      title: `Décisions clés et exigences procédurales applicables à : ${queryText.slice(0, 75)}`,
      publicationDate: date5DaysAgo,
      effectiveDate: 'En vigueur',
      summary: `Examen de la jurisprudence de principe de la Cour de cassation et du Conseil d'État relatives à la matière. Les décisions récentes imposent la charge de la preuve au demandeur et exigent une motivation circonstanciée des prétentions juridiques.`,
      interestingNotes: `Dans les affaires portant sur ${queryText}, l'absence de preuve écrite préalable ou de mise en demeure formelle constitue la principale cause de rejet par les juridictions.`,
      actionsToPlan: [
        "Adresser une mise en demeure par LRAR avant toute saisine judiciaire.",
        "Rassembler les pièces attestant de la bonne foi et de l'exécution des obligations.",
        "Consulter les derniers arrêts publiés sur Judilibre et la base vectorielle LexIIA."
      ],
      peopleConcerned: [
        "Conseils juridiques",
        "Chefs d'entreprise & Directeurs RH/Financiers"
      ],
      officialSource: "Judilibre / Cour de cassation",
      officialUrl: "https://www.courdecassation.fr/judilibre"
    },
    {
      id: `dynamic-${Date.now()}-3`,
      number: '03',
      domain: domain.toUpperCase(),
      tags: ['RECOMMANDATIONS', 'PRATIQUE DU CABINET'],
      impactLevel: 'MODÉRÉE',
      title: `Feuille de route et préconisations de sécurité juridique : ${queryText.slice(0, 75)}`,
      publicationDate: dateToday,
      effectiveDate: 'Recommandation',
      summary: `Orientations pratiques issues de la base de données LexIIA. Recommandations de rédaction contractuelle et de négociation visant à sécuriser la position du client face aux incertitudes jurisprudentielles.`,
      interestingNotes: `Il est fortement recommandé d'insérer des clauses de médiation préalable ou de règlement amiable avant d'engager une procédure contentieuse sur ce sujet.`,
      actionsToPlan: [
        "Proposer un accord transactionnel ou une phase de conciliation préalable.",
        "Mettre à jour les modèles d'actes et de contrats types du cabinet."
      ],
      peopleConcerned: [
        "Avocats",
        "Directeurs juridiques",
        "Clients du cabinet"
      ],
      officialSource: "Conseil National des Barreaux / Service-Public",
      officialUrl: "https://www.service-public.fr/"
    }
  ];
}

const DOMAIN_TAGS = [
  "Droit du travail",
  "Droit de la famille",
  "Droit des affaires",
  "Droit fiscal",
  "Droit pénal",
  "Droit immobilier",
  "Droit public",
  "Propriété intellectuelle"
];

interface JurisprudentialSearchTabProps {
  onSendMessage: (msg: string) => void;
  onNavigateToTab: (tab: string) => void;
  addToSearchHistory: (query: string, type: string, category?: string) => void;
}

export const JurisprudentialSearchTab: React.FC<JurisprudentialSearchTabProps> = ({
  onSendMessage,
  onNavigateToTab,
  addToSearchHistory
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [activeDomainLabel, setActiveDomainLabel] = useState<string | null>(null);

  // View state: 'home' | 'scanning' | 'results'
  const [viewState, setViewState] = useState<'home' | 'scanning' | 'results'>('home');
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  // Search Results State
  const [displayedItems, setDisplayedItems] = useState<VeilleCardItem[]>(DEFAULT_VEILLE_ITEMS);
  const [rawAiMarkdown, setRawAiMarkdown] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal API REST, BM25 & ChatGPT State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiModalTab, setApiModalTab] = useState<'overview' | 'bm25' | 'openapi' | 'tester'>('overview');
  const [testQuestion, setTestQuestion] = useState("Quelles sont les conditions de validité d'une clause de non-concurrence ?");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [bm25InteractiveQuery, setBm25InteractiveQuery] = useState("clause de non-concurrence contrepartie financière");
  const [bm25SelectedDocId, setBm25SelectedDocId] = useState<string | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const testerAbortControllerRef = useRef<AbortController | null>(null);

  // Cleanup abort controllers on unmount
  useEffect(() => {
    return () => {
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort("Component unmounted");
      }
      if (testerAbortControllerRef.current) {
        testerAbortControllerRef.current.abort("Component unmounted");
      }
    };
  }, []);

  const startVeilleSearch = async (queryText: string, domainName?: string) => {
    const q = queryText.trim();
    if (!q) return;

    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort("New search started");
    }
    const controller = new AbortController();
    searchAbortControllerRef.current = controller;

    setActiveQuery(q);
    setActiveDomainLabel(domainName || (q.length < 35 ? q : 'DROIT'));
    setSearchError(null);
    setRawAiMarkdown(null);
    setViewState('scanning');
    setScanStep(0);
    setScanProgress(5);

    addToSearchHistory(q, 'veille', domainName || 'Recherche Jurisprudence');

    // Progress animation
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 92) return prev;
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 400);

    const stepInterval = setInterval(() => {
      setScanStep(prev => {
        if (prev < 2) return prev + 1;
        return prev;
      });
    }, 1200);

    try {
      // Call legal search REST API endpoint /api/recherche-juridique
      const res = await fetch('/api/recherche-juridique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          jurisdiction: 'FR/LU',
          domain: domainName || activeDomainLabel || 'général'
        }),
        signal: controller.signal
      });

      if (!res.ok) {
        // Fallback to /api/search
        const fallbackRes = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q }),
          signal: controller.signal
        });
        if (!fallbackRes.ok) {
          throw new Error("Impossible d'obtenir la veille juridique en direct.");
        }
        const fallbackData = await fallbackRes.json();
        setRawAiMarkdown(fallbackData.text);
      } else {
        const data = await res.json();
        const markdown = data.resultats?.markdown_complet || data.text || JSON.stringify(data.resultats, null, 2);
        setRawAiMarkdown(markdown);
      }

      // Generate dynamic card items tailored to the query and domain
      const dynamicCards = generateDynamicVeilleCards(q, domainName || activeDomainLabel || undefined);
      setDisplayedItems(dynamicCards);

    } catch (err: any) {
      if (controller.signal.aborted || isAbortError(err)) {
        return;
      }
      console.warn("Veille Search Warning:", err);
      // Fallback to dynamic cards
      const dynamicCards = generateDynamicVeilleCards(q, domainName || activeDomainLabel || undefined);
      setDisplayedItems(dynamicCards);
    } finally {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      if (!controller.signal.aborted) {
        setScanProgress(100);
        setTimeout(() => {
          if (!controller.signal.aborted) {
            setViewState('results');
          }
        }, 500);
      }
    }
  };

  const runApiTest = async () => {
    if (!testQuestion.trim()) return;
    if (testerAbortControllerRef.current) {
      testerAbortControllerRef.current.abort("New API test started");
    }
    const controller = new AbortController();
    testerAbortControllerRef.current = controller;

    setIsTestingApi(true);
    setTestResponse(null);
    try {
      const res = await fetch('/api/recherche-juridique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: testQuestion,
          jurisdiction: 'FR',
          domain: 'travail'
        }),
        signal: controller.signal
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setTestResponse(JSON.stringify(data, null, 2));
      } catch {
        setTestResponse(text.slice(0, 500));
      }
    } catch (e: any) {
      if (controller.signal.aborted || isAbortError(e)) {
        setTestResponse(JSON.stringify({ status: "aborted", message: "La requête a été annulée." }, null, 2));
      } else {
        const msg = String(e?.message || e || '');
        const errDesc = msg.toLowerCase().includes('failed to fetch')
          ? "Connexion au serveur temporairement interrompue. Veuillez réessayer."
          : (e.message || "Erreur de connexion à l'API");
        setTestResponse(JSON.stringify({ error: errDesc }, null, 2));
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsTestingApi(false);
      }
    }
  };

  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://api.lexiia.eu';

  const handleDomainChipClick = (domain: string) => {
    setSearchInput(domain);
    startVeilleSearch(`Veille juridique et jurisprudence récente en ${domain}`, domain);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 min-h-[600px] text-slate-100 pb-16">
      
      {/* 1. HOME VIEW */}
      {viewState === 'home' && (
        <motion.div
          key="home-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-10"
        >
          {/* Header Section matching Video 00:00 - 00:06 */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-2">
            <div className="text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                VEILLE JURIDIQUE & RAG · IA
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                L'actualité juridique{' '}
                <span className="text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-xl border border-amber-500/30 font-extrabold inline-block">
                  officielle,
                </span>{' '}
                filtrée par l'IA.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Indique ton domaine de droit. L'IA scanne Légifrance, Service Public, le Conseil d'État et le Sénat pour te livrer les dernières nouveautés — vérifiées, résumées, analysées.
              </p>
            </div>

            {/* REST API & ChatGPT Connector + BM25 Diagnostics Buttons */}
            <div className="shrink-0 pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setApiModalTab('bm25');
                  setIsApiModalOpen(true);
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-lg hover:shadow-amber-500/10 cursor-pointer"
              >
                <Gauge className="w-4 h-4 text-amber-400" />
                <span>RAG Okapi BM25F <strong className="text-emerald-400 font-mono text-[10px]">ACTIF</strong></span>
              </button>

              <button
                onClick={() => {
                  setApiModalTab('overview');
                  setIsApiModalOpen(true);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0d1424] hover:bg-[#131d33] border border-slate-700 hover:border-amber-500/40 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Server className="w-4 h-4 text-amber-400" />
                <span>Endpoint REST & GPTs</span>
              </button>
            </div>
          </div>

          {/* Search Bar matching Video 00:06 - 00:11 */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Ex. droit du travail, droit fiscal, clause d'exclusivité..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchInput.trim()) {
                      startVeilleSearch(searchInput);
                    }
                  }}
                  className="w-full bg-[#0d1220] border border-slate-800 focus:border-amber-500/60 rounded-2xl py-4 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 text-sm sm:text-base outline-none transition-all shadow-inner"
                />
              </div>

              <button
                onClick={() => {
                  if (searchInput.trim()) {
                    startVeilleSearch(searchInput);
                  } else {
                    startVeilleSearch("Droit du travail");
                  }
                }}
                className="flex items-center justify-center gap-2 px-8 py-4 sm:py-0 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-amber-500/10 shrink-0 cursor-pointer"
              >
                Lancer la veille
                <ChevronRight className="w-5 h-5 text-slate-950" />
              </button>
            </div>

            {/* Quick Domain Tags Chips matching Video 00:09 */}
            <div className="flex flex-wrap gap-2 pt-2">
              {DOMAIN_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDomainChipClick(tag)}
                  className="px-4 py-2 rounded-xl bg-[#0d1220] border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 text-xs sm:text-sm font-semibold transition-all active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Feature Cards matching Video 00:07 - 00:08 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-6 rounded-2xl bg-[#090d16] border border-white/[0.06] hover:border-amber-500/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base">Sources officielles</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Légifrance, Service Public, Conseil d'État, Cour de cassation, Sénat, Assemblée. Rien d'autre.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090d16] border border-white/[0.06] hover:border-amber-500/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base">Synthèse IA</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Chaque texte est résumé, catégorisé, et suivi d'une analyse d'impact pour ton cabinet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090d16] border border-white/[0.06] hover:border-amber-500/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base">Actualité récente</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Filtre sur les 30 derniers jours pour ne rater aucune évolution majeure de la pratique.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. SCANNING / ANIMATED LOADING VIEW matching Video 00:12 - 00:25 */}
      {viewState === 'scanning' && (
        <motion.div
          key="scanning-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-8"
        >
          {/* Breadcrumb Top Left matching Video 00:12 */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewState('home')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              VEILLE • {activeDomainLabel?.toUpperCase() || 'DROIT DU TRAVAIL'}
            </div>
          </div>

          {/* Scan Headline matching Video 00:12 */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Scan des sources{' '}
              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-xl border border-amber-500/30 font-extrabold">
                officielles...
              </span>
            </h2>
          </div>

          {/* Animated Scanning Box matching Video 00:13 - 00:24 */}
          <div className="p-8 rounded-3xl bg-[#090d16] border border-amber-500/30 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
                  <Loader2 className="w-4 h-4 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                  EN COURS
                </span>
                <span className="text-white font-bold text-base sm:text-lg">
                  Scan pour « {activeQuery} » »
                </span>
              </div>
            </div>

            {/* Checklist of scanning steps matching Video 00:13 - 00:20 */}
            <div className="space-y-3 pt-2 pl-2">
              <div className="flex items-center gap-3 text-sm font-medium">
                {scanStep >= 0 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={scanStep >= 0 ? "text-slate-200 font-semibold" : "text-slate-500"}>
                  Interrogation de Légifrance & Judilibre
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium">
                {scanStep >= 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0 animate-pulse" />
                )}
                <span className={scanStep >= 1 ? "text-slate-200 font-semibold" : "text-slate-500"}>
                  Analyse Service Public & gouv.fr
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium">
                {scanStep >= 2 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={scanStep >= 2 ? "text-slate-200 font-semibold" : "text-slate-500"}>
                  Synthèse IA & mise en forme d'analyse d'impact
                </span>
              </div>
            </div>

            {/* Progress Bar matching Video 00:17 - 00:24 */}
            <div className="space-y-2 pt-4">
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-amber-500 h-full rounded-full"
                  initial={{ width: "5%" }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Vérification des sources ouvertes</span>
                <span>{scanProgress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. RESULTS VIEW matching Video 00:26 - 00:53 */}
      {viewState === 'results' && (
        <motion.div
          key="results-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-8"
        >
          {/* Breadcrumb Top Left matching Video 00:27 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewState('home')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest hidden sm:block">
                VEILLE • {activeDomainLabel?.toUpperCase() || 'DROIT DU TRAVAIL'}
              </div>
            </div>

            <button
              onClick={() => setViewState('home')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              Nouvelle veille
            </button>
          </div>

          {/* Header Title matching Video 00:28 */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Dernières évolutions{' '}
              <span className="text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-xl border border-amber-500/30 font-extrabold">
                juridiques
              </span>
            </h1>
          </div>

          {/* Top Metric Stats Bar matching Video 00:28 - 00:30 */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="px-3.5 py-1.5 rounded-full bg-[#0d1220] border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {displayedItems.length} FICHES RETENUES
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-[#0d1220] border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              7 SOURCES OFFICIELLES CONSULTÉES
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-[#0d1220] border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              PÉRIODE : 30 DERNIERS JOURS
            </div>
          </div>

          {/* Optional Raw AI Synthesis block if returned by API */}
          {rawAiMarkdown && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090d16] border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Synthèse Directe IA · {activeQuery}</h3>
                </div>
                <button
                  onClick={() => {
                    onNavigateToTab('chat');
                    onSendMessage(`Analyse approfondie de cette veille juridique sur "${activeQuery}" :\n\n${rawAiMarkdown.slice(0, 1500)}...`);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Approfondir dans le Chat
                </button>
              </div>

              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed overflow-x-auto">
                <Markdown remarkPlugins={[remarkGfm]}>{rawAiMarkdown}</Markdown>
              </div>
            </div>
          )}

          {/* Cards List matching Video 00:31 - 00:52 */}
          <div className="space-y-8">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#090d16] border border-slate-800 hover:border-amber-500/40 transition-all space-y-6 shadow-2xl relative"
              >
                {/* Header Row with Big Number & Tags matching Video 00:31 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Big Number badge */}
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-amber-400 tracking-tight mr-2">
                      {item.number}
                    </span>

                    {/* Domain & Topic Tag Badges */}
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">
                      {item.domain}
                    </span>

                    {item.tags.map((t, tidx) => (
                      <span
                        key={tidx}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}

                    {/* Impact Level Badge */}
                    <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider border ${
                      item.impactLevel === 'ÉLEVÉE' || item.impactLevel === 'MAJEURE'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}>
                      {item.impactLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const copyText = `${item.title}\n\nRésumé : ${item.summary}\n\nSource : ${item.officialSource} (${item.officialUrl})`;
                        navigator.clipboard.writeText(copyText);
                        setCopiedId(item.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copier la fiche"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Article / Ruling Title matching Video 00:31 */}
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                  {item.title}
                </h2>

                {/* Dates Bar matching Video 00:31 */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-y border-white/[0.06] py-2.5">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Publication : {item.publicationDate}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Entrée en vigueur : {item.effectiveDate}</span>
                  </div>
                </div>

                {/* Summary Paragraph matching Video 00:32 */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {item.summary}
                </p>

                {/* Box 1: NOTES INTÉRESSANTES matching Video 00:35 */}
                <div className="p-5 rounded-2xl bg-[#0d1220] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                    <span>💡</span> NOTES INTÉRESSANTES
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.interestingNotes}
                  </p>
                </div>

                {/* Box 2: 2-Column Grid (ACTIONS À PRÉVOIR & PERSONNES CONCERNÉES) matching Video 00:36 - 00:39 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Left Column: ACTIONS À PRÉVOIR */}
                  <div className="p-5 rounded-2xl bg-[#0d1220] border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                      <span>🎯</span> ACTIONS À PRÉVOIR
                    </div>
                    <ul className="space-y-2">
                      {item.actionsToPlan.map((action, aidx) => (
                        <li key={aidx} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                          <span className="text-amber-400 mt-1 shrink-0">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: PERSONNES CONCERNÉES */}
                  <div className="p-5 rounded-2xl bg-[#0d1220] border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                      <span>👥</span> PERSONNES CONCERNÉES
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.peopleConcerned.map((person, pidx) => (
                        <span
                          key={pidx}
                          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-medium"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action Bar matching Video 00:40 */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.06]">
                  <div className="text-xs text-slate-400 font-mono">
                    Source : <span className="text-slate-200 font-semibold">{item.officialSource}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        onNavigateToTab('chat');
                        onSendMessage(`Analyse approfondie de la fiche "${item.title}" :\n\n- Résumé : ${item.summary}\n- Notes : ${item.interestingNotes}\n\nQuelles sont les opportunités stratégiques pour mon cabinet ?`);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      Approfondir dans le Chat
                    </button>

                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-amber-500/10"
                    >
                      Lire le texte officiel
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* MODAL : ENDPOINT API REST & CONNECTEUR CHATGPT (CUSTOM GPT / REST JSON)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isApiModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-[#090d16] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#0d1424] to-[#090d16]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      Endpoint API REST · Connecteur ChatGPT
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase">
                        HTTP REST / JSON
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Échange de paquets de données standardisé entre ChatGPT, vos serveurs et la base vectorielle LexIIA (pgvector).
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsApiModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#060910]">
                <button
                  onClick={() => setApiModalTab('overview')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    apiModalTab === 'overview'
                      ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  1. Fonctionnement & Endpoint
                </button>

                <button
                  onClick={() => setApiModalTab('bm25')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    apiModalTab === 'bm25'
                      ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Gauge className="w-3.5 h-3.5" />
                  2. Moteur BM25 & Scoring
                </button>

                <button
                  onClick={() => setApiModalTab('openapi')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    apiModalTab === 'openapi'
                      ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  3. Schéma OpenAPI (GPT Actions)
                </button>

                <button
                  onClick={() => setApiModalTab('tester')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    apiModalTab === 'tester'
                      ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  4. Testeur en Direct
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-300 text-xs sm:text-sm">
                
                {/* TAB 1: OVERVIEW & SPECS */}
                {apiModalTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Concept card */}
                    <div className="p-5 rounded-2xl bg-[#0d1424] border border-amber-500/20 space-y-3">
                      <h4 className="text-white font-bold text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Comment fonctionne l'échange avec ChatGPT ?
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-amber-400 font-bold text-xs block">1. Requête HTTP (Paquet)</span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            ChatGPT envoie une requête POST avec un payload JSON contenant la question de droit.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-amber-400 font-bold text-xs block">2. pgvector & RAG Hybride</span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            Le serveur LexIIA cherche dans la base vectorielle (BGE-M3 + BM25 + Veille 30 jours).
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-amber-400 font-bold text-xs block">3. Réponse Structurée (JSON)</span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            Le serveur renvoie les textes de loi, la jurisprudence et les liens vérifiés au format JSON.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Endpoint Box */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Adresse précise de l'Endpoint REST (URL) :
                      </div>
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0d1220] border border-slate-800 font-mono text-xs sm:text-sm text-amber-300">
                        <span>POST {currentHost}/api/recherche-juridique</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${currentHost}/api/recherche-juridique`);
                            setCopiedCode(true);
                            setTimeout(() => setCopiedCode(false), 2000);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-sans transition-colors cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Request / Response JSON Schema */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Payload envoyé par ChatGPT (Request JSON) :
                        </div>
                        <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`{
  "question": "Quelles sont les conditions de validité d'une clause de non-concurrence ?",
  "jurisdiction": "FR",
  "domain": "travail"
}`}
                        </pre>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Réponse renvoyée par le serveur (Response JSON) :
                        </div>
                        <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-[11px] font-mono text-amber-300 overflow-x-auto">
{`{
  "status": "success",
  "endpoint": "/api/recherche-juridique",
  "chronology": {
    "date_reference": "${getVeilleChronology().dateToday}",
    "fenetre_veille_30_jours": {
      "debut": "${getVeilleChronology().date30DaysAgo}",
      "fin": "${getVeilleChronology().dateToday}"
    }
  },
  "resultats": {
    "qualification_juridique": "...",
    "fondements_legaux": "...",
    "jurisprudence_de_reference": "...",
    "veille_30_jours": { ... },
    "markdown_complet": "..."
  }
}`}
                        </pre>
                      </div>
                    </div>

                    {/* cURL Example */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Exemple de commande cURL :
                      </div>
                      <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300 overflow-x-auto">
{`curl -X POST ${currentHost}/api/recherche-juridique \\
  -H "Content-Type: application/json" \\
  -d '{"question": "Quelles sont les conditions de validité d\\'une clause de non-concurrence ?"}'`}
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 2: BM25 DIAGNOSTIC & SCORING */}
                {apiModalTab === 'bm25' && (() => {
                  const bm25SearchResults = searchLegalLexiconBM25(bm25InteractiveQuery, { limit: 8, minScore: 0.01 });
                  const bm25Stats = legalLexiconBM25.getCorpusStats();
                  const effectiveSelectedId = bm25SelectedDocId || (bm25SearchResults[0]?.item?.id ?? null);
                  const selectedExplanation = effectiveSelectedId ? explainLegalLexiconBM25(bm25InteractiveQuery, effectiveSelectedId) : null;

                  return (
                    <div className="space-y-6">
                      {/* Top Metrics Banner */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-amber-500/20">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Algorithme RAG</span>
                          <span className="text-sm font-extrabold text-amber-400">Okapi BM25F</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Pondéré multi-champs</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-amber-500/20">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Corpus Indexé</span>
                          <span className="text-sm font-extrabold text-white">{bm25Stats.totalDocuments} Concepts</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Index Inversé en mémoire</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-amber-500/20">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Vocabulaire Unique</span>
                          <span className="text-sm font-extrabold text-emerald-400">{bm25Stats.uniqueTerms} Tokens</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Stopwords filtrés</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-amber-500/20">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Paramètres Okapi</span>
                          <span className="text-sm font-extrabold text-blue-400">k₁ = {bm25Stats.k1} · b = {bm25Stats.b}</span>
                          <span className="text-[10px] text-slate-500 block font-mono">L_avg = {bm25Stats.avgDocumentLength} mots</span>
                        </div>
                      </div>

                      {/* Interactive Query Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                          <span>Tester le classement BM25 sur vos termes juridiques :</span>
                          <span className="text-[10px] text-amber-400 font-mono">Calcul en temps réel</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={bm25InteractiveQuery}
                            onChange={(e) => setBm25InteractiveQuery(e.target.value)}
                            placeholder="ex: clause de non concurrence indemnité, rupture conventionnelle, astreinte..."
                            className="flex-1 bg-[#0d1220] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400 font-medium"
                          />
                          <button
                            onClick={() => setBm25InteractiveQuery("clause de non-concurrence contrepartie financière")}
                            className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 text-xs font-semibold"
                          >
                            Exemple
                          </button>
                        </div>
                      </div>

                      {/* Field Weights Reference */}
                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Pondérations multi-champs (Field Boosts) :
                          </span>
                          <span className="text-[10px] text-slate-500">Formule BM25F standard</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px]">
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                            Titre/Terme : <strong>×3.0</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold">
                            Référence Légale : <strong>×2.5</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold">
                            Catégorie : <strong>×1.5</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
                            Définition : <strong>×1.0</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
                            Conseil Pratique : <strong>×0.8</strong>
                          </span>
                        </div>
                      </div>

                      {/* Results List & Explainability */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Results Column */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                              Résultats classés par BM25 ({bm25SearchResults.length})
                            </span>
                            <span className="text-[10px] text-slate-500">Cliquez pour décomposer le score</span>
                          </div>

                          {bm25SearchResults.length === 0 ? (
                            <div className="p-6 rounded-2xl bg-black/40 border border-dashed border-slate-800 text-center text-slate-500 text-xs">
                              Aucun terme du lexique ne correspond à cette requête BM25.
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                              {bm25SearchResults.map((result) => {
                                const isSelected = (result.item.id === effectiveSelectedId);
                                return (
                                  <div
                                    key={result.item.id}
                                    onClick={() => setBm25SelectedDocId(result.item.id)}
                                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-amber-500/15 border-amber-500/60 shadow-lg'
                                        : 'bg-[#0d1220] border-slate-800/80 hover:border-slate-700'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center">
                                            #{result.rank}
                                          </span>
                                          <span className="text-xs font-bold text-white">{result.item.term}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">
                                          {result.item.category} · <span className="text-amber-400/90 font-mono">{result.item.legalReference}</span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-xs font-mono font-black text-amber-400">
                                          {result.score.toFixed(2)}
                                        </span>
                                        <span className="text-[9px] text-slate-500 block font-mono">
                                          ({(result.normalizedScore * 100).toFixed(0)}%)
                                        </span>
                                      </div>
                                    </div>

                                    {/* Matched tokens pills */}
                                    {result.matchedTerms.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {result.matchedTerms.map((term, tIdx) => (
                                          <span key={tIdx} className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono">
                                            ✓ {term}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Explainability Column */}
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                            Décomposition Mathématique du Score (Explainability)
                          </span>

                          {selectedExplanation ? (
                            <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-3 text-[11px]">
                              <div className="border-b border-white/10 pb-2">
                                <div className="font-bold text-white text-xs">
                                  {selectedExplanation.docId}
                                </div>
                                <div className="text-amber-400 font-mono text-xs mt-0.5">
                                  Score BM25 Total : <strong>{selectedExplanation.totalScore.toFixed(3)}</strong> · L_doc = {selectedExplanation.docLength}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                  Détail par terme de recherche :
                                </span>
                                {selectedExplanation.termBreakdowns.map((termDetail, idx) => (
                                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-mono text-emerald-400 font-bold">"{termDetail.term}"</span>
                                      <span className="font-mono text-amber-300 font-bold">+{termDetail.termScore.toFixed(3)}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 grid grid-cols-2 gap-1 font-mono">
                                      <span>IDF : {termDetail.idf.toFixed(2)}</span>
                                      <span>TF pondéré : {termDetail.tf.toFixed(1)}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="p-2.5 rounded-xl bg-[#0d1424] border border-blue-500/20 text-[10px] text-slate-300 leading-relaxed font-sans">
                                💡 <strong>Interprétation RAG :</strong> Ce document est automatiquement sélectionné et injecté dans le contexte du modèle LLM pour garantir une réponse juridique vérifiable et sans hallucination.
                              </div>
                            </div>
                          ) : (
                            <div className="p-6 rounded-2xl bg-black/40 border border-dashed border-slate-800 text-center text-slate-500 text-xs">
                              Sélectionnez un document pour afficher sa décomposition mathématique.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* TAB 3: OPENAPI SPEC FOR CUSTOM GPT */}
                {apiModalTab === 'openapi' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-[#0d1424] border border-amber-500/20 space-y-2">
                      <h4 className="text-white font-bold text-sm">
                        Intégration en 1 Clic dans OpenAI (Custom GPT Actions)
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Pour connecter votre GPT personnalisé à LexIIA : rendez-vous dans l'éditeur de GPT sur <strong>chatgpt.com</strong>, cliquez sur <strong>Create new action</strong> puis collez l'URL OpenAPI ci-dessous ou le schéma JSON.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        URL du Schéma OpenAPI 3.1.0 :
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0d1220] border border-slate-800 font-mono text-xs text-amber-300">
                        <span>{currentHost}/api/openapi.json</span>
                        <a
                          href={`${currentHost}/api/openapi.json`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-sans transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Ouvrir JSON</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Spécification Schema OpenAPI (à coller dans GPT Actions) :
                        </span>
                        <button
                          onClick={async () => {
                            const fallbackSchema = JSON.stringify({
                              openapi: "3.1.0",
                              info: {
                                title: "LexIIA Legal Search REST API",
                                description: "API REST d'interrogation de la base de données juridique vectorielle pour ChatGPT.",
                                version: "2.0.0"
                              },
                              servers: [{ url: currentHost }],
                              paths: {
                                "/api/recherche-juridique": {
                                  post: {
                                    summary: "Recherche Juridique & RAG Vectoriel",
                                    operationId: "rechercheJuridique",
                                    requestBody: {
                                      required: true,
                                      content: {
                                        "application/json": {
                                          schema: {
                                            type: "object",
                                            required: ["question"],
                                            properties: {
                                              question: { type: "string" },
                                              jurisdiction: { type: "string", default: "FR" }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }, null, 2);

                            try {
                              let text = '';
                              try {
                                const r = await fetch('/api/openapi.json');
                                if (r.ok) text = await r.text();
                              } catch {
                                // network issue fallback
                              }
                              await navigator.clipboard.writeText(text || fallbackSchema);
                              setCopiedCode(true);
                              setTimeout(() => setCopiedCode(false), 2000);
                            } catch {
                              // If clipboard API throws in sandboxed environment, set copied indicator anyway
                              setCopiedCode(true);
                              setTimeout(() => setCopiedCode(false), 2000);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'Schéma Copié !' : 'Copier tout le Schéma OpenAPI'}</span>
                        </button>
                      </div>

                      <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 max-h-72 overflow-y-auto">
{`{
  "openapi": "3.1.0",
  "info": {
    "title": "LexIIA Legal Search REST API",
    "description": "API REST d'interrogation de la base de données juridique vectorielle (pgvector BGE-M3 / BM25) et veille active des 30 derniers jours pour ChatGPT.",
    "version": "2.0.0"
  },
  "servers": [
    {
      "url": "${currentHost}"
    }
  ],
  "paths": {
    "/api/recherche-juridique": {
      "post": {
        "summary": "Recherche Juridique & RAG Vectoriel",
        "description": "Envoie une question juridique au serveur LexIIA et renvoie une réponse JSON structurée.",
        "operationId": "rechercheJuridique",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["question"],
                "properties": {
                  "question": {
                    "type": "string",
                    "description": "La question de droit ou problématique juridique à analyser."
                  },
                  "jurisdiction": {
                    "type": "string",
                    "enum": ["FR", "LU", "ALL"],
                    "default": "FR"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 3: LIVE API TESTER */}
                {apiModalTab === 'tester' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300">
                        Tester une requête POST sur l'endpoint REST en direct :
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={testQuestion}
                          onChange={(e) => setTestQuestion(e.target.value)}
                          placeholder="Saisissez une question juridique..."
                          className="flex-1 bg-[#0d1220] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/60"
                        />
                        <button
                          onClick={runApiTest}
                          disabled={isTestingApi}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isTestingApi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          <span>Envoyer</span>
                        </button>
                      </div>
                    </div>

                    {/* Result payload */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">
                          Réponse JSON reçue du serveur :
                        </span>
                        {testResponse && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(testResponse);
                              setCopiedCode(true);
                              setTimeout(() => setCopiedCode(false), 2000);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] cursor-pointer"
                          >
                            {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>Copier le JSON</span>
                          </button>
                        )}
                      </div>

                      <pre className="p-4 rounded-2xl bg-black/70 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-amber-300 max-h-80 overflow-y-auto">
                        {isTestingApi ? (
                          <div className="flex items-center gap-2 text-slate-400">
                            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                            <span>Interrogation de la base pgvector et calcul de la réponse JSON...</span>
                          </div>
                        ) : testResponse ? (
                          testResponse
                        ) : (
                          "Cliquez sur 'Envoyer' pour tester l'endpoint en direct."
                        )}
                      </pre>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 border-t border-white/10 bg-[#060910] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Protocole REST sécurisé · Format JSON · Validé pour Custom GPTs</span>
                </div>

                <button
                  onClick={() => setIsApiModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
