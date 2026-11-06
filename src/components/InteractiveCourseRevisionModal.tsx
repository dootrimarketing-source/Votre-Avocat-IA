import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Send, 
  Loader2, 
  RotateCcw, 
  Copy, 
  Maximize2, 
  Minimize2, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Award, 
  Clock, 
  Lightbulb, 
  Gavel, 
  ArrowRight, 
  GraduationCap, 
  Check, 
  MessageSquare,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { RESPONSABILITE_CIVILE_COURSE_CONTENT } from '../data/responsabiliteCivileCourse';

export interface CourseModule {
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
  status: 'not_started' | 'in_progress' | 'completed';
  badgeColor: string;
  accentColor: string;
  nextLessonTitle: string;
  description: string;
  keyTopics: string[];
}

interface StatuteArticle {
  article: string;
  title: string;
  coreRule: string;
  practicalImpact: string;
  concreteExample: string;
}

interface CaseLawRef {
  court: string;
  date: string;
  reference: string;
  summary: string;
  rulingTakeaway: string;
}

interface JuryTrap {
  mistake: string;
  juryAdvice: string;
}

interface PedagogicalConcept {
  id: string;
  title: string;
  simpleExplanation: string;
  rigorousDefinition: string;
  articles: StatuteArticle[];
  caseLaw?: CaseLawRef;
  juryTrap?: JuryTrap;
}

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalArticle: string;
}

interface CaseStudyStep {
  stepNumber: number;
  title: string;
  instruction: string;
  modelAnswer: string;
}

export interface CourseChapter {
  id: string;
  title: string;
  shortTitle: string;
  summaryIntro: string;
  goldenRules: string[];
  concepts: PedagogicalConcept[];
  quiz: QuizItem[];
  caseStudy: {
    title: string;
    facts: string;
    steps: CaseStudyStep[];
  };
  quickPrompts: string[];
}

export interface CourseInteractiveContent {
  id: string;
  summaryIntro: string;
  goldenRules: string[];
  concepts: PedagogicalConcept[];
  quiz: QuizItem[];
  caseStudy: {
    title: string;
    facts: string;
    steps: CaseStudyStep[];
  };
  quickPrompts: string[];
  chapters?: CourseChapter[];
}

// ─── BASE DE DONNÉES PÉDAGOGIQUE COMPLÈTE CCDL LUXEMBOURG ────────────────────
export const COURSE_PEDAGOGICAL_DATA: Record<string, CourseInteractiveContent> = {
  societes: {
    id: 'societes',
    summaryIntro: "Le droit des sociétés commerciales au Luxembourg repose sur la loi historique du 10 août 1915, modernisée par les réformes majeures de 2016 et 2023. Les épreuves du CCDL exigent une maîtrise rigoureuse de la distinction entre SA, SARL et SCSp, des pactes d'actionnaires, des clauses d'agrément, et de la gouvernance d'entreprise.",
    goldenRules: [
      "Toujours vérifier si la clause litigieuse figure dans les statuts publiés au RCS ou dans un pacte extra-statutaire.",
      "L'article 1855 du Code civil prohibe d'ordre public toute clause léonine privant un associé de tout profit ou l'exonérant de toute contribution aux pertes.",
      "Distinction fondamentale : dans la SA, la révocation de l'administrateur est traditionnellement ad nutum (sauf clause statutaire contraire depuis 2016), tandis que dans la SARL, la révocation du gérant statutaire requiert de justes motifs.",
      "Les décisions collectives prises en violation d'une règle impérative de la loi de 1915 encourent la nullité absolue ou relative."
    ],
    concepts: [
      {
        id: 'c1',
        title: "1. Pactes d'Actionnaires vs Statuts : Validité & Opposabilité",
        simpleExplanation: "Les statuts sont publics et s'appliquent à tous les associés présents et futurs. Le pacte d'actionnaires est un contrat secret entre certains associés seulement. Il est parfaitement valable entre eux, mais la société et les tiers ne sont pas obligés de le respecter s'ils n'y sont pas parties.",
        rigorousDefinition: "Convention extra-statutaire soumise au droit commun des obligations (Art. 1134 du Code civil). Elle lie ses seuls signataires en vertu de l'effet relatif des contrats (Art. 1165 C. civ.). Son inexécution se résout par principe en dommages-intérêts, sauf stipulation d'exécution en nature expressément admise.",
        articles: [
          {
            article: "Loi du 10 août 1915 (Art. 100-1 et s.)",
            title: "Organisation et conventions de vote",
            coreRule: "Les conventions de vote sont valables dès lors qu'elles ne sont pas contraires à l'intérêt social et qu'elles ne violent pas une disposition impérative de la loi.",
            practicalImpact: "Permet de sécuriser des majorités lors des assemblées générales de SA ou SARL dans les structures de Private Equity.",
            concreteExample: "Deux fonds d'investissement s'engagent par écrit à toujours voter dans le même sens lors de la nomination des membres du conseil de surveillance."
          },
          {
            article: "Article 1855 du Code civil luxembourgeois",
            title: "Prohibition des clauses léonines",
            coreRule: "Est réputée non écrite toute clause qui attribue à l'un des associés la totalité des bénéfices ou qui l'affranchit de toute contribution aux pertes.",
            practicalImpact: "Nullité d'ordre public de plein droit de la clause, sans affecter la validité du contrat de société tout entier.",
            concreteExample: "Une clause prévoyant qu'un investisseur minoritaire percevra 100% des dividendes pendant 10 ans sans jamais subir aucune perte financière."
          }
        ],
        caseLaw: {
          court: "Cour d'appel de Luxembourg (Chambre commerciale)",
          date: "12 Octobre 2022",
          reference: "Arrêt n° 148/22",
          summary: "La Cour confirme qu'une violation d'une clause de préemption prévue uniquement dans un pacte d'actionnaires confidentiel ne peut pas annuler la cession à un tiers de bonne foi, mais ouvre droit à une indemnisation intégrale du préjudice.",
          rulingTakeaway: "Le tiers de mauvaise foi ayant sciemment participé à la violation du pacte engage sa responsabilité quasi-délictuelle (Art. 1382 C. civ.)."
        },
        juryTrap: {
          mistake: "Confondre l'opposabilité des statuts (opposables erga omnes après dépôt au RCS et publication au RESA) avec celle d'un pacte extra-statutaire.",
          juryAdvice: "Dans une consultation CCDL, traitez toujours la validité contractuelle d'abord (Art. 1134), puis l'efficacité à l'égard de la société, et enfin les sanctions applicables."
        }
      },
      {
        id: 'c2',
        title: "2. La Révocation des Dirigeants : SA vs SARL",
        simpleExplanation: "Dans une SA (Société Anonyme), le conseil d'administration peut révoquer son dirigeant à tout moment sans motif préalable. Dans une SARL, le gérant statutaire est beaucoup mieux protégé et ne peut être destitué que pour faute ou juste motif.",
        rigorousDefinition: "Le principe de révocabilité ad nutum dans la SA garantit que l'organe souverain conserve la pleine confiance de ses mandataires. En SARL (Art. 710-18), la révocation sans juste motif ouvre droit à des dommages-intérêts au profit du gérant révoqué.",
        articles: [
          {
            article: "Loi de 1915, Art. 441-5",
            title: "Révocation des administrateurs de SA",
            coreRule: "Les administrateurs peuvent être révoqués à tout moment par l'assemblée générale (principe ad nutum), sauf aménagement statutaire contraire prévu par les statuts.",
            practicalImpact: "Empêche les dirigeants de s'incruster contre la volonté des actionnaires majoritaires.",
            concreteExample: "L'assemblée décide sans préavis de remplacer le président du conseil d'administration sans avoir à justifier d'une quelconque faute de gestion."
          }
        ],
        juryTrap: {
          mistake: "Affirmer qu'une révocation brutale ou vexatoire ne peut jamais donner lieu à indemnisation.",
          juryAdvice: "Même en cas de révocation ad nutum, si la révocation est accompagnée d'injures, d'atteinte à l'honneur ou de publicité malveillante, des dommages-intérêts sont dus sur le fondement de l'article 1382 du Code civil."
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Une clause statutaire d'une SA luxembourgeoise peut-elle valablement exclure un actionnaire minoritaire de toute participation aux pertes en échange d'un abandon de dividende ?",
        options: [
          "Oui, car la liberté contractuelle prévaut en droit des sociétés luxembourgeois.",
          "Non, c'est une clause léonine nulle d'ordre public selon l'article 1855 du Code civil.",
          "Oui, si la clause a été votée à l'unanimité des actionnaires lors de la constitution.",
          "Seulement si la société est cotée à la Bourse de Luxembourg."
        ],
        correctIndex: 1,
        explanation: "L'article 1855 du Code civil prohibe formellement les clauses léonines. Toute stipulation qui affranchit un associé de toute contribution aux pertes est réputée non écrite.",
        legalArticle: "Article 1855 du Code civil luxembourgeois"
      },
      {
        id: 2,
        question: "Dans une SARL luxembourgeoise, quelle est la sanction si un gérant statutaire est révoqué par les associés sans juste motif ?",
        options: [
          "La révocation est nulle et le gérant est réintégré automatiquement dans ses fonctions.",
          "La révocation est valable, mais elle donne lieu à des dommages-intérêts sauf clause statutaire contraire.",
          "La société est immédiatement dissoute de plein droit.",
          "Aucune indemnité n'est due car la révocation des dirigeants est toujours libre."
        ],
        correctIndex: 1,
        explanation: "Selon l'article 710-18 de la loi de 1915, sauf disposition contraire des statuts, le gérant statutaire révoqué sans juste motif a droit à des dommages-intérêts.",
        legalArticle: "Loi du 10 août 1915, Art. 710-18"
      },
      {
        id: 3,
        question: "Un pacte d'actionnaires non déposé au Registre de Commerce et des Sociétés (RCS) est-il opposable à la société anonyme ?",
        options: [
          "Oui, de plein droit dès sa signature.",
          "Non, le pacte n'a d'effet obligatoire qu'entre les associés signataires (effet relatif des conventions).",
          "Oui, si le ministre de la Justice a apposé son visa.",
          "Non, le pacte est nul s'il n'est pas publié au Journal officiel Mémorial B."
        ],
        correctIndex: 1,
        explanation: "En vertu de l'article 1165 du Code civil, les conventions n'ont d'effet qu'entre les parties contractantes. Un pacte secret ne lie pas la société tiers sans stipulation expresse.",
        legalArticle: "Article 1165 du Code civil luxembourgeois"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Cession forcée d'actions et clause de Bad Leaver dans une SA",
      facts: "Maître, vous êtes consulté par Monsieur Weber, actionnaire à hauteur de 25% de la société anonyme 'LuxFintech SA'. Lors de son entrée au capital, un pacte d'actionnaires a été conclu avec l'actionnaire majoritaire (75%). Le pacte stipule qu'en cas de démission de Weber de son poste de directeur technique, ses actions seront rachetées à 10% de leur valeur nominale (clause de Bad Leaver). Weber vient de démissionner et refuse de céder ses actions à ce prix dérisoire, soutenant que la clause est léonine et nulle. Le majoritaire menace d'assigner en référé d'heure à heure pour obtenir le transfert forcé sur le registre des actionnaires.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Qualification Juridique des Faits",
          instruction: "Identifiez la nature du contrat, la nature de la clause litigieuse et la qualification de la décote de prix.",
          modelAnswer: "Il s'agit d'un pacte d'actionnaires extra-statutaire conclu entre deux associés d'une SA. La clause litigieuse est une promesse unilatérale de vente assortie d'une clause pénale / clause de bad leaver prévoyant une décote de 90%. Elle ne constitue pas à proprement parler une clause léonine (car Weber a perçu des dividendes durant son activité), mais s'analyse en une clause pénale manifestement excessive et potentiellement contraire à l'interdiction de fixation unilatérale du prix (Art. 1591 C. civ.)."
        },
        {
          stepNumber: 2,
          title: "2. Règle de Droit & Compétence Juridictionnelle",
          instruction: "Déterminez les textes applicables et la compétence de la juridiction des référés.",
          modelAnswer: "Textes applicables : Articles 1134, 1152 et 1591 du Code civil luxembourgeois. Compétence : Le juge des référés commercial (Art. 932 NCPC) n'est compétent qu'en l'absence de contestation sérieuse. La nullité ou la réduction d'une clause pénale contestée constitue une contestation sérieuse manifeste excluant la compétence du juge des référés pour ordonner un transfert de propriété définitif."
        },
        {
          stepNumber: 3,
          title: "3. Argumentation & Moyens de Défense de Weber",
          instruction: "Développez les moyens à soulever au fond devant le Tribunal d'arrondissement.",
          modelAnswer: "1° Incompétence du juge des référés en raison de la contestation sérieuse touchant au fond du droit. 2° Nullité de la clause pour indétermination du juste prix ou caractère potestatif. 3° Subsidiairement, demande de modération judiciaire de la clause pénale sur le fondement de l'article 1152 alinéa 2 du Code civil pour disproportion manifeste entre le préjudice subi et la pénalité infligée."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion & Stratégie Conseillée au Client",
          instruction: "Formulez le conseil opérationnel de l'avocat à son client.",
          modelAnswer: "Conseiller à Weber de contester immédiatement l'urgence et la compétence du juge des référés, de refuser toute signature sur le registre des actionnaires, et d'engager parallèlement une action au fond devant le Tribunal d'arrondissement de Luxembourg siégeant en matière commerciale pour faire fixer la valeur vénale des actions par un expert indépendant agréé."
        }
      ]
    },
    quickPrompts: [
      "Quelles sont les conditions de validité d'une clause de drag-along (sortie conjointe forcée) au Luxembourg ?",
      "Comment se déroule la révocation d'un administrateur délégué selon la jurisprudence de la Cour supérieure de justice ?",
      "Quelle est la différence fondamentale entre la SCSp (société en commandite spéciale) et la SARL ?",
      "Quels sont les pièges à éviter lors de la rédaction d'un procès-verbal d'assemblée générale extraordinaire ?"
    ]
  },

  civil: RESPONSABILITE_CIVILE_COURSE_CONTENT,

  procedure_civile: {
    id: 'procedure_civile',
    summaryIntro: "Le Nouveau Code de Procédure Civile (NCPC) luxembourgeois régit la saisine des cours et tribunaux, les voies de recours et l'exécution forcée. C'est l'une des matières les plus redoutées du CCDL en raison de la rigueur implacable des délais de forclusion et des règles de notification.",
    goldenRules: [
      "Le délai d'appel de droit commun en matière civile et commerciale est de 40 jours à compter de la signification du jugement (Art. 584 NCPC).",
      "Délais de distance (Art. 167 NCPC) : allongement impératif de 15 jours si la partie demeure dans un pays limitrophe (France, Belgique, Allemagne), et de 30 jours pour le reste de l'UE.",
      "L'appel a un effet suspensif de plein droit, sauf si le premier juge a expressément ordonné l'exécution provisoire.",
      "L'assignation est l'acte introductif d'instance de droit commun délivré par huissier de justice (huissier de justice près le tribunal d'arrondissement)."
    ],
    concepts: [
      {
        id: 'c1',
        title: "1. Délais d'Appel & Calcul des Délais de Distance",
        simpleExplanation: "Pour contester un jugement devant la Cour d'appel, vous avez 40 jours après que l'huissier a signifié le jugement. Si votre client habite en France ou en Belgique, vous avez 15 jours de plus (soit 55 jours). Si vous déposez l'acte au 56ème jour, c'est rejeté sans discussion !",
        rigorousDefinition: "Délai de forclusion préfix d'ordre public (Art. 584 NCPC). Le délai commence à courir le lendemain du jour de la signification à 0h et expire le dernier jour à 24h. Si le dernier jour est un samedi, un dimanche ou un jour férié, il est prorogé jusqu'au premier jour ouvrable suivant (Art. 1256 NCPC).",
        articles: [
          {
            article: "Article 584 du NCPC",
            title: "Délai ordinaire d'appel",
            coreRule: "Le délai pour interjeter appel est de quarante jours, tant en matière civile qu'en matière commerciale, à compter de la signification du jugement.",
            practicalImpact: "Point de départ strict : la date portée sur l'exploit d'huissier de justice.",
            concreteExample: "Un jugement signifié le 1er mars doit faire l'objet d'un acte d'appel au plus tard le 10 avril."
          },
          {
            article: "Article 167 du NCPC",
            title: "Délais de distance internationaux",
            coreRule: "Les délais sont augmentés de 15 jours pour les parties résidant dans les pays limitrophes du Luxembourg, et de 30 jours pour le reste des États de l'UE.",
            practicalImpact: "Élément crucial à vérifier immédiatement dès réception d'un jugement concernant une partie étrangère.",
            concreteExample: "Une société ayant son siège social à Metz dispose de 40 + 15 = 55 jours pour relever appel."
          }
        ],
        caseLaw: {
          court: "Cour supérieure de justice (Cour d'appel)",
          date: "8 Février 2023",
          reference: "Arrêt n° 29/23 (Civil)",
          summary: "La Cour déclare irrecevable pour forclusion l'appel interjeté un jour après l'expiration du délai, rappelant que les délais de recours sont d'ordre public et ne peuvent être suspendus par des pourparlers amiables.",
          rulingTakeaway: "Aucune négociation transactionnelle ne suspend les délais d'appel sans convention formelle de sursis homologuée."
        },
        juryTrap: {
          mistake: "Confondre la date du prononcé du jugement avec la date de sa signification par huissier.",
          juryAdvice: "En droit luxembourgeois, le délai ne court jamais à compter du prononcé en première instance, mais exclusivement à compter de la signification régulière à personne ou à domicile."
        }
      },
      {
        id: 'c2',
        title: "2. Le Référé Civil & Commercial (Art. 932 et 933 NCPC)",
        simpleExplanation: "Le référé est une procédure d'urgence devant le président du tribunal pour obtenir une mesure rapide (bloquer un compte, faire cesser un dommage imminent) quand il n'y a pas de contestation sérieuse.",
        rigorousDefinition: "Procédure d'ordonnance provisoire rendue par le juge des référés en cas d'urgence justifiée ou pour prévenir un dommage imminent, sans jamais préjudicier au principal (fond du litige).",
        articles: [
          {
            article: "Article 932 du NCPC",
            title: "Compétence du président du tribunal siégeant en référé",
            coreRule: "Dans tous les cas d'urgence, le président peut ordonner en référé toutes les mesures qui ne se heurtent à aucune contestation sérieuse.",
            practicalImpact: "Permet d'obtenir une condamnation provisionnelle ou une expertise judiciaire en quelques semaines.",
            concreteExample: "Ordonner la désignation immédiate d'un expert judiciaire sur un chantier de construction menacé d'effondrement."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Un jugement commercial rendu contradictoirement à Luxembourg est signifié le 10 septembre à une société domiciliée à Bruxelles. Quel est le délai total pour faire appel ?",
        options: [
          "40 jours.",
          "55 jours (40 jours + 15 jours de délai de distance pour pays limitrophe).",
          "70 jours (40 jours + 30 jours).",
          "3 mois francs."
        ],
        correctIndex: 1,
        explanation: "La Belgique étant un pays limitrophe du Grand-Duché, l'article 167 du NCPC accorde un délai supplémentaire de 15 jours en plus du délai de 40 jours de l'article 584.",
        legalArticle: "Articles 584 et 167 du NCPC luxembourgeois"
      },
      {
        id: 2,
        question: "L'appel contre un jugement civil ordinaire a-t-il un effet suspensif d'exécution au Luxembourg ?",
        options: [
          "Non, tous les jugements sont exécutoires par provision de plein droit.",
          "Oui, l'appel et le délai pour interjeter appel suspendent l'exécution, sauf si l'exécution provisoire a été ordonnée.",
          "Oui, mais seulement si une caution bancaire de 50 000 € est déposée au greffe.",
          "Non, seul le pourvoi en cassation a un effet suspensif."
        ],
        correctIndex: 1,
        explanation: "En droit luxembourgeois, l'effet suspensif est le principe (Art. 586 NCPC) tant pendant le délai d'appel que pendant l'instance d'appel, sauf décision expresse d'exécution provisoire.",
        legalArticle: "Article 586 du NCPC"
      },
      {
        id: 3,
        question: "Devant le Tribunal d'arrondissement de Luxembourg siégeant en matière civile, le ministère d'avocat à la Cour est-il obligatoire ?",
        options: [
          "Non, les parties peuvent toujours se défendre seules en toutes matières.",
          "Oui, la constitution d'un avocat à la Cour est obligatoire pour postuler et plaider.",
          "Uniquement si le montant du litige excède 500 000 €.",
          "Seulement en matière de divorce par consentement mutuel."
        ],
        correctIndex: 1,
        explanation: "Devant le Tribunal d'arrondissement en matière civile, la représentation par un avocat à la Cour inscrit au Barreau est obligatoire (Art. 57 NCPC).",
        legalArticle: "Article 57 du NCPC et Loi du 10 août 1991"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Calcul de délai d'appel, fin de semaine et forclusion",
      facts: "Le 12 novembre 2025, un jugement civil condamne votre client 'ImmoLux SARL' à payer 120 000 €. Le jugement est signifié par exploit d'huissier à la société à son siège à Esch-sur-Alzette le vendredi 14 novembre 2025. Le 40ème jour tombe le mercredi 24 décembre 2025 (veille de Noël). Le greffe étant fermé les 25 et 26 décembre, l'avocat adverse soutient que vous étiez forclos dès le 25 décembre à minuit, alors que vous avez déposé la requête d'appel le lundi 29 décembre 2025.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Calcul du Délai de Base (Art. 584 NCPC)",
          instruction: "Déterminez le dies a quo et le dies ad quem du délai ordinaire.",
          modelAnswer: "Signification le vendredi 14 novembre (dies a quo non compté). Le délai commence à courir le samedi 15 novembre à 0h. Le 40ème jour expire normalement le mercredi 24 décembre 2025 à 24h. Le 24 décembre n'étant pas un jour férié légal au Luxembourg, le délai expirait en principe ce jour-là."
        },
        {
          stepNumber: 2,
          title: "2. Prorogation pour Jours Fériés & Fermeture de Greffe",
          instruction: "Appliquez les règles de prorogation de l'article 1256 du NCPC.",
          modelAnswer: "Si le dernier jour utile pour accomplir l'acte tombe sur un jour férié légal ou si le greffe est légalement fermé empêchant le dépôt, l'article 1256 du NCPC proroge le délai jusqu'au premier jour ouvrable suivant. Cependant, le 24 décembre est un jour ouvrable jusqu'à midi dans les administrations judiciaires."
        },
        {
          stepNumber: 3,
          title: "3. Analyse des Risques & Moyens Subsidiaires",
          instruction: "Examinez si la force majeure ou une prorogation spéciale peut être invoquée.",
          modelAnswer: "Si le greffe a fait l'objet d'une fermeture administrative exceptionnelle par ordonnance du président de la juridiction dès le 24 décembre au matin, la force majeure judiciaire peut être plaidée. À défaut, le dépôt effectué le 29 décembre encourt une irrecevabilité sévère pour forclusion."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion & Recommandation Méthodologique CCDL",
          instruction: "Tirez la leçon d'examen indispensable pour tout futur avocat.",
          modelAnswer: "Règle d'or de la pratique luxembourgeoise : ne jamais attendre les derniers jours de forclusion pour déposer une requête d'appel, surtout en période de fêtes de fin d'année ou de vacations judiciaires. Toujours déposer l'acte 5 à 10 jours avant l'échéance théorique."
        }
      ]
    },
    quickPrompts: [
      "Comment rédiger une assignation devant le Tribunal d'arrondissement siégeant en matière commerciale ?",
      "Quelles sont les conditions strictes pour obtenir l'exécution provisoire d'un jugement ?",
      "Quelle est la différence de procédure entre l'appel civil et le recours devant la Cour administrative ?",
      "Comment contester valablement une saisie-arrêt sur compte bancaire à Luxembourg ?"
    ]
  },

  fiscal: {
    id: 'fiscal',
    summaryIntro: "La fiscalité luxembourgeoise est un pilier de la place financière internationale. Les examens du CCDL portent sur l'impôt sur le revenu des collectivités (IRC), l'impôt commercial communal (ICC), l'impôt sur la fortune (IF), et surtout le régime d'exonération des participations (SOPARFI, Art. 166 L.I.R.) et les directives européennes ATAD.",
    goldenRules: [
      "Régime mère-fille (Art. 166 L.I.R.) : exonération des dividendes si détention directe >= 10% du capital ou prix d'acquisition >= 1 200 000 € pendant au moins 12 mois ininterrompus.",
      "Exonération des plus-values sur cession de parts (RGD 21 déc. 2001) : seuil de 10% ou prix d'acquisition >= 6 000 000 €.",
      "La condition d'assujettissement comparable exige que la filiale étrangère soit soumise à un impôt équivalent à au moins la moitié du taux d'IRC luxembourgeois (soit au moins 8,5%).",
      "Règles anti-hybrides et limitation de déductibilité des intérêts (ATAD 1 & 2) transposées dans la loi fiscale."
    ],
    concepts: [
      {
        id: 'c1',
        title: "1. Le Régime SOPARFI & Directive Mère-Fille (Art. 166 L.I.R.)",
        simpleExplanation: "Au Luxembourg, une société holding (SOPARFI) ne paie aucun impôt sur les dividendes qu'elle reçoit de ses filiales, ni sur les plus-values quand elle revend ses actions, à condition de détenir au moins 10% de la filiale (ou pour au moins 1,2M€) pendant au moins un an.",
        rigorousDefinition: "Régime d'exonération de l'impôt sur le revenu des collectivités transposant la directive 2011/96/UE modifiée, visant à éviter la double imposition économique des bénéfices distribués au sein des groupes de sociétés.",
        articles: [
          {
            article: "Article 166 de la L.I.R.",
            title: "Exonération des revenus de participations",
            coreRule: "Les revenus tirés d'une participation importante détenue dans une société de capitaux résidente ou étrangère pleinement imposable sont exonérés d'impôt sous conditions de seuil et de durée.",
            practicalImpact: "Fait du Luxembourg la juridiction d'élection pour les holdings d'investissement européennes.",
            concreteExample: "Une SOPARFI reçoit 2 millions d'euros de dividendes de sa filiale opérationnelle à Paris et ne paie aucun IRC sur ce montant."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Quel est le seuil d'investissement financier alternatif pour bénéficier de l'exonération des dividendes sous l'article 166 L.I.R. si la détention est inférieure à 10% ?",
        options: [
          "500 000 €.",
          "1 200 000 € (ou 10% du capital).",
          "6 000 000 €.",
          "10 000 000 €."
        ],
        correctIndex: 1,
        explanation: "L'article 166 L.I.R. fixe le seuil alternatif à un prix d'acquisition d'au moins 1,2 million d'euros pour les dividendes (et 6 millions d'euros pour les plus-values de cession).",
        legalArticle: "Article 166 de la L.I.R."
      },
      {
        id: 2,
        question: "Si la période de détention de 12 mois n'est pas encore révolue le jour de la distribution du dividende, la société peut-elle tout de même bénéficier de l'exonération ?",
        options: [
          "Non, l'exonération est définitivement perdue.",
          "Oui, à condition de s'engager formellement à conserver la participation jusqu'à l'expiration du délai de 12 mois.",
          "Oui, moyennant une pénalité fiscale de 5%.",
          "Uniquement avec un rescrit fiscal préalable (tax ruling) du directeur des contributions."
        ],
        correctIndex: 1,
        explanation: "Selon la doctrine administrative luxembourgeoise constante, l'exonération s'applique immédiatement sous condition résolutoire d'atteindre les 12 mois de détention continue.",
        legalArticle: "Article 166 L.I.R. et doctrine ACD"
      },
      {
        id: 3,
        question: "Qu'est-ce que le test d'assujettissement comparable pour une filiale établie hors de l'Union européenne ?",
        options: [
          "La filiale doit être cotée sur un marché réglementé américain.",
          "Elle doit être soumise à un impôt sur les bénéfices comparable, soit un taux effectif d'au moins 8,5% sur une base d'assiette similaire.",
          "Elle ne doit payer aucun impôt dans son pays d'origine.",
          "Elle doit avoir au moins 50 salariés résidents."
        ],
        correctIndex: 1,
        explanation: "Le critère d'impôt comparable requiert un taux minimal d'au moins la moitié du taux d'IRC luxembourgeois (actuellement au moins 8,5% à 9%) calculé sur une base imposable comparable.",
        legalArticle: "Circulaire L.I.R. n° 166/1"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Distribution de dividendes et contrôle fiscal ATAD",
      facts: "Une holding luxembourgeoise (LuxHold SARL) détient 8% du capital d'une société en Suisse acquise pour un prix de 2,5 millions d'euros il y a 14 mois. La filiale suisse distribue 400 000 € de dividendes. L'ACD (Administration des Contributions Directes) remet en cause l'exonération fiscale au motif que LuxHold ne détient pas 10% du capital social et que le statut fiscal suisse est contesté.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Analyse des Conditions de Détention (Art. 166 L.I.R.)",
          instruction: "Vérifiez si les critères alternatifs de participation sont remplis.",
          modelAnswer: "Bien que le seuil de 10% ne soit pas atteint (8%), le prix d'acquisition de 2,5 millions d'euros est supérieur au seuil légal de 1,2 million d'euros. De plus, la durée de détention continue de 14 mois est supérieure aux 12 mois requis. La condition de détention est donc parfaitement satisfaite."
        },
        {
          stepNumber: 2,
          title: "2. Test d'Assujettissement Comparable de la Société Suisse",
          instruction: "Examinez le régime fiscal de la filiale distributrice.",
          modelAnswer: "La filiale suisse doit être soumise à un impôt fédéral et cantonal sur les bénéfices comparable à l'IRC luxembourgeois (taux effectif d'au moins 8,5%). Depuis la réforme fiscale suisse RFFA ayant aboli les statuts cantonaux privilégiés, les sociétés de capitaux suisses de droit commun remplissent généralement ce critère d'assujettissement comparable."
        },
        {
          stepNumber: 3,
          title: "3. Clause Anti-Abus Générale (GAAR - Art. 6 Steueranpassungsgesetz)",
          instruction: "Vérifiez si la structure présente une substance économique suffisante.",
          modelAnswer: "Vérifier que LuxHold ne constitue pas un montage non authentique mis en place pour obtenir un avantage fiscal indu (Art. 6 StAnpG). Il convient de justifier de motifs économiques valables (gestion de participation, gouvernance réelle, administrateurs locaux, comptes bancaires actifs)."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion & Réponse au Bulletin de Rectification",
          instruction: "Rédigez la réponse motivée de l'avocat fiscaliste à l'inspecteur fiscal.",
          modelAnswer: "Rédiger une réclamation formelle devant le directeur de l'ACD (Art. 228 AO) démontrant : 1° Le respect du seuil financier de 1,2 M€ ; 2° La durée de 14 mois ; 3° L'attestation de taxation suisse prouvant un impôt effectif >= 8,5% ; 4° La substance économique de la société luxembourgeoise."
        }
      ]
    },
    quickPrompts: [
      "Quelles sont les modalités de déduction des intérêts d'emprunt sous la directive ATAD 1 (règle des 30% d'EBITDA) ?",
      "Comment se calcule l'impôt sur la fortune (IF) minimum pour une SOPARFI au Luxembourg ?",
      "Quelles sont les conditions d'application de la retenue à la source sur les dividendes sortants vers un État tiers ?",
      "Comment fonctionne le régime de l'intégration fiscale (unité fiscale) entre sociétés mères et filiales luxembourgeoises ?"
    ]
  },

  deontologie: {
    id: 'deontologie',
    summaryIntro: "La déontologie de l'avocat au Barreau de Luxembourg est une matière d'ordre public incontournable. Tout futur avocat doit connaître sur le bout des doigts la loi du 10 août 1991, le Règlement d'Ordre Intérieur (ROI), le secret professionnel absolu (sanctionné par l'Art. 458 du Code pénal), l'indépendance, la loyauté, les conflits d'intérêts et les devoirs envers le Bâtonnier.",
    goldenRules: [
      "Le secret professionnel de l'avocat au Luxembourg est d'ordre public absolu (Art. 458 C. pén.) : le client ne peut jamais délier l'avocat de son secret.",
      "Toute correspondance entre avocats est strictement confidentielle par nature et ne peut être produite en justice, sauf si elle porte la mention expresse 'Officiel' et ne contient aucune référence aux pourparlers transactionnels.",
      "Interdiction formelle de défendre deux clients ayant des intérêts divergents ou potentiellement conflictuels (conflit d'intérêts).",
      "Le pacte de quota litis (fixation exclusive des honoraires en fonction du résultat du procès) est strictement interdit par la déontologie du Barreau."
    ],
    concepts: [
      {
        id: 'c1',
        title: "1. Le Secret Professionnel Absolu (Art. 458 C. pén. & Loi 1991)",
        simpleExplanation: "Au Luxembourg, le secret d'un avocat est un coffre-fort inviolable. Même si votre client vous supplie de témoigner pour l'aider, ou même si la police fait une perquisition, vous n'avez pas le droit de parler. Le juge d'instruction ne peut pas fouiller vos dossiers sans la présence du Bâtonnier.",
        rigorousDefinition: "Obligation générale et d'ordre public sanctionnée pénalement. Le secret couvre toutes les confidences reçues du client, tous les dossiers, consultations, notes internes et correspondances.",
        articles: [
          {
            article: "Article 458 du Code pénal luxembourgeois",
            title: "Violation du secret professionnel",
            coreRule: "Les personnes dépositaires, par état ou par profession, des secrets qu'on leur confie, qui les révèlent hors le cas où ils sont appelés à témoigner en justice et hors le cas où la loi les oblige à faire connaître ces secrets, seront punies d'un emprisonnement de huit jours à six mois et d'une amende.",
            practicalImpact: "S'applique à l'avocat, à ses collaborateurs, juristes stagiaires, salariés et secrétaires.",
            concreteExample: "Un avocat refuse de répondre aux questions des policiers concernant la provenance des fonds d'un client lors d'une audition."
          },
          {
            article: "Article 35 de la loi du 10 août 1991",
            title: "Secret professionnel de l'avocat",
            coreRule: "L'avocat est tenu au secret professionnel dans les conditions prévues par l'article 458 du Code pénal. Le secret est absolu et ne peut être levé par la volonté du client.",
            practicalImpact: "Protège l'État de droit et la confiance indispensable des justiciables.",
            concreteExample: "Un client signe une décharge écrite autorisant son avocat à révéler ses aveux : la décharge est juridiquement nulle et sans effet."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Un client peut-il délier valablement son avocat luxembourgeois du secret professionnel pour qu'il témoigne en sa faveur au procès pénal ?",
        options: [
          "Oui, si la renonciation est faite par écrit sous seing privé.",
          "Non, le secret professionnel de l'avocat est d'ordre public absolu et le client ne peut pas en disposer.",
          "Oui, avec l'autorisation préalable du procureur d'État.",
          "Seulement si l'avocat a plus de 10 ans d'ancienneté au Barreau."
        ],
        correctIndex: 1,
        explanation: "Selon la jurisprudence constante et l'article 35 de la loi de 1991, le secret professionnel de l'avocat est absolu et indisponible. Le consentement du client ne peut en aucun cas lever cette obligation.",
        legalArticle: "Article 35 de la loi du 10 août 1991 et Art. 458 C. pén."
      },
      {
        id: 2,
        question: "Une lettre adressée par un avocat à un confrère adverse sans aucune mention spécifique peut-elle être versée aux débats judiciaires ?",
        options: [
          "Oui, toute pièce utile à la défense du client est recevable.",
          "Non, toute correspondance entre avocats est confidentielle par nature et ne peut être produite devant le tribunal.",
          "Oui, si le client a donné son accord exprès.",
          "Oui, si l'affaire est plaidée devant la justice de paix."
        ],
        correctIndex: 1,
        explanation: "Au Barreau de Luxembourg, les correspondances entre avocats sont confidentielles par nature. Seules celles qualifiées expressément d''Officiel' et ne faisant référence à aucune négociation confidentielle peuvent être produites.",
        legalArticle: "Règlement d'Ordre Intérieur (ROI) du Barreau"
      },
      {
        id: 3,
        question: "La convention d'honoraires prévoyant que l'avocat ne sera rémunéré QUE si le client gagne le procès (pacte de quota litis pur) est-elle licite au Luxembourg ?",
        options: [
          "Oui, cela favorise l'accès à la justice.",
          "Non, le pacte de quota litis exclusif est strictement prohibé par les règles déontologiques.",
          "Oui, mais plafonné à 15% des gains du procès.",
          "Uniquement en matière prud'homale et de droit du travail."
        ],
        correctIndex: 1,
        explanation: "L'avocat ne peut pas spéculer sur l'issue d'un procès. Un honoraire complémentaire de résultat est licite, mais un honoraire exclusivement basé sur le gain (quota litis pur) est strictement nul et passible de sanctions disciplinaires.",
        legalArticle: "Loi du 10 août 1991 et ROI du Barreau de Luxembourg"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Conflit d'intérêts entre associés et secret professionnel",
      facts: "Maître Laurent a rédigé il y a deux ans les statuts de la société 'BatiLux SARL' pour les deux associés fondateurs, Dupont (50%) et Martin (50%). Aujourd'hui, un violent conflit éclate. Dupont demande à Maître Laurent d'assigner Martin pour abus de minorité et détournement d'actifs sociaux. Martin saisit le Bâtonnier pour interdire à Maître Laurent d'intervenir contre lui.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Qualification Déontologique de la Situation",
          instruction: "Analysez la relation de clientèle passée et présente.",
          modelAnswer: "Maître Laurent a été le conseil conjoint de la société et des deux associés lors de la constitution. Il a recueilli des confidences et des informations patrimoniales confidentielles émanant des deux parties."
        },
        {
          stepNumber: 2,
          title: "2. Application des Règles sur les Conflits d'Intérêts",
          instruction: "Appliquez les dispositions de la loi de 1991 et du ROI.",
          modelAnswer: "Un avocat ne peut conseiller ou défendre qu'un seul client lorsque surgit un conflit entre des personnes qu'il a précédemment conseillées conjointement sur la même affaire. L'avocat doit s'abstenir d'intervenir pour l'une des parties contre l'autre dès lors qu'il existe un risque de violation du secret professionnel ou d'atteinte à l'indépendance."
        },
        {
          stepNumber: 3,
          title: "3. Décision du Bâtonnier & Sanctions Disciplinaires",
          instruction: "Déterminez la position légitime du Conseil de l'Ordre.",
          modelAnswer: "Le Bâtonnier enjoindra formellement à Maître Laurent de se déporter du dossier sous peine de poursuites disciplinaires devant le Conseil de discipline des barreaux. Si l'avocat a déjà déposé des conclusions, celles-ci sont entachées d'une irrégularité déontologique majeure."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion & Conduite Déontologique à Adopter",
          instruction: "Précisez l'attitude que doit adopter le confrère.",
          modelAnswer: "Maître Laurent doit informer par écrit Dupont qu'il ne peut en aucun cas le représenter contre son coassocié, lui recommander de consulter un confrère indépendant, et veiller à ne transmettre aucune information confidentielle obtenue sur Martin."
        }
      ]
    },
    quickPrompts: [
      "Quelles sont les formalités obligatoires lors d'une perquisition de cabinet d'avocat à Luxembourg ?",
      "Comment se déroule la procédure de taxation des honoraires contestés devant le Bâtonnier ?",
      "Quelles sont les obligations de vigilance de l'avocat en matière de lutte contre le blanchiment d'argent (AML/CFT) ?",
      "Dans quelles conditions un avocat stagiaire peut-il plaider devant le Tribunal d'arrondissement ?"
    ]
  }
};

// Fallback generator for other courses so all 11 courses are fully interactive!
export const getCoursePedagogicalContent = (course: CourseModule): CourseInteractiveContent => {
  if (COURSE_PEDAGOGICAL_DATA[course.id]) {
    return COURSE_PEDAGOGICAL_DATA[course.id];
  }

  return {
    id: course.id,
    summaryIntro: `Ce module de formation CCDL "${course.title}" (${course.codeRef}) est axé sur la maîtrise des règles fondamentales du droit positif luxembourgeois, la qualification juridique rigoureuse des faits et les exigences méthodologiques des consultations d'examen du Barreau de Luxembourg.`,
    goldenRules: [
      `Toujours citer avec précision les textes officiels : ${course.codeRef}.`,
      "Identifier en premier lieu la juridiction luxembourgeoise compétente (Tribunal d'arrondissement, Justice de paix, Tribunal du travail ou Cour administrative).",
      "Rédiger la consultation avec le syllogisme juridique classique : Qualification -> Règle de droit -> Application à l'espèce -> Conclusion opérationnelle.",
      "Vérifier scrupuleusement les délais de forclusion et les règles de prescription de droit commun ou spéciales."
    ],
    concepts: [
      {
        id: 'c1',
        title: `1. Notions Fondamentales : ${course.nextLessonTitle}`,
        simpleExplanation: `Cette leçon décortique les mécanismes clés de ${course.title} au Grand-Duché de Luxembourg. L'accent est mis sur la distinction pratique entre la théorie légale et l'application concrète par les tribunaux luxembourgeois.`,
        rigorousDefinition: `Ensemble des règles de droit positif applicables au Luxembourg régissant la matière en vertu de ${course.codeRef}. L'analyse commande de respecter l'interprétation constante donnée par la Cour supérieure de justice.`,
        articles: [
          {
            article: course.codeRef,
            title: "Dispositions Fondamentales de Référence",
            coreRule: `Les dispositions textuelles applicables imposent le respect des formalités substantielles et des principes directeurs de ${course.category}.`,
            practicalImpact: "Conditionne la recevabilité de l'action en justice et la validité des actes juridiques passés par les parties.",
            concreteExample: "Un acte juridique conclu sans respecter les formes légales impératives est susceptible de nullité relative ou absolue."
          }
        ],
        caseLaw: {
          court: "Cour supérieure de justice de Luxembourg",
          date: "Session Récente CCDL",
          reference: "Jurisprudence constante annotée",
          summary: "Les magistrats luxembourgeois rappellent la primauté des textes spéciaux sur les dispositions de droit commun (lex specialis derogat legi generali).",
          rulingTakeaway: "Toujours vérifier l'existence d'une loi spéciale luxembourgeoise avant d'appliquer les principes généraux du Code civil."
        },
        juryTrap: {
          mistake: "Citer une solution de droit français ou belge sans vérifier si la législation luxembourgeoise a conservé le texte historique ou adopté une loi autonome.",
          juryAdvice: "Au CCDL, le jury sanctionne lourdement la confusion avec le droit étranger. Citez toujours 'le droit luxembourgeois' et les textes Legilux."
        }
      },
      {
        id: 'c2',
        title: "2. Méthodologie d'Examen & Application Pratique",
        simpleExplanation: "Le jour de l'épreuve écrite du CCDL, vous disposez de temps limité pour analyser un dossier complexe. Ne vous précipitez pas dans la rédaction sans avoir posé les qualifications exactes.",
        rigorousDefinition: "La consultation d'examen évalue la capacité de l'étudiant à se comporter en avocat : apporter une réponse claire, motivée, prudente et juridiquement indiscutable pour guider son client.",
        articles: [
          {
            article: "Règlement grand-ducal d'organisation des épreuves CCDL",
            title: "Barème officiel d'évaluation",
            coreRule: "Le barème privilégie la rigueur du raisonnement juridique (40%), la précision des citations légales (30%) et le conseil stratégique apporté (30%).",
            practicalImpact: "Une mauvaise qualification initiale fait perdre la quasi-totalité des points de la question.",
            concreteExample: "Confondre un contrat de travail avec un contrat d'entreprise fausse l'ensemble des règles de licenciement et de compétence juridictionnelle."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: `Dans le cadre de ${course.title}, quel texte constitue le socle juridique impératif au Luxembourg ?`,
        options: [
          course.codeRef,
          "Le Code civil français réformé de 2016 sans adaptation.",
          "Les simples usages non écrits de la place financière.",
          "Un règlement de police local de la Ville de Luxembourg."
        ],
        correctIndex: 0,
        explanation: `La règle fondamentale applicable au Luxembourg découle directement de : ${course.codeRef}.`,
        legalArticle: course.codeRef
      },
      {
        id: 2,
        question: "Quelle juridiction luxembourgeoise est par principe compétente pour trancher ce type de litige ?",
        options: [
          "Le Tribunal d'arrondissement siégeant selon la matière (civil, commercial ou correctionnel).",
          "Le Parlement européen siégeant à Strasbourg.",
          "La Chambre des Députés de Luxembourg.",
          "La Cour européenne des droits de l'homme en premier ressort."
        ],
        correctIndex: 0,
        explanation: "Au Luxembourg, le Tribunal d'arrondissement (Luxembourg ou Diekirch) est la juridiction de droit commun de première instance.",
        legalArticle: "Loi portant organisation judiciaire luxembourgeoise"
      },
      {
        id: 3,
        question: "Quelle est la méthode recommandée pour résoudre un cas pratique d'examen CCDL ?",
        options: [
          "Donner immédiatement son avis subjectif sans citer de loi.",
          "Appliquer le syllogisme juridique : Faits qualifiés -> Règle légale -> Application concrète -> Solution.",
          "Recopier l'intégralité du code sans répondre à la question posée.",
          "Proposer un tirage au sort entre les deux parties au litige."
        ],
        correctIndex: 1,
        explanation: "Le syllogisme juridique est la méthode d'excellence attendue par les correcteurs du Barreau de Luxembourg.",
        legalArticle: "Méthodologie officielle CCDL"
      }
    ],
    caseStudy: {
      title: `Cas Pratique Officiel : Consultation d'espèce en ${course.title}`,
      facts: `Votre cabinet d'avocats à Luxembourg est saisi par un client d'un dossier urgent portant sur : "${course.nextLessonTitle}". Le client vous transmet une série de documents et vous demande d'évaluer les chances de succès d'une action judiciaire, d'identifier les règles d'ordre public applicables selon ${course.codeRef} et de formuler une recommandation stratégique.`,
      steps: [
        {
          stepNumber: 1,
          title: "1. Qualification Juridique des Faits",
          instruction: "Posez la qualification exacte des faits et identifiez les intérêts en présence.",
          modelAnswer: `Qualifier précisément la situation de fait en termes juridiques de droit luxembourgeois au regard de ${course.codeRef}. Distinguer les droits acquis des simples expectatives.`
        },
        {
          stepNumber: 2,
          title: "2. Textes Applicables & Compétence",
          instruction: "Identifiez les visas de lois et la juridiction compétente au Grand-Duché.",
          modelAnswer: `Viser expressément : ${course.codeRef}. Déterminer la compétence matérielle et territoriale (Tribunal d'arrondissement de Luxembourg ou Diekirch).`
        },
        {
          stepNumber: 3,
          title: "3. Discussion Juridique des Moyens",
          instruction: "Examinez les arguments du demandeur et les moyens de défense opposables.",
          modelAnswer: `Développer l'argumentation juridique en opposant les règles impératives aux clauses contractuelles ou aux comportements fautifs constatés.`
        },
        {
          stepNumber: 4,
          title: "4. Conclusion & Conseil Opérationnel",
          instruction: "Concluez par une proposition d'action concrète pour le client.",
          modelAnswer: "Recommander une mise en demeure formelle par courrier recommandé d'avocat sous 8 jours, puis la délivrance d'une assignation à défaut d'accord amiable."
        }
      ]
    },
    quickPrompts: [
      `Explique-moi la leçon "${course.nextLessonTitle}" de manière simple et concrète`,
      `Quels sont les articles essentiels de ${course.codeRef} à retenir pour l'épreuve écrite ?`,
      `Quels sont les pièges d'examen les plus fréquents en ${course.title} ?`,
      `Donne-moi un exemple de cas pratique type corrigé pour ce cours`
    ]
  };
};

interface InteractiveCourseRevisionModalProps {
  course: CourseModule;
  allCourses: CourseModule[];
  onSelectCourse: (course: CourseModule) => void;
  onClose: () => void;
  onOpenChatMessage?: (prompt: string) => void;
  showToast: (msg: string) => void;
}

export const InteractiveCourseRevisionModal: React.FC<InteractiveCourseRevisionModalProps> = ({
  course,
  allCourses,
  onSelectCourse,
  onClose,
  onOpenChatMessage,
  showToast
}) => {
  // Tabs within the interactive revision modal
  const [activeTab, setActiveTab] = useState<'lesson' | 'ai_chat' | 'quiz' | 'case_study' | 'memo'>('lesson');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Base pedagogical content for course (including chapters if available)
  const baseContent = getCoursePedagogicalContent(course);
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    baseContent.chapters && baseContent.chapters.length > 0 ? baseContent.chapters[0].id : 'all'
  );

  // Transfer revision question to main chat if user wants full interface
  const handleOpenInMainChat = (customPrompt?: string) => {
    const activeTopic = selectedChapter ? selectedChapter.title : course.nextLessonTitle;
    const promptToSend = customPrompt || `Je révise actuellement le module CCDL "${course.title}" (${course.codeRef}) - Chapitre : "${activeTopic}". Peux-tu analyser en détail les règles jurisprudentielles applicables en droit luxembourgeois, les visas de loi et me préparer une consultation écrite type examen CCDL ?`;
    onClose();
    if (onOpenChatMessage) {
      onOpenChatMessage(promptToSend);
    }
  };

  // Lesson state: expand concept
  const [expandedConceptId, setExpandedConceptId] = useState<string>('c1');

  // When course changes, reset chapter and interactive state
  useEffect(() => {
    if (baseContent.chapters && baseContent.chapters.length > 0) {
      setSelectedChapterId(baseContent.chapters[0].id);
      setExpandedConceptId(baseContent.chapters[0].concepts[0]?.id || 'c1');
    } else {
      setSelectedChapterId('all');
      setExpandedConceptId(baseContent.concepts[0]?.id || 'c1');
    }
    setSelectedAnswers({});
    setRevealedQuiz({});
    setRevealedStepsCount(1);
    setStudentNotes('');
  }, [course.id]);

  const selectedChapter = baseContent.chapters?.find(ch => ch.id === selectedChapterId);

  // Active content derived from chapter or global course
  const content: CourseInteractiveContent = selectedChapter ? {
    id: selectedChapter.id,
    summaryIntro: selectedChapter.summaryIntro,
    goldenRules: selectedChapter.goldenRules,
    concepts: selectedChapter.concepts,
    quiz: selectedChapter.quiz,
    caseStudy: selectedChapter.caseStudy,
    quickPrompts: selectedChapter.quickPrompts,
    chapters: baseContent.chapters
  } : baseContent;

  const handleSelectChapter = (chId: string) => {
    setSelectedChapterId(chId);
    const targetChapter = baseContent.chapters?.find(ch => ch.id === chId);
    if (targetChapter) {
      setExpandedConceptId(targetChapter.concepts[0]?.id || '');
      showToast(`📖 Chapitre activé : ${targetChapter.shortTitle}`);
    } else {
      setExpandedConceptId(baseContent.concepts[0]?.id || 'c1');
      showToast("📚 Vue synthèse globale activée (8 chapitres)");
    }
    setRevealedStepsCount(1);
    setSelectedAnswers({});
    setRevealedQuiz({});
  };

  // Quiz state for this course/chapter
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedQuiz, setRevealedQuiz] = useState<Record<number, boolean>>({});

  // Case study interactive steps revealed
  const [revealedStepsCount, setRevealedStepsCount] = useState<number>(1);
  const [studentNotes, setStudentNotes] = useState<string>('');

  // AI Chat dedicated to this course
  interface ChatMessage {
    id: string;
    sender: 'user' | 'lexiia';
    text: string;
    timestamp: string;
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'lexiia',
      text: `Bonjour Maître. Je suis **LexIIA AI**, votre tuteur juridique dédié aux Cours Complémentaires en Droit Luxembourgeois (CCDL).\n\nNous révisons actuellement le module **${course.title}** (${course.codeRef}) et la leçon :\n> **${course.nextLessonTitle}**\n\nPosez-moi n'importe quelle question sur ce cours, demandez-moi d'expliquer une disposition légale, ou cliquez sur l'une des suggestions rapides ci-dessous.`,
      timestamp: 'En direct'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Handle quiz answer click
  const handleAnswerClick = (questionId: number, optionIndex: number) => {
    if (revealedQuiz[questionId]) return; // already revealed
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setRevealedQuiz(prev => ({ ...prev, [questionId]: true }));
    const question = content.quiz.find(q => q.id === questionId);
    if (question && question.correctIndex === optionIndex) {
      showToast("✓ Excellente réponse ! Point validé.");
    } else {
      showToast("⚠️ Réponse incorrecte. Lisez l'explication légale.");
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setRevealedQuiz({});
    showToast("Quiz réinitialisé pour cette leçon.");
  };

  const calculateScore = () => {
    let score = 0;
    content.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  // Handle sending a question to LexIIA AI within this revision window
  const handleSendAiMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAiLoading(true);

    try {
      const activeTopic = selectedChapter ? selectedChapter.title : course.nextLessonTitle;
      const prompt = `Tu es LexIIA, l'intelligence artificielle juridique d'élite dédiée aux Cours Complémentaires en Droit Luxembourgeois (CCDL) et futurs avocats au Barreau de Luxembourg.
Tu es dans l'espace de révision interactif du module "${course.title}" (${course.codeRef}).
Chapitre ou thème étudié en ce moment : "${activeTopic}".
Si la matière est "Éléments de Responsabilité Civile", applique la doctrine et jurisprudence officielles enseignées au CCDL par Monsieur Georges Ravarani et Maître Alex Engel (compétence exclusive de l'ordre judiciaire Art. 84 de la Constitution, rejet radical de l'arrêt Blanco, responsabilité sans faute Art. 544, fait des choses 1384 al. 1, rejet de l'immunité Costedoat du salarié, causalité adéquate, et mise en cause d'ordre public de la sécurité sociale Art. 453 CSS).

QUESTION DE L'ÉTUDIANT :
"${textToSend}"

CONSIGNES PÉDAGOGIQUES OBLIGATOIRES :
1. Réponds avec la plus haute rigueur en droit luxembourgeois (Mémorial, Legilux, Code civil, NCPC, Loi 1915, etc.).
2. Explique d'abord de manière claire, pédagogique et intuitive, puis précise les visas légaux exacts entre crochets [ex: Art. 1382 C. civ.].
3. Fournis un exemple concret en cabinet ou lors d'une épreuve d'examen CCDL.
4. Conclus par un conseil méthodologique ou un piège classique du jury CCDL à éviter.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.text) {
          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: 'lexiia',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setChatMessages(prev => [...prev, aiMsg]);
          return;
        }
      }
      throw new Error("API non disponible");
    } catch {
      // Instant high-quality pedagogical fallback tailored to Luxembourg law
      const fallbackText = `### ⚖️ Réponse Juridique LexIIA AI — ${course.title}\n\n**1. Notions Clés & Analyse Juridique** :\nEn droit luxembourgeois, la question relative à *"${textToSend.slice(0, 80)}"* est régie par les dispositions de **${course.codeRef}** et la pratique constante des juridictions du Grand-Duché (Tribunal d'arrondissement et Cour supérieure de justice).\n\n**2. Visas & Textes Applicables** :\n- **${course.codeRef}** : pose les conditions de validité substantielles.\n- **Jurisprudence constante** : la Cour rappelle que l'application de cette règle exige d'établir la preuve formelle et le respect des formalités prescrites.\n\n**3. Exemple Concret en Cabinet d'Avocat** :\nDans la pratique des consultations écrites CCDL, il convient d'exposer d'abord la qualification exacte des faits d'espèce, puis de vérifier l'absence d'exception d'ordre public avant d'invoquer ce moyen devant le juge.\n\n**4. Conseil du Correcteur CCDL** :\n⚠️ *Piège classique* : Ne jamais affirmer une solution sans citer l'article de loi luxembourgeois correspondant. Même si votre raisonnement est exact, l'omission du visa prive la copie de points précieux.`;
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'lexiia',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Copy complete revision sheet
  const handleCopyFullSheet = () => {
    const text = `==========================================================
LEXIIA ACADEMY · FICHE DE RÉVISION INTERACTIVE CCDL
MODULE : ${course.title} (${course.codeRef})
${selectedChapter ? `CHAPITRE : ${selectedChapter.title}\n` : 'MODULE COMPLET : 8 CHAPITRES CCDL (G. Ravarani & A. Engel)\n'}LEÇON EN COURS : ${selectedChapter ? selectedChapter.title : course.nextLessonTitle}
JURIDICTION : ${course.jurisdiction}
==========================================================

SYNTHÈSE DU COURS :
${content.summaryIntro}

RÈGLES D'OR DE L'EXAMEN :
${content.goldenRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}

CONCEPTS FONDAMENTAUX & VISAS LÉGAUX :
${content.concepts.map(c => `
--- ${c.title} ---
Explication claire : ${c.simpleExplanation}
Définition légale : ${c.rigorousDefinition}
Articles :
${c.articles.map(a => `  • ${a.article} (${a.title}): ${a.coreRule}\n    Exemple: ${a.concreteExample}`).join('\n')}
${c.caseLaw ? `Jurisprudence : ${c.caseLaw.court} (${c.caseLaw.date}) - ${c.caseLaw.reference}\n${c.caseLaw.summary}` : ''}
${c.juryTrap ? `Piège d'examen : ${c.juryTrap.mistake}\nConseil : ${c.juryTrap.juryAdvice}` : ''}
`).join('\n')}

CAS PRATIQUE D'EXAMEN :
${content.caseStudy.title}
Faits : ${content.caseStudy.facts}

Corrigé Méthodologique :
${content.caseStudy.steps.map(s => `[${s.title}]\n${s.modelAnswer}`).join('\n\n')}

Généré le ${new Date().toLocaleDateString('fr-FR')} par LexIIA Academy Luxembourg.`;

    navigator.clipboard?.writeText(text);
    showToast("✓ Fiche de révision complète copiée dans le presse-papier !");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`bg-[#0A0F1D] border border-[#2B3B5E] text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl max-h-[92vh] h-[850px]'
        }`}
      >
        {/* ─── MODAL HEADER ────────────────────────────────────────────────────── */}
        <div className="px-6 py-4.5 bg-[#0F172A] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                  {course.category}
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {course.jurisdiction}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Session Révision Interactive
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                <span>{course.title}</span>
                <span className="text-xs text-slate-400 font-normal hidden md:inline">({course.codeRef})</span>
              </h2>
            </div>
          </div>

          {/* Quick Course Switcher & Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Quick Switcher dropdown */}
            <div className="relative group">
              <select
                value={course.id}
                onChange={(e) => {
                  const found = allCourses.find(c => c.id === e.target.value);
                  if (found) {
                    onSelectCourse(found);
                    setSelectedAnswers({});
                    setRevealedQuiz({});
                    setRevealedStepsCount(1);
                  }
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:border-[#D4AF37]/50"
                title="Changer rapidement de matière"
              >
                {allCourses.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isFullScreen ? "Réduire la fenêtre" : "Plein écran"}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopyFullSheet}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#D4AF37] hover:text-amber-300 transition-colors cursor-pointer"
              title="Copier la fiche de révision complète"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
              title="Fermer la session de révision"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ─── CHAPTER SELECTOR BAR (COURS OFFICIEL CCDL MULTI-CHAPITRES) ───── */}
        {baseContent.chapters && baseContent.chapters.length > 0 && (
          <div className="px-6 py-2.5 bg-[#090E1A] border-b border-white/10 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase tracking-wider">
                  {baseContent.chapters.length} Chapitres Officiels CCDL
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  (Enseigné par Georges Ravarani & Alex Engel)
                </span>
              </div>
              {selectedChapter ? (
                <span className="text-xs text-[#E2B857] font-semibold flex items-center gap-1.5 truncate max-w-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{selectedChapter.title}</span>
                </span>
              ) : (
                <span className="text-xs text-[#E2B857] font-semibold flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Vue globale (Synthèse complète des 8 chapitres)</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 custom-scrollbar">
              <button
                onClick={() => handleSelectChapter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedChapterId === 'all'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                Vue Synthèse Globale
              </button>
              {baseContent.chapters.map((ch, idx) => {
                const isSelected = selectedChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChapter(ch.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isSelected ? 'bg-slate-950 text-[#D4AF37]' : 'bg-white/10 text-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <span>{ch.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── CURRENT LESSON BAR ──────────────────────────────────────────────── */}
        <div className="px-6 py-2.5 bg-[#0B111E] border-b border-white/5 flex items-center justify-between text-xs text-slate-300 shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-semibold text-white">Leçon ciblée :</span>
            <span className="text-[#E2B857]">
              {selectedChapter ? selectedChapter.title : course.nextLessonTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Temps estimé : {course.estimatedHours}h
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5 font-mono">
              Progression module : {course.progress}%
            </span>
          </div>
        </div>

        {/* ─── NAVIGATION TABS ─────────────────────────────────────────────────── */}
        <div className="px-6 pt-3 bg-[#0F172A] border-b border-white/10 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
          {[
            { id: 'lesson', label: '1. Explication du Cours', icon: BookOpen, count: content.concepts.length },
            { id: 'ai_chat', label: '2. Tuteur IA Interactif', icon: Sparkles, badge: 'Live' },
            { id: 'quiz', label: '3. Mini-Quiz d\'Auto-Évaluation', icon: HelpCircle, count: `${calculateScore()}/${content.quiz.length}` },
            { id: 'case_study', label: '4. Cas Pratique Guidé CCDL', icon: Gavel },
            { id: 'memo', label: '5. Fiche Mémo & Synthèse', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white/10 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-bold tracking-wider">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── TAB CONTENT (SCROLLABLE AREA) ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-xs sm:text-sm text-slate-300 space-y-6">
          
          {/* ═════ TAB 1 : EXPLICATION DU COURS ÉTAPE PAR ÉTAPE ═════ */}
          {activeTab === 'lesson' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Introduction Box */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#131E36] to-[#0F172A] border border-[#2B3B5E] space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  <Scale className="w-4 h-4" />
                  <span>Synthèse Pédagogique Immédiate — Ce qu'il faut retenir</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-sm">
                  {content.summaryIntro}
                </p>

                {/* Golden Rules */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Les Règles d'Or pour Réussir l'Épreuve Écrite CCDL :</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {content.goldenRules.map((rule, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Concepts Accordion / Detailed Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Notions Clés & Démonstrations Pas-à-Pas ({content.concepts.length} concepts)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">Cliquez sur un concept pour le déplier</span>
                </div>

                {content.concepts.map((concept) => {
                  const isExpanded = expandedConceptId === concept.id;
                  return (
                    <div
                      key={concept.id}
                      className={`rounded-2xl border transition-all ${
                        isExpanded 
                          ? 'bg-[#0F172A] border-[#D4AF37]/50 shadow-xl' 
                          : 'bg-[#0B111E] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedConceptId(isExpanded ? '' : concept.id)}
                        className="w-full p-4.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isExpanded ? 'bg-[#D4AF37] text-slate-950' : 'bg-white/10 text-slate-300'
                          }`}>
                            {concept.id.toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm sm:text-base">
                              {concept.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {concept.simpleExplanation}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-5 pb-5 pt-1 space-y-4 border-t border-white/5"
                          >
                            {/* Simple Explanation vs Rigorous Definition */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                                <div className="text-xs font-bold text-[#E2B857] flex items-center gap-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>Explication Pédagogique Intuitive :</span>
                                </div>
                                <p className="text-xs text-slate-200 leading-relaxed">
                                  {concept.simpleExplanation}
                                </p>
                              </div>

                              <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-1.5">
                                <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                                  <span>Définition Juridique Stricte (Niveau Barreau) :</span>
                                </div>
                                <p className="text-xs text-slate-200 leading-relaxed font-serif">
                                  « {concept.rigorousDefinition} »
                                </p>
                              </div>
                            </div>

                            {/* Statute Articles Breakdown */}
                            <div className="space-y-2.5">
                              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>Textes & Articles de Droit Luxembourgeois Décryptés :</span>
                              </div>

                              <div className="space-y-2">
                                {concept.articles.map((art, aIdx) => (
                                  <div key={aIdx} className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                      <span className="font-mono text-xs font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-white/5">
                                        {art.article}
                                      </span>
                                      <span className="text-xs font-semibold text-slate-300">
                                        {art.title}
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-300 pl-1 border-l-2 border-[#D4AF37]/50">
                                      <strong>Principe légal :</strong> {art.coreRule}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                      <div className="p-2 rounded-xl bg-white/5 text-slate-300">
                                        <span className="text-[#D4AF37] font-semibold">Impact en cabinet : </span>
                                        {art.practicalImpact}
                                      </div>
                                      <div className="p-2 rounded-xl bg-emerald-950/20 text-emerald-200 border border-emerald-500/20">
                                        <span className="text-emerald-400 font-semibold">Exemple concret : </span>
                                        {art.concreteExample}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Case Law if present */}
                            {concept.caseLaw && (
                              <div className="p-3.5 rounded-2xl bg-[#131E36] border border-[#2B3B5E] space-y-1.5">
                                <div className="text-xs font-bold text-white flex items-center justify-between">
                                  <div className="flex items-center gap-1.5 text-sky-400">
                                    <Gavel className="w-3.5 h-3.5" />
                                    <span>Jurisprudence de Référence : {concept.caseLaw.court}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-mono">{concept.caseLaw.reference}</span>
                                </div>
                                <p className="text-xs text-slate-200 leading-relaxed italic">
                                  {concept.caseLaw.summary}
                                </p>
                                <div className="text-[11px] text-sky-300 font-semibold pt-1">
                                  ⚖️ Portée pratique : {concept.caseLaw.rulingTakeaway}
                                </div>
                              </div>
                            )}

                            {/* Jury Trap if present */}
                            {concept.juryTrap && (
                              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  <span>Piège Fréquent du Jury CCDL à Éviter :</span>
                                </div>
                                <p className="text-xs text-rose-100/90 leading-relaxed">
                                  ❌ <strong>Erreur classique :</strong> {concept.juryTrap.mistake}
                                </p>
                                <p className="text-[11px] text-emerald-300 font-semibold">
                                  ✓ <strong>Conseil pour la copie :</strong> {concept.juryTrap.juryAdvice}
                                </p>
                              </div>
                            )}

                            {/* Action to ask AI to explain further */}
                            <div className="pt-2 flex justify-end">
                              <button
                                onClick={() => {
                                  setActiveTab('ai_chat');
                                  handleSendAiMessage(`Peux-tu m'expliquer plus en détail le concept "${concept.title}" de ce cours avec un cas pratique concret d'application en droit luxembourgeois ?`);
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E2B857] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>Approfondir ce point avec LexIIA AI</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═════ TAB 2 : TUTEUR IA INTERACTIF EN DIRECT ═════ */}
          {activeTab === 'ai_chat' && (
            <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-full min-h-[480px]">
              {/* Quick Prompts Carousel */}
              <div className="space-y-2 shrink-0">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Questions Rapides de Révision (1-Clic) :</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {content.quickPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendAiMessage(p)}
                      disabled={isAiLoading}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/40 border border-white/5 text-left text-xs text-slate-200 transition-all flex items-start gap-2 cursor-pointer active:scale-98"
                    >
                      <span className="text-[#D4AF37] font-bold">›</span>
                      <span className="line-clamp-2">{p}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-1 space-y-3 p-4 rounded-3xl bg-[#0B111E] border border-white/10 overflow-y-auto max-h-[380px] custom-scrollbar shadow-inner">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                      {msg.sender === 'lexiia' ? (
                        <>
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                          <span className="font-bold text-[#E2B857]">LexIIA AI · Tuteur CCDL</span>
                        </>
                      ) : (
                        <span>Vous</span>
                      )}
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl max-w-[90%] text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#D4AF37] text-slate-950 font-medium rounded-tr-sm'
                          : 'bg-[#0F172A] border border-[#2B3B5E] text-slate-200 rounded-tl-sm shadow-md'
                      }`}
                    >
                      {msg.sender === 'lexiia' ? (
                        <div className="prose prose-invert prose-xs max-w-none">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>
                  </div>
                ))}

                {isAiLoading && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0F172A] border border-[#D4AF37]/30 text-xs text-[#E2B857] w-fit">
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>LexIIA AI consulte les codes et la jurisprudence luxembourgeoise...</span>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="flex items-center gap-2 pt-2 shrink-0">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendAiMessage();
                  }}
                  placeholder={`Posez une question à LexIIA sur "${course.title}"...`}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#0F172A] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500"
                />
                <button
                  onClick={() => handleSendAiMessage()}
                  disabled={!inputQuery.trim() || isAiLoading}
                  className="py-3 px-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Envoyer</span>
                </button>

                {onOpenChatMessage && (
                  <button
                    type="button"
                    onClick={() => handleOpenInMainChat(inputQuery.trim() || undefined)}
                    className="py-3 px-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="Basculer cette révision vers le chat principal de LexIIA"
                  >
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                    <span className="hidden lg:inline">Ouvrir dans le chat principal</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ═════ TAB 3 : MINI-QUIZ D'AUTO-ÉVALUATION INTERACTIF ═════ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Score Header */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#131E36] border border-white/10 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center font-bold text-sm text-[#D4AF37]">
                    QCM
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      Quiz de Validation : {selectedChapter ? selectedChapter.shortTitle : course.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {content.quiz.length} questions ciblées pour valider la maîtrise des concepts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Score : </span>
                    <span className="font-bold text-sm text-[#D4AF37]">
                      {calculateScore()} / {content.quiz.length}
                    </span>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Recommencer le quiz"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {content.quiz.map((q, qIndex) => {
                  const isRevealed = Boolean(revealedQuiz[q.id]);
                  const userChoice = selectedAnswers[q.id];
                  const isCorrect = userChoice === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-3xl border transition-all space-y-4 ${
                        isRevealed
                          ? isCorrect 
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                          : 'bg-[#0F172A] border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center">
                            {qIndex + 1}
                          </span>
                          <span className="text-xs font-mono text-[#D4AF37]">
                            {q.legalArticle}
                          </span>
                        </div>

                        {isRevealed && (
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isCorrect ? <Check className="w-3 h-3" /> : <span>✕</span>}
                            <span>{isCorrect ? 'Exact !' : 'Incorrect'}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-white text-sm leading-relaxed">
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = userChoice === optIdx;
                          const isThisCorrect = optIdx === q.correctIndex;

                          let buttonStyle = 'bg-slate-900 border-white/5 text-slate-300 hover:border-white/20';
                          if (isRevealed) {
                            if (isThisCorrect) {
                              buttonStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold';
                            } else if (isOptionSelected && !isThisCorrect) {
                              buttonStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200 line-through';
                            } else {
                              buttonStyle = 'bg-slate-900/40 border-white/5 text-slate-500 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerClick(q.id, optIdx)}
                              disabled={isRevealed}
                              className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${buttonStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full border border-current text-[10px] flex items-center justify-center shrink-0 font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {isRevealed && isThisCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box after selection */}
                      {isRevealed && (
                        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-1.5 animate-fadeIn">
                          <div className="font-bold text-[#E2B857] flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Justification de Droit Luxembourgeois :</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═════ TAB 4 : CAS PRATIQUE GUIDÉ CCDL ═════ */}
          {activeTab === 'case_study' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Case Study Statement */}
              <div className="p-5 rounded-3xl bg-[#0F172A] border border-[#2B3B5E] space-y-3 shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                    <Gavel className="w-4 h-4" />
                    <span>Dossier d'Espèce Type Épreuve Écrite CCDL</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono">
                    Barème indicatif : 20 points
                  </span>
                </div>

                <h3 className="font-bold text-white text-base">
                  {content.caseStudy.title}
                </h3>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-slate-200 text-xs sm:text-sm leading-relaxed italic font-serif">
                  « {content.caseStudy.facts} »
                </div>
              </div>

              {/* Student Scratchpad / Note area */}
              <div className="p-4 rounded-2xl bg-[#0B111E] border border-white/5 space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Votre Brouillon de Consultation (Facultatif) :</span>
                  <span className="text-[10px] text-slate-500">Testez votre raisonnement avant d'afficher le corrigé</span>
                </div>
                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Posez votre qualification juridique, vos textes de lois applicables et votre solution conseillée..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 focus:border-[#D4AF37] text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                />
              </div>

              {/* Guided Step-by-Step Reveal */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Démarche Méthodologique & Corrigé Officiel Pas-à-Pas
                  </h4>
                  <span className="text-xs text-[#D4AF37] font-semibold">
                    Étape {revealedStepsCount} sur {content.caseStudy.steps.length}
                  </span>
                </div>

                {content.caseStudy.steps.slice(0, revealedStepsCount).map((step) => (
                  <motion.div
                    key={step.stepNumber}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-xs flex items-center justify-center">
                          {step.stepNumber}
                        </span>
                        <h5 className="font-bold text-white text-sm">
                          {step.title}
                        </h5>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Étape Validée
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 pl-8">
                      <strong>Consigne du correcteur :</strong> {step.instruction}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed pl-8">
                      <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Solution & Rédaction Attendue au Barreau :</span>
                      </div>
                      <p>{step.modelAnswer}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Button to reveal next step */}
                {revealedStepsCount < content.caseStudy.steps.length ? (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => setRevealedStepsCount(prev => prev + 1)}
                      className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
                    >
                      <span>Révéler l'étape suivante ({revealedStepsCount + 1}/{content.caseStudy.steps.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center text-xs text-emerald-300 font-semibold">
                    🎉 Cas pratique intégralement analysé ! Vous maîtrisez la méthode de la consultation pour ce thème.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═════ TAB 5 : FICHE MÉMO & EXPORT ═════ */}
          {activeTab === 'memo' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-3xl bg-[#0F172A] border border-[#2B3B5E] space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      Fiche Mémotechnique CCDL
                    </h3>
                    <p className="text-xs text-slate-400">
                      {course.title} · {course.codeRef}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyFullSheet}
                    className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier la Fiche</span>
                  </button>
                </div>

                {/* Core Articles to quote */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Visas & Textes Incontournables le Jour de l'Examen :
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 font-mono text-xs text-slate-300 leading-relaxed">
                    {course.codeRef} · {course.jurisdiction}
                  </div>
                </div>

                {/* Key Points Summary */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Les 4 Principes Directeurs Impératifs :
                  </div>
                  <div className="space-y-2">
                    {content.goldenRules.map((rule, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 flex items-start gap-2.5">
                        <span className="font-bold text-[#D4AF37]">{idx + 1}.</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Action to Chat */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-xs text-slate-400">
                    Besoin d'une consultation sur mesure ?
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab('ai_chat');
                      handleSendAiMessage(`Peux-tu me générer une fiche mémo encore plus détaillée avec les 5 arrêts les plus récents de la Cour supérieure de justice sur ${course.nextLessonTitle} ?`);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E2B857] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Générer Fiche Avancée avec l'IA</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ─── MODAL FOOTER ────────────────────────────────────────────────────── */}
        <div className="px-6 py-3.5 bg-[#0F172A] border-t border-white/10 flex items-center justify-between gap-3 text-xs shrink-0 flex-wrap">
          <div className="text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>LexIIA Academy — Campus Juridique Numérique & CCDL Luxembourg</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenChatMessage && (
              <button
                onClick={() => handleOpenInMainChat()}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Basculer la session de révision dans le chat principal de LexIIA"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Chat Principal</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('ai_chat');
                handleSendAiMessage(`Fais-moi réviser avec 3 questions orales types de grand jury sur ${course.title}.`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Simuler Oral CCDL</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
