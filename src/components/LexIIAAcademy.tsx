import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Search, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Check, 
  Timer, 
  HelpCircle, 
  AlertCircle, 
  SlidersHorizontal, 
  BarChart3, 
  TrendingUp, 
  Download, 
  ChevronRight, 
  Bookmark, 
  RotateCcw, 
  ShieldCheck, 
  Send,
  Lock,
  Layers,
  FileCheck,
  CheckCircle,
  ExternalLink,
  Users,
  Compass,
  Star,
  BrainCircuit,
  Lightbulb,
  MessageSquare,
  Loader2,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { InteractiveCourseRevisionModal } from './InteractiveCourseRevisionModal';

interface LexIIAAcademyProps {
  userName?: string;
  onOpenChatMessage?: (prompt: string) => void;
  showToast: (msg: string) => void;
}

// ─── Data: CCDL Modules & Courses ─────────────────────────────────────────────
interface CourseModule {
  id: string;
  title: string;
  category: string;
  jurisdiction: string;
  codeRef: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: number;
  difficulty: 'Fondamental' | 'Intermédiaire' | 'Avancé' | 'Expert';
  status: 'completed' | 'in_progress' | 'not_started';
  badgeColor: string;
  accentColor: string;
  nextLessonTitle: string;
  description: string;
  keyTopics: string[];
}

const CCDL_MODULES: CourseModule[] = [
  {
    id: 'societes',
    title: 'Droit des Sociétés Commerciales',
    category: 'Droit des affaires',
    jurisdiction: 'Luxembourg (Loi du 10 août 1915)',
    codeRef: 'Loi du 10 août 1915 modifiée',
    progress: 75,
    totalLessons: 16,
    completedLessons: 12,
    estimatedHours: 24,
    difficulty: 'Expert',
    status: 'in_progress',
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    accentColor: '#D4AF37',
    nextLessonTitle: 'Régime des pactes d\'actionnaires, clauses léonines et transmission d\'actions',
    description: 'Étude approfondie des SA, SARL, SCSp et SAS : constitution, gouvernance d\'entreprise, augmentation de capital et opérations de fusions-acquisitions.',
    keyTopics: ['Loi 1915 annotée', 'Gouvernance SA / SARL', 'Pactes d\'actionnaires', 'Dissolution & liquidation']
  },
  {
    id: 'civil',
    title: 'Éléments de Responsabilité Civile',
    category: 'Droit civil & Responsabilité',
    jurisdiction: 'Luxembourg (Code civil & CSJ)',
    codeRef: 'Code civil (Art. 1382 à 1386, 1146 et s., 544)',
    progress: 92,
    totalLessons: 16,
    completedLessons: 14,
    estimatedHours: 24,
    difficulty: 'Expert',
    status: 'in_progress',
    badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
    accentColor: '#3B82F6',
    nextLessonTitle: 'Introduction, Fait personnel, Choses inanimées & Fait d\'autrui',
    description: 'Cours officiel CCDL (Georges Ravarani & Alex Engel) : 8 chapitres interactifs. Fait personnel (1382), troubles de voisinage (544), fait des choses (1384 al. 1), fait d\'autrui (rejet Costedoat & Blieck), causalité adéquate, et mise en cause obligatoire de la sécurité sociale (Art. 453 CSS).',
    keyTopics: ['Art. 84 Constitution', 'Fait personnel & Faute', 'Troubles de voisinage (544)', 'Fait des choses (1384 al. 1)', 'Fait d\'autrui (Rejet Costedoat)', 'Sécurité sociale (Art. 453 CSS)']
  },
  {
    id: 'procedure_civile',
    title: 'Procédure Civile Luxembourgeoise',
    category: 'Contentieux & Procédure',
    jurisdiction: 'Luxembourg (NCPC)',
    codeRef: 'Nouveau Code de Procédure Civile',
    progress: 60,
    totalLessons: 12,
    completedLessons: 7,
    estimatedHours: 18,
    difficulty: 'Expert',
    status: 'in_progress',
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    accentColor: '#10B981',
    nextLessonTitle: 'Les voies de recours ordinaires : L\'appel civil et commercial',
    description: 'Maîtrise de la saisine des juridictions : Tribunal d\'arrondissement, Justice de paix, Cour d\'appel. Délais de forclusion, assignation et référés.',
    keyTopics: ['Assignation et requête', 'Référés d\'urgence', 'Délais procéduraux', 'Exécution des jugements']
  },
  {
    id: 'fiscal',
    title: 'Droit Fiscal Luxembourgeois & Européen',
    category: 'Fiscalité',
    jurisdiction: 'Luxembourg (LIR / IRC / ICC)',
    codeRef: 'Loi concernant l\'impôt sur le revenu (L.I.R.)',
    progress: 45,
    totalLessons: 15,
    completedLessons: 7,
    estimatedHours: 22,
    difficulty: 'Expert',
    status: 'in_progress',
    badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
    accentColor: '#A855F7',
    nextLessonTitle: 'Régime d\'imposition des SOPARFI et directive mère-fille',
    description: 'Imposition des sociétés et des personnes physiques. Fiscalité des véhicules d\'investissement, retenue à la source et conventions de double imposition.',
    keyTopics: ['Impôt sur le revenu (IRC/ICC)', 'Régime des SOPARFI', 'TVA intracommunautaire', 'Conventions fiscales']
  },
  {
    id: 'commercial',
    title: 'Droit Commercial, Bancaire & Faillites',
    category: 'Droit des affaires',
    jurisdiction: 'Luxembourg (Code de commerce & CSSF)',
    codeRef: 'Code de commerce luxembourgeois',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    estimatedHours: 15,
    difficulty: 'Avancé',
    status: 'completed',
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    accentColor: '#10B981',
    nextLessonTitle: 'Module validé · Examen blanc réussi avec mention',
    description: 'Actes de commerce, baux commerciaux, droit bancaire sous tutelle CSSF, procédures collectives (faillite, concordat préventif, gestion contrôlée).',
    keyTopics: ['Faillites & liquidations', 'Régulation CSSF', 'Baux commerciaux', 'Garanties financières']
  },
  {
    id: 'deontologie',
    title: 'Déontologie du Barreau de Luxembourg',
    category: 'Déontologie professionnelle',
    jurisdiction: 'Ordre des Avocats du Barreau de Luxembourg',
    codeRef: 'Règlement d\'Ordre Intérieur (ROI)',
    progress: 85,
    totalLessons: 8,
    completedLessons: 7,
    estimatedHours: 12,
    difficulty: 'Intermédiaire',
    status: 'in_progress',
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    accentColor: '#D4AF37',
    nextLessonTitle: 'Conflits d\'intérêts et honoraires : Détermination et contestations (Taxation)',
    description: 'Principes essentiels de la profession d\'avocat au Grand-Duché : secret professionnel absolu, indépendance, confraternité et devoirs envers le tribunal.',
    keyTopics: ['Secret professionnel absolu', 'Conflits d\'intérêts', 'Taxation des honoraires', 'Relations avec magistrats']
  },
  {
    id: 'penal',
    title: 'Droit Pénal & Procédure Pénale',
    category: 'Droit répressif',
    jurisdiction: 'Luxembourg (Code pénal & CPP)',
    codeRef: 'Code pénal luxembourgeois',
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
    estimatedHours: 16,
    difficulty: 'Avancé',
    status: 'in_progress',
    badgeColor: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
    accentColor: '#F43F5E',
    nextLessonTitle: 'Les infractions économiques et financières : Blanchiment d\'argent et AML/CFT',
    description: 'Théorie générale de l\'infraction pénale, responsabilité pénale des personnes morales, instruction préparatoire et mandat d\'arrêt européen.',
    keyTopics: ['Infractions financières', 'Blanchiment (AML/CFT)', 'Instruction préparatoire', 'Chambre du conseil']
  },
  {
    id: 'administratif',
    title: 'Droit Administratif & Contentieux',
    category: 'Droit public',
    jurisdiction: 'Luxembourg (Tribunal & Cour administrative)',
    codeRef: 'Loi du 7 novembre 1996 portant organisation des juridictions administratives',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    estimatedHours: 14,
    difficulty: 'Intermédiaire',
    status: 'not_started',
    badgeColor: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
    accentColor: '#64748B',
    nextLessonTitle: 'Introduction : Les actes administratifs unilatéraux et l\'intérêt à agir',
    description: 'Organisation juridictionnelle administrative luxembourgeoise, recours en annulation, recours en réformation et contentieux de la responsabilité étatique.',
    keyTopics: ['Recours en annulation', 'Recours en réformation', 'Responsabilité de la puissance publique', 'Sursis à exécution']
  },
  {
    id: 'travail',
    title: 'Droit du Travail Luxembourgeois',
    category: 'Droit social',
    jurisdiction: 'Luxembourg (Code du travail)',
    codeRef: 'Code du travail luxembourgeois',
    progress: 50,
    totalLessons: 10,
    completedLessons: 5,
    estimatedHours: 14,
    difficulty: 'Intermédiaire',
    status: 'in_progress',
    badgeColor: 'border-teal-500/30 bg-teal-500/10 text-teal-300',
    accentColor: '#14B8A6',
    nextLessonTitle: 'Licenciement avec préavis et licenciement avec effet immédiat (faute grave)',
    description: 'Conclusion et exécution du contrat de travail CDI/CDD, période d\'essai, durée du travail, protection de la maternité et délégués du personnel.',
    keyTopics: ['Période d\'essai', 'Licenciement économique & individuel', 'Faute grave', 'Tribunal du travail']
  },
  {
    id: 'europeen',
    title: 'Droit de l\'Union Européenne & DIP',
    category: 'Droit européen',
    jurisdiction: 'Union Européenne & CJUE (Luxembourg)',
    codeRef: 'Traités UE & Règlement Bruxelles I bis',
    progress: 15,
    totalLessons: 12,
    completedLessons: 2,
    estimatedHours: 16,
    difficulty: 'Avancé',
    status: 'in_progress',
    badgeColor: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    accentColor: '#0EA5E9',
    nextLessonTitle: 'Le renvoi préjudiciel devant la Cour de Justice (Art. 267 TFUE)',
    description: 'Primauté et effet direct du droit de l\'UE, compétences de la CJUE siégeant au Kirchberg, conflits de lois et reconnaissance des décisions étrangères.',
    keyTopics: ['CJUE au Kirchberg', 'Renvoi préjudiciel', 'Règlement Bruxelles I bis', 'Libre circulation']
  },
  {
    id: 'exam_prep',
    title: 'Préparation Intensive aux Épreuves CCDL',
    category: 'Méthodologie & Examens',
    jurisdiction: 'Ministère de la Justice · Luxembourg',
    codeRef: 'Règlement grand-ducal du 27 novembre 2020',
    progress: 40,
    totalLessons: 18,
    completedLessons: 7,
    estimatedHours: 30,
    difficulty: 'Expert',
    status: 'in_progress',
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    accentColor: '#D4AF37',
    nextLessonTitle: 'Méthodologie de la consultation écrite en droit commercial sous contrainte horaire',
    description: 'Annales officielles corrigées, entraînement sous chronomètre aux épreuves écrites et orales, grilles de notation des correcteurs et gestion du stress.',
    keyTopics: ['Annales CCDL 2020-2025', 'Cas pratiques chronométrés', 'Grille de notation du jury', 'Simulations orales']
  }
];

// ─── Data: Library Resources ──────────────────────────────────────────────────
interface LibraryResource {
  id: string;
  title: string;
  category: string;
  type: 'code' | 'jurisprudence' | 'doctrine' | 'annale' | 'fiche';
  date: string;
  jurisdiction: string;
  reference: string;
  downloadsCount: number;
  highlightText: string;
}

const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: 'res-1',
    title: 'Loi du 10 août 1915 sur les sociétés commerciales (Version Consolidée 2026)',
    category: 'Droit des sociétés',
    type: 'code',
    date: 'Janvier 2026',
    jurisdiction: 'Luxembourg (Mémorial A)',
    reference: 'Legilux · Texte intégral annoté',
    downloadsCount: 1420,
    highlightText: 'Texte officiel complet incluant les réformes récentes sur les assemblées générales dématérialisées et le registre des bénéficiaires effectifs (RBE).'
  },
  {
    id: 'res-2',
    title: 'Nouveau Code de Procédure Civile Luxembourgeois (NCPC)',
    category: 'Procédure',
    type: 'code',
    date: 'Février 2026',
    jurisdiction: 'Luxembourg (Legilux)',
    reference: 'Codes de la Justice luxembourgeoise',
    downloadsCount: 1180,
    highlightText: 'Articles 1 à 1256 du NCPC avec renvois aux arrêts de la Cour supérieure de justice et jurisprudence relative aux délais de forclusion.'
  },
  {
    id: 'res-3',
    title: 'Annales Complètes CCDL : Épreuves Écrites Droit des Sociétés (Session 2024-2025)',
    category: 'Droit des sociétés',
    type: 'annale',
    date: 'Session 2025',
    jurisdiction: 'Commission du CCDL',
    reference: 'Corrigé officiel type & Barème',
    downloadsCount: 890,
    highlightText: 'Sujet officiel portant sur la révocation ad nutum d\'un administrateur délégué de SA et la validité d\'une clause de bad leaver.'
  },
  {
    id: 'res-4',
    title: 'Cour de cassation luxembourgeoise : Arrêt sur la force majeure et l\'imprévision contractuelle',
    category: 'Droit civil',
    type: 'jurisprudence',
    date: '14 Mars 2024',
    jurisdiction: 'Cour de cassation de Luxembourg',
    reference: 'Arrêt n° 42/2024 · Chambre civile',
    downloadsCount: 650,
    highlightText: 'Portée de la force majeure dans les contrats commerciaux d\'approvisionnement au Grand-Duché et refus de l\'imprévision prétorienne sans clause contractuelle.'
  },
  {
    id: 'res-5',
    title: 'Fiche Synthétique : Le Secret Professionnel de l\'Avocat au Barreau de Luxembourg',
    category: 'Déontologie',
    type: 'fiche',
    date: 'Septembre 2025',
    jurisdiction: 'Barreau de Luxembourg',
    reference: 'Article 35 de la loi du 10 août 1991',
    downloadsCount: 1530,
    highlightText: 'Fiche mémo exhaustive sur le caractère absolu d\'ordre public du secret professionnel, les perquisitions de cabinet et l\'obligation AML.'
  },
  {
    id: 'res-6',
    title: 'Mémento Fiscal CCDL : Calculs de l\'IRC, de l\'ICC et de l\'Impôt sur la Fortune (IF)',
    category: 'Droit fiscal',
    type: 'doctrine',
    date: 'Exercice 2026',
    jurisdiction: 'Administration des Contributions Directes',
    reference: 'Mémento de fiscalité d\'entreprise',
    downloadsCount: 1040,
    highlightText: 'Exemples chiffrés, barèmes en vigueur à Luxembourg-Ville et cas pratiques de réintégration fiscale avec les règles ATAD.'
  }
];

// ─── Data: Interactive Exam Questions (QCM CCDL) ──────────────────────────────
interface ExamQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalReference: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    category: 'Droit des sociétés (Loi de 1915)',
    question: 'En vertu de la loi luxembourgeoise du 10 août 1915 sur les sociétés commerciales, quel est le capital social minimum requis pour la constitution d\'une Société à Responsabilité Limitée (SARL) ?',
    options: [
      '12 000 euros, intégralement libéré à la souscription',
      '30 000 euros, libéré d\'au moins un quart',
      '12 500 euros, libéré d\'au moins la moitié',
      '1 euro symbolique sans exigence de libération immédiate'
    ],
    correctIndex: 0,
    explanation: 'Selon l\'article 710-5 de la loi du 10 août 1915 modifiée, le capital d\'une SARL classique doit être d\'au moins 12 000 euros et doit être intégralement souscrit et libéré au moment de la constitution (contrairement à la SARL-S qui permet 1 euro symbolique).',
    legalReference: 'Article 710-5 de la Loi du 10 août 1915 sur les sociétés commerciales'
  },
  {
    id: 2,
    category: 'Déontologie du Barreau',
    question: 'Au Grand-Duché de Luxembourg, quelle est la nature juridique du secret professionnel de l\'avocat ?',
    options: [
      'Il est relatif et peut être levé à la seule discrétion du client par écrit',
      'Il est absolu et d\'ordre public : le client lui-même ne peut en délier l\'avocat',
      'Il ne s\'applique qu\'en matière de défense pénale et non en matière de conseil fiscal',
      'Il peut être levé sur simple réquisition administrative de l\'autorité fiscale'
    ],
    correctIndex: 1,
    explanation: 'En droit luxembourgeois, le secret professionnel de l\'avocat est absolu et d\'ordre public (Art. 458 du Code pénal et Art. 35 de la loi du 10 août 1991 sur la profession d\'avocat). Le client ne peut pas délier son avocat de ce secret, garantissant l\'indépendance de la justice.',
    legalReference: 'Art. 458 Code pénal & Art. 35 Loi du 10 août 1991 sur la profession d\'avocat'
  },
  {
    id: 3,
    category: 'Procédure Civile (NCPC)',
    question: 'Quel est le délai de droit commun pour interjeter appel d\'un jugement civil ou commercial contradictoire rendu en premier ressort au Tribunal d\'arrondissement de Luxembourg ?',
    options: [
      '15 jours à compter du prononcé de la décision',
      '40 jours à compter de la signification du jugement',
      '2 mois à compter de la notification par le greffe',
      '1 mois à compter de la publication au recueil'
    ],
    correctIndex: 1,
    explanation: 'Selon l\'article 584 du Nouveau Code de Procédure Civile luxembourgeois (NCPC), le délai d\'appel de droit commun en matière civile et commerciale est de 40 jours à compter de la signification du jugement à personne ou à domicile.',
    legalReference: 'Article 584 du Nouveau Code de Procédure Civile luxembourgeois (NCPC)'
  },
  {
    id: 4,
    category: 'Droit du Travail luxembourgeois',
    question: 'Dans un contrat de travail à durée indéterminée (CDI) soumis au Code du travail luxembourgeois, quelle est la durée maximale légale autorisée pour la période d\'essai d\'un salarié n\'ayant pas de formation supérieure ?',
    options: [
      '1 mois renouvelable une fois',
      '3 mois',
      '6 mois',
      '12 mois sous réserve d\'accord syndical'
    ],
    correctIndex: 2,
    explanation: 'L\'article L. 121-5 du Code du travail luxembourgeois dispose que la période d\'essai ne peut excéder six mois, sauf si le salarié justifie d\'une formation d\'un niveau d\'enseignement supérieur (ou salaire très élevé) où elle peut aller jusqu\'à 12 mois.',
    legalReference: 'Article L. 121-5 du Code du travail luxembourgeois'
  }
];

// ─── Data: Flashcards Révision CCDL ───────────────────────────────────────────
interface FlashcardItem {
  id: number;
  subject: string;
  front: string;
  back: string;
  legalRef: string;
}

const FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: 1,
    subject: "Procédure Civile (NCPC)",
    front: "Quel est le délai de droit commun pour interjeter appel d'un jugement civil rendu par le Tribunal d'arrondissement ?",
    back: "40 jours à compter de la signification du jugement à personne ou à domicile.",
    legalRef: "Article 584 du Nouveau Code de Procédure Civile luxembourgeois"
  },
  {
    id: 2,
    subject: "Droit des Sociétés (Loi 1915)",
    front: "Quel est le capital social minimum d'une SARL classique et ses conditions de libération ?",
    back: "12 000 euros minimum, intégralement souscrit et libéré à la constitution.",
    legalRef: "Article 710-5 de la Loi du 10 août 1915 sur les sociétés commerciales"
  },
  {
    id: 3,
    subject: "Déontologie du Barreau",
    front: "Quelle est la portée juridique du secret professionnel de l'avocat au Barreau de Luxembourg ?",
    back: "Il est d'ordre public et absolu. Le client ne peut lui-même en délier l'avocat, qui ne peut révéler aucune confidence.",
    legalRef: "Art. 458 Code pénal & Art. 35 Loi du 10 août 1991 sur la profession d'avocat"
  },
  {
    id: 4,
    subject: "Droit Civil (Obligations)",
    front: "Quelles sont les 3 conditions cumulatives pour engager la responsabilité délictuelle d'une personne ?",
    back: "1. Une faute (fait générateur) - 2. Un dommage certain et direct - 3. Un lien de causalité direct entre la faute et le dommage.",
    legalRef: "Articles 1382 et 1383 du Code civil luxembourgeois"
  },
  {
    id: 5,
    subject: "Droit du Travail",
    front: "Quel est le délai pour contester en justice un licenciement avec préavis après notification des motifs ?",
    back: "Délai de forclusion de 3 mois à compter de la notification des motifs ou réclamation écrite dans les 3 mois.",
    legalRef: "Article L. 124-11 du Code du travail luxembourgeois"
  },
  {
    id: 6,
    subject: "Droit Fiscal",
    front: "Quelle est la condition de détention pour bénéficier de l'exonération des dividendes sous le régime mère-fille luxembourgeois ?",
    back: "Détention directe d'au moins 10% du capital (ou prix d'acquisition >= 1,2 million €) pendant au moins 12 mois ininterrompus.",
    legalRef: "Article 166 L.I.R. (Loi concernant l'impôt sur le revenu)"
  }
];

interface CourseSynthesis {
  title: string;
  topic: string;
  legalVisas: string;
  keyPoints: string[];
  caseStudy: string;
  modelSolution: string;
}

const COURSE_SYNTHESES: Record<string, CourseSynthesis> = {
  fiscal: {
    title: "Régime des SOPARFI & Directive Mère-Fille (Art. 166 L.I.R.)",
    topic: "Exonération des dividendes et plus-values intragroupe & conditions de détention au Luxembourg",
    legalVisas: "Article 166 L.I.R. (Loi concernant l'impôt sur le revenu) · Règlement grand-ducal du 21 décembre 2001 · Directive 2011/96/UE modifiée · Règles anti-abus ATAD 1/2",
    keyPoints: [
      "Exonération totale des dividendes perçus si détention directe >= 10% du capital ou prix d'acquisition >= 1 200 000 €.",
      "Condition de durée de détention ininterrompue de 12 mois (régularisation a posteriori admise sous engagement formel).",
      "Filiale résidente ou étrangère pleinement assujettie à un impôt comparable (taux effectif d'au moins 8,5%).",
      "Régime des plus-values sur cession de titres exonérées sous seuil de 10% ou prix d'acquisition >= 6 000 000 €."
    ],
    caseStudy: "Une SOPARFI luxembourgeoise détient depuis 7 mois 15% du capital d'une filiale commerciale en Allemagne. Lors de l'assemblée générale, la filiale distribue 750 000 € de dividendes. L'Administration des Contributions Directes (ACD) peut-elle refuser l'exonération de l'article 166 L.I.R. au motif que les 12 mois de détention ne sont pas encore échus le jour de la mise en paiement ?",
    modelSolution: "Non. En application de la doctrine administrative constante et de la jurisprudence fiscale luxembourgeoise, l'exonération s'applique immédiatement à titre conditionnel dès lors que la société bénéficiaire s'engage formellement à conserver la participation jusqu'au terme de la période minimale de 12 mois ininterrompus. Une cession prématurée entraînerait une imposition rétroactive."
  },
  societes: {
    title: "Pactes d'Actionnaires, Clauses Léonines & Transmissions (Loi 1915)",
    topic: "Validité extra-statutaire, clauses de drag-along / tag-along et articulation avec les statuts de SA",
    legalVisas: "Loi du 10 août 1915 sur les sociétés commerciales modifiée · Article 1855 du Code civil luxembourgeois · Art. 1134 C. civ.",
    keyPoints: [
      "Validité de principe des conventions d'actionnaires conclues en marge des statuts (force obligatoire inter partes).",
      "Inopposabilité à la société sauf stipulation pour autrui ou adhésion formelle reconnue par le conseil d'administration.",
      "Interdiction d'ordre public des clauses léonines (Art. 1855 C. civ.) : nullité des clauses privant un associé de tout dividende ou l'exonérant de toute perte.",
      "Clauses de drag-along (sortie forcée) : pleinement admises sous réserve d'un prix équitable et du respect de la bonne foi."
    ],
    caseStudy: "Un pacte d'actionnaires confidentiel conclu entre deux associés d'une SA luxembourgeoise prévoit qu'en cas de désaccord persistant, le majoritaire (70%) pourra contraindre le minoritaire (30%) à céder ses actions à un tiers. Le minoritaire refuse en invoquant l'absence de clause dans les statuts publiés au RCS.",
    modelSolution: "Le minoritaire ne peut s'opposer à l'exécution du pacte au seul motif de sa non-publication. Le pacte d'actionnaires constitue un contrat valide liant les signataires (Art. 1134 C. civ.). En l'absence de clause léonine ou d'atteinte à l'ordre public sociétaire, le majoritaire peut assigner devant le Tribunal d'arrondissement siégeant en matière commerciale pour faire constater la cession forcée."
  },
  civil: {
    title: "Éléments de Responsabilité Civile (Cours CCDL)",
    topic: "Fait personnel, fait des choses inanimées (1384 al. 1), fait d'autrui, causalité adéquate et Art. 453 CSS",
    legalVisas: "Articles 1382 à 1386, 1146 et s., 544 du Code civil luxembourgeois · Art. 84 de la Constitution · Art. 453 Code de la Sécurité Sociale",
    keyPoints: [
      "Article 84 de la Constitution : compétence exclusive du juge civil pour réparer toute faute publique (rejet radical de l'arrêt Blanco).",
      "Règle d'ordre public de non-cumul : l'action délictuelle (1382) est irrecevable si un contrat valide régit le dommage.",
      "Troubles anormaux de voisinage (544) : responsabilité sans faute du propriétaire sans cause d'exonération de force majeure.",
      "Rejet de l'immunité Costedoat au Luxembourg : le préposé engage sa responsabilité délictuelle propre envers la victime.",
      "Mise en cause obligatoire de la CNS (Art. 453 CSS) : formalité d'ordre public à peine d'irrecevabilité soulevée d'office."
    ],
    caseStudy: "Un piéton est renversé sur un passage clouté par un véhicule de société conduit par un employé. La CNS prend en charge les frais d'hospitalisation de 30 000 €. La victime assigne directement le salarié conducteur et son employeur sans mettre en cause la sécurité sociale.",
    modelSolution: "1° Responsabilité conjointe du conducteur (Art. 1382 / 1384 al. 1) et du commettant (Art. 1384 al. 3, rejet Costedoat). 2° Fin de non-recevoir d'ordre public en raison de l'omission de la mise en cause de la CNS : l'avocat doit régulariser d'urgence une assignation en déclaration de jugement commun sur l'article 453 du Code de la Sécurité Sociale."
  },
  procedure_civile: {
    title: "Voies de Recours & Délais d'Appel (Nouveau Code de Procédure Civile)",
    topic: "Délais de forclusion, significations, effet suspensif et recours extraordinaires",
    legalVisas: "Articles 584 et suivants du NCPC luxembourgeois · Article 167 NCPC (Délais de distance) · Art. 611 NCPC (Pourvoi en cassation)",
    keyPoints: [
      "Délai d'appel de droit commun : 40 jours à compter de la signification à personne ou à domicile.",
      "Prorogation pour délais de distance : 15 jours si la partie demeure en Europe limitrophe, 30 jours pour le reste de l'Europe.",
      "Effet suspensif de plein droit de l'appel sauf si le tribunal de première instance a ordonné l'exécution provisoire.",
      "Le pourvoi en cassation n'a pas d'effet suspensif sauf en matière d'état des personnes ou disposition légale expresse."
    ],
    caseStudy: "Un jugement commercial contradictoire rendu par le Tribunal d'arrondissement de Luxembourg le 5 janvier est signifié le 15 janvier à une société dont le siège est établi à Paris. Le 2 mars, l'avocat dépose une requête d'appel au greffe de la Cour d'appel. L'appel est-il recevable au regard des délais ?",
    modelSolution: "Oui, l'appel est recevable. Le délai de droit commun est de 40 jours à compter de la signification (15 janvier). La partie étant domiciliée en France, elle bénéficie du délai de distance de 15 jours supplémentaires en vertu de l'article 167 du NCPC, portant le délai total à 55 jours. La forclusion n'intervenait que le 11 mars."
  },
  deontologie: {
    title: "Secret Professionnel Absolu de l'Avocat au Barreau de Luxembourg",
    topic: "Nature d'ordre public, perquisitions de cabinet, secret partagé et obligations AML/CFT",
    legalVisas: "Article 458 du Code pénal luxembourgeois · Article 35 de la loi du 10 août 1991 sur la profession d'avocat · Règlement d'Ordre Intérieur (ROI)",
    keyPoints: [
      "Secret professionnel absolu et d'ordre public : sanctionné pénalement (peine d'emprisonnement et amende).",
      "Indisponibilité du secret : le client ne peut pas délier son avocat de son obligation au secret.",
      "Perquisitions au cabinet d'un avocat : présence obligatoire du Bâtonnier ou de son délégué pour garantir la confidentialité des dossiers tiers.",
      "Correspondances entre avocats : confidentielles par nature, ne peuvent être produites en justice (sauf mention explicite 'Officiel')."
    ],
    caseStudy: "Un juge d'instruction luxembourgeois ordonne la saisie de l'ordinateur portable d'un avocat dans le cadre d'une enquête visant l'un de ses clients. L'avocat refuse de communiquer son mot de passe en invoquant l'article 458 du Code pénal. Le juge le menace de poursuites.",
    modelSolution: "L'avocat a l'obligation légale et déontologique de préserver le secret professionnel d'ordre public (Art. 35 Loi 1991 et Art. 458 CP). Une saisie générale de matériel informatique sans tri préalable par le Bâtonnier est nulle car elle violerait le secret des autres clients du cabinet."
  }
};

export const LexIIAAcademy: React.FC<LexIIAAcademyProps> = ({
  userName = "Maître",
  onOpenChatMessage,
  showToast
}) => {
  // Navigation inside LexIIA Academy (8 rubriques institutionnelles)
  const [academyTab, setAcademyTab] = useState<'dashboard' | 'parcours' | 'cours' | 'ai_tutor' | 'library' | 'exams' | 'revisions' | 'stats'>('dashboard');

  // Course Filter state
  const [courseFilter, setCourseFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseModule | null>(null);
  const [interactiveRevisionCourse, setInteractiveRevisionCourse] = useState<CourseModule | null>(null);
  const [courseModalView, setCourseModalView] = useState<'details' | 'ai_synthesis'>('details');
  const [liveAILoading, setLiveAILoading] = useState(false);
  const [liveAIResult, setLiveAIResult] = useState<string | null>(null);

  // Library state
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryTypeFilter, setLibraryTypeFilter] = useState<string>('all');
  const [selectedLibraryDoc, setSelectedLibraryDoc] = useState<LibraryResource | null>(null);

  // Exam QCM state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [qcmScore, setQcmScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Flashcards state (Espace Révisions)
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  // AI Tutor Direct Input state
  const [aiCustomQuery, setAiCustomQuery] = useState('');
  const [activeAIMode, setActiveAIMode] = useState<'all' | 'question' | 'disposition' | 'notion' | 'resume' | 'fiche' | 'examen' | 'cas' | 'sources' | 'comparaison'>('all');

  // Exam Countdown Timer state (Examens blancs)
  const [examTimerSeconds, setExamTimerSeconds] = useState(3 * 3600); // 3 hours
  const [isExamTimerRunning, setIsExamTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isExamTimerRunning && examTimerSeconds > 0) {
      interval = setInterval(() => {
        setExamTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamTimerRunning, examTimerSeconds]);

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 9 Modes Pédagogiques Assistant IA LexIIA
  const AI_TUTOR_PROMPTS = [
    {
      mode: 'question',
      label: "1. Question Juridique",
      icon: "⚖️",
      prompt: "Au Grand-Duché de Luxembourg, quelle est la force obligatoire d'une promesse unilatérale de cession de parts de SARL sans clause de dédit ?"
    },
    {
      mode: 'disposition',
      label: "2. Disposition Légale",
      icon: "📜",
      prompt: "Recherche et explicite le contenu exact de l'article 710-5 de la loi du 10 août 1915 sur les sociétés commerciales et sa portée pratique lors d'une constitution."
    },
    {
      mode: 'notion',
      label: "3. Notion Complexe",
      icon: "💡",
      prompt: "Explique de manière pédagogique la notion de 'revocation ad nutum' d'un administrateur de SA au Luxembourg et ses exceptions jurisprudentielles."
    },
    {
      mode: 'resume',
      label: "4. Résumer un Cours",
      icon: "📑",
      prompt: "Résume les points essentiels du cours de Procédure Civile luxembourgeoise relatifs aux voies de recours extraordinaires (Cassation et Tierce opposition)."
    },
    {
      mode: 'fiche',
      label: "5. Fiche de Révision",
      icon: "🛡️",
      prompt: "Génère une fiche de révision synthétique pour le CCDL sur le Secret Professionnel de l'avocat au Barreau de Luxembourg (Art. 458 CP, Art. 35 Loi 1991, arrêtés et limites)."
    },
    {
      mode: 'examen',
      label: "6. Questions d'Examen",
      icon: "🎯",
      prompt: "Crée 5 questions pièges d'examen blanc CCDL en Droit Fiscal (IRC, ICC et directive mère-fille) avec corrigés détaillés et barème de points."
    },
    {
      mode: 'cas',
      label: "7. Simuler un Cas Pratique",
      icon: "🏛️",
      prompt: "Simule un cas pratique d'examen CCDL en droit commercial : litige entre associés minoritaires d'une SA, abus de majorité et action sociale ut singuli. Fournis énoncé et correction type."
    },
    {
      mode: 'sources',
      label: "8. Sources Juridiques",
      icon: "🔍",
      prompt: "Identifie les sources juridiques et les arrêts de référence récents de la Cour de cassation luxembourgeoise concernant l'imprévision contractuelle et la force majeure."
    },
    {
      mode: 'comparaison',
      label: "9. Comparer Deux Règles",
      icon: "🔄",
      prompt: "Compare précisément le régime juridique et fiscal de la SARL classique et de la Société en Commandite Spéciale (SCSp) au Luxembourg."
    }
  ];

  const handleLaunchAITutorPrompt = (promptText: string) => {
    if (onOpenChatMessage) {
      onOpenChatMessage(promptText);
    } else {
      showToast("Tuteur IA préparé. Rendez-vous dans le chat pour voir la réponse.");
    }
  };

  const generateLiveCourseRevision = async (course: CourseModule) => {
    setLiveAILoading(true);
    setLiveAIResult(null);
    try {
      const prompt = `Tu es LexIIA, l'intelligence artificielle juridique d'élite dédiée aux Cours Complémentaires en Droit Luxembourgeois (CCDL).
Pour le module "${course.title}" (${course.codeRef}) et la leçon "${course.nextLessonTitle}", fournis une consultation approfondie d'examen avec :
1. Cadre normatif et visas de droit luxembourgeois (Mémorial, codes applicables)
2. Notions essentielles pour l'épreuve écrite
3. Cas pratique type CCDL
4. Corrigé d'espèce argumenté et barème officiel`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await res.json();
      if (data && data.text) {
        setLiveAIResult(data.text);
      }
    } catch (e: any) {
      console.warn("Live AI generation fallback:", e);
    } finally {
      setLiveAILoading(false);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setIsAnswerSubmitted(true);
    setAnsweredCount(prev => prev + 1);
    if (selectedAnswerIndex === EXAM_QUESTIONS[currentQuestionIndex].correctIndex) {
      setQcmScore(prev => prev + 1);
      showToast("✓ Excellente réponse ! Point attribué.");
    } else {
      showToast("⚠️ Réponse incorrecte. Consultez la justification juridique.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < EXAM_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      showToast(`🎉 Série terminée ! Score final : ${qcmScore}/${EXAM_QUESTIONS.length}`);
    }
  };

  const handleResetQcm = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setQcmScore(0);
    setAnsweredCount(0);
    showToast("Série de questions réinitialisée.");
  };

  // Filtered courses
  const filteredCourses = CCDL_MODULES.filter(c => {
    if (courseFilter === 'all') return true;
    return c.status === courseFilter;
  });

  // Filtered resources
  const filteredResources = LIBRARY_RESOURCES.filter(r => {
    const matchesSearch = !librarySearch.trim() || 
      r.title.toLowerCase().includes(librarySearch.toLowerCase()) || 
      r.category.toLowerCase().includes(librarySearch.toLowerCase()) ||
      r.reference.toLowerCase().includes(librarySearch.toLowerCase());
    
    const matchesType = libraryTypeFilter === 'all' || r.type === libraryTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 pb-16 text-slate-100">
      {/* ─── Top Brand & Hero Banner ───────────────────────────────────────────── */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#0B111E] via-[#0F172A] to-[#141E33] border border-[#22314E] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E2B857] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Grand-Duché de Luxembourg · Campus Numérique CCDL & Barreau</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
              LexIIA <span className="font-serif italic font-normal text-[#E2B857]">Academy</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium italic">
              « Formez-vous. Révisez. Maîtrisez le droit avec l’IA. »
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              Plateforme académique de référence conçue pour les candidats aux <strong>Cours Complémentaires en Droit Luxembourgeois (CCDL)</strong>, futurs avocats à la Cour et professionnels du droit.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-[#080D18]/90 border border-[#2B3B5E] p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-6 shrink-0 backdrop-blur-md">
            <div className="text-center sm:text-left">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Progression CCDL Globale
              </div>
              <div className="text-3xl font-extrabold text-white mt-0.5 flex items-baseline gap-1">
                <span>68</span>
                <span className="text-sm font-normal text-[#D4AF37]">%</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>8 modules validés sur 11</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

            <div className="text-center sm:text-left">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Prochain Examen Officiel
              </div>
              <div className="text-base font-bold text-white mt-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Épreuves Écrites</span>
              </div>
              <div className="text-[11px] text-amber-300/90 font-mono mt-0.5">
                J - 18 (Session Automne/Hiver)
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Ribbon inside LexIIA Academy */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {[
            { id: 'dashboard', label: 'Accueil', icon: Compass },
            { id: 'parcours', label: 'Mon parcours', icon: Layers },
            { id: 'cours', label: 'Cours', icon: BookOpen },
            { id: 'ai_tutor', label: 'LexIIA AI', icon: BrainCircuit, badge: 'IA Avancée' },
            { id: 'library', label: 'Bibliothèque', icon: FileText },
            { id: 'exams', label: 'Examens', icon: Award, badge: 'Chrono 3h' },
            { id: 'revisions', label: 'Révisions', icon: Bookmark, badge: 'Flashcards' },
            { id: 'stats', label: 'Progression', icon: BarChart3 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = academyTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAcademyTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-lg shadow-[#D4AF37]/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-950 text-[#D4AF37]' : 'bg-[#D4AF37]/20 text-[#E2B857]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB 1 : DASHBOARD ÉTUDIANT ────────────────────────────────────────── */}
      {academyTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Student Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Bonjour {userName}, prêt pour votre prochaine session ?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Aujourd'hui, consolidez vos acquis en <strong>Droit des sociétés commerciales</strong> et testez-vous sur les pactes d'actionnaires.
              </p>
            </div>

            <button
              onClick={() => {
                setInteractiveRevisionCourse(CCDL_MODULES[0]);
                showToast("⚡ Fenêtre de révision interactive LexIIA AI ouverte");
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:opacity-95 text-slate-950 text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0 cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Révisez avec LexIIA AI</span>
            </button>
          </div>

          {/* Key Indicators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Progression CCDL</span>
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-2xl font-bold text-white">68%</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#D4AF37] h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
              </div>
              <div className="text-[11px] text-slate-400">8 modules complétés sur 11</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Moyenne Entraînements</span>
                <Star className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">16.4 <span className="text-sm font-normal text-slate-400">/ 20</span></div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+1.8 pt sur les annales 2025</span>
              </div>
              <div className="text-[11px] text-slate-400">Basé sur 14 épreuves blanches</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Temps d'étude hebdo</span>
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">5h 20m</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '76%' }} />
              </div>
              <div className="text-[11px] text-slate-400">Objectif hebdomadaire : 7h00</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Fiches & Textes mémorisés</span>
                <Bookmark className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">42 fiches</div>
              <div className="text-[11px] text-purple-300 font-medium">Loi 1915, NCPC, Déontologie</div>
              <div className="text-[11px] text-slate-400">Prêts pour révision rapide</div>
            </div>
          </div>

          {/* Bento Row : Next Recommended Lesson + Upcoming Official Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left : Active Course Spotlight */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-[#22314E] flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider">
                    Module prioritaire en cours
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Loi 1915 modifiée</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Droit des Sociétés Commerciales (CCDL)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Prochaine leçon recommandée : <strong>« Les pactes d'actionnaires, clauses léonines et clauses de préemption en droit luxembourgeois »</strong>.
                </p>

                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span>Avancement du module</span>
                    <span className="text-[#D4AF37] font-bold">12 / 16 leçons (75%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 flex-wrap gap-3">
                <div className="text-xs text-slate-400">
                  Temps estimé pour cette leçon : <strong>35 minutes</strong>
                </div>

                <button
                  onClick={() => {
                    setInteractiveRevisionCourse(CCDL_MODULES[0]);
                    showToast("⚡ Fenêtre de révision interactive LexIIA AI ouverte");
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow hover:opacity-95"
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Révisez avec LexIIA AI</span>
                </button>
              </div>
            </div>

            {/* Right : CCDL Exam Official Deadlines */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-[#22314E] flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 uppercase tracking-wider">
                    Calendrier Officiel CCDL
                  </span>
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>

                <h3 className="text-lg font-bold text-white">
                  Échéances des Épreuves CCDL & Barreau
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-300 flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0">
                      <span>22</span>
                      <span className="text-[9px] uppercase">Oct</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Épreuve écrite : Droit des Sociétés</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Durée : 3h00 · Campus Kirchberg / Ministère</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-300 flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0">
                      <span>15</span>
                      <span className="text-[9px] uppercase">Nov</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Épreuve écrite : Procédure Civile & NCPC</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Durée : 3h00 · Cas pratique contentieux</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-300 flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0">
                      <span>04</span>
                      <span className="text-[9px] uppercase">Déc</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Grand Oral : Déontologie du Barreau</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Entretien devant le Conseil de l'Ordre</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setAcademyTab('exams')}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Timer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Lancer un entraînement chronométré</span>
              </button>
            </div>
          </div>

          {/* Quick AI Tutor Cards on Dashboard */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F172A] to-[#162035] border border-[#22314E] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <BrainCircuit className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-white">
                  Assistant LexIIA AI : Révisez et testez-vous en direct
                </h3>
              </div>
              <button
                onClick={() => setAcademyTab('ai_tutor')}
                className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Accéder à l'espace IA complet</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AI_TUTOR_PROMPTS.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleLaunchAITutorPrompt(item.prompt)}
                  className="p-4 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-white flex items-center gap-2 group-hover:text-[#E2B857] transition-colors">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.prompt}
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-semibold text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Poser la question à LexIIA AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2 : MON PARCOURS & COURS (11 GRANDES MATIÈRES CCDL) ─────────── */}
      {(academyTab === 'parcours' || academyTab === 'cours') && (
        <div className="space-y-6">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">Programme Officiel du CCDL</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                11 matières fondamentales régies par le droit luxembourgeois et le Ministère de la Justice.
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-white/10 self-start sm:self-auto overflow-x-auto">
              {[
                { id: 'all', label: 'Toutes' },
                { id: 'in_progress', label: 'En cours (8)' },
                { id: 'completed', label: 'Validées (1)' },
                { id: 'not_started', label: 'À commencer (2)' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setCourseFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    courseFilter === f.id
                      ? 'bg-white text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map(module => (
              <div
                key={module.id}
                className="p-6 rounded-3xl bg-[#0F172A] border border-[#1E293B] hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between group shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Category & Difficulty Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {module.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${module.badgeColor}`}>
                      {module.difficulty}
                    </span>
                  </div>

                  {/* Title & Code Reference */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#E2B857] transition-colors">
                      {module.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {module.codeRef}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {module.description}
                  </p>

                  {/* Key Topics Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {module.keyTopics.map((topic, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Progression</span>
                      <span className="text-white font-bold">{module.progress}% ({module.completedLessons}/{module.totalLessons} leçons)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${module.progress}%`, backgroundColor: module.accentColor }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{module.estimatedHours}h estimées</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setInteractiveRevisionCourse(module);
                        showToast(`⚡ Révision interactive LexIIA AI ouverte pour ${module.title}`);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:opacity-95 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                      title="Ouvrir la fenêtre de révision interactive LexIIA AI"
                    >
                      <BrainCircuit className="w-3.5 h-3.5 text-slate-950" />
                      <span>Révisez avec LexIIA AI</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourse(module);
                        setCourseModalView('details');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>{module.status === 'completed' ? 'Revoir' : 'Continuer'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Detailed Course Drawer */}
          <AnimatePresence>
            {selectedCourse && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="bg-[#0F172A] border border-[#2B3B5E] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left"
                >
                  {/* Modal Header */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                          {selectedCourse.category} · {selectedCourse.jurisdiction}
                        </span>
                        {courseModalView === 'ai_synthesis' && (
                          <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] text-[#E2B857] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            <span>Révision IA Active</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {selectedCourse.title}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {selectedCourse.codeRef}
                      </div>
                    </div>

                    <button
                      onClick={() => { setSelectedCourse(null); setCourseModalView('details'); }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {courseModalView === 'details' ? (
                    /* ─── View 1 : Course Syllabus & Details ─── */
                    <>
                      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                        <p className="leading-relaxed">
                          {selectedCourse.description}
                        </p>

                        <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-2">
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
                            <span>Prochaine leçon recommandée pour l'examen :</span>
                          </div>
                          <div className="text-xs text-slate-200 font-semibold pl-6">
                            {selectedCourse.nextLessonTitle}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Concepts clés & Thématiques de l'épreuve CCDL :
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedCourse.keyTopics.map((topic, i) => (
                              <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            const mod = selectedCourse;
                            setSelectedCourse(null);
                            setInteractiveRevisionCourse(mod);
                            showToast(`⚡ Fenêtre de révision interactive LexIIA AI ouverte pour ${mod.title}`);
                          }}
                          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
                        >
                          <BrainCircuit className="w-4 h-4" />
                          <span>Révisez avec LexIIA AI</span>
                        </button>
                        <button
                          onClick={() => {
                            const prompt = `Je révise actuellement le module CCDL "${selectedCourse.title}" (${selectedCourse.codeRef}). Peux-tu me proposer une synthèse méthodologique approfondie sur "${selectedCourse.nextLessonTitle}", avec les articles de référence et un cas pratique d'examen ?`;
                            setSelectedCourse(null);
                            setCourseModalView('details');
                            setAcademyTab('ai_tutor');
                            setAiCustomQuery(prompt);
                            handleLaunchAITutorPrompt(prompt);
                          }}
                          className="px-4 py-3 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E2B857] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Espace Tuteur IA</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { setSelectedCourse(null); setCourseModalView('details'); }}
                          className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Fermer
                        </button>
                      </div>
                    </>
                  ) : (
                    /* ─── View 2 : Active AI Revision Sheet & CCDL Case Study ─── */
                    <>
                      {(() => {
                        const synth = COURSE_SYNTHESES[selectedCourse.id] || {
                          title: selectedCourse.nextLessonTitle,
                          topic: selectedCourse.description,
                          legalVisas: `${selectedCourse.codeRef} · Jurisprudence de la Cour supérieure de justice · Ministère de la Justice`,
                          keyPoints: selectedCourse.keyTopics.map(t => `Maîtrise fondamentale : ${t} dans le cadre des consultations écrites CCDL.`),
                          caseStudy: `Dans le cadre de votre stage judiciaire, votre maître de stage vous soumet un dossier d'espèce portant sur : "${selectedCourse.nextLessonTitle}". Identifiez les règles légales applicables, les juridictions compétentes au Luxembourg et la stratégie contentieuse recommandée.`,
                          modelSolution: `Conformément à ${selectedCourse.codeRef}, la résolution de ce cas pratique exige de poser la qualification juridique exacte, de citer les dispositions légales pertinentes et d'appliquer la solution conforme à la pratique du Barreau de Luxembourg.`
                        };

                        return (
                          <div className="space-y-4 max-h-[62vh] overflow-y-auto pr-1 custom-scrollbar text-xs sm:text-sm text-slate-300">
                            {/* Legal Visas */}
                            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                              <div className="font-bold text-[#E2B857] flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Cadre Normatif & Textes Luxembourgeois Applicables :</span>
                              </div>
                              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                                {synth.legalVisas}
                              </p>
                            </div>

                            {/* Core Exam Points */}
                            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-2">
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>Points Clés Incontournables pour l'Épreuve CCDL :</span>
                              </div>
                              <ul className="space-y-1.5 pl-2 text-xs">
                                {synth.keyPoints.map((pt, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#D4AF37] font-bold">•</span>
                                    <span className="text-slate-200 leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Case Study */}
                            <div className="p-4 rounded-2xl bg-[#131E36] border border-[#2B3B5E] space-y-2">
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                <span>Cas Pratique d'Entraînement Officiel :</span>
                              </div>
                              <p className="text-xs text-slate-200 leading-relaxed italic bg-black/30 p-3 rounded-xl border border-white/5">
                                « {synth.caseStudy} »
                              </p>
                            </div>

                            {/* Model Answer */}
                            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                              <div className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Solution Méthodologique & Barème du Barreau :</span>
                              </div>
                              <p className="text-xs text-emerald-100/90 leading-relaxed pl-1">
                                {synth.modelSolution}
                              </p>
                            </div>
                            {/* Live AI Result if generated */}
                            {liveAILoading && (
                              <div className="p-5 rounded-2xl bg-[#0B111E] border border-[#D4AF37]/30 flex items-center justify-center gap-3 text-xs text-[#E2B857]">
                                <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                                <span>Génération de la consultation juridique personnalisée avec LexIIA AI...</span>
                              </div>
                            )}

                            {liveAIResult && (
                              <div className="p-5 rounded-2xl bg-[#0B111E] border border-[#D4AF37]/40 space-y-2">
                                <div className="font-bold text-[#E2B857] text-xs flex items-center gap-1.5 pb-2 border-b border-white/10">
                                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>Consultation Complète Générée par LexIIA AI :</span>
                                </div>
                                <div className="prose prose-invert prose-xs text-slate-200 max-h-60 overflow-y-auto custom-scrollbar">
                                  <Markdown>{liveAIResult}</Markdown>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                        <button
                          onClick={() => {
                            const mod = selectedCourse;
                            setSelectedCourse(null);
                            setInteractiveRevisionCourse(mod);
                            showToast("⚡ Fenêtre de révision interactive complète ouverte");
                          }}
                          className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-transform"
                        >
                          <BrainCircuit className="w-3.5 h-3.5" />
                          <span>Révision Interactive Complète</span>
                        </button>

                        <button
                          onClick={() => {
                            if (selectedCourse) generateLiveCourseRevision(selectedCourse);
                          }}
                          disabled={liveAILoading}
                          className="py-2.5 px-3.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-[#E2B857] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          {liveAILoading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          )}
                          <span>Générer consultation live</span>
                        </button>

                        <button
                          onClick={() => {
                            const prompt = `Concernant le module CCDL "${selectedCourse.title}" (${selectedCourse.codeRef}) et la leçon "${selectedCourse.nextLessonTitle}", peux-tu m'expliquer en détail la démarche à suivre pour rédiger la consultation d'examen et les pièges récurrents du jury ?`;
                            setSelectedCourse(null);
                            setCourseModalView('details');
                            setAcademyTab('ai_tutor');
                            setAiCustomQuery(prompt);
                            handleLaunchAITutorPrompt(prompt);
                          }}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
                        >
                          <BrainCircuit className="w-4 h-4" />
                          <span>Espace Tuteur IA</span>
                        </button>

                        <button
                          onClick={() => {
                            const synth = COURSE_SYNTHESES[selectedCourse.id];
                            const text = `FICHE DE RÉVISION CCDL - ${selectedCourse.title}\n\nCadre légal :\n${synth?.legalVisas || selectedCourse.codeRef}\n\nPoints clés :\n${synth?.keyPoints.join('\n') || ''}\n\nCas pratique :\n${synth?.caseStudy || ''}\n\nCorrigé :\n${synth?.modelSolution || ''}${liveAIResult ? `\n\nConsultation IA :\n${liveAIResult}` : ''}`;
                            navigator.clipboard?.writeText(text);
                            showToast("✓ Fiche de révision copiée dans le presse-papier !");
                          }}
                          className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Copier</span>
                        </button>

                        <button
                          onClick={() => setCourseModalView('details')}
                          className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>← Retour</span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ─── TAB 3 : LEXIIA AI — TUTEUR JURIDIQUE CCDL ─────────────────────────── */}
      {academyTab === 'ai_tutor' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[#2B3B5E] space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E2B857]">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Tuteur Juridique Intelligent Dédié CCDL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              LexIIA AI · Compagnon d'Examen et de Révision
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Posez n'importe quelle question de droit luxembourgeois, demandez la synthèse d'une loi complexe, simulez un cas pratique d'examen ou vérifiez les visas de jurisprudence de la Cour de cassation et de la CJUE.
            </p>
          </div>

          {/* Interactive Question Input Console */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-[#2B3B5E] space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#D4AF37]" />
                <span>Poser une question juridique à l'IA LexIIA</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                Spécialement entraîné sur la législation grand-ducale et les épreuves CCDL
              </span>
            </div>

            {/* Mode selection buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'Toutes les requêtes' },
                { id: 'question', label: 'Question juridique' },
                { id: 'disposition', label: 'Recherche de texte' },
                { id: 'notion', label: 'Notion complexe' },
                { id: 'resume', label: 'Résumé de cours' },
                { id: 'fiche', label: 'Fiche de révision' },
                { id: 'examen', label: 'Questions d\'examen' },
                { id: 'cas', label: 'Cas pratique' },
                { id: 'sources', label: 'Sources & arrêts' },
                { id: 'comparaison', label: 'Comparaison de règles' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveAIMode(m.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 cursor-pointer transition-colors ${
                    activeAIMode === m.id
                      ? 'bg-[#D4AF37] text-slate-950 font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiCustomQuery}
                onChange={(e) => setAiCustomQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && aiCustomQuery.trim()) {
                    handleLaunchAITutorPrompt(aiCustomQuery.trim());
                    setAiCustomQuery('');
                  }
                }}
                placeholder="Ex : Quelle est la procédure de révocation d'un gérant de SARL au Luxembourg ? Ou demande un cas pratique..."
                className="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={() => {
                  if (aiCustomQuery.trim()) {
                    handleLaunchAITutorPrompt(aiCustomQuery.trim());
                    setAiCustomQuery('');
                  } else {
                    showToast("Veuillez saisir votre question juridique.");
                  }
                }}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-transform shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Consulter LexIIA AI</span>
              </button>
            </div>
          </div>

          {/* Quick Prompts Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>9 Modes Pédagogiques CCDL Recommandés (1 Clic)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AI_TUTOR_PROMPTS.filter(item => activeAIMode === 'all' || item.mode === activeAIMode).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleLaunchAITutorPrompt(item.prompt)}
                  className="p-5 rounded-2xl bg-[#0F172A] hover:bg-[#141E33] border border-white/5 hover:border-[#D4AF37]/50 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-[#E2B857] transition-colors">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {item.prompt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                    <span>Lancer la simulation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pedagogical Capabilities Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                §
              </div>
              <h4 className="text-sm font-bold text-white">Visas & Textes de Lois</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Toutes les réponses citent précisément les articles de la loi de 1915, du Code civil ou du NCPC pour préparer les épreuves écrites.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                ⚖
              </div>
              <h4 className="text-sm font-bold text-white">Cas Pratiques Conformes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Méthodologie exacte du Barreau de Luxembourg : Faits, Problème de droit, Droit applicable, Application d'espèce et Conclusion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
                🏛
              </div>
              <h4 className="text-sm font-bold text-white">Ancrage Juridictionnel</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Références explicites aux arrêts de la Cour supérieure de justice, de la Cour de cassation et de la CJUE au Kirchberg.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4 : BIBLIOTHÈQUE JURIDIQUE CCDL ──────────────────────────────── */}
      {academyTab === 'library' && (
        <div className="space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">Bibliothèque Juridique CCDL</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Codes officiels luxembourgeois, annales corrigées, recueils de jurisprudence et fiches pratiques.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Rechercher un code, arrêt, loi..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Toutes les ressources' },
              { id: 'code', label: 'Codes & Lois' },
              { id: 'annale', label: 'Annales & Corrigés' },
              { id: 'jurisprudence', label: 'Jurisprudence' },
              { id: 'fiche', label: 'Fiches de révision' },
              { id: 'doctrine', label: 'Doctrine & Mémentos' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setLibraryTypeFilter(type.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  libraryTypeFilter === type.id
                    ? 'bg-[#D4AF37] text-slate-950 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map(res => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E293B] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#D4AF37] uppercase tracking-wider">
                      {res.category}
                    </span>
                    <span className="text-slate-500 font-mono">{res.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {res.title}
                  </h3>

                  <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                    <span>{res.reference}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {res.highlightText}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {res.downloadsCount} consultations étudiantes
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const prompt = `Consulte la ressource juridique CCDL "${res.title}" (${res.reference}). Peux-tu me faire une synthèse pédagogique des points indispensables à retenir pour les examens du CCDL au Luxembourg ?`;
                        handleLaunchAITutorPrompt(prompt);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <BrainCircuit className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Analyser avec l'IA</span>
                    </button>
                    <button
                      onClick={() => showToast(`✓ Fichier "${res.title.slice(0, 30)}..." prêt au téléchargement.`)}
                      className="p-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] transition-colors cursor-pointer"
                      title="Télécharger le PDF de révision"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 5 : EXAMENS & QCM CCDL ────────────────────────────────────────── */}
      {academyTab === 'exams' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-[#22314E]">
            <div>
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                Entraînement officiel aux examens
              </div>
              <h2 className="text-2xl font-bold text-white">
                Simulateur d'Examens Blancs & QCM CCDL
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Chronomètre d'épreuve, corrections immédiates avec références aux lois luxembourgeoises et barème officiel.
              </p>
            </div>

            {/* Exam Countdown Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/30 flex items-center gap-4 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Chronomètre Épreuve</div>
                <div className="text-2xl font-mono font-extrabold text-[#E2B857]">
                  {formatTimer(examTimerSeconds)}
                </div>
              </div>
              <button
                onClick={() => setIsExamTimerRunning(!isExamTimerRunning)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isExamTimerRunning ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {isExamTimerRunning ? 'Pause' : 'Démarrer'}
              </button>
            </div>
          </div>

          {/* Interactive QCM Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-[#2B3B5E] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  Question {currentQuestionIndex + 1} sur {EXAM_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Matière : {EXAM_QUESTIONS[currentQuestionIndex].category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-300">Score actuel : <strong className="text-[#D4AF37] font-bold">{qcmScore} / {answeredCount}</strong></span>
                <button
                  onClick={handleResetQcm}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Réinitialiser le QCM"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {EXAM_QUESTIONS[currentQuestionIndex].question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {EXAM_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === EXAM_QUESTIONS[currentQuestionIndex].correctIndex;
                let optionStyle = 'bg-slate-900 border-white/10 text-slate-200 hover:border-[#D4AF37]/50';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-200';
                  } else {
                    optionStyle = 'bg-slate-950/40 border-white/5 text-slate-500';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold shadow-md';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs sm:text-sm ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Correction Explanation Banner */}
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2 text-xs text-slate-300"
              >
                <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Justification Juridique & Textes Applicables :</span>
                </div>
                <p className="leading-relaxed">
                  {EXAM_QUESTIONS[currentQuestionIndex].explanation}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 font-mono">
                  Référence : <strong>{EXAM_QUESTIONS[currentQuestionIndex].legalReference}</strong>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswerIndex === null}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E2B857] disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Valider ma réponse
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentQuestionIndex < EXAM_QUESTIONS.length - 1 ? 'Question suivante' : 'Terminer la série'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  const prompt = `Concernant la question d'examen CCDL suivante : "${EXAM_QUESTIONS[currentQuestionIndex].question}", peux-tu m'expliquer en détail les pièges fréquents des candidats et comment analyser cette règle lors de l'épreuve écrite ?`;
                  handleLaunchAITutorPrompt(prompt);
                }}
                className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Approfondir avec LexIIA AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 6 : RÉVISIONS & FLASHCARDS CCDL ──────────────────────────────── */}
      {academyTab === 'revisions' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-[#22314E]">
            <div>
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                Mémorisation Active & Répétition Espacée
              </div>
              <h2 className="text-2xl font-bold text-white">
                Flashcards des Textes & Règles Clés du Droit Luxembourgeois
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Maîtrisez les délais de forclusion, les seuils de capital et les principes fondamentaux du Barreau.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/30 flex items-center gap-4 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Cartes Maîtrisées</div>
                <div className="text-2xl font-mono font-extrabold text-[#E2B857]">
                  {masteredCards.length} <span className="text-sm font-normal text-slate-400">/ {FLASHCARDS_DATA.length}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Bookmark className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Interactive Flashcard Container */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span className="font-semibold text-[#D4AF37]">
                {FLASHCARDS_DATA[currentFlashcardIdx].subject}
              </span>
              <span>
                Carte {currentFlashcardIdx + 1} sur {FLASHCARDS_DATA.length}
              </span>
            </div>

            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="relative min-h-[260px] p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#17233D] border-2 border-[#2B3B5E] hover:border-[#D4AF37]/60 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 group select-none"
            >
              <div className="flex justify-between items-start text-xs text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isCardFlipped ? "Réponse & Règle juridique" : "Question / Cas pratique d'espèce"}
                </span>
                <span className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:underline">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isCardFlipped ? "Voir la question" : "Retourner la carte"}</span>
                </span>
              </div>

              <div className="my-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {isCardFlipped ? FLASHCARDS_DATA[currentFlashcardIdx].back : FLASHCARDS_DATA[currentFlashcardIdx].front}
                </h3>
                {isCardFlipped && (
                  <div className="mt-4 inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E2B857]">
                    {FLASHCARDS_DATA[currentFlashcardIdx].legalRef}
                  </div>
                )}
              </div>

              <div className="text-center text-[11px] text-slate-500 italic">
                Cliquez pour retourner
              </div>
            </div>

            {/* Flashcard action buttons */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={() => {
                  const cardId = FLASHCARDS_DATA[currentFlashcardIdx].id;
                  setMasteredCards(prev => prev.filter(id => id !== cardId));
                  setIsCardFlipped(false);
                  if (currentFlashcardIdx < FLASHCARDS_DATA.length - 1) {
                    setCurrentFlashcardIdx(prev => prev + 1);
                  }
                  showToast("Carte marquée à réviser.");
                }}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>À revoir</span>
              </button>

              <button
                onClick={() => {
                  const cardId = FLASHCARDS_DATA[currentFlashcardIdx].id;
                  if (!masteredCards.includes(cardId)) {
                    setMasteredCards(prev => [...prev, cardId]);
                  }
                  setIsCardFlipped(false);
                  if (currentFlashcardIdx < FLASHCARDS_DATA.length - 1) {
                    setCurrentFlashcardIdx(prev => prev + 1);
                  }
                  showToast("✓ Carte maîtrisée ! Enregistré dans votre progression.");
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Maîtrisé</span>
              </button>

              <button
                onClick={() => {
                  setIsCardFlipped(false);
                  setCurrentFlashcardIdx(prev => (prev < FLASHCARDS_DATA.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Sessions de Révision Interactive LexIIA AI par Matière */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-[#D4AF37]" />
                    <span>Sessions de Révision Interactive LexIIA AI par Matière</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ouvrez la fenêtre de révision dédiée pour chaque matière : leçons interactives, tuteur IA en direct, quiz d'auto-évaluation et cas pratiques guidés.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {CCDL_MODULES.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setInteractiveRevisionCourse(m);
                      showToast(`⚡ Révision interactive LexIIA AI ouverte pour ${m.title}`);
                    }}
                    className="p-4 rounded-2xl bg-[#0F172A] hover:bg-[#131E36] border border-white/10 hover:border-[#D4AF37]/50 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-[#D4AF37] uppercase">{m.category}</span>
                        <span className="font-mono text-emerald-400">{m.progress}%</span>
                      </div>
                      <h4 className="font-bold text-xs text-white group-hover:text-[#E2B857] transition-colors line-clamp-1">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                        {m.codeRef}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                      <span className="text-slate-400">{m.difficulty}</span>
                      <span className="font-bold text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Révisez avec LexIIA AI</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 7 : PROGRESSION & BILAN ───────────────────────────────────────── */}
      {academyTab === 'stats' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-[#22314E] space-y-3">
            <h2 className="text-2xl font-bold text-white">Tableau de Maîtrise & Statistiques CCDL</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Suivi détaillé de vos compétences juridiques par matière, évaluation de vos chances de réussite et axes prioritaires d'entraînement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Mastery Radar List */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/5 space-y-4">
              <h3 className="text-base font-bold text-white">Niveau de Maîtrise par Matière</h3>

              <div className="space-y-4 pt-2">
                {[
                  { subject: 'Droit commercial & Faillites', score: 100, color: '#10B981' },
                  { subject: 'Droit civil & Obligations', score: 88, color: '#3B82F6' },
                  { subject: 'Déontologie du Barreau', score: 85, color: '#D4AF37' },
                  { subject: 'Droit des sociétés commerciales', score: 75, color: '#D4AF37' },
                  { subject: 'Procédure civile (NCPC)', score: 60, color: '#10B981' },
                  { subject: 'Droit du travail', score: 50, color: '#14B8A6' },
                  { subject: 'Droit fiscal luxembourgeois', score: 45, color: '#A855F7' },
                  { subject: 'Droit pénal des affaires', score: 30, color: '#F43F5E' },
                  { subject: 'Droit de l\'Union européenne', score: 15, color: '#0EA5E9' },
                  { subject: 'Droit administratif', score: 0, color: '#64748B' },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{s.subject}</span>
                      <span className="text-white font-bold">{s.score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700" 
                        style={{ width: `${s.score}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations for CCDL Success */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Recommandations Personnalisées LexIIA</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                    <div className="font-bold text-amber-300">Point clé à prioriser : Droit Fiscal (IRC/ICC)</div>
                    <p className="text-slate-300 leading-relaxed">
                      Votre taux de maîtrise est de 45%. Les règles d'imposition des SOPARFI et de déductibilité des intérêts (ATAD) reviennent chaque année aux épreuves écrites.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1">
                    <div className="font-bold text-blue-300">Excellente solidité : Droit Commercial & Faillites</div>
                    <p className="text-slate-300 leading-relaxed">
                      Module validé à 100%. Maintenez votre niveau avec un cas pratique blanc de 45 minutes chaque quinzaine.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                    <div className="font-bold text-emerald-300">Épreuve de Déontologie : Prêt pour le Grand Oral</div>
                    <p className="text-slate-300 leading-relaxed">
                      Vos réponses sur le secret professionnel absolu et les conflits d'intérêts respectent rigoureusement la jurisprudence du Barreau.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const prompt = "Analyse mon niveau actuel aux épreuves du CCDL au Luxembourg. Génère un plan de révision hebdomadaire intensif sur 4 semaines pour combler mes lacunes en droit fiscal, procédure civile et droit pénal des affaires.";
                  handleLaunchAITutorPrompt(prompt);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Générer mon planning de révision sur-mesure</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FENÊTRE DE RÉVISION INTERACTIVE LEXIIA AI (CAMPUS CCDL) ─────────── */}
      <AnimatePresence>
        {interactiveRevisionCourse && (
          <InteractiveCourseRevisionModal
            course={interactiveRevisionCourse}
            allCourses={CCDL_MODULES}
            onSelectCourse={setInteractiveRevisionCourse}
            onClose={() => setInteractiveRevisionCourse(null)}
            onOpenChatMessage={onOpenChatMessage}
            showToast={showToast}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
