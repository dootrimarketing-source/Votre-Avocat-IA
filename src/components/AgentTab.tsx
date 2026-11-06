import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Send, 
  ArrowRight, 
  BookOpen, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  SquarePen, 
  Zap, 
  Plug2,
  Lock,
  Scale,
  Gavel,
  Compass,
  HelpCircle,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Award,
  TrendingUp,
  Coins
} from 'lucide-react';

interface AgentTabProps {
  user: any;
  setInput: (input: string) => void;
  setActiveTab: (tab: any) => void;
  historyService: any;
  loadDossiers: () => Promise<void>;
  setCurrentDossier: (dossier: any) => void;
  setMessages: (messages: any[]) => void;
}

const pilotModels = {
  nda: {
    emoji: '📄',
    title: 'ACCORD DE CONFIDENTIALITÉ',
    subtitle: 'Présélection de NDA',
    desc: "Vérifier la réciprocité, les durées de survie et les clauses d'indemnisation.",
    rawText: `ACCORD DE CONFIDENTIALITÉ NON-MUTUEL (UNILATÉRAL)
Entre : Société Alpha SA (Bénéficiaire) et Cabinet Juridique Beta SAS (Divulgant).

1. Informations confidentielles : Englobe toutes données financières et techniques communiquées.

2. Obligations de Alpha SA : Garder secret absolu pendant une durée perpétuelle (sans limite de temps). Alpha SA indemnisera Beta SAS sans limitation pour toute violation présumée des présentes obligations, y compris pour négligence légère de ses employés.

3. Exclusions : Les exclusions standards (domaine public) ne s'appliquent pas si Alpha SA a eu connaissance indirecte des informations confidentielles via des tiers non liés par contrat.

4. Loi applicable : Les présentes sont régies par les lois de l'État de New York, et tout litige sera soumis aux tribunaux de Manhattan.`,
    analysisResult: `### 📋 ANALYSE DE PRÉSÉLECTION DE NDA (ACCORD DE CONFIDENTIALITÉ)

**Statut** : 🟡 ATTENTION - CLAUSES DÉSÉQUILIBRÉES  
**Niveau de risque** : Moyen-Élevé (Unilatéralité et indemnisation)

---

#### 🚩 Risques et Anomalies Détectés

1. **Unilatéralité de l'Accord** :
   * L'accord est non-mutuel. Seule la Société Alpha SA est liée par l'obligation de confidentialité.
   * *Recommandation* : Rendre l'accord strictement réciproque pour protéger également vos propres divulgations.

2. **Durée de Confidentialité Perpétuelle** :
   * "Obligations de Alpha SA : garder secret absolu pendant une durée perpétuelle (sans limite de temps)."
   * *Recommandation* : Limiter la durée à une période standard du marché (généralement 3 à 5 ans après la fin des relations commerciales).

3. **Clause d'Indemnisation Illimitée** :
   * "Alpha SA indemnisera Beta SAS sans limitation pour toute violation présumée..."
   * *Recommandation* : Supprimer toute clause d'indemnisation automatique pour simple violation présumée, ou à défaut, la plafonner et exclure les dommages indirects.

4. **Loi et Juridiction Étrangère** :
   * Loi de l'État de New York et compétence exclusive des tribunaux de Manhattan.
   * *Recommandation* : Modifier pour le droit français (ou luxembourgeois) et les tribunaux compétents locaux de Paris ou Luxembourg pour éviter des frais de litige d'urgence.`
  },
  rh: {
    emoji: '📋',
    title: 'RÈGLEMENT INTERNE',
    subtitle: 'Synthèse de Politique RH (Cadeaux)',
    desc: "Extraire les règles d'éthique clés et seuils financiers pour les salariés.",
    rawText: `POLITIQUE INTERNE CONCERNANT LES CADEAUX ET INVITATIONS (CHARTE ÉTHIQUE)

Objet : Règles de conformité applicables à l'ensemble des collaborateurs du groupe.

1. Cadeaux reçus : Il est strictement interdit d'accepter tout cadeau d'une valeur supérieure à 150 € de la part d'un fournisseur ou partenaire sans l'autorisation préalable écrite du Directeur Conformité.

2. Invitations à des repas : Les déjeuners d'affaires normaux sont autorisés s'ils sont directement liés à l'activité professionnelle et restent d'une valeur raisonnable (< 80 € par personne).

3. Cadeaux offerts : Tout cadeau offert par un collaborateur à un client doit être préalablement validé et enregistré dans le registre des cadeaux si sa valeur dépasse 50 €. Les invitations à des événements sportifs ou culturels majeurs (ex: Roland Garros, loges) nécessitent la validation écrite du N+2.`,
    analysisResult: `### 📋 SYNTHÈSE DE CONFORMITÉ : POLITIQUE INTERNE CADEAUX & INVITATIONS

**Statut** : 🟢 CONFORME AUX STANDARDS SAPIN II  
**Type d'analyse** : Résumé opérationnel & Seuils clés

---

#### 📊 Seuils Financiers de Reference

* **Cadeaux Reçus d'un Tiers** :
  * **Seuil d'alerte** : **150 €**
  * **Règle** : Interdiction d'accepter au-delà de ce montant sans l'accord écrit préalable du Directeur de la Conformité (Compliance Officer).
  
* **Repas & Invitations Professionnelles** :
  * **Seuil raisonnable** : **80 € / personne**
  * **Règle** : Doit être directement lié à l'activité et à l'intérêt social de l'entreprise.

* **Cadeaux Offerts aux Clients** :
  * **Seuil d'enregistrement** : **50 €**
  * **Règle** : Tout cadeau offert au-dessus de ce montant doit être consigné dans le registre officiel de conformité de la direction juridique.

#### 💡 Recommandations et Points d'Audit
1. **Registre centralisé** : Veiller à ce que le registre des cadeaux offerts de plus de 50 € soit tenu à jour trimestriellement par chaque département.
2. **Invitations VIP** : Les places de loges ou événements culturels majeurs exigent impérativement l'accord formel du responsable de niveau N+2 pour éviter tout risque de qualification de corruption ou trafic d'influence.`
  },
  signature: {
    emoji: '✍️',
    title: 'GUIDE PRATIQUE',
    subtitle: 'FAQ Interne de Signature',
    desc: "Répondre rapidement aux questions sur la délégation de pouvoirs et signatures.",
    rawText: `GUIDE DE DÉLÉGATION DE POUVOIRS ET SIGNATURE CONTRAT

Qui peut signer quoi au sein de la société ?

1. Contrats d'un montant inférieur à 10 000 € HT : Signature possible par le Responsable de Département concerné.

2. Contrats d'un montant compris entre 10 000 € et 100 000 € HT : Signature exclusive par le Directeur de Division ou de Filiale.

3. Contrats supérieurs à 100 000 € HT : Signature impérative par un Mandataire Social (Directeur Général, Président) ou titulaire d'une délégation de pouvoirs écrite expresse.

4. Utilisation de la signature électronique (DocuSign) : Autorisée pour tous les contrats internes et commerciaux, à condition d'utiliser un certificat de niveau 'Avancé' ou 'Qualifié' (RGPD & eIDAS).`,
    analysisResult: `### 📋 ANALYSE DE LA FAQ INTERNE : SIGNATURES ET DÉLÉGATIONS

**Statut** : 🟢 SYNTHÈSE OPÉRATIONNELLE  
**Objectif** : Diffusion rapide aux équipes opérationnelles / achats

---

#### ⚖️ Matrice de Délégation de Pouvoirs

* **Niveau 1 : < 10 000 € HT**
  * **Signataire autorisé** : Responsable de Département.
  * **Exemple** : Achats de fournitures récurrentes, outils SaaS d'équipe.

* **Niveau 2 : 10 000 € à 100 000 € HT**
  * **Signataire autorisé** : Directeur de Division ou Directeur de Filiale.
  * **Vigilance** : Nécessite une notification préalable du contrôleur financier.

* **Niveau 3 : > 100 000 € HT**
  * **Signataire autorisé** : Mandataire Social (Président, DG) ou délégataire formel.
  * **Alerte** : Un contrat signé par une personne non habilitée est frappé de nullité relative et engage sa responsabilité personnelle.

#### 💻 Normes Technologiques (eIDAS)
* **Outils** : Utilisation de DocuSign validée.
* **Sécurité** : Obligation d'un certificat électronique de niveau **Avancé ou Qualifié** conforme au règlement eIDAS pour toutes les transactions externes de Niveau 2 et Niveau 3.`
  },
  litige: {
    emoji: '⚖️',
    title: 'NOTES DE DOSSIER',
    subtitle: 'Résumé de Litige Fournisseur',
    desc: "Clarifier les faits juridiques d'un retard de livraison logistique.",
    rawText: `FICHE DE LITIGE : RETARD DE LIVRAISON LOGISTIQUE CHRONO-RAPIDE

Faits : Notre entreprise a commandé 500 unités de composants auprès de LogisticsExpress le 12 avril 2026 pour une livraison garantie le 1er mai 2026. L'accord de niveau de service (SLA) prévoit des pénalités forfaitaires libératoires de 1 000 € par jour de retard, plafonnées à 20% du montant de la commande (montant total: 100 000 €).

La livraison a effectivement eu lieu le 20 mai 2026 (soit 19 jours de retard). Ce retard a bloqué notre ligne de production automobile pendant 5 jours, générant une demande d'indemnisation de notre client final d'un montant de 45 000 € pour perte d'exploitation.`,
    analysisResult: `### 📋 RÉSUMÉ D'ANALYSE JURIDIQUE : LITIGE LOGISTICSEXPRESS

**Statut du dossier** : 🔴 ALERTE DE CONFORMITÉ (Dépassement du plafond SLA)  
**Date d'analyse** : 12 juin 2026

---

#### 1. Synthèse de la Chronologie & Retards
* **Date de commande** : 12 avril 2026
* **Date de livraison contractuelle** : 1er mai 2026
* **Date de livraison effective** : 20 mai 2026
* **Retard total constaté** : **19 jours calendaires**

#### 2. Évaluation des Pénalités Contractuelles (SLA)
* **Pénalité journalière** : 1 000 € / jour de retard
* **Pénalité brute cumulée** : 19 jours × 1 000 € = **19 000 €**
* **Montant total de la commande** : 100 000 €
* **Plafond conventionnel des pénalités (20%)** : **20 000 €**
* **Montant exigible au titre des pénalités** : **19 000 €** *(Sous le plafond, donc exigible en totalité)*

#### 3. Analyse du Préjudice de Production & Perte d'Exploitation (45 000 €)
* **Impact opérationnel** : Arrêt de la ligne de production automobile pendant **5 jours**.
* **Réclamation tiers** : Demande d'indemnisation de 45 000 € du client final pour sa propre perte d'exploitation.
* **Point de vigilance juridique (Red Flag)** : 
  * Les pénalités journalières de 1 000 € sont qualifiées de *forfaitaires et libératoires*.
  * **Risque majeur** : Une clause qualifiée de "libératoire" limite la réparation du créancier au seul montant des pénalités prévues. Elle exclut en principe toute demande d'indemnisation complémentaire pour d'autres préjudices (comme la perte de 45 000 €), à moins de prouver une **faute lourde** ou intentionnelle du fournisseur.

#### 4. Stratégie de Négociation & Plan d'Action
1. **Mise en Demeure** : Adresser une mise en demeure formelle réclamant le paiement immédiat des **19 000 €** de pénalités contractuelles.
2. **Négociation Amiable** : Proposer une réconciliation globale fixant un dédommagement amiable transactionnel (ex: remboursement partiel de la perte d'exploitation sous forme d'avoirs commerciaux de 15 000 €) en échange de la renonciation aux poursuites.
3. **Escalade** : En cas de refus sous 15 jours, transférer le dossier au Directeur Juridique pour l'engagement d'une procédure d'indemnisation complémentaire sur le fondement de la responsabilité contractuelle de droit commun.`
  }
};

const playbooksData = [
  {
    id: 'limitation',
    label: 'Limitation de Responsabilité',
    clause: 'Limitation de Responsabilité',
    preferred: 'Plafond de responsabilité limité aux sommes payées au cours des 12 derniers mois.',
    fallback: 'Plafond étendu à 2x les sommes payées ou 250 000 €, selon la valeur la plus basse.',
    businessValidation: 'Toutes clauses prévoyant une exclusion complète de plafond, ou des responsabilités illimitées pour dommages consécutifs.',
    redFlags: 'Indemnisation illimitée pour réclamations commerciales générales, ou pénalités de retard non plafonnées.',
    escalation: 'Demandes d\'indemnisation mutuelle réciproque sans faute préliminaire établie.',
    redlineStyle: 'Proposer notre clause standard en remplacement complet, avec des explications brèves sur notre politique financière d\'entreprise.'
  },
  {
    id: 'pi',
    label: 'Propriété Intellectuelle (PI)',
    clause: 'Propriété Intellectuelle',
    preferred: 'Chaque partie conserve ses droits de PI préexistants. Les livrables spécifiques créés pour le client lui sont transférés uniquement après paiement intégral.',
    fallback: 'Licence d\'utilisation perpétuelle, mondiale et non exclusive sur les livrables, sans transfert de propriété complet.',
    businessValidation: 'Tous transferts de PI sur nos outils propriétaires, briques de base de code ou méthodologies génériques.',
    redFlags: 'Clauses de transfert de propriété intellectuelle exclusives immédiates sans condition de paiement ou d\'achèvement.',
    escalation: 'Demande de brevet conjoint ou interdiction d\'utiliser des connaissances acquises durant la mission.',
    redlineStyle: 'Insérer explicitement une clause de conservation des droits préexistants (Background IP) et restreindre le transfert aux seuls nouveaux développements spécifiques payés.'
  },
  {
    id: 'resiliation',
    label: 'Résiliation et Préavis',
    clause: 'Résiliation et Préavis',
    preferred: 'Résiliation pour convenance par l\'une ou l\'autre partie avec un préavis écrit de 30 jours, sans pénalité.',
    fallback: 'Préavis étendu à 60 jours pour convenance. Résiliation immédiate uniquement pour faute grave non corrigée sous 15 jours.',
    businessValidation: 'Tous transferts unilatéraux de résiliation immédiate sans motif par le client, ou clause pénale/indemnité de rupture disproportionnée.',
    redFlags: 'Engagement ferme de longue durée (ex: 24 mois) sans aucune possibilité de résiliation anticipée pour convenance.',
    escalation: 'Droit exclusif du client de résilier pour convenance sans réciprocité, ou obligations post-contractuelles abusives.',
    redlineStyle: 'Rétablir la réciprocité des droits de résiliation, harmoniser la durée du préavis, supprimer ou plafonner les frais de sortie anticipée.'
  },
  {
    id: 'litige',
    label: 'Résumé de litige fournisseur',
    clause: 'Litige Fournisseur & Indemnisation',
    preferred: 'Pénalités de retard de 1 000 €/jour (SLA), indemnisation de 100% de perte d\'exploitation directe (ex: 45 000 € pour arrêt de ligne de 5 jours).',
    fallback: 'Plafond contractuel des pénalités à 20% (soit 20 000 €) complété par un avoir de 15 000 € sur les commandes futures avec engagement de livraison de rechange sous 48h.',
    businessValidation: 'Acceptation d\'un règlement amiable diminuant le remboursement à moins de 50% du préjudice de production réel subi.',
    redFlags: 'Présence d\'une clause exclusive excluant les pertes d\'exploitation ou dommages indirects, ou invocation de force majeure non justifiée par pièces écrites.',
    escalation: 'Refus écrit ou absence de réponse du fournisseur sous 15 jours de mise en demeure, ou litige d\'origine technique complexe persistant.',
    redlineStyle: 'Rédiger une réconciliation amiable formelle et ferme, actant la responsabilité du retard de livraison et fixant des délais de paiement sous 10 jours.'
  }
];

export function AgentTab({
  user,
  setInput,
  setActiveTab,
  historyService,
  loadDossiers,
  setCurrentDossier,
  setMessages
}: AgentTabProps) {
  // New States for the 4-step Agent tab
  const [agentActiveStep, setAgentActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPilotModelId, setSelectedPilotModelId] = useState<'nda' | 'rh' | 'signature' | 'litige'>('nda');
  const [pilotRawText, setPilotRawText] = useState(pilotModels.nda.rawText);
  const [pilotAnalysisResult, setPilotAnalysisResult] = useState('');
  const [isAnalyzingPilot, setIsAnalyzingPilot] = useState(false);
  const [pilotProgressText, setPilotProgressText] = useState('');
  const [playbookCopied, setPlaybookCopied] = useState(false);

  // Playbook Form States (Step 2)
  const [selectedPlaybookId, setSelectedPlaybookId] = useState('limitation');
  const [playbookForm, setPlaybookForm] = useState({
    clause: 'Limitation de Responsabilité',
    preferred: 'Plafond de responsabilité limité aux sommes payées au cours des 12 derniers mois.',
    fallback: 'Plafond étendu à 2x les sommes payées ou 250 000 €, selon la valeur la plus basse.',
    businessValidation: 'Toutes clauses prévoyant une exclusion complète de plafond, ou des responsabilités illimitées pour dommages consécutifs.',
    redFlags: 'Indemnisation illimitée pour réclamations commerciales générales, ou pénalités de retard non plafonnées.',
    escalation: 'Demandes d\'indemnisation mutuelle réciproque sans faute préliminaire établie.',
    redlineStyle: 'Proposer notre clause standard en remplacement complet, avec des explications brèves sur notre politique financière d\'entreprise.'
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isTranslatingPlaybook, setIsTranslatingPlaybook] = useState(false);

  // Intake States (Step 3)
  const [intakeForm, setIntakeForm] = useState({
    type: 'contrat',
    priority: 'Moyen',
    context: '',
  });
  const [isIntakeSubmitted, setIsIntakeSubmitted] = useState(false);
  const [isIntakeAnalyzing, setIsIntakeAnalyzing] = useState(false);
  const [intakeProgressText, setIntakeProgressText] = useState('');
  const [intakeResult, setIntakeResult] = useState('');

  // ROI States (Step 4)
  const [roiMonthlyContracts, setRoiMonthlyContracts] = useState(200);
  const [roiSavedMinutes, setRoiSavedMinutes] = useState(45);
  const [roiHourlyRate, setRoiHourlyRate] = useState(120);

  // Custom Toast State for modern user feedback
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Keep pilot raw text in sync when changing active preset model
  useEffect(() => {
    const pm = pilotModels[selectedPilotModelId];
    if (pm) {
      setPilotRawText(pm.rawText);
      setPilotAnalysisResult('');
      setPilotProgressText('');
    }
  }, [selectedPilotModelId]);

  // Keep playbook form in sync when changing active preset playbook
  useEffect(() => {
    const pb = playbooksData.find(p => p.id === selectedPlaybookId);
    if (pb) {
      setPlaybookForm({
        clause: pb.clause,
        preferred: pb.preferred,
        fallback: pb.fallback,
        businessValidation: pb.businessValidation,
        redFlags: pb.redFlags,
        escalation: pb.escalation,
        redlineStyle: pb.redlineStyle
      });
      setGeneratedPrompt('');
    }
  }, [selectedPlaybookId]);

  const handleRunPilot = () => {
    setIsAnalyzingPilot(true);
    setPilotAnalysisResult('');
    
    const stepsByModel = {
      nda: [
        "Initialisation de l'analyse du NDA...",
        "Identification des parties (Alpha SA & Beta SAS)...",
        "Audit de réciprocité des clauses...",
        "Vérification de la durée d'engagement...",
        "Détection de clauses d'indemnisation exorbitantes...",
        "Vérification de la loi applicable...",
        "Génération du rapport de pre-screening..."
      ],
      rh: [
        "Chargement de la charte éthique...",
        "Extraction des règles de conformité...",
        "Identification des seuils de déclaration...",
        "Analyse de la conformité loi Sapin II...",
        "Vérification de la procédure de validation (N+2)...",
        "Génération du tableau récapitulatif..."
      ],
      signature: [
        "Chargement de la matrice des signatures...",
        "Vérification des montants de délégation de pouvoirs...",
        "Vérification de la conformité eIDAS...",
        "Analyse des risques de nullité des engagements...",
        "Génération du mémo à destination des opérationnels..."
      ],
      litige: [
        "Initialisation de l'analyse du dossier de litige...",
        "Extraction des entités (Parties: LogisticsExpress)...",
        "Calcul de la chronologie (retard : 19 jours)...",
        "Calcul des pénalités de retard journalières (SLA : 19 000 € vs plafond 20 000 €)...",
        "Évaluation du préjudice indirect & perte d'exploitation (45 000 €)...",
        "Audit de conformité et détection de red flags (Clause libératoire détectée)...",
        "Génération du résumé de litige de niveau exécutif..."
      ]
    };

    const steps = stepsByModel[selectedPilotModelId];
    let currentStep = 0;
    setPilotProgressText(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setPilotProgressText(steps[currentStep]);
      } else {
        clearInterval(interval);
        const report = pilotModels[selectedPilotModelId].analysisResult;
        setPilotAnalysisResult(report);
        setIsAnalyzingPilot(false);
        if (historyService) {
          historyService.addAuditLog('RUN_PILOT_MODEL', undefined, `Executed Pilot Model Analysis: ${selectedPilotModelId}`);
        }
      }
    }, 600);
  };

  const handleTranslatePlaybook = () => {
    setIsTranslatingPlaybook(true);
    setGeneratedPrompt('');
    
    setTimeout(() => {
      const template = `=== INSTRUCTIONS POUR L'AGENT IA DE CONFIANCE ===
D'après la politique de négociation de notre Direction Juridique pour la clause "${playbookForm.clause}".

1. POSITION PRÉFÉRÉE (PREFERRED POSITION) :
- "${playbookForm.preferred}"

2. SOLUTION DE REPLI (FALLBACK SOLUTION) :
- "${playbookForm.fallback}"

3. POINTS SOULEVÉS - DIRECTIVE GÉNÉRALE :
- S'assurer que le contrat respecte au mieux notre position préférée.
- Si le contrat s'écarte de la position préférée mais s'aligne sur la solution de repli, l'accepter mais en faire la mention explicite.

4. SEUILS DE VIGILANCE ET ESCALADE :
- Validation du Business requis pour : "${playbookForm.businessValidation}"
- Signaux d'alarme (Red flags) inacceptables : "${playbookForm.redFlags}"
- Seuil d'escalade impératif : "${playbookForm.escalation}"

5. MÉTHODOLOGIE ET STYLE DE RÉDACTION :
- Style de ligne rouge (Redline style) souhaité : "${playbookForm.redlineStyle}"

===== INSTRUCTIONS D'EXÉCUTION POUR L'AGENT =====
- Analyse chaque contrat qui t'est soumis de façon méthodique.
- Applique strictement les lignes directrices ci-dessus pour la clause "${playbookForm.clause}".
- Pour tout écart, signale-le immédiatement et rédige une proposition de modification conforme au style demandé (Redline style).
- Si un point nécessite l'avis du Business ou franchit le seuil d'escalade, mentionne-le expressément en gras/rouge.`;
      
      setGeneratedPrompt(template);
      setIsTranslatingPlaybook(false);
    }, 1200);
  };

  const handleRunIntake = () => {
    setIsIntakeAnalyzing(true);
    setIntakeResult('');
    
    const steps = [
      "Réception et qualification de la demande...",
      "Analyse sémantique du type de demande...",
      "Détection automatique du niveau d'urgence...",
      "Calcul du score de risque contractuel...",
      "Vérification des habilitations du demandeur...",
      "Génération de la fiche d'intake et du premier jet de réponse..."
    ];

    let currentStep = 0;
    setIntakeProgressText(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setIntakeProgressText(steps[currentStep]);
      } else {
        clearInterval(interval);
        
        const priorityLabel = intakeForm.priority === 'Critique' ? '🔴 CRITIQUE' : intakeForm.priority === 'Urgent' ? '🟠 ÉLEVÉ' : intakeForm.priority === 'Moyen' ? '🟡 MODÉRÉ' : '🟢 FAIBLE';
        const riskScore = intakeForm.priority === 'Critique' ? '85/100' : intakeForm.priority === 'Urgent' ? '65/100' : intakeForm.priority === 'Moyen' ? '40/100' : '15/100';
        
        let customResponse = '';
        if (intakeForm.type === 'contrat') {
          customResponse = `Bonjour, merci d'avoir soumis votre demande de contrat. D'après les éléments transmis, il s'agit d'une demande concernant un accord commercial.

Notre service juridique a qualifié votre dossier avec une urgence **${intakeForm.priority}** et un risque estimé à **${riskScore}**.

Voici les prochaines étapes de traitement :
1. Un juriste dédié va être affecté à la revue du document.
2. Si un NDA ou des clauses de confidentialité sont requises, nous appliquerons notre Playbook standard.
3. Nous reviendrons vers vous sous un délai moyen de 24h ouvrées.

N'hésitez pas à compléter cette fiche si de nouveaux échanges ou pièces d'explication sont disponibles.`;
        } else if (intakeForm.type === 'conseil') {
          customResponse = `Bonjour, nous avons bien reçu votre question juridique réglementaire.

Votre demande a été classée avec une urgence **${intakeForm.priority}** et un niveau de priorité **${priorityLabel}**.

Une première analyse de notre base doctrinale suggère que votre question touche à des problématiques de droit des obligations / conformité. Nous préparons un mémo de réponse synthétique pour validation finale par un de nos juristes sous 48h.`;
        } else {
          customResponse = `Bonjour, votre déclaration d'incident / litige a bien été enregistrée sous la référence #INT-2026-${Math.floor(Math.random() * 900 + 100)}.

Au vu de la description fournie, le niveau de risque de cette demande est estimé à **${riskScore}**.

Nous avons initié une collecte automatique des pièces contractuelles associées. Veuillez ne prendre aucun engagement écrit ou oral avec la partie adverse avant que notre service juridique n'ait validé le plan de négociation officiel.`;
        }

        const report = `### 📋 FICHE D'INTAKE QUALIFIÉE #INT-2026-${Math.floor(Math.random() * 900 + 100)}

**Statut** : 🟡 EN ATTENTE DE RECONCILIATION JURISTE  
**Niveau d'Urgence** : ${priorityLabel}  
**Score de Risque Estimé** : **${riskScore}**

---

#### 🔍 Détails de la Qualification automatique :
* **Type qualifié** : ${intakeForm.type === 'contrat' ? 'Audit / Rédaction de Contrat' : intakeForm.type === 'conseil' ? 'Consultation Juridique Réglementaire' : 'Litige / Contentieux Fournisseur'}
* **Context/Description** : *"${intakeForm.context || 'Aucune description fournie'}"*
* **Pièce jointe** : 📄 document_joint_intake.pdf (Vérifié - Non infecté)

#### 🛡️ Recommandations & Actions IA requises :
* [ ] Associer le Playbook de négociation standard
* [ ] Valider la compétence territoriale et la loi applicable
* [ ] Fixer un point d'évaluation de 15 min avec l'opérationnel

---

#### ✍️ Proposition de Réponse Automatique (Premier Jet) :
\`\`\`text
${customResponse}
\`\`\` text`;

        setIntakeResult(report);
        setIsIntakeAnalyzing(false);
        setIsIntakeSubmitted(true);
        if (historyService) {
          historyService.addAuditLog('RUN_INTAKE_QUALIFICATION', undefined, `Executed Intake form qualification, type: ${intakeForm.type}`);
        }
      }
    }, 600);
  };

  return (
    <motion.div
      key="agent-view"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-8"
    >
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/[0.06]">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-mono tracking-wider uppercase font-bold">
            <Lock className="w-3 h-3" />
            <span>Souveraineté & Conformité de niveau avocat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
            Concevoir une <span className="text-amber-500 font-serif italic">IA de Confiance</span> pour votre Direction Juridique
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Un guide interactif pour concevoir, tester et mesurer le passage à l'intelligence artificielle générative de manière hautement sécurisée. Suivez la méthodologie certifiée et entraînez votre agent en direct.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#090d16] border border-white/[0.04] max-w-sm lg:shrink-0 space-y-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
          <div className="flex items-center gap-2.5 text-amber-500 font-bold text-xs uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Sécurité & Souveraineté</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aucune donnée n'est exploitée pour alimenter les modèles publics d'IA. L'avocat conserve le contrôle exclusif de la validation de chaque recommandation d'IA.
          </p>
        </div>
      </div>

      {/* Workflow de Raisonnement en 3 étapes (Chain-of-Thought) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c101c] via-[#090d16] to-[#0d1222] border border-amber-500/20 shadow-2xl relative overflow-hidden my-6">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white tracking-tight">Workflow de Raisonnement Multi-Agent</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  Chain-of-Thought (CoT) 3-Étapes
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Architecture de spécialisation distribuée pour une précision et une conformité juridique maximales.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setInput("Rédiger un contrat de prestation informatique de 150 000 € avec le client ACME Corp (durée 12 mois, clause de non-concurrence et pénalités de retard)");
              setActiveTab('chat');
              showToast("Demande chargée avec le Workflow CoT 3-Étapes activé !");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 shrink-0"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Tester dans le Chat</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Step 1: Agent Triage */}
          <div className="p-5 rounded-2xl bg-[#060912] border border-white/10 hover:border-amber-500/40 transition-all group relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                1. Raisonnement Pré-RAG
              </span>
              <span className="text-[10px] font-mono text-slate-500">Llama 3.1 8B (Local)</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Qualification Amont & Cadrage</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Analyse les faits en droit positif (<span className="text-amber-300 font-medium">Rédaction, Relecture, Litige</span>), reformule la problématique juridique et oriente les cibles de requêtes RAG.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Qualification Droit</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Formulation Hypothèses</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Cadrage RAG</span>
            </div>
          </div>

          {/* Step 2: Agent Chercheur */}
          <div className="p-5 rounded-2xl bg-[#060912] border border-white/10 hover:border-cyan-500/40 transition-all group relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                2. RAG Complémentaire
              </span>
              <span className="text-[10px] font-mono text-slate-500">BGE-M3 + BM25 pgvector</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Agent Chercheur & Preuves</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Interroge la base en synergie : <strong className="text-cyan-300 font-semibold">BGE-M3</strong> par Type de Clause + <strong className="text-cyan-300 font-semibold">BM25</strong> pour articles exacts & jurisprudences révisées.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">pgvector DB</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Typage de Clause</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Recherche BM25</span>
            </div>
          </div>

          {/* Step 3: Agent Syllogisme & Synthèse */}
          <div className="p-5 rounded-2xl bg-[#060912] border border-white/10 hover:border-emerald-500/40 transition-all group relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                3. Syllogisme & Synthèse
              </span>
              <span className="text-[10px] font-mono text-slate-500">Claude 3.5 Sonnet</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-emerald-400" />
                <span>Syllogisme Juridique & Plan d'Action</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Synthésise le raisonnement amont et les preuves RAG, formule le <strong className="text-emerald-300">Syllogisme complet</strong> (Majeure, Mineure, Solution motivée, Mises en demeure) avec liens officiels ancrés.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Syllogisme Juridique</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">Solution Motivée</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Plan d'Action</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
        {/* Tab 1 */}
        <button
          onClick={() => setAgentActiveStep(1)}
          className={`p-6 rounded-3xl text-left border transition-all duration-300 flex flex-col justify-between h-32 relative group/tab ${
            agentActiveStep === 1
              ? 'bg-gradient-to-br from-amber-500/15 to-amber-500/[0.02] border-amber-500 text-amber-400 shadow-[0_0_20px_-3px_rgba(245,158,11,0.12)]'
              : 'bg-[#090d16]/60 border-white/[0.04] text-slate-400 hover:border-white/10 hover:bg-[#090d16] hover:scale-[1.01]'
          }`}
        >
          <div className="flex justify-between items-start w-full">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-black ${agentActiveStep === 1 ? 'text-amber-500' : 'text-slate-500'}`}>Étape 01</span>
            <span className="text-[10px] opacity-0 group-hover/tab:opacity-100 transition-opacity text-slate-500">Sélectionner</span>
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-tight mt-2 flex items-center gap-1.5">
              <Zap className={`w-4 h-4 ${agentActiveStep === 1 ? 'text-amber-500 animate-pulse' : 'text-slate-500'}`} />
              <span>Pilotes</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Flux de travail</div>
          </div>
          {agentActiveStep === 1 && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full blur-[1px]"></div>
          )}
        </button>

        {/* Tab 2 */}
        <button
          onClick={() => setAgentActiveStep(2)}
          className={`p-6 rounded-3xl text-left border transition-all duration-300 flex flex-col justify-between h-32 relative group/tab ${
            agentActiveStep === 2
              ? 'bg-gradient-to-br from-amber-500/15 to-amber-500/[0.02] border-amber-500 text-amber-400 shadow-[0_0_20px_-3px_rgba(245,158,11,0.12)]'
              : 'bg-[#090d16]/60 border-white/[0.04] text-slate-400 hover:border-white/10 hover:bg-[#090d16] hover:scale-[1.01]'
          }`}
        >
          <div className="flex justify-between items-start w-full">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-black ${agentActiveStep === 2 ? 'text-amber-500' : 'text-slate-500'}`}>Étape 02</span>
            <span className="text-[10px] opacity-0 group-hover/tab:opacity-100 transition-opacity text-slate-500">Sélectionner</span>
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-tight mt-2 flex items-center gap-1.5">
              <BookOpen className={`w-4 h-4 ${agentActiveStep === 2 ? 'text-amber-500' : 'text-slate-500'}`} />
              <span>Playbooks</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Instructions IA</div>
          </div>
          {agentActiveStep === 2 && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full blur-[1px]"></div>
          )}
        </button>

        {/* Tab 3 */}
        <button
          onClick={() => setAgentActiveStep(3)}
          className={`p-6 rounded-3xl text-left border transition-all duration-300 flex flex-col justify-between h-32 relative group/tab ${
            agentActiveStep === 3
              ? 'bg-gradient-to-br from-amber-500/15 to-amber-500/[0.02] border-amber-500 text-amber-400 shadow-[0_0_20px_-3px_rgba(245,158,11,0.12)]'
              : 'bg-[#090d16]/60 border-white/[0.04] text-slate-400 hover:border-white/10 hover:bg-[#090d16] hover:scale-[1.01]'
          }`}
        >
          <div className="flex justify-between items-start w-full">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-black ${agentActiveStep === 3 ? 'text-amber-500' : 'text-slate-500'}`}>Étape 03</span>
            <span className="text-[10px] opacity-0 group-hover/tab:opacity-100 transition-opacity text-slate-500">Sélectionner</span>
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-tight mt-2 flex items-center gap-1.5">
              <SquarePen className={`w-4 h-4 ${agentActiveStep === 3 ? 'text-amber-500' : 'text-slate-500'}`} />
              <span>Intakes</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-sans font-semibold">Bêta</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Collecte intégrée</div>
          </div>
          {agentActiveStep === 3 && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full blur-[1px]"></div>
          )}
        </button>

        {/* Tab 4 */}
        <button
          onClick={() => setAgentActiveStep(4)}
          className={`p-6 rounded-3xl text-left border transition-all duration-300 flex flex-col justify-between h-32 relative group/tab ${
            agentActiveStep === 4
              ? 'bg-gradient-to-br from-amber-500/15 to-amber-500/[0.02] border-amber-500 text-amber-400 shadow-[0_0_20px_-3px_rgba(245,158,11,0.12)]'
              : 'bg-[#090d16]/60 border-white/[0.04] text-slate-400 hover:border-white/10 hover:bg-[#090d16] hover:scale-[1.01]'
          }`}
        >
          <div className="flex justify-between items-start w-full">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-black ${agentActiveStep === 4 ? 'text-amber-500' : 'text-slate-500'}`}>Étape 04</span>
            <span className="text-[10px] opacity-0 group-hover/tab:opacity-100 transition-opacity text-slate-500">Sélectionner</span>
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-tight mt-2 flex items-center gap-1.5">
              <TrendingUp className={`w-4 h-4 ${agentActiveStep === 4 ? 'text-amber-500' : 'text-slate-500'}`} />
              <span>Métrique ROI</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Indicateurs ROI</div>
          </div>
          {agentActiveStep === 4 && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full blur-[1px]"></div>
          )}
        </button>
      </div>

      {/* STEP 1 CONTENT */}
      {agentActiveStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mt-10"
        >
          {/* Header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/5 to-transparent p-6 rounded-3xl border border-white/[0.04]">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">Atelier Pratique Interactif</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Étape 1 : Pilotes à Faible Risque de Phase I
              </h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#090d16] border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Statut : Atelier Actif
            </div>
          </div>

          {/* Section details */}
          <div className="p-8 rounded-[32px] bg-[#090d16] border border-white/[0.04] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              Comprendre l'Étape 1 : Choisir des cas d'usage sécurisés
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-medium">
              La première erreur est de vouloir automatiser les contrats stratégiques ou les conseils clients externes complexes dès le premier jour. Pour bâtir la confiance sans aucun risque de réputation ou de conformité, commencez par des tâches internes répétitives, faciles à vérifier par les juristes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Ideal pilots */}
              <div className="p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1 font-mono">Pilotes Recommandés (Idéal)</h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Synthèse de politiques internes, pré-audits de NDA basiques, FAQ déontologie, résumés de faits de litiges, comparaison de versions.
                  </p>
                </div>
              </div>

              {/* To avoid */}
              <div className="p-5 rounded-2xl bg-red-500/[0.02] border border-red-500/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 border border-red-500/20">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1 font-mono">À Éviter Absolument (Phase I)</h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Conseils externes directs non supervisés, avis de conformité réglementaire finaux, conclusions de transactions automatisées sans contrôle d'avocat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Workshop */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>Atelier Interactif : Tester votre premier outil pilote de Phase I</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-4xl font-medium">
                Choisissez l'un de nos modèles de cas d'usage à faible risque ci-dessous pour voir comment l'intelligence artificielle peut faire gagner des heures d'analyse avant vérification humaine.
              </p>
            </div>

            {/* Model Cards selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(pilotModels).map(([id, model]) => {
                const isSelected = selectedPilotModelId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedPilotModelId(id as any)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between h-44 relative group ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/[0.02] border-amber-500 text-amber-400 shadow-md shadow-amber-500/5'
                        : 'bg-[#090d16] border-white/[0.04] hover:border-white/10 hover:bg-[#0c121f]'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-bold">
                        <span className="text-lg">{model.emoji}</span>
                        <span className="font-semibold tracking-wider font-mono">{model.title}</span>
                      </div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {model.subtitle}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal mt-2 font-medium">
                      {model.desc}
                    </p>
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Input / Output Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left column: Raw input */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Document juridique brut (Modifiable)
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Entrée
                  </span>
                </div>
                <div className="relative rounded-3xl bg-[#090d16] border border-white/[0.04] p-5 flex flex-col min-h-[380px] h-[380px] focus-within:border-amber-500/30 transition-all">
                  <textarea
                    value={pilotRawText}
                    onChange={(e) => setPilotRawText(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-slate-200 text-xs sm:text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-0 custom-scrollbar pb-16 font-medium"
                    placeholder="Ajustez le texte du document brut..."
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <button
                      onClick={() => setPilotRawText(pilotModels[selectedPilotModelId].rawText)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/5"
                      title="Réinitialiser"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRunPilot}
                      disabled={isAnalyzingPilot}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-amber-500/10 hover:scale-[1.02] active:scale-95 flex items-center gap-2 select-none"
                    >
                      {isAnalyzingPilot ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Analyse...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 text-slate-950 fill-slate-950/20" />
                          <span>Lancer le Pilote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column: AI Analysis */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Résultat du pré-screening IA
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                      SUPERVISÉ
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Sortie
                  </span>
                </div>
                <div className="rounded-3xl bg-[#060913] border border-white/[0.04] p-6 min-h-[380px] h-[380px] flex flex-col justify-between overflow-hidden relative font-medium">
                  <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-500 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    LexIIA Engine v1.4
                  </div>

                  {!pilotAnalysisResult && !isAnalyzingPilot ? (
                    <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-8">
                      <div className="w-14 h-14 rounded-full bg-[#090d16] border border-white/5 flex items-center justify-center text-slate-500 shadow-inner font-bold">
                        <HelpCircle className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed font-medium">
                        Cliquez sur <strong className="text-white">"Lancer le Pilote"</strong> pour générer l'analyse de conformité. L'IA va structurer un pre-screening à relecture rapide.
                      </p>
                    </div>
                  ) : isAnalyzingPilot ? (
                    <div className="flex flex-col justify-center items-center h-full space-y-5 text-center py-8">
                      <div className="relative">
                        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                        <div className="absolute inset-0 w-10 h-10 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-white animate-pulse">Analyse de l'IA en cours...</p>
                        <p className="text-xs text-slate-400 font-mono italic max-w-sm px-4 truncate">
                          "{pilotProgressText}"
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-between">
                      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[250px] pr-2 custom-scrollbar markdown-body mb-4 font-medium">
                        <Markdown>{pilotAnalysisResult}</Markdown>
                      </div>
                      <div className="pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(pilotAnalysisResult);
                            showToast("Rapport d'analyse copié !");
                          }}
                          className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2 select-none"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          Copier l'analyse
                        </button>
                        <button
                          onClick={() => {
                            const modelTitle = pilotModels[selectedPilotModelId].subtitle;
                            setInput(`Bonjour ! J'ai effectué l'analyse de pilote IA pour le cas de "${modelTitle}".\n\nVoici le document brut :\n${pilotRawText}\n\nEt l'analyse de pré-screening générée :\n${pilotAnalysisResult}\n\nPeux-tu m'aider à finaliser ce dossier ?`);
                            setActiveTab('chat');
                            if (historyService) {
                              historyService.addAuditLog('LOAD_PILOT_ANALYSIS', undefined, `Loaded pilot model ${selectedPilotModelId} analysis into chat`);
                            }
                          }}
                          className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2 select-none"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Appliquer au Chat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Safety Warning note and next button */}
            <div className="mt-8 p-6 rounded-[24px] bg-[#090d16] border border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-3xl">
                <div className="text-amber-500 font-serif font-bold text-sm italic">Pourquoi est-ce sûr ?</div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Ici, l'avocat conserve 100% de la responsabilité finale. L'IA n'envoie aucun e-mail, ne négocie rien en direct. Elle surligne simplement les points d'intérêt pour permettre au juriste de passer de 20 minutes de lecture monotone à 2 minutes de relecture ciblée.
                </p>
              </div>
              <button
                onClick={() => setAgentActiveStep(2)}
                className="px-6 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center shadow-lg shadow-amber-500/5"
              >
                <span>Valider l'Étape 1 & Passer à l'Étape 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2 CONTENT */}
      {agentActiveStep === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mt-10"
        >
          {/* Header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090d16] p-6 rounded-3xl border border-white/[0.04]">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">Calculateur de Playbook & Formulation de Règles</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Étape 2 : Création de Playbooks et d'Instructions IA
              </h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-950/60 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Statut : Configuration Active
            </div>
          </div>

          {/* Section details */}
          <div className="p-8 rounded-[32px] bg-[#090d16] border border-white/[0.04] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Formalisation des Politiques de Négociation</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Traduisez vos politiques de négociation internes en instructions structurées compréhensibles par les modèles d'IA. Cet outil formule automatiquement les invites de prompt pour auditer vos contrats de manière cohérente avec votre politique d'entreprise.
            </p>
          </div>

          {/* Reset and preset selector */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Configurateur de Clause de Playbook
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Personnalisez vos règles d'audit contractuel pour générer des instructions d'expert prêtes à l'emploi.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedPlaybookId('limitation');
                  setPlaybookForm({
                    clause: 'Limitation de Responsabilité',
                    preferred: 'Plafond de responsabilité limité aux sommes payées au cours des 12 derniers mois.',
                    fallback: 'Plafond étendu à 2x les sommes payées ou 250 000 €, selon la valeur la plus basse.',
                    businessValidation: 'Toutes clauses prévoyant une exclusion complète de plafond, ou des responsabilités illimitées pour dommages consécutifs.',
                    redFlags: 'Indemnisation illimitée pour réclamations commerciales générales, ou pénalités de retard non plafonnées.',
                    escalation: 'Demandes d\'indemnisation mutuelle réciproque sans faute préliminaire établie.',
                    redlineStyle: 'Proposer notre clause standard en remplacement complet, avec des explications brèves sur notre politique financière d\'entreprise.'
                  });
                  setGeneratedPrompt('');
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-all border border-white/5 self-start md:self-auto font-bold font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Réinitialiser le formulaire
              </button>
            </div>

            {/* Preset Playbook Selectors */}
            <div className="bg-[#090d16] p-5 rounded-2xl border border-white/[0.04] space-y-3">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block font-mono">
                Exemples de Playbooks préconfigurés :
              </span>
              <div className="flex flex-wrap gap-2">
                {playbooksData.map((pb) => (
                  <button
                    key={pb.id}
                    onClick={() => setSelectedPlaybookId(pb.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 ${
                      selectedPlaybookId === pb.id
                        ? 'bg-gradient-to-r from-amber-500/15 to-amber-500/5 border-amber-500 text-amber-400 shadow-md shadow-amber-500/5'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {pb.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Forms Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Editor */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-[#090d16] border border-white/[0.04] space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    Manuel de Négociation (Clause)
                  </span>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full font-mono">
                    Modifiable
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Nom de la clause */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Nom de la clause analysée</label>
                    <input
                      type="text"
                      value={playbookForm.clause}
                      onChange={(e) => setPlaybookForm({ ...playbookForm, clause: e.target.value })}
                      className="w-full bg-[#060913] border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-medium focus:border-amber-500/40 focus:outline-none transition-colors"
                      placeholder="Ex: Limitation de Responsabilité"
                    />
                  </div>

                  {/* Two columns grid for the 6 aspects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Aspect 1 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">1. Position préférée (Preferred position)</label>
                      <textarea
                        value={playbookForm.preferred}
                        onChange={(e) => setPlaybookForm({ ...playbookForm, preferred: e.target.value })}
                        rows={3}
                        className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                        placeholder="Clause ou plafond recommandé..."
                      />
                    </div>
                    {/* Aspect 2 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">2. Solution de repli (Fallback solution)</label>
                      <textarea
                        value={playbookForm.fallback}
                        onChange={(e) => setPlaybookForm({ ...playbookForm, fallback: e.target.value })}
                        rows={3}
                        className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                        placeholder="Alternative acceptable..."
                      />
                    </div>
                    {/* Aspect 3 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">3. Avis / Validation du Business requis pour</label>
                      <textarea
                        value={playbookForm.businessValidation}
                        onChange={(e) => setPlaybookForm({ ...playbookForm, businessValidation: e.target.value })}
                        rows={3}
                        className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                        placeholder="Quels points requièrent validation des décideurs ?"
                      />
                    </div>
                    {/* Aspect 4 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">4. Signaux d'alarme (Red flags)</label>
                      <textarea
                        value={playbookForm.redFlags}
                        onChange={(e) => setPlaybookForm({ ...playbookForm, redFlags: e.target.value })}
                        rows={3}
                        className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                        placeholder="Inacceptables ou risques élevés..."
                      />
                    </div>
                    {/* Aspect 5 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">5. Seuil d'escalade</label>
                      <textarea
                        value={playbookForm.escalation}
                        onChange={(e) => setPlaybookForm({ ...playbookForm, escalation: e.target.value })}
                        rows={3}
                        className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                        placeholder="Quand transférer au service juridique ou direction ?"
                      />
                    </div>
                    {/* Aspect 6 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400">6. Style de ligne rouge (Redline style)</label>
                      <textarea
                        value={playbookForm.redlineStyle}
                        onChange={(e) => setPlaybookForm({ ...playbookForm, redlineStyle: e.target.value })}
                        rows={3}
                        className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                        placeholder="Style de reformulation souhaité..."
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTranslatePlaybook}
                  disabled={isTranslatingPlaybook}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/10 active:scale-95 flex items-center justify-center gap-2 select-none"
                >
                  {isTranslatingPlaybook ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      Génération du prompt d'analyse en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950/20 text-slate-950" />
                      Traduire en Prompt IA d'Analyse
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Prompt d'IA Output */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#060913] border border-white/[0.04] min-h-[460px] flex flex-col h-full justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.01] rounded-full blur-2xl pointer-events-none"></div>
                <div className="space-y-4">
                  <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Prompt d'IA Juridique Prêt à l'Usage
                  </span>
                  <hr className="border-white/[0.04]" />

                  {!generatedPrompt ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 shadow-inner">
                        <Sparkles className="w-8 h-8 animate-pulse text-slate-400" />
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-medium">
                        Remplissez et ajustez les paramètres sur la gauche, puis cliquez sur <strong className="text-amber-500">"Traduire en Prompt IA d'Analyse"</strong>. Vous obtiendrez un prompt d'agent de confiance calibré sur-mesure pour effectuer automatiquement vos vérifications contractuelles !
                      </p>
                    </div>
                  ) : (
                    <div className="relative group">
                      <pre className="w-full bg-[#090d16] rounded-2xl p-4 text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/[0.04] whitespace-pre-wrap max-h-[340px] overflow-y-auto leading-relaxed font-medium custom-scrollbar">
                        {generatedPrompt}
                      </pre>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedPrompt);
                            showToast("Prompt de Playbook copié !");
                          }}
                          className="p-2 rounded-lg bg-slate-950/90 hover:bg-slate-950 text-slate-400 hover:text-white border border-white/10 transition-colors shadow-md"
                          title="Copier le prompt"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {generatedPrompt && (
                  <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedPrompt);
                        showToast("Prompt de Playbook copié !");
                      }}
                      className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copier le Prompt
                    </button>
                    <button
                      onClick={() => {
                        setInput(`Bonjour ! Je souhaite que tu analyses mon contrat en utilisant ce playbook de négociation :\n\n${generatedPrompt}\n\nPeux-tu m'accompagner ?`);
                        setActiveTab('chat');
                        if (historyService) {
                          historyService.addAuditLog('LOAD_PLAYBOOK_PROMPT', undefined, `Loaded Playbook: ${playbookForm.clause} into chat`);
                        }
                      }}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Appliquer au Chat
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer step button */}
            <div className="mt-8 p-6 rounded-[24px] bg-[#090d16] border border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="text-amber-500 font-serif font-bold text-sm italic">Validation de l'Étape 2</div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Vos playbooks IA constituent le cerveau de votre agent. Une fois modélisé, passez à l'étape suivante pour structurer la collecte d'information auprès de vos collaborateurs.
                </p>
              </div>
              <button
                onClick={() => setAgentActiveStep(3)}
                className="px-6 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center shadow-lg shadow-amber-500/5"
              >
                <span>Valider l'Étape 2 & Passer à l'Étape 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3 CONTENT */}
      {agentActiveStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mt-10"
        >
          {/* Header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090d16] p-6 rounded-3xl border border-white/[0.04]">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">Portails de Collecte Juridique et Intakes</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Étape 3 : Structuration des Intakes et Formulaires de Demandes
              </h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-950/60 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Statut : Bêta Privée
            </div>
          </div>

          {/* Section details */}
          <div className="p-8 rounded-[32px] bg-[#090d16] border border-white/[0.04] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Qualification et canalisation des flux</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Évitez les demandes juridiques désordonnées par e-mail ou sur Teams. Mettez à disposition de vos opérationnels un portail structuré et intelligent pour qualifier instantanément leurs besoins (contrats, litiges, questions réglementaires) avant de saisir la direction juridique.
            </p>
          </div>

          {/* Intake Simulation panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left panel: Form */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#090d16] border border-white/[0.04] space-y-6">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <SquarePen className="w-5 h-5 text-amber-500" />
                Simulateur d'Intake Opérationnel
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                Incarnez un collaborateur de l'entreprise (Achats, RH, Ventes) soumettant une demande au service juridique.
              </p>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Type de demande juridique</label>
                  <select
                    value={intakeForm.type}
                    onChange={(e) => setIntakeForm({ ...intakeForm, type: e.target.value })}
                    className="w-full bg-[#060913] border border-white/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-medium focus:border-amber-500/40 focus:outline-none transition-colors"
                  >
                    <option value="contrat" className="bg-[#090d16]">Audit / Revue d'un contrat de partenariat</option>
                    <option value="conseil" className="bg-[#090d16]">Consultation sur une nouvelle réglementation</option>
                    <option value="litige" className="bg-[#090d16]">Signalement d'un litige ou inexécution fournisseur</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Niveau d'urgence opérationnel</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Faible', 'Moyen', 'Urgent', 'Critique'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setIntakeForm({ ...intakeForm, priority: p })}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all duration-200 ${
                          intakeForm.priority === p
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md'
                            : 'bg-[#060913] border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Description et éléments de contexte</label>
                  <textarea
                    value={intakeForm.context}
                    onChange={(e) => setIntakeForm({ ...intakeForm, context: e.target.value })}
                    rows={4}
                    className="w-full bg-[#060913] border border-white/5 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-amber-500/40 focus:outline-none resize-none transition-colors font-medium"
                    placeholder={
                      intakeForm.type === 'contrat'
                        ? 'Ex: Accord de distribution commerciale avec DistriMax. Nous souhaitons vérifier les clauses de non-concurrence...'
                        : intakeForm.type === 'conseil'
                        ? 'Ex: Question concernant les exigences RGPD pour la collecte de données de localisation en arrière-plan...'
                        : 'Ex: Notre prestataire de services Cloud n\'a pas respecté la disponibilité garantie de 99.9% ce week-end...'
                    }
                  />
                </div>

                {/* Attachment simulator */}
                <div className="p-4 rounded-xl border border-dashed border-white/10 bg-[#060913] hover:bg-[#090d16] hover:border-amber-500/20 transition-all flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">document_joint.pdf</div>
                      <div className="text-[10px] text-slate-500 font-medium">Document d'explication associé (simulé)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest font-bold">
                    Joint
                  </span>
                </div>

                <button
                  onClick={handleRunIntake}
                  disabled={isIntakeAnalyzing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/10 active:scale-95 flex items-center justify-center gap-2 select-none"
                >
                  {isIntakeAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      Qualification intelligente en cours...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-slate-950 fill-slate-950/20" />
                      Générer la Fiche d'Intake Qualifiée
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right panel: Output */}
            <div className="lg:col-span-6 flex flex-col space-y-2 h-full">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-300">
                    Résultat du traitement Intake (Workflow automatisé)
                  </span>
                  <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-mono uppercase">
                    Tri intelligent de Phase I
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Output
                </span>
              </div>
              <div className="rounded-3xl bg-[#060913] border border-white/[0.04] p-6 min-h-[460px] flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.01] rounded-full blur-2xl pointer-events-none"></div>
                {!intakeResult && !isIntakeAnalyzing ? (
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-20">
                    <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 shadow-inner">
                      <Plug2 className="w-8 h-8 animate-pulse text-slate-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-medium">
                      Remplissez le simulateur d'intake sur la gauche et cliquez sur <strong className="text-amber-500">"Générer la Fiche"</strong>. L'IA va instantanément trier, analyser, coter le niveau de risque et pré-rédiger une réponse officielle de premier niveau !
                    </p>
                  </div>
                ) : isIntakeAnalyzing ? (
                  <div className="flex flex-col justify-center items-center h-full space-y-5 text-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-white animate-pulse">Qualification et tri en cours...</p>
                      <p className="text-xs text-slate-400 font-mono italic max-w-sm px-4">
                        "{intakeProgressText}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full justify-between">
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[300px] pr-2 custom-scrollbar markdown-body mb-4 font-medium">
                      <Markdown>{intakeResult}</Markdown>
                    </div>
                    <div className="pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(intakeResult);
                          showToast("Fiche d'intake copiée !");
                        }}
                        className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2 select-none"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copier la Fiche d'Intake
                      </button>
                      <button
                        onClick={async () => {
                          const label = intakeForm.type === 'contrat' ? 'Audit Contrat' : intakeForm.type === 'conseil' ? 'Consultation' : 'Litige';
                          const dossierTitle = `Intake: ${label} (#INT-2026)`;
                          
                          if (user) {
                            const id = await historyService.createDossier(dossierTitle);
                            if (id) {
                              await loadDossiers();
                              await historyService.addMessage(id, 'user', `Bonjour ! J'ai soumis un formulaire d'intake pour le cas suivant :\n\nType: ${label}\nUrgence: ${intakeForm.priority}\nContexte: ${intakeForm.context}`);
                              await historyService.addMessage(id, 'model', `Voici l'analyse d'intake qualifiée d'origine :\n\n${intakeResult}`);
                              const docs = await historyService.getDossiers();
                              const matching = docs.find((d: any) => d.id === id);
                              if (matching) {
                                setCurrentDossier(matching);
                                setMessages([
                                  { id: '1', role: 'user', parts: [{ text: `Bonjour ! J'ai soumis un formulaire d'intake pour le cas suivant :\n\nType: ${label}\nUrgence: ${intakeForm.priority}\nContexte: ${intakeForm.context}` }] },
                                  { id: '2', role: 'model', parts: [{ text: `Voici l'analyse d'intake qualifiée d'origine :\n\n${intakeResult}` }] }
                                ]);
                              }
                            }
                          } else {
                            // Guest user
                            setCurrentDossier({
                              id: 'guest-intake-dossier',
                              title: dossierTitle,
                              userId: 'guest',
                              createdAt: new Date(),
                              updatedAt: new Date(),
                              type: 'analyse',
                              contractDraft: intakeResult
                            });
                            setMessages([
                              { id: '1', role: 'user', parts: [{ text: `Formulaire d'Intake : ${label}\nUrgence: ${intakeForm.priority}\nContexte: ${intakeForm.context}` }] },
                              { id: '2', role: 'model', parts: [{ text: `Fiche d'Intake Qualifiée :\n\n${intakeResult}` }] }
                            ]);
                          }
                          setActiveTab('chat');
                          showToast("Dossier d'intake créé avec succès !");
                        }}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2 select-none"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Créer le Dossier & Ouvrir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer step button */}
          <div className="mt-8 p-6 rounded-[24px] bg-[#090d16] border border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="text-amber-500 font-serif font-bold text-sm italic">Validation de l'Étape 3</div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Le portail d'Intake structuré est en production bêta. Passez à l'étape finale de ce guide interactif pour évaluer scientifiquement les gains financiers et de productivité apportés par votre agent.
              </p>
            </div>
            <button
              onClick={() => setAgentActiveStep(4)}
              className="px-6 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center shadow-lg shadow-amber-500/5"
            >
              <span>Valider l'Étape 3 & Passer à l'Étape 4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 4 CONTENT */}
      {agentActiveStep === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mt-10"
        >
          {/* Header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090d16] p-6 rounded-3xl border border-white/[0.04]">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">Indicateurs de Performance et Retour sur Investissement</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Étape 4 : Calculateur de ROI Juridique et KPIs
              </h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-950/60 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              En développement
            </div>
          </div>

          {/* Section details */}
          <div className="p-8 rounded-[32px] bg-[#090d16] border border-white/[0.04] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Mesurer le Retour sur Investissement</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Mesurez scientifiquement le gain de productivité, la réduction du temps de cycle d'audit contractuel, et les économies de coûts opérationnels apportés par LexIIA à votre direction juridique.
            </p>
          </div>

          {/* ROI Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#090d16] border border-white/[0.04] space-y-6 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white mb-2 font-sans">Paramètres de votre organisation</h4>
                <p className="text-xs text-slate-400 mb-6 font-semibold">Ajustez les curseurs pour refléter l'activité réelle de votre direction juridique.</p>

                <div className="space-y-6">
                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Volume de contrats / mois</span>
                      <span className="text-sm font-bold text-amber-500 font-mono">{roiMonthlyContracts} dossiers</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={roiMonthlyContracts}
                      onChange={(e) => setRoiMonthlyContracts(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                      <span>10 dossiers</span>
                      <span>500</span>
                      <span>1 000 dossiers</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Temps moyen économisé / contrat</span>
                      <span className="text-sm font-bold text-amber-500 font-mono">{roiSavedMinutes} minutes</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={roiSavedMinutes}
                      onChange={(e) => setRoiSavedMinutes(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                      <span>5 minutes</span>
                      <span>60</span>
                      <span>120 minutes</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Coût horaire moyen estimé d'un juriste</span>
                      <span className="text-sm font-bold text-amber-500 font-mono">{roiHourlyRate} € / h</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="300"
                      step="5"
                      value={roiHourlyRate}
                      onChange={(e) => setRoiHourlyRate(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                      <span>40 € / h</span>
                      <span>150</span>
                      <span>300 € / h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Comparison Chart Card */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 space-y-4 mt-6">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block font-mono">
                  Comparatif du temps moyen d'audit d'un contrat :
                </span>
                <div className="space-y-3 pt-1">
                  {/* Traditional */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Méthode traditionnelle manuelle (sans IA)</span>
                      <span className="font-mono text-slate-300">60 minutes</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-white/5">
                      <div className="bg-slate-700 h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  {/* LexIIA */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-amber-500 font-bold">
                      <span>Avec l'Assistant de Confiance LexIIA</span>
                      <span className="font-mono">15 minutes (-75%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-white/5">
                      <div className="bg-[#b38b1a] h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: KPIs Display */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-[#060913] border border-white/[0.04] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.01] rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-6">
                <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  Synthèse d'Impact Financier & Productivité
                </span>
                <hr className="border-white/[0.04]" />

                {/* Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Stat 1 */}
                  <div className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.04] relative overflow-hidden group">
                    <div className="text-xs font-bold text-slate-500">Heures libérées / mois</div>
                    <div className="text-2xl sm:text-3xl font-black text-white mt-1.5 font-mono">
                      {Math.round((roiMonthlyContracts * roiSavedMinutes) / 60)}h
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-snug font-medium">
                      Temps réaffecté à des tâches de négociation à haute valeur.
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.04] relative overflow-hidden group">
                    <div className="text-xs font-bold text-slate-500">Valeur créée / mois</div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1.5 font-mono">
                      {Math.round(((roiMonthlyContracts * roiSavedMinutes) / 60) * roiHourlyRate).toLocaleString('fr-FR')} €
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-snug font-medium">
                      Économies d'honoraires et de temps interne qualifié.
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.04] relative overflow-hidden group">
                    <div className="text-xs font-bold text-slate-500">ROI Annuel Estimé</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1.5 font-mono">
                      {Math.round(((roiMonthlyContracts * roiSavedMinutes) / 60) * roiHourlyRate * 12).toLocaleString('fr-FR')} €
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-snug font-medium">
                      Gains financiers projetés sur l'année complète.
                    </p>
                  </div>

                  {/* Stat 4 */}
                  <div className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.04] relative overflow-hidden group">
                    <div className="text-xs font-bold text-slate-500">Diminution des risques</div>
                    <div className="text-2xl sm:text-3xl font-black text-white mt-1.5 font-mono">
                      -85%
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-snug font-medium">
                      Réduction drastique des écarts aux playbooks & oublis de clauses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => {
                    const formattedReport = `=== RAPPORT D'IMPACT JURIDIQUE & ROI ===
Date : ${new Date().toLocaleDateString('fr-FR')}
Direction Juridique : LexIIA Workspace

1. PARAMÈTRES D'ORGANISATION :
- Volume de contrats traités par mois : ${roiMonthlyContracts}
- Temps moyen économisé par dossier : ${roiSavedMinutes} min
- Taux horaire moyen estimé : ${roiHourlyRate} EUR/h

2. GAINS ET IMPACTS :
- Heures de travail libérées par mois : ${Math.round((roiMonthlyContracts * roiSavedMinutes) / 60)}h
- Valeur financière générée par mois : ${Math.round(((roiMonthlyContracts * roiSavedMinutes) / 60) * roiHourlyRate)} EUR
- ROI Financier Annuel Estimé : ${Math.round(((roiMonthlyContracts * roiSavedMinutes) / 60) * roiHourlyRate * 12)} EUR
- Amélioration de la conformité (moins de red flags manqués) : +85%`;

                    navigator.clipboard.writeText(formattedReport);
                    showToast("Le rapport d'impact ROI a été copié dans votre presse-papiers !");
                  }}
                  className="flex-1 py-3.5 px-4 rounded-xl border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2 select-none"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copier le rapport d'impact
                </button>
                
                <button
                  onClick={() => {
                    const totalSavedHours = Math.round((roiMonthlyContracts * roiSavedMinutes) / 60);
                    const totalSavedMoney = Math.round(totalSavedHours * roiHourlyRate * 12);
                    
                    setInput(`Bonjour ! J'ai fait une simulation de Retour sur Investissement (ROI) avec mon agent juridique LexIIA :\n\n- Volume mensuel : ${roiMonthlyContracts} contrats\n- Temps gagné par dossier : ${roiSavedMinutes} min\n- Heures libérées par mois : ${totalSavedHours}h\n- Gains annuels projetés : ${totalSavedMoney.toLocaleString('fr-FR')} €\n\nQuelles sont les meilleures pratiques pour maximiser encore plus ce retour sur investissement d'après toi ?`);
                    setActiveTab('chat');
                    if (historyService) {
                      historyService.addAuditLog('LOAD_ROI_REPORT', undefined, `Calculated ROI: ${totalSavedMoney} EUR annually`);
                    }
                  }}
                  className="flex-1 py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2 select-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  Discuter du ROI au Chat
                </button>
              </div>
            </div>
          </div>

          {/* Return/re-start banner */}
          <div className="mt-8 p-6 rounded-[28px] bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl shadow-amber-500/10">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-1 tracking-tight">Fin du Guide Interactif</h3>
              <p className="text-slate-950/70 font-semibold text-xs sm:text-sm">Vous avez complété l'ensemble de la méthodologie de déploiement de votre agent de confiance.</p>
            </div>
            <button
              onClick={() => setAgentActiveStep(1)}
              className="px-6 py-3.5 bg-slate-950 text-white rounded-xl font-bold text-xs hover:bg-slate-900 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 self-stretch md:self-auto justify-center"
            >
              <RotateCcw className="w-4 h-4" />
              Recommencer le guide
            </button>
          </div>
        </motion.div>
      )}

      {/* Modern sliding custom Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] px-5 py-3.5 bg-slate-950 border border-emerald-500/30 text-emerald-400 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
