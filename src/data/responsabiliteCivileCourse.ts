import type { CourseChapter, CourseInteractiveContent } from '../components/InteractiveCourseRevisionModal';

export const RESPONSABILITE_CIVILE_CHAPTERS: CourseChapter[] = [
  {
    id: 'ch1_intro',
    title: "Introduction : Positionnement et Délimitation de la Matière",
    shortTitle: "1. Intro & Délimitation",
    summaryIntro: "Délimitation de la responsabilité civile au Grand-Duché : coexistence des ordres civil et pénal, compétence exclusive des juridictions judiciaires pour les litiges contre la puissance publique (Article 84 de la Constitution - rejet de l'arrêt Blanco), et règle fondamentale du non-cumul des responsabilités contractuelle et délictuelle.",
    goldenRules: [
      "Article 84 de la Constitution luxembourgeoise : toute action en responsabilité, même dirigée contre l'État ou une commune, relève de la compétence exclusive des tribunaux civils de l'ordre judiciaire (rejet du dualisme juridictionnel français de l'arrêt Blanco de 1873).",
      "Les juridictions administratives luxembourgeoises (Tribunal et Cour administrative) ne sont JAMAIS compétentes pour allouer des dommages et intérêts !",
      "La règle de non-cumul interdit à un contractant d'agir sur le fondement délictuel (Art. 1382) lorsque le dommage résulte de l'inexécution d'un contrat valide : l'action délictuelle est irrecevable au fond.",
      "L'action fondée sur l'enrichissement sans cause (quasi-contrat d'origine prétorienne) possède un caractère strictement subsidiaire, exclue si une autre action est ouverte."
    ],
    concepts: [
      {
        id: 'c1_admin_judiciaire',
        title: "1. Responsabilités Civile et Administrative : L'Article 84 de la Constitution",
        simpleExplanation: "En France, si l'État commet une faute, on va devant le juge administratif (arrêt Blanco). Au Luxembourg, c'est l'inverse absolu ! L'article 84 de la Constitution donne aux seuls tribunaux judiciaires civils le pouvoir de juger toute demande de dommages et intérêts, même contre un ministre, l'État ou un hôpital public.",
        rigorousDefinition: "Au Luxembourg, la répartition des compétences entre juridictions judiciaires et administratives s'opère non en fonction des sujets de droit (personnes privées ou autorités publiques), mais en fonction de l'objet du droit (créance de réparation = droit civil). L'action relève exclusivement des tribunaux judiciaires et obéit aux règles de droit commun de la responsabilité civile.",
        articles: [
          {
            article: "Article 84 de la Constitution luxembourgeoise",
            title: "Compétence exclusive des tribunaux judiciaires",
            coreRule: "Les contestations qui ont pour objet des droits civils sont exclusivement du ressort des tribunaux judiciaires.",
            practicalImpact: "Toute créance de réparation constitue un droit civil, interdisant aux juridictions administratives d'allouer des dommages-intérêts.",
            concreteExample: "Une victime d'infection nosocomiale dans un hôpital public à Luxembourg assigne devant le Tribunal d'arrondissement civil, sans distinguer établissement public ou clinique privée."
          }
        ],
        caseLaw: {
          court: "Cour supérieure de justice de Luxembourg",
          date: "Jurisprudence constante confirmée",
          reference: "Pasicrisie luxembourgeoise · G. Ravarani",
          summary: "La Cour rappelle que la réparation du préjudice causé par une décision administrative illégale doit être demandée devant le Tribunal d'arrondissement civil, le cas échéant après annulation par le juge administratif.",
          rulingTakeaway: "Ne jamais réclamer de dommages-intérêts devant le Tribunal administratif luxembourgeois sous peine d'irrecevabilité d'ordre public."
        },
        juryTrap: {
          mistake: "Citer l'arrêt Blanco du Tribunal des conflits français ou prétendre que la responsabilité administrative relève du Tribunal administratif.",
          juryAdvice: "Au CCDL, visez toujours l'article 84 de la Constitution et rappelez l'unité de juridiction pour les droits civils au Grand-Duché."
        }
      },
      {
        id: 'c2_non_cumul_intro',
        title: "2. Les Responsabilités Contractuelle et Délictuelle & Règle du Non-Cumul",
        simpleExplanation: "Si un contrat valide vous lie et que le problème vient du contrat, vous devez plaider sur les articles 1146 et suivants (contractuel). Vous n'avez pas le choix d'aller sur l'article 1382 (délictuel). Vous ne pouvez pas choisir ce qui vous arrange le plus !",
        rigorousDefinition: "Le principe de non-cumul (ou non-option) interdit au créancier d'une obligation contractuelle de se prévaloir des règles de la responsabilité délictuelle contre son débiteur pour un manquement contractuel. L'action délictuelle est irrecevable au fond.",
        articles: [
          {
            article: "Articles 1146 et suivants vs Articles 1382 et suivants",
            title: "Délimitation des champs de responsabilité",
            coreRule: "Le dommage imprévisible n'est réparable qu'en matière délictuelle (en matière contractuelle, l'Art. 1150 exclut le dommage imprévisible sauf dol ou faute lourde).",
            practicalImpact: "La qualification initiale détermine le régime de preuve, la validité des clauses limitatives et la nécessité d'une mise en demeure.",
            concreteExample: "Un acheteur d'un véhicule d'occasion défectueux ne peut pas assigner son vendeur sur l'article 1382 pour vice caché."
          }
        ],
        juryTrap: {
          mistake: "Considérer que le non-cumul est d'ordre public et que le juge doit le soulever d'office.",
          juryAdvice: "La règle du non-cumul n'est pas d'ordre public : si le défendeur ne la soulève pas, le juge luxembourgeois statue sur la base invoquée."
        }
      }
    ],
    quiz: [
      {
        id: 101,
        question: "Au Luxembourg, quelle juridiction est compétente pour condamner une commune à des dommages-intérêts pour un refus illégal d'autorisation de bâtir ?",
        options: [
          "Le Tribunal administratif siégeant au Kirchberg.",
          "Le Tribunal d'arrondissement siégeant en matière civile (Art. 84 Constitution).",
          "La Cour des comptes du Grand-Duché.",
          "Le Conseil d'État statuant au contentieux."
        ],
        correctIndex: 1,
        explanation: "L'article 84 de la Constitution réserve exclusivement aux tribunaux de l'ordre judiciaire les contestations portant sur des droits civils, y compris toute demande indemnitaire contre la puissance publique.",
        legalArticle: "Article 84 de la Constitution luxembourgeoise"
      },
      {
        id: 102,
        question: "L'arrêt Blanco du Tribunal des conflits français (1873) s'applique-t-il au Luxembourg ?",
        options: [
          "Oui, car le droit administratif luxembourgeois est calqué sur le droit français.",
          "Non, la différence est radicale : le contentieux indemnitaire de l'État relève du droit commun et des tribunaux judiciaires.",
          "Oui, mais uniquement pour les marchés publics.",
          "Seulement en cas de faute de service non détachable."
        ],
        correctIndex: 1,
        explanation: "Au Luxembourg, l'arrêt Blanco est expressément rejeté. Toute action en responsabilité contre une autorité publique obéit aux règles de droit commun de la responsabilité civile devant le juge judiciaire.",
        legalArticle: "Art. 84 Constitution et G. Ravarani"
      },
      {
        id: 103,
        question: "Quelle est la sanction procédurale si la victime d'un manquement contractuel assigne son cocontractant sur le fondement de l'article 1382 du Code civil ?",
        options: [
          "Une nullité d'acte pour vice de forme.",
          "Une irrecevabilité de fond tirée de la règle du non-cumul des responsabilités.",
          "Une simple amende civile de 500 €.",
          "La requalification automatique sans débat contradictoire."
        ],
        correctIndex: 1,
        explanation: "L'action délictuelle est irrecevable de fond dès lors qu'une relation contractuelle valide couvrait le fait dommageable.",
        legalArticle: "Principe du non-cumul des responsabilités"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Refus de permis de construire et action indemnitaire contre la commune",
      facts: "Monsieur Schmit demande un permis de bâtir pour une maison unifamiliale à Strassen. Le bourgmestre refuse illégalement. M. Schmit saisit le Tribunal administratif en annulation et obtient gain de cause après 14 mois de procédure. Durant cette attente, les coûts des matériaux ont augmenté de 45 000 € et M. Schmit a déboursé 6 500 € d'honoraires d'avocat. Il souhaite obtenir le remboursement de ces sommes.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Compétence Juridictionnelle",
          instruction: "Déterminez quelle juridiction luxembourgeoise doit être saisie de la demande en dommages-intérêts.",
          modelAnswer: "En vertu de l'article 84 de la Constitution luxembourgeoise, les juridictions administratives ne peuvent allouer de dommages-intérêts. M. Schmit doit assigner la commune de Strassen devant le Tribunal d'arrondissement de Luxembourg siégeant en matière civile."
        },
        {
          stepNumber: 2,
          title: "2. Fondement Légal de l'Action",
          instruction: "Identifiez le texte légal applicable à la responsabilité de la commune.",
          modelAnswer: "L'article 1er alinéa 1er de la loi du 1er septembre 1988 relative à la responsabilité civile de l'État et des collectivités publiques (fonctionnement défectueux du service), combiné avec les articles 1382 et 1383 du Code civil."
        },
        {
          stepNumber: 3,
          title: "3. Théorie de l'Unité de l'Illégalité et de la Faute (Cass. 23 janv. 2025)",
          instruction: "Analysez si l'annulation de la décision administrative suffit à prouver la faute et le préjudice.",
          modelAnswer: "L'illégalité constatée par le juge administratif constitue de plein droit une faute de l'autorité communale (théorie de l'unité de l'illégalité et de la faute). Cependant, selon l'arrêt récent de la Cour de cassation luxembourgeoise du 23 janvier 2025 (n° 12/2025), l'annulation ne suffit pas automatiquement : le demandeur doit encore prouver un préjudice réel, certain et directement causé par le refus fautif."
        },
        {
          stepNumber: 4,
          title: "4. Postes de Préjudice Indemnisables",
          instruction: "Listez les préjudices réparables par le Tribunal civil.",
          modelAnswer: "Sont indemnisables : le surcoût de construction prouvé de 45 000 € (dommage matériel direct) et les frais et honoraires exposés pour faire redresser la décision illégale, sous réserve de production des factures acquittées."
        }
      ]
    },
    quickPrompts: [
      "Pourquoi l'arrêt Blanco est-il inapplicable au Luxembourg (Art. 84 de la Constitution) ?",
      "Quelle est la différence entre quasi-délit (Art. 1383) et délit civil (Art. 1382) en pratique judiciaire ?",
      "À quelles conditions peut-on exercer l'action de in rem verso (enrichissement sans cause) au Luxembourg ?",
      "Comment articuler l'annulation au Tribunal administratif et l'action en D&I devant le Tribunal d'arrondissement ?"
    ]
  },

  {
    id: 'ch2_fait_personnel',
    title: "Chapitre 1 - Section 1 : Le Fait Personnel Extra-contractuel & La Faute",
    shortTitle: "2. Fait Personnel & Faute",
    summaryIntro: "L'imputabilité des auteurs (mineurs assimilés aux adultes sans discernement, majeurs incapables Art. 489-2, personnes morales), la définition de la faute (Planiol, in abstracto, faute la plus légère), l'abus de droit (Art. 6-1, procédure abusive, voies d'exécution) et la responsabilité de l'État pour fonctionnement défectueux (loi du 1er sept. 1988 Art. 1er al. 1er, arrêt Vallée SA, Cass. 23 janvier 2025 n° 12/2025).",
    goldenRules: [
      "La minorité n'est pas une cause d'irresponsabilité civile (Art. 1310 C. civ.) : l'enfant de 2 ans est assimilé à un adulte au regard de l'Art. 1382, la faute civile étant détachée du discernement moral.",
      "Majeurs incapables : l'article 489-2 du Code civil oblige à réparation celui qui cause un dommage sous l'empire d'un trouble mental (démence ou insanité d'esprit).",
      "La faute la plus légère suffit pour engager la responsabilité délictuelle : l'obligation de réparer est à la mesure du dommage, non de la gravité de la faute.",
      "Article 6-1 du Code civil luxembourgeois (loi du 2 juillet 1987) : sanctionne l'acte excédant manifestement l'exercice normal d'un droit et consacre l'action en cessation (texte unique sans équivalent français).",
      "Responsabilité de l'État : l'illégalité d'un acte administratif est synonyme de faute (théorie de l'unité), mais la réparation exige un préjudice certain et en lien direct (Cass. 23 janvier 2025)."
    ],
    concepts: [
      {
        id: 'c2_imputabilite',
        title: "1. L'Imputabilité : Mineurs & Majeurs Incapables (Art. 1310 & 489-2)",
        simpleExplanation: "Même un enfant de 3 ans qui blesse un camarade avec un jouet est civilement responsable sur l'article 1382. On n'exige plus de prouver qu'il avait conscience du bien ou du mal. Pour les personnes souffrant d'un trouble mental, l'article 489-2 oblige également à réparer le dommage.",
        rigorousDefinition: "Détachement de la faute civile de son support moral subjectif : l'acte est imputable dès lors qu'il est objectivement défectueux comparé au modèle abstrait. L'assignation est délivrée contre les parents en qualité d'administrateurs légaux (sur 1382) et en nom personnel (sur 1384 al. 2).",
        articles: [
          {
            article: "Article 489-2 du Code civil luxembourgeois",
            title: "Troubles mentaux et réparation",
            coreRule: "Celui qui a causé un dommage à autrui alors qu'il était sous l'empire d'un trouble mental, n'en est pas moins obligé à réparation.",
            practicalImpact: "Empêche l'auteur de s'exonérer en invoquant la démence ou l'absence de libre arbitre.",
            concreteExample: "Un majeur atteint de crise psychotique qui dégrade des véhicules en stationnement reste tenu à réparation intégrale."
          },
          {
            article: "Article 1310 du Code civil",
            title: "Délits des mineurs",
            coreRule: "Le mineur n'est pas restituable contre les obligations résultant de son délit ou quasi-délit.",
            practicalImpact: "La minorité n'est pas une cause d'irresponsabilité délictuelle.",
            concreteExample: "Un mineur de 14 ans qui allume un feu de broussailles engage sa responsabilité délictuelle personnelle."
          }
        ],
        juryTrap: {
          mistake: "Prétendre qu'un enfant de moins de 7 ans ne peut commettre de faute faute de discernement.",
          juryAdvice: "En droit luxembourgeois moderne, l'enfant sans discernement est assimilé à l'adulte pour l'article 1382 et peut être gardien d'une chose."
        }
      },
      {
        id: 'c2_faute_definition',
        title: "2. Définition de la Faute & Appréciation In Abstracto",
        simpleExplanation: "La faute, c'est violer une règle précise (rouler à 160 km/h au lieu de 130) OU ne pas se comporter comme un homme normalement prudent et avisé (le bon père de famille). Le juge compare le comportement de l'auteur à celui d'un homme moyen dans les mêmes circonstances.",
        rigorousDefinition: "Transgression d'un devoir préexistant (Planiol) ou inobservation du devoir général de prudence et de diligence. Appréciation in abstracto faisant abstraction des faiblesses intellectuelles de l'auteur, mais tenant compte de ses compétences professionnelles accrues (sévérité accrue envers les professionnels).",
        articles: [
          {
            article: "Articles 1382 et 1383 du Code civil",
            title: "Fait générateur délictuel et quasi-délictuel",
            coreRule: "Tout fait quelconque de l'homme, ou toute négligence ou imprudence, qui cause un dommage oblige à le réparer.",
            practicalImpact: "La faute la plus légère suffit. L'omission ou l'abstention pure et simple est pleinement assimilée à l'action.",
            concreteExample: "Un automobiliste omet de déneiger son pare-brise avant de s'engager sur la voie publique."
          }
        ],
        caseLaw: {
          court: "Cour d'appel de Luxembourg",
          date: "Arrêt de principe",
          reference: "Pasicrisie luxembourgeoise",
          summary: "La Cour retient la responsabilité d'une commune pour manquement à son devoir général de prudence en ayant reclassé soudainement un terrain en zone non aedificandi après avoir accordé deux permis, trompant la confiance légitime de l'administré.",
          rulingTakeaway: "Le devoir général de prudence s'impose tant aux personnes publiques qu'aux particuliers."
        }
      },
      {
        id: 'c2_abus_droit',
        title: "3. L'Abus de Droit (Art. 6-1 C. civ.) & Procédure Abusive",
        simpleExplanation: "Avoir un droit ne donne pas le droit d'en abuser pour nuire à autrui. Au Luxembourg, l'article 6-1 permet même au juge d'ordonner la cessation de l'abus. En justice, plaider sans aucun moyen sérieux ou pour faire traîner un procès (procédure dilatoire) est une faute condamnée à des dommages et intérêts.",
        rigorousDefinition: "Article 6-1 du Code civil luxembourgeois : tout acte excédant manifestement l'exercice normal d'un droit n'est pas protégé par la loi, engage la responsabilité de son auteur et donne lieu à une action en cessation. L'abus d'agir en justice se distingue de l'indemnité de procédure (Art. 240 NCPC) qui repose sur la seule équité sans exiger de faute.",
        articles: [
          {
            article: "Article 6-1 du Code civil luxembourgeois (Loi du 2 juillet 1987)",
            title: "Consécration textuelle de l'abus de droit",
            coreRule: "Tout acte ou fait qui excède manifestement, par l'intention, par son objet ou par les circonstances, l'exercice normal d'un droit engage la responsabilité de son auteur.",
            practicalImpact: "Base textuelle autonome propre au Grand-Duché, permettant d'ordonner l'arrêt immédiat du comportement abusif.",
            concreteExample: "Un créancier pratique une saisie-arrêt sur tous les comptes bancaires d'une entreprise pour une créance minime de 1 000 €."
          }
        ],
        juryTrap: {
          mistake: "Confondre la demande pour procédure abusive et vexatoire avec la demande d'indemnité de procédure de l'article 240 NCPC.",
          juryAdvice: "La procédure abusive est une action en D&I fondée sur la faute (Art. 1382 / 6-1). L'article 240 NCPC est fondé exclusivement sur l'équité pour compenser les frais non répétables d'avocat. Les deux peuvent se cumuler."
        }
      },
      {
        id: 'c2_etat_loi_1988',
        title: "4. Responsabilité de l'État pour Fonctionnement Défectueux (Loi 1er sept. 1988)",
        simpleExplanation: "L'État et les communes répondent de leurs services administratifs et judiciaires. L'appréciation de leur faute se fait avec la même sévérité que pour les particuliers (affaire Vallée SA). Si un tribunal administratif annule un acte illégal, c'est une faute, mais il faut encore prouver le préjudice (Cass. 23 janvier 2025).",
        rigorousDefinition: "Article 1er alinéa 1er de la loi du 1er septembre 1988 : responsabilité pour fonctionnement défectueux des services administratifs et judiciaires, sous réserve de l'autorité de la chose jugée. La réformation d'un jugement n'est pas en soi une faute, mais le délai déraisonnable ou la perte de scellés le sont.",
        articles: [
          {
            article: "Loi du 1er septembre 1988, Article 1er alinéa 1er",
            title: "Fonctionnement défectueux des services publics",
            coreRule: "L'État et les autres personnes morales de droit public répondent de tout dommage causé par le fonctionnement défectueux de leurs services, tant administratifs que judiciaires.",
            practicalImpact: "S'applique aux actes réglementaires mal transposés, décisions individuelles illégales et dysfonctionnements de la voirie.",
            concreteExample: "Chute d'un usager causée par l'absence d'éclairage ou de salage d'un trottoir communal verglacé."
          }
        ],
        caseLaw: {
          court: "Cour de cassation de Luxembourg",
          date: "23 Janvier 2025",
          reference: "Arrêt n° 12/2025",
          summary: "La Cour réaffirme que la responsabilité de l'État suppose cumulativement un dysfonctionnement, un préjudice et un lien causal. L'annulation d'un acte administratif illégal caractérise la faute, mais le demandeur doit impérativement établir un préjudice réel et certain directement causé.",
          rulingTakeaway: "Décision essentielle du CCDL 2026-2027 : l'illégalité est une faute, mais le préjudice n'est jamais présumé."
        }
      }
    ],
    quiz: [
      {
        id: 201,
        question: "Selon la jurisprudence luxembourgeoise constante, quelle est la gravité de la faute requise pour engager la responsabilité délictuelle sur l'article 1382 C. civ. ?",
        options: [
          "Une faute lourde ou dolosive.",
          "Une faute d'une exceptionnelle gravité.",
          "La faute la plus légère suffit (toute faute ou négligence).",
          "Une infraction pénale intentionnelle."
        ],
        correctIndex: 2,
        explanation: "En matière délictuelle, le Code civil a abandonné les degrés de faute : la faute la plus légère suffit pour obliger à réparation intégrale du dommage.",
        legalArticle: "Articles 1382 et 1383 du Code civil luxembourgeois"
      },
      {
        id: 202,
        question: "Quelle est la portée de l'arrêt de la Cour de cassation luxembourgeoise du 23 janvier 2025 (n° 12/2025) ?",
        options: [
          "L'annulation d'un acte administratif n'est plus considérée comme une faute.",
          "L'annulation caractérise bien une faute (théorie de l'unité), mais ne suffit pas automatiquement : le demandeur doit encore prouver un préjudice réel, certain et direct.",
          "L'État bénéficie d'une immunité totale pour ses actes réglementaires.",
          "Les tribunaux judiciaires ne peuvent plus juger l'État."
        ],
        correctIndex: 1,
        explanation: "L'arrêt Cass. 23 janvier 2025 confirme que l'illégalité équivaut à la faute, mais rappelle la nécessité impérative d'un préjudice certain et en lien direct.",
        legalArticle: "Cass. lux. 23 janvier 2025, n° 12/2025"
      },
      {
        id: 203,
        question: "En vertu de l'article 6-1 du Code civil luxembourgeois, quelle sanction originale le juge peut-il prononcer en cas d'abus de droit ?",
        options: [
          "Une peine d'emprisonnement avec sursis.",
          "Une action en cessation pour empêcher la persistance dans l'abus, en plus des dommages-intérêts.",
          "La confiscation des biens de l'auteur au profit de l'État.",
          "L'interdiction définitive de plaider en justice."
        ],
        correctIndex: 1,
        explanation: "L'article 6-1 consacre expressément l'action en cessation pour mettre fin à l'exercice abusif d'un droit.",
        legalArticle: "Article 6-1 du Code civil luxembourgeois"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Directive européenne non transposée et préjudice commercial",
      facts: "L'État du Grand-Duché de Luxembourg omet de transposer dans le délai imparti de deux ans une directive européenne harmonisant les normes sanitaires pour les entreprises artisanales. Une société luxembourgeoise de boucherie est bloquée à l'exportation vers l'Allemagne faute de certificat de conformité européen disponible au Luxembourg. Elle subit une perte d'exploitation de 80 000 €.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Qualification du Fait Générateur",
          instruction: "Analysez si le retard ou le défaut de transposition d'une directive constitue une faute de l'État.",
          modelAnswer: "En droit luxembourgeois, l'omission de transposer une directive européenne endéans le délai imparti constitue un manquement fautif engageant la responsabilité de l'État sur le fondement de l'article 1er alinéa 1er de la loi du 1er septembre 1988."
        },
        {
          stepNumber: 2,
          title: "2. Juridiction Compétente",
          instruction: "Identifiez le tribunal compétent au Grand-Duché.",
          modelAnswer: "Le Tribunal d'arrondissement de Luxembourg siégeant en matière civile (Art. 84 Constitution luxembourgeoise)."
        },
        {
          stepNumber: 3,
          title: "3. Preuve du Préjudice et du Lien Causal (Cass. 23 janv. 2025)",
          instruction: "Précisez les exigences probatoires pesant sur l'entreprise exportatrice.",
          modelAnswer: "La société doit établir que son préjudice est certain et direct (commandes allemandes effectives annulées, bilans comptables), et non purement hypothétique."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion et Demande en Justice",
          instruction: "Formulez le dispositif de l'assignation contre l'État.",
          modelAnswer: "Assigner l'État du Grand-Duché représenté par son Ministre d'État en paiement de 80 000 € à titre de dommages-intérêts avec intérêts légaux et indemnité de procédure (Art. 240 NCPC)."
        }
      ]
    },
    quickPrompts: [
      "Comment la Cour de cassation luxembourgeoise apprécie-t-elle la faute d'une autorité publique (affaire Vallée SA) ?",
      "Quelle est la différence fondamentale entre l'article 6-1 C. civ. et l'abus de droit prétorien français ?",
      "Dans quelles conditions une saisie-arrêt peut-elle être qualifiée de procédure abusive ?",
      "Quelles sont les conditions pour engager la responsabilité de l'État du fait du fonctionnement défectueux de la justice ?"
    ]
  },

  {
    id: 'ch3_sans_faute',
    title: "Chapitre 1 - Section 1 (§2) : La Responsabilité Sans Faute & Troubles de Voisinage",
    shortTitle: "3. Sans Faute & Art. 544",
    summaryIntro: "La responsabilité objective sans faute : la théorie des troubles anormaux du voisinage de l'article 544 du Code civil (propriétaire seul auteur, responsabilité de plein droit, force majeure et tiers inopposables), et les régimes étatiques sans faute (Loi 1988 Art. 1 al. 2 dommage spécial et exceptionnel, détention préventive injustifiée loi 1981, collaborateurs du service public Art. 2).",
    goldenRules: [
      "Article 544 du Code civil : responsabilité objective de plein droit du propriétaire maître de l'ouvrage en cas de trouble excédant les inconvénients normaux du voisinage rompant l'équilibre entre des droits équivalents.",
      "Seul le PROPRIÉTAIRE peut être défendeur sur l'article 544 (l'action directe contre l'entrepreneur est irrecevable sur 544).",
      "L'auteur du trouble ne peut JAMAIS s'exonérer par la force majeure (tempête, intempéries) ni par le fait d'un tiers !",
      "L'existence d'une autorisation administrative régulière n'exonère nullement le propriétaire de son obligation d'indemniser le voisin.",
      "L'article 1er alinéa 2 de la loi du 1er septembre 1988 exige un dommage spécial et exceptionnel rompant l'égalité devant les charges publiques."
    ],
    concepts: [
      {
        id: 'c3_troubles_voisinage',
        title: "1. Troubles Anormaux du Voisinage (Art. 544 C. civ.) : Régime & Responsabilité Objective",
        simpleExplanation: "Si des travaux chez votre voisin fissurent votre mur ou provoquent un bruit intolérable, votre voisin propriétaire doit réparer, MÊME S'IL N'A COMMIS AUCUNE FAUTE et même s'il avait tous les permis ! L'entrepreneur ne peut pas être attaqué sur l'article 544, seul le propriétaire voisin l'est.",
        rigorousDefinition: "Responsabilité de plein droit consacrée par l'article 544 du Code civil (loi du 2 juillet 1987). Le trouble suppose un dommage excessif ayant pour cause un fait non fautif du propriétaire usant de son droit. Aucune durabilité n'est exigée : un fait unique d'excavation ou de terrassement suffit.",
        articles: [
          {
            article: "Article 544 du Code civil luxembourgeois",
            title: "Droit de propriété et troubles de voisinage",
            coreRule: "La propriété est le droit de jouir et disposer des choses, pourvu qu'on ne cause un trouble excédant les inconvénients normaux du voisinage rompant l'équilibre entre des droits équivalents.",
            practicalImpact: "Fondement autonome ne nécessitant aucune faute. L'entrepreneur n'est pas propriétaire donc irrecevable sur ce texte.",
            concreteExample: "Des travaux d'excavation pour un parking sous-terrain provoquent l'affaissement de la terrasse de l'immeuble contigu."
          }
        ],
        caseLaw: {
          court: "Cour de cassation de Luxembourg",
          date: "Arrêt de principe",
          reference: "Pasicrisie luxembourgeoise",
          summary: "La Cour de cassation juge que l'article 544 institue une responsabilité particulière au propriétaire, non conditionnée par la faute de celui-ci ni effacée par le fait d'autrui ou la force majeure.",
          rulingTakeaway: "Le propriétaire condamné sur 544 dispose d'un recours intégral contre l'entrepreneur fautif sur le terrain contractuel ou subrogatoire (Art. 1252-3° C. civ.)."
        },
        juryTrap: {
          mistake: "Assigner l'architecte ou l'entrepreneur sur le fondement de l'article 544 du Code civil.",
          juryAdvice: "Sur 544, assignez TOUJOURS le propriétaire voisin. Assignez l'entrepreneur sur les articles 1382/1384 al. 1er ou laissez le propriétaire l'appeler en garantie."
        }
      },
      {
        id: 'c3_etat_sans_faute',
        title: "2. Les Responsabilités Sans Faute de la Puissance Publique",
        simpleExplanation: "Parfois l'administration n'a pas commis de faute, mais son action crée un sacrifice anormal pour un seul citoyen (ex: rue barrée 8 mois pour travaux d'utilité publique, ruine d'un commerce). L'article 1 alinéa 2 de la loi de 1988 permet d'être indemnisé au nom de l'égalité devant les charges publiques.",
        rigorousDefinition: "Régime de responsabilité sans faute de l'État et des collectivités publiques (Art. 1 al. 2 loi 1988) : suppose un dommage spécial (atteignant une personne isolée et non la collectivité) et exceptionnel (dépassant les sujétions normales de la vie en société), non imputable à la victime.",
        articles: [
          {
            article: "Loi du 1er septembre 1988, Article 1er alinéa 2",
            title: "Responsabilité sans faute pour rupture d'égalité",
            coreRule: "Lorsqu'il serait inéquitable de laisser le préjudice à charge de l'administré, indemnisation est due sans fonctionnement défectueux, à condition que le dommage soit spécial et exceptionnel.",
            practicalImpact: "Fonde un véritable droit subjectif à réparation dès que les critères sont réunis.",
            concreteExample: "Un passant est blessé par un tir de riposte légitime lors d'une poursuite de police contre un braqueur."
          },
          {
            article: "Loi du 30 décembre 1981",
            title: "Détention préventive inopérante",
            coreRule: "Toute personne soumise à une détention préventive de plus de trois jours bénéficiant d'un non-lieu ou d'un acquittement a droit à une indemnisation intégrale.",
            practicalImpact: "Réparation automatique des préjudices moral et matériel sauf si l'inculpé a provoqué l'arrestation par ses aveux mensongers.",
            concreteExample: "Un suspect innocent détenu pendant 4 mois à Schrassig avant ordonnance de non-lieu de la chambre du conseil."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 301,
        question: "Un propriétaire voisin condamné sur l'article 544 du Code civil pour des fissures causées par un chantier peut-il s'exonérer en prouvant la faute exclusive de son entrepreneur ?",
        options: [
          "Oui, la faute du tiers constitue un moyen péremptoire d'exonération.",
          "Non, la responsabilité sur l'article 544 est de plein droit et n'est pas effacée par le fait d'autrui (il conserve seulement une action récursoire).",
          "Oui, si l'entrepreneur est en faillite.",
          "Uniquement avec l'accord de la chambre des métiers."
        ],
        correctIndex: 1,
        explanation: "La responsabilité du propriétaire sur l'article 544 est objective et inconditionnée : il répond des désordres envers son voisin et doit ensuite agir en garantie contre l'entrepreneur.",
        legalArticle: "Article 544 du Code civil luxembourgeois"
      },
      {
        id: 302,
        question: "La théorie des troubles anormaux du voisinage exige-t-elle la répétition et la durabilité du trouble pour être applicable ?",
        options: [
          "Oui, les troubles instantanés sont toujours exclus.",
          "Non, la jurisprudence luxembourgeoise admet qu'un fait unique de chantier (excavation, terrassement) suffit à caractériser le trouble anormal.",
          "Il faut au moins 6 mois de nuisances ininterrompues.",
          "Seules les nuisances sonores nocturnes sont admises."
        ],
        correctIndex: 1,
        explanation: "La jurisprudence a abandonné l'exigence stricte de durabilité : un acte unique de travaux immobiliers ayant déstabilisé le fonds voisin engage l'article 544.",
        legalArticle: "Jurisprudence constante CCDL Art. 544"
      },
      {
        id: 303,
        question: "Quelle condition est indispensable pour qu'un collaborateur bénévole d'un service public soit indemnisé en vertu de l'article 2 de la loi du 1er septembre 1988 ?",
        options: [
          "Avoir signé un contrat préalable avec le bourgmestre.",
          "Agir de manière désintéressée, et en cas de collaboration spontanée, que celle-ci ait été commandée par une urgente nécessité.",
          "Être titulaire d'un diplôme de secouriste de la Croix-Rouge.",
          "Ne subir aucun préjudice corporel."
        ],
        correctIndex: 1,
        explanation: "L'article 2 exige une collaboration désintéressée (excluant les professionnels de sécurité privée) et une urgente nécessité pour les interventions spontanées.",
        legalArticle: "Loi du 1er septembre 1988, Article 2"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Chantier autorisé, effondrement partiel et force majeure climatique",
      facts: "La société 'Promotion Belair SA' entreprend la construction d'une résidence à Luxembourg-Ville. Tous les permis de bâtir et autorisations de voirie ont été régulièrement délivrés. Lors d'un orage d'été violent mais non inédit, une fouille de 6 mètres s'effondre, entraînant l'affaissement du jardin et du garage de la villa voisine de la famille Schmit. Belair SA refuse toute indemnisation en invoquant le respect scrupuleux de l'autorisation communale et la force majeure climatique.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Fondement Juridique de la Demande",
          instruction: "Déterminez le fondement le plus efficace pour la famille Schmit.",
          modelAnswer: "L'article 544 du Code civil luxembourgeois (troubles anormaux du voisinage). Il dispense d'avoir à prouver la moindre faute de conception ou d'exécution des travaux."
        },
        {
          stepNumber: 2,
          title: "2. Rejet de l'Argument Tiré de l'Autorisation Administrative",
          instruction: "Répondez au moyen de défense de la société prométrice tiré des permis communaux.",
          modelAnswer: "En droit luxembourgeois constant, la conformité aux autorisations administratives n'a aucun effet justificatif et n'exclut nullement l'existence de troubles excédant les inconvénients normaux du voisinage."
        },
        {
          stepNumber: 3,
          title: "3. Rejet de l'Exonération pour Force Majeure sous l'Article 544",
          instruction: "Analysez si la société peut invoquer l'orage pour s'exonérer.",
          modelAnswer: "Non. D'une part, un orage d'été n'est ni imprévisible ni irrésistible au Luxembourg. D'autre part et surtout, la responsabilité de l'article 544 est de plein droit et ne s'efface ni par le fait d'un tiers ni par la force majeure."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion et Réparation",
          instruction: "Précisez l'étendue de la condamnation à solliciter devant le Tribunal civil.",
          modelAnswer: "Condamnation de Promotion Belair SA à la remise en état intégrale du garage et du terrain sous astreinte journalière, ainsi qu'à des dommages-intérêts pour trouble de jouissance et préjudice moral."
        }
      ]
    },
    quickPrompts: [
      "Pourquoi l'autorisation administrative n'exonère-t-elle jamais de l'article 544 C. civ. ?",
      "Comment fonctionne le recours du propriétaire condamné sur l'article 544 contre l'entrepreneur de construction ?",
      "Quels sont les critères du dommage spécial et exceptionnel sous l'article 1er alinéa 2 de la loi de 1988 ?",
      "Dans quelles conditions une victime de détention préventive injustifiée est-elle privée de son droit à réparation ?"
    ]
  },

  {
    id: 'ch4_contractuel',
    title: "Chapitre 1 - Section 1 (§3) : La Défaillance Contractuelle & Aménagements Conventionnels",
    shortTitle: "4. Défaillance Contractuelle",
    summaryIntro: "Le champ contractuel (périodes pré/post-contractuelle, rupture de pourparlers, assistance bénévole, manquement contractuel invoqué par un tiers), obligations accessoires de sécurité et de conseil, distinction fondamentale moyens / résultat (René Demogue), et aménagements de responsabilité : clauses limitatives (Art. 1135-1) et clauses pénales (Art. 1152, 1226, 1231).",
    goldenRules: [
      "Rupture abusive des pourparlers précontractuels : relève du régime délictuel (Art. 1382). Ne donne droit qu'au remboursement des frais et études préalables (le gain manqué et la perte de chance de profit sont exclus).",
      "Le tiers à un contrat peut invoquer sur le fondement délictuel un manquement contractuel dès lors que ce manquement lui a causé un dommage (Cass. ass. plén. 2006, arrêt confirmé par la Cour d'appel de Luxembourg).",
      "Obligations de moyens vs résultat : l'obligation est de moyens s'il existe un aléa dans le résultat (médecin, avocat) ou si le créancier joue un rôle actif ; elle est de résultat si le résultat ne comporte aucun aléa technique.",
      "Clauses exclusives ou limitatives de responsabilité (Art. 1135-1 C. civ.) : valables pour les fautes légères, mais nulles en cas de faute lourde, de dol, ou si elles vident le contrat de son obligation essentielle (arrêt Chronopost).",
      "Clauses pénales (Art. 1152 C. civ.) : évaluation forfaitaire et comminatoire. Le juge peut d'office ou sur demande la modérer si elle est manifestement excessive par rapport au préjudice réellement subi."
    ],
    concepts: [
      {
        id: 'c4_pourparlers_assistance',
        title: "1. Le Champ Contractuel : Pourparlers, Assistance Bénévole & Tiers",
        simpleExplanation: "Si vous négociez un contrat et que l'autre partie rompt brutalement de mauvaise foi après vous avoir fait faire des devis coûteux, elle engage sa responsabilité délictuelle (frais d'études remboursés, mais pas le profit espéré). Si vous donnez un coup de main gratuit pour déménager, les juges créent une 'convention d'assistance bénévole' qui vous protège si vous vous blessez !",
        rigorousDefinition: "Les fautes précontractuelles relèvent de la responsabilité délictuelle. La convention d'assistance bénévole crée une obligation contractuelle accessoire de sécurité à charge de l'assisté en faveur de l'assistant. Enfin, tout manquement contractuel causant un dommage à un tiers permet à ce tiers d'agir en responsabilité délictuelle.",
        articles: [
          {
            article: "Article 1135 du Code civil luxembourgeois",
            title: "Obligations accessoires et équité",
            coreRule: "Les conventions obligent non seulement à ce qui y est exprimé, mais encore à toutes les suites que l'équité, l'usage ou la loi donnent à l'obligation.",
            practicalImpact: "Base légale de la découverte prétorienne de l'obligation de sécurité et de l'obligation de conseil.",
            concreteExample: "Un chirurgien est tenu d'une obligation d'information et de conseil préalable sur les risques opératoires."
          }
        ],
        caseLaw: {
          court: "Cour d'appel de Luxembourg",
          date: "Jurisprudence constante",
          reference: "Cass. ass. plén. 6 oct. 2006 confirmée",
          summary: "La Cour d'appel retient que le tiers à un contrat peut se prévaloir, sur le fondement de la responsabilité délictuelle (1382/1383), du manquement contractuel commis par une partie s'il lui a causé un dommage.",
          rulingTakeaway: "Un manquement contractuel constitue une faute délictuelle vis-à-vis des tiers lésés."
        }
      },
      {
        id: 'c4_moyens_resultat',
        title: "2. Obligations de Moyens vs Obligations de Résultat (René Demogue)",
        simpleExplanation: "Dans une obligation de résultat (ex: taxi qui vous transporte d'un point A à un point B), si le résultat n'est pas là, le débiteur est présumé responsable sans preuve de faute. Dans une obligation de moyens (ex: avocat qui plaide ou médecin qui soigne), le créancier doit obligatoirement prouver une faute pour être indemnisé.",
        rigorousDefinition: "Critères de distinction : existence d'un aléa inhérent à la prestation et attitude active ou passive du créancier. En matière d'infections nosocomiales en clinique, l'obligation de sécurité hospitalière est de résultat. Pour les magasins en libre accès, la responsabilité reste délictuelle (sauf chose prêtée comme un caddie).",
        articles: [
          {
            article: "Article 1147 du Code civil",
            title: "Obligation de résultat et cause étrangère",
            coreRule: "Le débiteur est condamné au paiement de dommages-intérêts toutes les fois qu'il ne justifie pas que l'inexécution provient d'une cause étrangère.",
            practicalImpact: "Présomption de responsabilité : le doute profite au créancier.",
            concreteExample: "Un garagiste réparateur de freins ne peut s'exonérer qu'en prouvant un cas de force majeure."
          },
          {
            article: "Article 1137 du Code civil",
            title: "Obligation de moyens et soins du bon père de famille",
            coreRule: "L'obligation soumet celui qui en est chargé à y apporter tous les soins d'un bon père de famille.",
            practicalImpact: "La charge de la preuve de la négligence ou faute repose sur le créancier.",
            concreteExample: "Un avocat plaidant une affaire difficile sans garantie de succès."
          }
        ],
        juryTrap: {
          mistake: "Affirmer que l'avocat n'a QUE des obligations de moyens.",
          juryAdvice: "L'avocat a une obligation de moyens pour le conseil et la plaidoirie, mais une obligation de résultat absolue pour le respect des délais de procédure (délai d'appel de 40 jours)."
        }
      },
      {
        id: 'c4_clauses_penales',
        title: "3. Les Aménagements Conventionnels : Clauses Pénales (Art. 1152) & Limitatives",
        simpleExplanation: "Une clause pénale fixe d'avance une somme forfaitaire en cas de rupture de contrat (ex: 10% du prix d'une maison dans un compromis). Le créancier n'a pas à prouver son dommage. Mais depuis 1987, le juge luxembourgeois a le pouvoir de réduire la somme si elle est manifestement excessive.",
        rigorousDefinition: "Articles 1152 et 1231 du Code civil luxembourgeois (loi du 15 mai 1987). La clause pénale a une double fonction indemnitaire et comminatoire. La réduction judiciaire s'apprécie par la disproportion entre le préjudice réel et la peine, la situation des parties et la bonne foi du débiteur.",
        articles: [
          {
            article: "Article 1152 du Code civil luxembourgeois",
            title: "Modération judiciaire des clauses pénales",
            coreRule: "Le juge peut, même d'office, modérer ou augmenter la peine convenue si elle est manifestement excessive ou dérisoire.",
            practicalImpact: "Pouvoir d'ordre public dérogatoire à la force obligatoire du contrat.",
            concreteExample: "Une clause pénale de 20% dans un compromis de vente alors que l'immeuble a été revendu immédiatement sans perte pour le vendeur."
          },
          {
            article: "Article 1135-1 du Code civil",
            title: "Opposabilité des conditions générales",
            coreRule: "Les conditions générales ne sont opposables que si le cocontractant a été en mesure de les connaître lors de la conclusion et les a acceptées.",
            practicalImpact: "Une clause imprimée au verso sans renvoi lisible au recto signé est inopposable.",
            concreteExample: "Une clause limitative imprimée en petits caractères au dos d'une facture délivrée après la vente."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 401,
        question: "En droit luxembourgeois, quels préjudices sont réparables en cas de rupture brutale et fautive des pourparlers contractuels ?",
        options: [
          "L'intégralité du gain manqué et les bénéfices futurs escomptés du contrat.",
          "Uniquement les frais engagés pour la négociation et les études préalables, à l'exclusion du profit escompté.",
          "Une pénalité forfaitaire de 10% du montant envisagé du contrat.",
          "Aucun préjudice car la liberté de rompre les pourparlers est absolue."
        ],
        correctIndex: 1,
        explanation: "Selon la jurisprudence luxembourgeoise constante, le préjudice réparable se limite aux frais de négociation et d'études exposés. Le profit escompté n'est jamais compensé.",
        legalArticle: "Jurisprudence CCDL pourparlers (Ravarani)"
      },
      {
        id: 402,
        question: "Un tiers à un contrat peut-il invoquer l'inexécution d'une obligation contractuelle par l'un des signataires pour obtenir réparation de son dommage ?",
        options: [
          "Non, en vertu du principe absolu de l'effet relatif des contrats (Art. 1165 C. civ.).",
          "Oui, sur le fondement de la responsabilité délictuelle (Art. 1382), le manquement contractuel constituant une faute envers les tiers.",
          "Uniquement si le tiers est l'héritier direct du débiteur.",
          "Seulement si le contrat a été publié au Mémorial."
        ],
        correctIndex: 1,
        explanation: "La Cour d'appel de Luxembourg consacre la règle selon laquelle le tiers peut invoquer sur le terrain délictuel le manquement contractuel qui lui a causé un dommage.",
        legalArticle: "Cour d'appel de Luxembourg et Cass. ass. plén. 2006"
      },
      {
        id: 403,
        question: "Une clause limitative de responsabilité insérée dans un contrat commercial peut-elle valablement exonérer son bénéficiaire en cas de faute lourde ?",
        options: [
          "Oui, entre professionnels la liberté contractuelle est totale.",
          "Non, la jurisprudence constante assimile la faute lourde au dol et refuse qu'elle soit couverte par une clause limitative ou exonératoire.",
          "Oui, à condition d'avoir été validée par un notaire luxembourgeois.",
          "Seulement pour les contrats d'un montant inférieur à 10 000 €."
        ],
        correctIndex: 1,
        explanation: "Les clauses exclusives ou limitatives ne couvrent que les fautes légères. Elles sont inefficaces en cas de dol ou de faute lourde, qui viderait le contrat de sa substance.",
        legalArticle: "Article 1150 C. civ. et jurisprudence Chronopost"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Compromis de vente immobilière, clause pénale et réfaction judiciaire",
      facts: "Monsieur Becker signe un compromis de vente pour acquérir un appartement à Kirchberg pour 900 000 €. Le compromis stipule une clause pénale de 15% (135 000 €) en cas de défaillance de l'une des parties. Becker ne parvient pas à obtenir son prêt et refuse de signer l'acte notarié. Deux semaines plus tard, le vendeur revend l'appartement à un tiers au prix supérieur de 920 000 €. Le vendeur assigne néanmoins Becker pour réclamer l'intégralité des 135 000 € de clause pénale.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Nature et Fonction de la Clause Pénale",
          instruction: "Définissez la qualification juridique de la clause litigieuse (Art. 1226 C. civ.).",
          modelAnswer: "La clause litigieuse est une clause pénale au sens de l'article 1226 du Code civil : évaluation conventionnelle et forfaitaire des dommages-intérêts ayant à la fois une fonction indemnitaire et comminatoire."
        },
        {
          stepNumber: 2,
          title: "2. Faculté de Réduction Judiciaire (Art. 1152 C. civ.)",
          instruction: "Examinez les pouvoirs du juge civil luxembourgeois face au montant stipulé.",
          modelAnswer: "En vertu de l'article 1152 alinéa 2 du Code civil luxembourgeois (loi du 15 mai 1987), le juge peut, même d'office, modérer la peine si elle est manifestement excessive."
        },
        {
          stepNumber: 3,
          title: "3. Application des Critères Jurisprudentiels de Disproportion",
          instruction: "Appliquez les 3 critères cumulatifs dégagés par la jurisprudence luxembourgeoise.",
          modelAnswer: "Le vendeur a revendu le bien immédiatement à un prix supérieur (920 000 € au lieu de 900 000 €), réalisant une plus-value de 20 000 €. L'application stricte de la clause lui procurerait un enrichissement sans commune mesure avec son préjudice réel (qui se limite aux frais de réitération). La clause est donc manifestement excessive."
        },
        {
          stepNumber: 4,
          title: "4. Solution et Décision Prévisible du Tribunal",
          instruction: "Formulez le dispositif prévisible du jugement du Tribunal d'arrondissement.",
          modelAnswer: "Le tribunal réduira la clause pénale de 135 000 € à une somme symbolique ou équivalente aux seuls frais réels de démarches engagés par le vendeur (ex: 3 000 à 5 000 €), rejetant la demande de condamnation à 135 000 €."
        }
      ]
    },
    quickPrompts: [
      "Quels sont les 3 critères cumulatifs de la jurisprudence pour réduire une clause pénale (Art. 1152) ?",
      "Comment se prouve l'acceptation des conditions générales de vente selon l'article 1135-1 C. civ. ?",
      "Quelles sont les conditions strictes pour faire exécuter le contrat aux frais du débiteur sans juge (Art. 1144) ?",
      "Dans quelle mesure l'infection nosocomiale en hôpital relève-t-elle d'une obligation de résultat ?"
    ]
  },

  {
    id: 'ch5_choses',
    title: "Chapitre 1 - Section 2 : La Responsabilité du Fait des Choses Inanimées (Art. 1384 al. 1er)",
    shortTitle: "5. Fait des Choses (1384 al. 1)",
    summaryIntro: "Le principe général de responsabilité du fait des choses inanimées (Art. 1384 al. 1er, arrêt Jand'heur 1930 / Cass. lux. 1931) : notion de chose (meuble/immeuble), fait de la chose (contact matériel vs non-contact, chose inerte vs en mouvement, présomption de rôle actif), notion de garde (usage, direction, contrôle, arrêt Franck, garde alternative), présomption de garde à charge du propriétaire, voies publiques, animaux (Art. 1385) et ruine des bâtiments (Art. 1386).",
    goldenRules: [
      "Contact matériel avec une chose en mouvement = présomption irréfragable de causalité et de rôle actif à charge du gardien (Art. 1384 al. 1er).",
      "Chose inerte (immobile) ou sans contact matériel = aucune présomption de causalité : la victime doit prouver le rôle actif par la position ou le comportement anormal de la chose.",
      "Automobiles en circulation : présumées être en mouvement même temporairement arrêtées à un feu rouge ou stop.",
      "Collision entre deux véhicules : pas de neutralisation réciproque des présomptions de responsabilité, chaque gardien indemnise le dommage causé à l'autre.",
      "La garde est le pouvoir effectif d'usage, de direction et de contrôle exercé en toute indépendance (arrêt Franck) : elle est alternative et non cumulative (le préposé n'en est pas gardien, le commettant l'est)."
    ],
    concepts: [
      {
        id: 'c5_fait_chose_mouvement',
        title: "1. Le Fait de la Chose : Chose en Mouvement vs Chose Inerte",
        simpleExplanation: "Si une voiture qui roule ou une boule de pétanque lancée vous percute (chose en mouvement), la loi présume automatiquement qu'elle a causé le dommage. Mais si vous heurtez un meuble, un escalier ou un trottoir immobile (chose inerte), vous devez obligatoirement prouver qu'il avait une position anormale (trou de 50 cm, dalle surélevée de 3 cm, corde invisible tendue).",
        rigorousDefinition: "L'article 1384 alinéa 1er n'applique la présomption de causalité qu'en cas de contact matériel avec une chose en mouvement. Pour une chose inerte ou sans contact, la chose est présumée avoir joué un rôle passif, sauf preuve contraire d'un rôle actif anormal eu égard à ce qui était raisonnablement prévisible.",
        articles: [
          {
            article: "Article 1384 alinéa 1er du Code civil luxembourgeois",
            title: "Responsabilité du fait des choses sous sa garde",
            coreRule: "On est responsable du dommage causé par le fait des choses que l'on a sous sa garde.",
            practicalImpact: "Responsabilité objective sans faute prouvée pesant sur le gardien.",
            concreteExample: "Un automobiliste percute un piéton : présomption de responsabilité de plein droit à charge du gardien."
          }
        ],
        caseLaw: {
          court: "Cour de cassation de Luxembourg",
          date: "Jurisprudence constante",
          reference: "Pasicrisie luxembourgeoise · G. Ravarani",
          summary: "La Cour rappelle que l'état d'une chose inerte est anormal lorsque, eu égard aux circonstances de temps et de lieu, cet état n'était pas raisonnablement prévisible pour une personne moyennement prudente et diligente.",
          rulingTakeaway: "Un trottoir enneigé alors que la neige n'a pas cessé de tomber n'est pas dans un état anormal."
        }
      },
      {
        id: 'c5_notion_garde',
        title: "2. La Notion de Garde (Arrêt Franck) & Présomption Pesant sur le Propriétaire",
        simpleExplanation: "Le gardien n'est pas forcément le propriétaire : c'est celui qui a le pouvoir réel de se servir de la chose, de décider où elle va et de la surveiller (usage, direction, contrôle). Si votre voiture est volée, le voleur devient gardien (arrêt Franck). Mais la loi présume que le propriétaire est gardien jusqu'à preuve du contraire.",
        rigorousDefinition: "La garde constitue un pouvoir de fait autonome et non un droit. Elle est alternative (un seul gardien pour une chose). Le préposé n'exerce que la détention matérielle pour le compte de son commettant qui demeure gardien. Le propriétaire est présumé gardien jusqu'à preuve d'un transfert contractuel ou involontaire de la garde.",
        articles: [
          {
            article: "Arrêt Franck (Cass. ch. réunies 1941, suivi au Luxembourg)",
            title: "Définition de la garde par l'usage, la direction et le contrôle",
            coreRule: "La garde réside dans l'exercice des pouvoirs effectifs et autonomes d'usage, de direction et de contrôle sur la chose au moment du dommage.",
            practicalImpact: "Permet de décharger le propriétaire dont le véhicule a été dérobé.",
            concreteExample: "Un garagiste réparateur devient gardien du véhicule confié jusqu'à sa restitution au client."
          }
        ],
        juryTrap: {
          mistake: "Confondre garde et détention matérielle, et considérer le salarié comme gardien de la machine de l'usine.",
          juryAdvice: "Le préposé n'est jamais gardien de la chose utilisée pour sa mission : le commettant conserve la garde de la chose inanimée."
        }
      },
      {
        id: 'c5_collision_animaux_ruine',
        title: "3. Collision de Véhicules, Animaux (Art. 1385) & Ruine de Bâtiment (Art. 1386)",
        simpleExplanation: "Si deux voitures se heurtent sans qu'on sache qui est en faute, les deux conducteurs sont présumés responsables l'un envers l'autre ! Pour un chien qui mord, le propriétaire est responsable sans faute (Art. 1385). Pour une tuile qui tombe d'un toit (ruine d'un bâtiment Art. 1386), il faut prouver un vice de construction ou un défaut d'entretien.",
        rigorousDefinition: "En cas de collision réciproque de véhicules, il n'y a pas neutralisation des présomptions : chaque gardien répond du préjudice de l'autre sauf preuve d'une cause d'exonération. L'article 1385 (animaux) obéit aux mêmes règles sans faute que l'article 1384 al. 1er. L'article 1386 exige la preuve d'un vice de construction ou défaut d'entretien.",
        articles: [
          {
            article: "Article 1385 du Code civil",
            title: "Responsabilité du fait des animaux",
            coreRule: "Le propriétaire d'un animal, ou celui qui s'en sert, est responsable du dommage que l'animal a causé, qu'il fût sous sa garde ou égaré.",
            practicalImpact: "Responsabilité sans faute du gardien de l'animal.",
            concreteExample: "Un cheval qui s'échappe d'un pré et cause un accident sur une route départementale."
          },
          {
            article: "Article 1386 du Code civil",
            title: "Ruine des bâtiments",
            coreRule: "Le propriétaire d'un bâtiment est responsable du dommage causé par sa ruine lorsqu'elle provient d'un défaut d'entretien ou d'un vice de construction.",
            practicalImpact: "Exclut le jeu de l'article 1384 al. 1er pour la chute d'éléments incorporés à la construction.",
            concreteExample: "Une cheminée mal entretenue qui s'écroule sur la véranda voisine."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 501,
        question: "Lorsqu'un piéton glisse sur un trottoir municipal et heurte une plaque d'égout immobile, de quoi bénéficie-t-il au titre de l'article 1384 al. 1er C. civ. ?",
        options: [
          "D'une présomption automatique de responsabilité à charge de la commune.",
          "D'aucune présomption : il doit prouver que la chose inerte a joué un rôle actif par l'anomalie de sa position ou de son état.",
          "D'une indemnisation forfaitaire automatique par le Fonds de garantie.",
          "D'une présomption de faute simple."
        ],
        correctIndex: 1,
        explanation: "En cas de contact avec une chose inerte, la chose est présumée avoir joué un rôle passif. La victime doit rapporter la preuve de son anormalité pour déclencher l'article 1384 al. 1er.",
        legalArticle: "Article 1384 alinéa 1er du Code civil"
      },
      {
        id: 502,
        question: "Un automobiliste arrêté à un feu rouge est heurté par l'arrière. Au regard de l'article 1384 al. 1er C. civ., comment son véhicule est-il qualifié ?",
        options: [
          "Comme une chose inerte soumise à la preuve d'une position anormale.",
          "Par exception prétorienne, comme une chose en mouvement participant à la circulation, déclenchant la présomption de causalité.",
          "Comme un bien meuble exonéré de toute garde.",
          "Comme une chose sous garde partagée avec la voirie."
        ],
        correctIndex: 1,
        explanation: "La jurisprudence considère que les automobiles participant à la circulation sont présumées être en mouvement, même lorsqu'elles se trouvent momentanément à l'arrêt devant un feu ou un stop.",
        legalArticle: "Jurisprudence constante accidents de la route (G. Ravarani)"
      },
      {
        id: 503,
        question: "Le propriétaire d'un véhicule dérobé par un voleur qui cause un accident avec ce véhicule reste-t-il gardien au sens de l'article 1384 al. 1er C. civ. ?",
        options: [
          "Oui, car la propriété emporte irrévocablement la garde.",
          "Non, le vol opère un transfert de la garde au profit du voleur qui exerce seul l'usage, la direction et le contrôle (arrêt Franck).",
          "Oui, mais seulement si la voiture n'était pas assurée.",
          "La garde devient commune entre le propriétaire et le voleur."
        ],
        correctIndex: 1,
        explanation: "Depuis l'arrêt Franck, le voleur acquiert les pouvoirs d'usage, de direction et de contrôle sur la chose volée, déchargeant le propriétaire de la qualité de gardien.",
        legalArticle: "Arrêt Franck et jurisprudence luxembourgeoise"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Véhicule confié au garagiste et accident d'essai",
      facts: "Monsieur Thill confie sa berline sportive au garage 'AutoLux SARL' pour une révision des suspensions. Durant l'après-midi, le chef d'atelier prend le véhicule pour effectuer un test sur l'autoroute A3. En cours de trajet, le véhicule dérape sur une flaque d'eau et percute la voiture de Madame Faber. Le garagiste prétend que M. Thill est resté gardien en tant que propriétaire inscrit sur la carte grise.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Détermination de la Garde du Véhicule au Moment du Choc",
          instruction: "Analysez si la remise du véhicule au garagiste a opéré un transfert de garde.",
          modelAnswer: "Oui. En remettant le véhicule à un professionnel de l'automobile pour une réparation ou révision dans le cadre de son activité commerciale, le propriétaire a abandonné les pouvoirs d'usage, de direction et de contrôle. Le garagiste en devient gardien exclusif jusqu'à la restitution."
        },
        {
          stepNumber: 2,
          title: "2. Rejet de la Présomption Pesant sur le Propriétaire",
          instruction: "Appliquez les règles de preuve de la garde (présomption du propriétaire).",
          modelAnswer: "Bien que le propriétaire soit présumé gardien, M. Thill détruit cette présomption en produisant l'ordre de réparation signé prouvant que le véhicule était sous la garde autonome d'AutoLux SARL lors de l'accident."
        },
        {
          stepNumber: 3,
          title: "3. Action de Madame Faber sur l'Article 1384 alinéa 1er",
          instruction: "Précisez contre qui Mme Faber doit diriger son action et quel régime de preuve s'applique.",
          modelAnswer: "Mme Faber doit assigner AutoLux SARL en sa qualité de gardienne de la chose en mouvement au moment du choc. Mme Faber bénéficie de la présomption de causalité et de responsabilité de plein droit de l'article 1384 al. 1er."
        },
        {
          stepNumber: 4,
          title: "4. Conclusion et Exonération du Garagiste ?",
          instruction: "Analysez si la flaque d'eau permet au garagiste de s'exonérer.",
          modelAnswer: "Non. Une simple flaque d'eau sur une autoroute par temps de pluie ne constitue pas un cas de force majeure imprévisible et irrésistible. AutoLux SARL et son assureur RC professionnelle devront indemniser l'intégralité des dommages de Mme Faber."
        }
      ]
    },
    quickPrompts: [
      "Quelles sont les conditions cumulatives pour caractériser la garde selon l'arrêt Franck ?",
      "Comment s'opère le partage en cas de collision réciproque entre deux automobiles sans faute prouvée ?",
      "Quelle est la différence de régime entre l'article 1384 al. 1er et l'article 1386 (ruine des bâtiments) ?",
      "Dans quelles circonstances le corps humain peut-il être considéré comme le prolongement d'une chose sous garde ?"
    ]
  },

  {
    id: 'ch6_autrui',
    title: "Chapitre 1 - Section 3 : La Responsabilité du Fait d'Autrui (Art. 1384 al. 2, 3, 4)",
    shortTitle: "6. Fait d'Autrui",
    summaryIntro: "Les régimes de responsabilité du fait d'autrui : les père et mère pour leurs enfants mineurs (Art. 1384 al. 2 & 5, responsabilité objective de plein droit arrêt Bertrand), les commettants pour leurs préposés (Art. 1384 al. 3, lien de subordination, actes commis dans l'exercice ou à l'occasion des fonctions, et REJET FORMEL DE L'ARRÊT COSTEDOAT au Luxembourg), et le refus d'un principe général de responsabilité du fait d'autrui (rejet de l'arrêt Blieck).",
    goldenRules: [
      "Responsabilité des père et mère (Art. 1384 al. 2 C. civ.) : responsabilité objective de plein droit fondée sur la garde (arrêt Bertrand) ; la preuve de l'absence de faute dans l'éducation ou la surveillance ne permet plus de s'exonérer, seule la force majeure le permet.",
      "REJET FORMEL DE LA JURISPRUDENCE COSTEDOAT AU LUXEMBOURG : la Cour d'appel de Luxembourg refuse d'appliquer l'immunité civile du préposé ; le salarié reste personnellement responsable pour faute délictuelle envers les tiers sur les articles 1382/1383.",
      "Responsabilité des commettants (Art. 1384 al. 3) : engagée dès que l'acte fautif a été commis dans les fonctions, par abus ou seulement à l'occasion des fonctions dès lors qu'il existe un lien de connexité avec la mission.",
      "Recours du commettant contre son préposé : limité par l'article L. 121-9 du Code du travail luxembourgeois qui n'autorise la mise en cause du salarié qu'en cas d'acte volontaire ou de négligence grave.",
      "REJET FORMEL DE L'ARRÊT BLIECK : la jurisprudence luxembourgeoise refuse de consacrer un principe général de responsabilité du fait d'autrui sur l'article 1384 al. 1er."
    ],
    concepts: [
      {
        id: 'c6_parents_bertrand',
        title: "1. Responsabilité des Père et Mère (Art. 1384 al. 2 & 5) : Vers la Responsabilité Objective",
        simpleExplanation: "Si un enfant mineur habitant chez ses parents casse quelque chose ou blesse quelqu'un, les parents sont automatiquement responsables. Ils ne peuvent plus s'en sortir en disant 'j'ai bien surveillé et bien éduqué mon fils' (arrêt Bertrand). Seule la force majeure peut les exonérer, ce qui est quasi-impossible en pratique.",
        rigorousDefinition: "Conditions cumulatives : enfant mineur, lien de filiation direct, autorité parentale (loi du 27 juin 2018), cohabitation (résidence habituelle) et fait dommageable imputable. Depuis l'arrêt Bertrand suivi au Luxembourg, il s'agit d'une responsabilité objective de plein droit frappant de caducité l'alinéa 5 de l'article 1384.",
        articles: [
          {
            article: "Article 1384 alinéas 2 et 5 du Code civil",
            title: "Responsabilité des parents du fait de leurs enfants mineurs",
            coreRule: "Les parents, en tant qu'ils exercent l'autorité parentale, sont solidairement responsables du dommage causé par leurs enfants mineurs habitant avec eux.",
            practicalImpact: "Responsabilité de plein droit ne cédant que devant la force majeure dans le chef des parents.",
            concreteExample: "Un enfant de 11 ans tire accidentellement dans l'œil d'un camarade avec un pistolet à billes."
          }
        ],
        juryTrap: {
          mistake: "Croire que les parents peuvent s'exonérer en prouvant une bonne éducation ou une surveillance irréprochable.",
          juryAdvice: "Au CCDL, citez l'arrêt Bertrand : la présomption de faute est devenue une responsabilité de plein droit où seule la force majeure exonère."
        }
      },
      {
        id: 'c6_commettants_rejet_costedoat',
        title: "2. Commettants du Fait des Préposés (Art. 1384 al. 3) & REJET DE L'ARRÊT COSTEDOAT",
        simpleExplanation: "L'employeur est responsable des fautes commises par ses salariés au travail. MAIS ATTENTION : en France, le salarié ne peut pas être poursuivi personnellement s'il n'a pas dépassé sa mission (arrêt Costedoat). AU LUXEMBOURG, C'EST LE CONTRAIRE : la Cour d'appel a expressément refusé Costedoat ! Le salarié reste personnellement responsable envers la victime sur 1382/1383.",
        rigorousDefinition: "Article 1384 alinéa 3. Lien de subordination juridique ou de fait. Le commettant répond des actes commis dans les fonctions, par abus ou à l'occasion de celles-ci. Arrêt capital de la Cour d'appel de Luxembourg : refus de la règle Costedoat d'irresponsabilité du préposé en raison de la contrariété aux articles 1382 et 1383 du Code civil.",
        articles: [
          {
            article: "Article 1384 alinéa 3 du Code civil",
            title: "Responsabilité des maîtres et commettants",
            coreRule: "Les maîtres et commettants sont responsables du dommage causé par leurs domestiques et préposés dans les fonctions auxquelles ils les ont employés.",
            practicalImpact: "Responsabilité de plein droit sans faute prouvée du commettant.",
            concreteExample: "Un livreur salarié brûle un feu rouge lors d'une livraison et renverse un motard."
          },
          {
            article: "Article L. 121-9 du Code du travail luxembourgeois",
            title: "Risques de l'entreprise et responsabilité du salarié",
            coreRule: "L'employeur supporte les risques engendrés par l'activité de l'entreprise. Le salarié ne supporte que les dégâts causés par ses actes volontaires ou sa négligence grave.",
            practicalImpact: "Limite l'action récursoire de l'employeur contre le salarié aux seules fautes graves.",
            concreteExample: "L'employeur ne peut pas réclamer à son chauffeur le remboursement des dégâts causés par une simple faute d'inattention."
          }
        ],
        caseLaw: {
          court: "Cour d'appel de Luxembourg",
          date: "Arrêt fondamental",
          reference: "Pasicrisie luxembourgeoise",
          summary: "La Cour d'appel écarte formellement l'arrêt Costedoat de la Cour de cassation française : le fait qu'un préposé agisse sans excéder les limites de sa mission ne le soustrait pas à sa responsabilité délictuelle personnelle envers les tiers sur base des articles 1382 et 1383 C. civ.",
          rulingTakeaway: "Spécificité majeure du droit luxembourgeois : la victime peut assigner le préposé et le commettant in solidum."
        }
      },
      {
        id: 'c6_rejet_blieck',
        title: "3. Refus d'un Régime Général du Fait d'Autrui (Rejet de l'Arrêt Blieck)",
        simpleExplanation: "En France, les juges ont inventé une responsabilité générale du fait d'autrui pour les associations gérant des handicapés ou des mineurs (arrêt Blieck). Au Luxembourg, les juges refusent catégoriquement : l'article 1384 al. 1 ne crée pas de responsabilité générale du fait d'autrui. Les cas de responsabilité d'autrui sont strictement limités à ceux prévus par la loi (parents, commettants, artisans).",
        rigorousDefinition: "La Cour d'appel de Luxembourg refuse de conférer une valeur normative autonome à la première phrase de l'article 1384 alinéa 1er ('on est responsable du fait des personnes dont on doit répondre'). Les hypothèses de responsabilité du fait d'autrui sont d'interprétation stricte et limitativement énumérées par les alinéas subséquents.",
        articles: [
          {
            article: "Jurisprudence Cour d'appel de Luxembourg (Rejet Blieck)",
            title: "Limitation stricte des cas de responsabilité du fait d'autrui",
            coreRule: "On ne saurait lire dans l'article 1384 alinéa 1er l'existence d'un principe général de responsabilité civile du fait d'autrui.",
            practicalImpact: "Une fondation ou un centre pénitentiaire ne répond pas de plein droit du délinquant en congé ou de la personne accueillie.",
            concreteExample: "Un détenu en congé pénal commet un vol à main armée : l'État n'est pas responsable de plein droit du fait d'autrui sur 1384 al. 1er."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 601,
        question: "Au Luxembourg, le salarié qui cause un dommage à un tiers dans l'exercice de ses fonctions sans excéder sa mission bénéficie-t-il de l'immunité civile de l'arrêt français Costedoat ?",
        options: [
          "Oui, car la jurisprudence française est toujours suivie à la lettre.",
          "Non, la Cour d'appel de Luxembourg a expressément rejeté l'arrêt Costedoat : le préposé reste personnellement responsable envers la victime sur 1382/1383.",
          "Oui, mais seulement si le contrat de travail est un CDI.",
          "Uniquement avec l'accord écrit de l'employeur."
        ],
        correctIndex: 1,
        explanation: "La Cour d'appel de Luxembourg refuse d'appliquer la règle Costedoat en raison de la contradiction portée aux articles 1382 et 1383 du Code civil.",
        legalArticle: "Cour d'appel de Luxembourg (G. Ravarani)"
      },
      {
        id: 602,
        question: "La jurisprudence luxembourgeoise admet-elle la responsabilité générale du fait d'autrui de l'arrêt d'assemblée plénière Blieck (1991) ?",
        options: [
          "Oui, pour toutes les associations d'encadrement médico-social.",
          "Non, la Cour d'appel refuse d'étendre l'article 1384 al. 1er au-delà des cas limitativement prévus par le Code civil.",
          "Oui, mais uniquement pour les mineurs placés par décision de justice.",
          "Seulement si l'auteur du dommage est insolvable."
        ],
        correctIndex: 1,
        explanation: "Le Luxembourg refuse la création d'un principe général du fait d'autrui sur 1384 al. 1er : les cas de responsabilité réfléchie restent strictement limitatifs.",
        legalArticle: "Jurisprudence Cour d'appel (Rejet Blieck)"
      },
      {
        id: 603,
        question: "À quelle condition un employeur luxembourgeois peut-il exercer une action récursoire contre son salarié après avoir indemnisé la victime d'un accident ?",
        options: [
          "Pour toute faute simple commise par le salarié.",
          "Uniquement si le salarié a commis un acte volontaire ou une négligence grave (Art. L. 121-9 Code du travail).",
          "Automatiquement pour 50% de la somme versée.",
          "Jamais, le recours est formellement interdit."
        ],
        correctIndex: 1,
        explanation: "L'article L. 121-9 du Code du travail met les risques de l'entreprise à charge de l'employeur et n'autorise de recours contre le salarié qu'en cas de négligence grave ou d'acte volontaire.",
        legalArticle: "Article L. 121-9 du Code du travail luxembourgeois"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Salarié fautif, dommage à un tiers et rejet de l'immunité Costedoat",
      facts: "Monsieur Müller, agent d'entretien salarié de la société 'Nettoyage Pro SARL', utilise une cireuse industrielle dans le hall d'entrée d'une banque à Luxembourg. Par inattention, il percute violemment une cliente, Madame Becker, qui chute et se fracture le fémur. L'avocat de Müller soutient que selon l'arrêt Costedoat de la Cour de cassation française, Müller bénéficie d'une immunité civile complète puisqu'il agissait dans les limites de sa mission, de sorte que seule la société Nettoyage Pro peut être assignée.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Responsabilité de l'Employeur Commettant",
          instruction: "Analysez la responsabilité de la société Nettoyage Pro SARL.",
          modelAnswer: "Nettoyage Pro SARL est responsable de plein droit sur le fondement de l'article 1384 alinéa 3 du Code civil, Müller étant son préposé et l'acte ayant été commis dans l'exercice de ses fonctions de nettoyage."
        },
        {
          stepNumber: 2,
          title: "2. Rejet de l'Immunité Costedoat du Préposé en Droit Luxembourgeois",
          instruction: "Répondez au moyen tiré de l'immunité du salarié sous l'arrêt Costedoat.",
          modelAnswer: "La position de l'avocat de Müller est erronée en droit luxembourgeois. La Cour d'appel de Luxembourg a expressément écarté la jurisprudence Costedoat, considérant qu'un salarié reste personnellement responsable de ses fautes délictuelles envers les tiers sur le fondement des articles 1382 et 1383 du Code civil."
        },
        {
          stepNumber: 3,
          title: "3. Articulation de l'Assignation",
          instruction: "Indiquez contre qui Mme Becker doit diriger son action en justice.",
          modelAnswer: "Mme Becker peut assigner conjointement Müller (sur 1382/1383) et son employeur Nettoyage Pro SARL (sur 1384 al. 3 et en qualité de gardien de la machine sur 1384 al. 1), en sollicitant leur condamnation in solidum."
        },
        {
          stepNumber: 4,
          title: "4. Recours Interne entre l'Employeur et le Salarié",
          instruction: "Analysez si la société d'entretien pourra se faire rembourser par Müller.",
          modelAnswer: "En vertu de l'article L. 121-9 du Code du travail, l'employeur ne pourra exercer de recours contre Müller que s'il démontre une négligence grave ou un acte volontaire. Une simple faute d'inattention légère sera supportée définitivement par l'employeur et son assureur."
        }
      ]
    },
    quickPrompts: [
      "Pourquoi la Cour d'appel de Luxembourg a-t-elle refusé d'appliquer l'arrêt Costedoat ?",
      "Quelles sont les conditions de cohabitation sous l'article 1384 al. 2 en cas de divorce des parents ?",
      "Comment s'articule la responsabilité des commettants avec celle du gardien de la chose inanimée (Art. 1384 al. 1) ?",
      "Pourquoi l'article 1384 al. 1er ne permet-il pas de consacrer un régime général du fait d'autrui au Luxembourg ?"
    ]
  },

  {
    id: 'ch7_causalite',
    title: "Chapitre 2 : Le Lien de Causalité & L'Exonération",
    shortTitle: "7. Causalité & Exonération",
    summaryIntro: "Les théories de la causalité (équivalence des conditions vs causalité adéquate), pluralité de causes et dommage unique (condamnation in solidum, création prétorienne d'ordre public, recours entre coresponsables selon la contribution causale), cause inconnue (Fonds de garantie automobile loi 2003), et causes d'exonération : force majeure (extériorité, imprévisibilité, irrésistibilité), faits justificatifs (Art. 70 CP), faute de la victime (partage - rejet de Desmares) et rôle passif de la chose.",
    goldenRules: [
      "La jurisprudence luxembourgeoise retient la théorie de la causalité adéquate : le dommage est rattaché à l'antécédent qui, dans le cours normal des choses et selon l'expérience de la vie, devait probablement entraîner le dommage.",
      "Pluralité d'auteurs et dommage unique : condamnation IN SOLIDUM de plein droit de tous les coauteurs, protégeant la victime contre l'insolvabilité de l'un d'eux ; chacun est tenu pour la totalité.",
      "Recours entre coresponsables : fixé dans la proportion de la contribution causale de chaque faute au dommage (parts égales en 1384 al. 1). Le gardien condamné sur 1384 al. 1 a un recours intégral contre l'auteur fautif condamné sur 1382.",
      "Cause étrangère exonératoire (force majeure) : suppose l'extériorité (le vice interne de la chose ou la maladie est exclu), l'imprévisibilité et l'irrésistibilité.",
      "Faute de la victime : exonère totalement le gardien si elle présente les caractères de la force majeure, et partiellement selon sa contribution causale (rejet formel de l'arrêt français Desmares)."
    ],
    concepts: [
      {
        id: 'c7_theories_causalite',
        title: "1. Théorie de la Causalité Adéquate vs Équivalence des Conditions",
        simpleExplanation: "L'équivalence des conditions dit : 'tout événement sans lequel le dommage ne serait pas arrivé est une cause'. C'est trop large ! Le Luxembourg applique la causalité adéquate : on ne retient comme cause que l'événement qui, selon le cours normal de la vie, devait logiquement produire ce résultat.",
        rigorousDefinition: "Consécration par la jurisprudence luxembourgeoise de la théorie de la causalité adéquate fondée sur un pronostic rétrospectif objectif de probabilités. Exemples : prêter une voiture non assurée est une faute, mais n'est pas la cause adéquate d'un accident causé par le conducteur.",
        articles: [
          {
            article: "Théorie de la causalité adéquate (Ravarani / Engel)",
            title: "Critère de probabilité objective dans le cours normal des choses",
            coreRule: "Le fait générateur ne constitue une cause juridique que s'il était de nature à provoquer normalement le dommage survenu.",
            practicalImpact: "Écarte les circonstances fortuites ou exceptionnelles sans lien direct.",
            concreteExample: "Une personne trébuche sur un bouchon et se casse le bras ; une seconde chute 3 semaines plus tard n'a pas de lien causal adéquat."
          }
        ]
      },
      {
        id: 'c7_in_solidum_recours',
        title: "2. La Condamnation In Solidum & Recours entre Coresponsables",
        simpleExplanation: "Si deux conducteurs commettent chacun une faute et écrasent un piéton, ils sont condamnés in solidum : la victime peut réclamer 100% de son indemnisation à l'un ou à l'autre indifféremment. Celui qui a payé 100% se retourne ensuite contre l'autre pour récupérer sa part.",
        rigorousDefinition: "Création prétorienne indispensable comblant l'absence de solidarité légale : chaque faute ayant concouru à un dommage unique est réputée avoir produit l'entier dommage. Le recours entre coresponsables fautifs s'opère dans la proportion de la contribution causale de chaque faute au dommage.",
        articles: [
          {
            article: "Obligation in solidum (Jurisprudence constante)",
            title: "Garantie intégrale de la victime face à la pluralité d'auteurs",
            coreRule: "Chaque responsable d'un dommage indivisible est tenu pour le tout envers la victime.",
            practicalImpact: "L'insolvabilité de l'un des coauteurs est supportée par les autres coauteurs, jamais par la victime.",
            concreteExample: "Un chirurgien et un anesthésiste commettent des fautes conjointes lors d'une opération : condamnation in solidum."
          }
        ],
        juryTrap: {
          mistake: "Croire que le juge civil partage d'office la part de responsabilité entre les codéfendeurs.",
          juryAdvice: "Les codéfendeurs doivent expressément demander au tribunal dans leurs conclusions de fixer leurs quotes-parts de responsabilité respectives."
        }
      },
      {
        id: 'c7_causes_exoneration',
        title: "3. Les Causes d'Exonération : Force Majeure, Fait de la Victime & Rôle Passif",
        simpleExplanation: "Pour s'exonérer, l'auteur présumé doit prouver une cause étrangère extérieure, imprévisible et irrésistible. Un frein qui lâche n'est PAS de la force majeure car c'est un vice interne ! Si la victime a fait une faute (ex: pas de ceinture), le juge opère un partage de responsabilité.",
        rigorousDefinition: "Extériorité, imprévisibilité et irrésistibilité. Le fait d'un tiers n'est exonératoire que s'il présente les caractères de la force majeure (sinon le tiers est tenu in solidum). La faute de la victime non imprévisible emporte une exonération partielle (rejet de l'arrêt Desmares en droit luxembourgeois).",
        articles: [
          {
            article: "Article 1148 du Code civil",
            title: "Force majeure et cas fortuit",
            coreRule: "Il n'y a lieu à aucuns dommages et intérêts lorsque le débiteur a été empêché par une force majeure ou un cas fortuit.",
            practicalImpact: "Exonération totale si les 3 critères cumulatifs sont démontrés.",
            concreteExample: "Une tornade d'une violence exceptionnelle inédite projetant des toitures sur la chaussée."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 701,
        question: "Quelle théorie de la causalité est principalement retenue par la jurisprudence luxembourgeoise moderne ?",
        options: [
          "L'équivalence absolue des conditions.",
          "La théorie de la proximité temporelle immédiate.",
          "La théorie de la causalité adéquate.",
          "La théorie du hasard objectif."
        ],
        correctIndex: 2,
        explanation: "La jurisprudence luxembourgeoise se réfère expressément à la causalité adéquate : rattacher le dommage à l'antécédent qui, dans le cours normal des choses, était de nature à le produire.",
        legalArticle: "Jurisprudence CCDL (Ravarani / Engel)"
      },
      {
        id: 702,
        question: "Un vice mécanique interne du véhicule (ex: rupture subite des freins révisés la veille) constitue-t-il une cause étrangère de force majeure exonérant le gardien sur l'art. 1384 al. 1er C. civ. ?",
        options: [
          "Oui, car le conducteur n'a commis aucune faute d'imprudence.",
          "Non, l'activité propre ou le vice interne inhérent à la chose ne remplit pas la condition d'extériorité exigée par la force majeure.",
          "Oui, avec une attestation du garagiste.",
          "Seulement pour les véhicules de moins de 2 ans."
        ],
        correctIndex: 1,
        explanation: "La force majeure exige impérativement l'extériorité par rapport à la chose sous garde. Le vice interne ou la défaillance matérielle ne sont jamais exonératoires.",
        legalArticle: "Jurisprudence constante force majeure et Art. 1384 al. 1"
      },
      {
        id: 703,
        question: "En droit luxembourgeois, quelle est la conséquence de la faute de la victime qui ne présente pas les caractères de la force majeure sur la responsabilité du gardien (Art. 1384 al. 1er C. civ.) ?",
        options: [
          "Aucune exonération (doctrine Desmares de la Cour de cassation française).",
          "Une exonération partielle dans la proportion de la contribution causale de la victime à la réalisation du dommage (rejet de Desmares).",
          "L'irrecevabilité automatique de l'action de la victime.",
          "Une exonération totale obligatoire."
        ],
        correctIndex: 1,
        explanation: "Le Luxembourg a expressément rejeté l'arrêt Desmares : la faute de la victime non imprévisible ni irrésistible exonère partiellement le gardien selon sa part causale.",
        legalArticle: "Rejet de l'arrêt Desmares au Luxembourg"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Collision en chaîne, pluralité de véhicules et responsabilité in solidum",
      facts: "Sur l'autoroute A1, le véhicule A freine normalement suite à un ralentissement. Le véhicule B freine et s'arrête à 1 mètre de A. Le véhicule C arrive à vive allure, percute violemment B et projette B contre A. Le conducteur de A subit un coup du lapin et son coffre est écrasé. Le conducteur de C affirme que B n'a pas laissé une distance de sécurité suffisante avec A.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Identification des Applications de l'Article 1384 al. 1er",
          instruction: "Déterminez comment s'applique la présomption de causalité en cas de collision en chaîne.",
          modelAnswer: "En cas de collision en chaîne avec choc répercuté, la victime A bénéficie de la présomption de causalité de plein droit à l'égard du véhicule B avec lequel son véhicule est entré directement en contact. Pour actionner C, A doit prouver l'intervention causale de C dans la poussée initiale."
        },
        {
          stepNumber: 2,
          title: "2. Exonération du Véhicule B par la Preuve d'un Rôle Passif ou Force Majeure",
          instruction: "Analysez si B peut s'exonérer du dommage causé à A.",
          modelAnswer: "B peut s'exonérer de la présomption pesant sur lui en prouvant que sa voiture était régulièrement immobilisée et qu'elle n'a joué qu'un rôle passif, ayant été projetée sous l'effet irrésistible et imprévisible de la poussée violente exercée par le véhicule C (force majeure résultant du fait exclusif d'un tiers)."
        },
        {
          stepNumber: 3,
          title: "3. Responsabilité Finale de C",
          instruction: "Déterminez le responsable ultime des dommages de A et B.",
          modelAnswer: "Le conducteur C et son assureur sont exclusivement responsables de l'entier dommage subi par A et par B pour défaut de maîtrise de la vitesse et non-respect des distances de sécurité."
        },
        {
          stepNumber: 4,
          title: "4. Rôle du Fonds de Garantie Automobile (FGA) si C avait pris la fuite",
          instruction: "Examinez la solution si le conducteur C avait commis un délit de fuite sans être identifié.",
          modelAnswer: "En cas d'auteur inconnu dans un accident de la circulation au Luxembourg, le Fonds de garantie automobile (loi du 16 avril 2003) intervient pour indemniser intégralement les préjudices corporels de A et B (les dégâts matériels purs étant exclus si l'auteur est non identifié)."
        }
      ]
    },
    quickPrompts: [
      "Comment s'opère le partage de responsabilité en cas de défaut de port de la ceinture de sécurité au Luxembourg ?",
      "Quelle est la différence fondamentale entre obligation solidaire et obligation in solidum ?",
      "Dans quelles conditions le fait d'un tiers constitue-t-il un cas de force majeure exonératoire ?",
      "Comment fonctionne le recours récursoire entre le gardien condamné sur 1384 al. 1 et l'auteur fautif condamné sur 1382 ?"
    ]
  },

  {
    id: 'ch8_dommage_procedure',
    title: "Chapitre 3 : Le Dommage & Les Particularités Procédurales de l'Action",
    shortTitle: "8. Dommage & Procédure",
    summaryIntro: "Les caractères du dommage réparable (licéité, certitude, direct, personnel, prévisible Art. 1150), le principe de réparation intégrale in concreto (« tout le dommage, mais rien que le dommage », obligation de modération), et les particularités procédurales majeures : règle du non-cumul, mise en intervention d'ordre public des organismes de sécurité sociale (Art. 453 Code de la Sécurité Sociale), reconnaissance de responsabilité extrajudiciaire, mise en demeure (Art. 1146) et interdépendance pénale/civile (« le criminel tient le civil en l'état », chose jugée au pénal).",
    goldenRules: [
      "Principe de réparation intégrale : « Tout le dommage, mais rien que le dommage », apprécié in concreto au jour du jugement ; l'euro symbolique et les barèmes stricts sont prohibés.",
      "Obligation de la victime de modérer son dommage (mitigation of damages) : la victime doit prendre les mesures raisonnables pour éviter d'aggraver son préjudice (ex: recherche active d'un travail en droit social).",
      "Mise en intervention d'ordre public de la Sécurité Sociale (Article 453 Code de la Sécurité Sociale) et de l'employeur (Art. L. 121-6 (6) Code du travail) : sous peine d'irrecevabilité soulevée d'office par le juge civil !",
      "Reconnaissance de responsabilité extrajudiciaire (ex: mention 'responsabilité 100%' sur un constat amiable) : est sans valeur juridique sur le principe de la responsabilité, valable uniquement pour la matérialité des faits.",
      "Le criminel tient le civil en l'état (Art. 3 al. 2 CPP) : suspension d'ordre public de l'action civile dès lors que l'action publique est déclenchée et qu'il existe un risque de contrariété de jugements."
    ],
    concepts: [
      {
        id: 'c8_caracteres_dommage',
        title: "1. Caractères du Dommage Réparable & Réparation Intégrale In Concreto",
        simpleExplanation: "Pour être remboursé, le dommage doit être légitime (pas de dédommagement pour du travail au noir ou une fraude fiscale), certain (la perte d'une chance réelle est indemnisable, le préjudice hypothétique est rejeté), direct et personnel. La victime par ricochet (proches d'une personne blessée ou décédée) a un droit propre à indemnisation morale et matérielle.",
        rigorousDefinition: "Conditions cumulatives : licéité, certitude (dommage futur certain vs hypothétique), caractère direct, caractère personnel (préjudice réfléchi ou par ricochet autonome du patrimoine de l'héritier), et prévisibilité en contractuel (Art. 1150). La réparation intégrale replace la victime dans la situation où elle se serait trouvée sans la faute.",
        articles: [
          {
            article: "Article 1150 du Code civil",
            title: "Prévisibilité du dommage contractuel",
            coreRule: "Le débiteur n'est tenu que des dommages et intérêts qui ont été prévus ou qu'on a pu prévoir lors du contrat, sauf dol ou faute lourde.",
            practicalImpact: "Limite la responsabilité contractuelle aux risques convenus.",
            concreteExample: "Un garagiste ne répond pas du vol de bijoux précieux laissés à son insu dans le coffre d'une voiture."
          }
        ],
        caseLaw: {
          court: "Cour de cassation de Luxembourg",
          date: "Arrêt sur la licéité",
          reference: "Pasicrisie luxembourgeoise",
          summary: "La Cour de cassation approuve les juges du fond d'avoir rejeté la demande en dommages-intérêts de clients d'une banque ayant subi un redressement fiscal suite à la dénonciation de leurs avoirs cachés, la fraude fiscale ne constituant pas un préjudice licite indemnisable.",
          rulingTakeaway: "L'illégitimité de la situation de la victime exclut tout droit à réparation."
        }
      },
      {
        id: 'c8_securite_sociale_453',
        title: "2. Mise en Intervention Obligatoire de la Sécurité Sociale (Art. 453 CSS)",
        simpleExplanation: "Si vous agissez au tribunal pour un accident corporel, vous DEVEZ obligatoirement mettre en cause la Caisse Nationale de Santé (CNS) ou la caisse étrangère, sous peine que votre demande soit immédiatement rejetée par le juge ! L'employeur qui a maintenu le salaire doit aussi être mis en cause (Art. L. 121-6).",
        rigorousDefinition: "Article 453 alinéa 3 du Code de la Sécurité Sociale (ancien art. 283 bis CAS). Règle d'ordre public : l'irrecevabilité doit être soulevée d'office par le tribunal si l'organisme de sécurité sociale n'a pas été appelé en la cause. Le juge rend alors un jugement avant dire droit ou rejette la demande.",
        articles: [
          {
            article: "Article 453 du Code de la Sécurité Sociale (CSS)",
            title: "Mise en intervention des caisses de sécurité sociale",
            coreRule: "L'assuré ou ses ayants droit qui intentent une action en justice contre le tiers responsable doivent appeler en intervention l'organisme de sécurité sociale.",
            practicalImpact: "Évite le cumul d'indemnisations et garantit le recours subrogatoire de la caisse.",
            concreteExample: "Assignation délivrée au tiers responsable et dénoncée le même jour à la Caisse Nationale de Santé (CNS)."
          },
          {
            article: "Article L. 121-6 (6) alinéa 2 du Code du travail",
            title: "Intervention de l'employeur ayant maintenu le salaire",
            coreRule: "Étend à l'employeur les dispositions de l'article 453 CSS lorsque celui-ci a continué à payer la rémunération durant l'incapacité de travail.",
            practicalImpact: "L'employeur doit être mis en cause pour récupérer les salaires maintenus.",
            concreteExample: "Mise en intervention de la société employant le salarié accidenté de la circulation."
          }
        ],
        juryTrap: {
          mistake: "Oublier d'assigner ou d'appeler en intervention la caisse de sécurité sociale dans une action en réparation de préjudice corporel.",
          juryAdvice: "C'est l'un des pièges éliminatoires préférés du jury du CCDL ! Vérifiez toujours la mise en cause de l'organisme de sécurité sociale (Art. 453 CSS)."
        }
      },
      {
        id: 'c8_penal_civil_interdependance',
        title: "3. Interdépendance Pénale et Civile : 'Le Criminel Tient le Civil en l'État'",
        simpleExplanation: "Si un procès pénal est ouvert pour les mêmes faits, le juge civil doit suspendre son procès et attendre le jugement pénal définitif. Ce que le juge pénal décide s'impose au juge civil. Depuis 2017, si le prévenu est relaxé au pénal pour absence de faute d'imprudence, la victime peut quand même être indemnisée au civil !",
        rigorousDefinition: "Article 3 du Code de procédure pénale. Adage 'una via electa' à sens unique (la victime peut quitter la voie pénale pour le civil, mais pas l'inverse). Règle d'ordre public 'le criminel tient le civil en l'état' si l'action publique est effectivement déclenchée et qu'il y a risque de contrariété de décisions. Loi du 27 juin 2017 (Art. 3 al. 6 CPP) limitant l'autorité de l'acquittement au pénal.",
        articles: [
          {
            article: "Article 3 du Code de procédure pénale luxembourgeois",
            title: "Action civile et surséance à statuer",
            coreRule: "L'exercice de l'action civile est suspendu tant qu'il n'a pas été prononcé définitivement sur l'action publique intentée.",
            practicalImpact: "Règle d'ordre public soulevée d'office par les juges civils.",
            concreteExample: "Suspension d'un litige civil de diffamation en attendant l'arrêt de la Cour d'appel correctionnelle."
          },
          {
            article: "Article 3 alinéa 6 du CPP (Loi du 27 juin 2017)",
            title: "Assouplissement de l'autorité de la chose jugée au pénal",
            coreRule: "L'acquittement pour absence de faute pénale d'imprudence ou de négligence ne fait pas obstacle à l'action devant les juridictions civiles.",
            practicalImpact: "Permet d'obtenir une indemnisation civile même après relaxe pénale du prévenu.",
            concreteExample: "Un conducteur relaxé de blessures involontaires reste tenu sur le fondement de l'article 1384 al. 1er devant le juge civil."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 801,
        question: "Quelle est la valeur juridique d'une reconnaissance de responsabilité signée par un automobiliste sur un constat amiable ('responsabilité à 100%') ?",
        options: [
          "Elle lie définitivement le juge civil et la compagnie d'assurance.",
          "Elle est sans valeur sur le principe de droit de la responsabilité, mais reste valable pour la matérialité des faits constatés.",
          "Elle constitue une clause pénale irrévocable.",
          "Elle emporte désistement d'instance de plein droit."
        ],
        correctIndex: 1,
        explanation: "Selon la jurisprudence constante, l'aveu extrajudiciaire ne peut porter que sur des éléments de fait, non sur des qualifications juridiques ou le principe de la responsabilité de droit.",
        legalArticle: "Jurisprudence aveu extrajudiciaire (G. Ravarani)"
      },
      {
        id: 802,
        question: "Quelle est la sanction en cas de défaut de mise en intervention d'un organisme de sécurité sociale dans un procès en réparation corporelle (Art. 453 CSS) ?",
        options: [
          "Une nullité de forme réparable à l'audience.",
          "Une irrecevabilité d'ordre public qui doit être soulevée d'office par le tribunal.",
          "Une simple déchéance des intérêts de retard.",
          "Aucune sanction si la victime a une assurance privée."
        ],
        correctIndex: 1,
        explanation: "L'article 453 alinéa 3 du Code de la Sécurité Sociale est d'ordre public : le juge doit soulever d'office le défaut de mise en intervention.",
        legalArticle: "Article 453 du Code de la Sécurité Sociale luxembourgeois"
      },
      {
        id: 803,
        question: "Depuis la réforme de la loi du 27 juin 2017 (Art. 3 al. 6 CPP), que se passe-t-il si un automobiliste est acquitté au tribunal correctionnel du chef de blessures involontaires faute de preuve d'imprudence pénale ?",
        options: [
          "La victime ne peut plus jamais réclamer de dommages-intérêts.",
          "L'acquittement ne fait pas obstacle à l'action de la victime devant le juge civil (par exemple sur l'article 1384 al. 1er C. civ.).",
          "Le tribunal administratif devient automatiquement compétent.",
          "L'État doit indemniser la victime sans recours."
        ],
        correctIndex: 1,
        explanation: "La loi du 27 juin 2017 a brisé l'autorité absolue de l'acquittement pénal pour défaut de prévoyance : l'action civile en réparation de droit commun reste ouverte.",
        legalArticle: "Article 3 alinéa 6 du Code de procédure pénale"
      }
    ],
    caseStudy: {
      title: "Cas Pratique : Accident de trajet, maintien de salaire et action récursoire de la sécurité sociale",
      facts: "Monsieur Weber, salarié d'une fiduciaire à Luxembourg-Gare, est renversé sur un passage piéton par un camion alors qu'il se rendait à son travail. Il est en arrêt de travail pendant 6 mois. Son employeur lui verse son salaire intégral durant l'incapacité en application de la convention collective. La CNS rembourse 35 000 € de frais hospitaliers. M. Weber assigne seul le chauffeur du camion devant le Tribunal d'arrondissement civil pour obtenir 85 000 € de dommages-intérêts corporels et perte de revenus.",
      steps: [
        {
          stepNumber: 1,
          title: "1. Diagnostic Procédural : Omission des Intervenants Obligatoires",
          instruction: "Identifiez les irrégularités procédurales majeures entachant l'assignation de M. Weber.",
          modelAnswer: "M. Weber a omis de mettre en cause la Caisse Nationale de Santé (CNS) en vertu de l'article 453 du Code de la Sécurité Sociale, ainsi que son employeur qui a continué à lui verser sa rémunération (Art. L. 121-6 (6) al. 2 du Code du travail). L'action encourt une irrecevabilité d'ordre public."
        },
        {
          stepNumber: 2,
          title: "2. Mesure à Prendre par l'Avocat de M. Weber",
          instruction: "Précisez l'acte de procédure urgent à régulariser.",
          modelAnswer: "L'avocat doit immédiatement délivrer un exploit d'assignation en intervention forcée à la CNS et à la fiduciaire employeur, afin de rendre le jugement commun et opposable et de régulariser la fin de non-recevoir avant clôture des débats."
        },
        {
          stepNumber: 3,
          title: "3. Calcul de la Réparation & Principe de Réparation Intégrale",
          instruction: "Analysez si M. Weber peut conserver à la fois les salaires payés et les indemnités du responsable.",
          modelAnswer: "Non. Le principe 'tout le dommage mais rien que le dommage' interdit l'enrichissement sans cause de la victime. L'employeur et la CNS exerceront leur recours subrogatoire sur les postes de préjudice soumis à recours (perte de revenus et frais médicaux). M. Weber ne percevra personnellement que la réparation de son préjudice corporel personnel (pretium doloris, déficit fonctionnel permanent, préjudice esthétique et d'agrément)."
        },
        {
          stepNumber: 4,
          title: "4. Règle du Criminel Tient le Civil en l'État",
          instruction: "Examinez les conséquences si une citation directe pénale avait été lancée par le Parquet.",
          modelAnswer: "Si l'action publique était déclenchée au correctionnel contre le chauffeur du camion, le tribunal civil devrait surseoir à statuer jusqu'au jugement pénal définitif en vertu de l'article 3 alinéa 2 du Code de procédure pénale."
        }
      ]
    },
    quickPrompts: [
      "Quelles sont les formalités impératives de l'article 453 du Code de la Sécurité Sociale ?",
      "Comment s'applique la règle 'le criminel tient le civil en l'état' devant le juge des référés ?",
      "Quelle est la portée de la maxime 'una via electa non datur recursus ad alteram' en procédure luxembourgeoise ?",
      "Dans quelle mesure l'obligation de modérer son dommage s'applique-t-elle en droit luxembourgeois ?"
    ]
  }
];

export const RESPONSABILITE_CIVILE_COURSE_CONTENT: CourseInteractiveContent = {
  id: 'civil',
  summaryIntro: "Éléments de Responsabilité Civile — Cours officiel CCDL 2026-2027 (enseigné par Monsieur Georges Ravarani et Maître Alex Engel). La matière repose sur le triptyque classique : le fait générateur (fait personnel, fait des choses inanimées Art. 1384 al. 1er, fait d'autrui, défaillance contractuelle et troubles de voisinage Art. 544), le lien de causalité (causalité adéquate, condamnation in solidum, causes d'exonération de force majeure) et le dommage réparable (réparation intégrale, non-cumul, mise en intervention obligatoire de la sécurité sociale Art. 453 CSS, règle le criminel tient le civil en l'état).",
  goldenRules: [
    "Article 84 de la Constitution luxembourgeoise : compétence exclusive des juridictions judiciaires civiles pour toute action en responsabilité contre l'État (rejet radical de l'arrêt Blanco).",
    "Règle de non-cumul des responsabilités : l'action délictuelle (Art. 1382) est irrecevable de fond en présence d'un contrat valide dont l'inexécution cause le dommage.",
    "Troubles du voisinage (Art. 544) : responsabilité objective de plein droit du propriétaire, sans cause d'exonération possible de force majeure ou du fait d'un tiers.",
    "Fait des choses (Art. 1384 al. 1) : présomption de rôle actif si la chose était en mouvement au contact ; preuve de position anormale requise pour la chose inerte.",
    "Rejet de la jurisprudence Costedoat au Luxembourg : le préposé reste personnellement responsable pour faute délictuelle envers les tiers sur les articles 1382/1383.",
    "Mise en intervention d'ordre public des organismes de sécurité sociale (Art. 453 Code de la Sécurité Sociale) obligatoire sous peine d'irrecevabilité soulevée d'office."
  ],
  concepts: RESPONSABILITE_CIVILE_CHAPTERS.flatMap(ch => ch.concepts),
  quiz: RESPONSABILITE_CIVILE_CHAPTERS.flatMap(ch => ch.quiz),
  caseStudy: RESPONSABILITE_CIVILE_CHAPTERS[0].caseStudy,
  quickPrompts: [
    "Explique-moi la distinction entre les régimes d'exonération des articles 1382 et 1384 al. 1er du Code civil",
    "Pourquoi la Cour d'appel de Luxembourg refuse-t-elle l'immunité du préposé de l'arrêt Costedoat ?",
    "Quelles sont les conditions strictes de l'article 544 du Code civil (troubles anormaux de voisinage) ?",
    "Comment appliquer l'arrêt récent de la Cour de cassation luxembourgeoise du 23 janvier 2025 (n° 12/2025) sur la responsabilité de l'État ?"
  ],
  chapters: RESPONSABILITE_CIVILE_CHAPTERS
};
