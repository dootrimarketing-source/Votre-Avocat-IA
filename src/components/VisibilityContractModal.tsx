import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  X, 
  Building2, 
  Scale, 
  ShieldCheck, 
  Edit3, 
  Eye, 
  Mail,
  RotateCcw
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { lawyersList, LawyerProfile } from '../data/lawyers';

interface VisibilityContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCabinet?: LawyerProfile | null;
  onShowToast: (msg: string) => void;
  onOpenEmailWithContract?: (cabinet: LawyerProfile, contractSubject: string, contractBody: string) => void;
}

export const VisibilityContractModal: React.FC<VisibilityContractModalProps> = ({
  isOpen,
  onClose,
  initialCabinet,
  onShowToast,
  onOpenEmailWithContract
}) => {
  // Cabinet selector state
  const [selectedCabinetId, setSelectedCabinetId] = useState<string>(
    initialCabinet?.id || (lawyersList.find(l => l.type === 'cabinet')?.id || 'skerzolegal')
  );

  // If initialCabinet changes, update selection
  useEffect(() => {
    if (initialCabinet) {
      setSelectedCabinetId(initialCabinet.id);
    }
  }, [initialCabinet]);

  const currentCabinet = useMemo(() => {
    return lawyersList.find(l => l.id === selectedCabinetId) || initialCabinet || lawyersList[0];
  }, [selectedCabinetId, initialCabinet]);

  // Form customization state
  const [cabinetSignatory, setCabinetSignatory] = useState<string>('Associé Gérant');
  const [cabinetLegalForm, setCabinetLegalForm] = useState<string>('Société d\'Avocats (SARL / SELARL)');
  const [contractPriceNum, setContractPriceNum] = useState<string>('1 490');
  const [contractPriceWords, setContractPriceWords] = useState<string>('mille quatre cent quatre-vingt-dix euros');
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Determine country & Bar details
  const country = currentCabinet.country || 'FR';
  const barreauName = country === 'LU' 
    ? 'Barreau de Luxembourg' 
    : (currentCabinet.location.toLowerCase().includes('paris') ? 'Barreau de Paris' : `Barreau de ${currentCabinet.location.split(',')[0].trim()}`);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  // Generate the exact contract text requested by the user
  const generateContractText = useMemo(() => {
    const cabName = currentCabinet.name;
    const cabAddress = currentCabinet.location;
    const cabLegal = cabinetLegalForm.trim() || 'SARL / SELARL';
    const cabSign = cabinetSignatory.trim() || 'l’associé gérant';
    const priceNum = contractPriceNum.trim() || '1 490';
    const priceWords = contractPriceWords.trim() || 'mille quatre cent quatre-vingt-dix euros';

    return `CONTRAT DE RÉFÉRENCEMENT, VISIBILITÉ NUMÉRIQUE & PARTENARIAT TECHNOLOGIQUE

ENTRE LES SOUSSIGNÉS :

La société Dootri Lux (faisant affaire sous l’enseigne commerciale « Dootri Lux SARL »), société à responsabilité limitée de droit luxembourgeois, inscrite au Registre de Commerce et des Sociétés de Luxembourg sous le numéro [En cours de formation], ayant son siège social établi à 9 rue du boratoire, L_1911 Luxembourg, représentée aux fins des présentes par Monsieur Dieu Bénit KINDA, en sa qualité de Gérant dûment habilité, ci-après désignée « l’Éditeur » ou « LexIIA »,
D’une part,

ET :

Le Cabinet d’Avocats ${cabName}, ${cabLegal}, inscrit au Barreau de ${barreauName}, ayant son siège social ou cabinet principal situé à ${cabAddress}, représenté aux fins des présentes par Maître ${cabSign}, ci-après désigné « le Cabinet Partenaire » ou « le Partenaire »,
D’autre part.

Les parties 1 et 2 étant ci-après individuellement désignées la « Partie » et conjointement les « Parties ».

PRÉAMBULE

A. L’Éditeur conçoit, édite et exploite une solution technologique propriétaire d’intelligence juridique et d'intermédiation opérationnelle dénommée « LexIIA », intégrant un annuaire certifié de cabinets d’avocats et une suite d’outils d'orientation juridique destinés aux entreprises et particuliers.
B. Le Cabinet Partenaire exerce la profession d’avocat conformément aux règles déontologiques, légales et réglementaires applicables à son Barreau de rattachement.
C. Les Parties rappellent avec force que le présent contrat a pour objet exclusif des prestations de visibilité institutionnelle, de référencement technique et de mise à disposition d'infrastructures logicielles, à l'exclusion formelle de tout courtage en prestations juridiques, apport d'affaires rémunéré au pourcentage ou rétrocession d'honoraires prohibée par la loi et la déontologie.
D. Les Parties ont convenu de soumettre le présent contrat au droit luxembourgeois et d'en confier le contentieux éventuel aux juridictions de l'ordre judiciaire de Luxembourg-Ville.

ARTICLE 1. OBJET DU CONTRAT

Le présent Contrat a pour objet de définir les conditions contractuelles, techniques et financières selon lesquelles :
- L’Éditeur assure le référencement du Cabinet Partenaire au sein de l’annuaire technologique LexIIA et garantit sa visibilité numérique ciblée par domaines d'expertise et zones d'intervention ;
- L'Éditeur concède au Cabinet Partenaire un droit d'accès et d'utilisation non exclusif aux interfaces logicielles de transmission sécurisée et de prise de contact direct (#cabinet: et #email-cabinet:) ;
- Le Cabinet Partenaire verse à l'Éditeur une rémunération forfaitaire annuelle, forfaitisée et indépendante de tout résultat contentieux ou honoraire perçu.

ARTICLE 2. ENGAGEMENTS ET PRESTATIONS DE L'ÉDITEUR

L'Éditeur s'oblige envers le Cabinet Partenaire, sous une obligation de moyens renforcée, à :
- Référencement & Affichage prioritaire : Intégrer et maintenir la fiche détaillée du Cabinet Partenaire au sein de l’annuaire certifié LexIIA avec mention de ses pôles de compétences et liens interactifs de consultation directe.
- Mise en relation technique directe : Assurer l'orientation contextuelle automatisée et le routage sécurisé des demandes de contact initiées par les utilisateurs vers l'adresse professionnelle désignée par le Cabinet, sans aucun filtrage qualitatif de l'opportunité de l'affaire.
- Absence d'ingérence dans la relation client : Ne s’immiscer à aucun titre dans la relation contractuelle, tarifaire ou déontologique nouée entre le Cabinet Partenaire et les justiciables orientés – Article 1135 du Code civil luxembourgeois.
- Maintenance et Niveau de Service (SLA) : Assurer une disponibilité de la plateforme de 99,5 % sur l'année, hors périodes de maintenance programmée notifiées préalablement.

ARTICLE 3. CONDITIONS FINANCIÈRES & FACTURATION

3.1. Redevance forfaitaire contractuelle
En contrepartie des prestations de référencement, de diffusion numérique et de maintenance technologique, le Cabinet Partenaire s’engage à verser à l’Éditeur une redevance annuelle forfaitaire hors taxes fixée à :
- Montant annuel brut : ${priceNum} EUR HT (soit ${priceWords} hors taxe sur la valeur ajoutée).
- TVA applicable au taux légal luxembourgeois de 17 % (ou mécanisme d'autoliquidation de la TVA pour les cabinets établis dans l'UE hors Luxembourg sur communication de leur numéro intracommunautaire valide).

3.2. Indépendance financière et conformité déontologique stricte
Les Parties stipulent expressément que ladite redevance est strictement forfaitaire. Elle est due au seul titre de la mise à disposition technique de l'annuaire et du flux de données. Elle ne constitue en aucun cas un partage d’honoraires, une commission d’apport d’affaires ou un honoraire de résultat. Le Cabinet Partenaire conserve l'intégralité des honoraires librement convenus avec ses clients.

3.3. Modalités et délais de paiement
La redevance annuelle fait l'objet d'une facture émise par l'Éditeur au début de chaque période contractuelle. La facture est payable sous (182) jours francs à compter de sa date d'émission soit 50% par virement bancaire sur le compte de l'Éditeur ou par prélèvement SEPA.
Tout retard de paiement emporte application de plein droit, sans mise en demeure préalable :
- D'un intérêt de retard calculé au taux de la BCE majoré de 8 points, conformément à la loi luxembourgeoise modifiée du 18 avril 2004 sur les délais de paiement ;
- D'une indemnité forfaitaire pour frais de recouvrement de 40,00 EUR.

ARTICLE 4. PROTECTION DES DONNÉES PERSONNELLES & SECRET PROFESSIONNEL

4.1. Conformité au RGPD
Chaque Partie s’engage à respecter le Règlement (UE) 2016/679 (RGPD) ainsi que la loi luxembourgeoise du 1er août 2018 relative à l'organisation de la Commission nationale pour la protection des données (CNPD).

4.2. Hébergement souverain européen et sécurité
L'Éditeur garantit que l’ensemble des données traitées, logs de connexion et messages acheminés sont hébergés exclusivement sur des serveurs situés sur le territoire de l’Union Européenne (Allemagne, Luxembourg et France). Les flux d’information sont protégés par un protocole de chiffrement TLS 1.3 de bout en bout.

4.3. Sanctuarisation du secret professionnel de l'avocat et du professionnel de droit
L'Éditeur reconnaît que le Cabinet Partenaire est soumis au secret professionnel absolu et d’ordre public. En aucun cas l’Éditeur ne stocke ni n'analyse le contenu des échanges privés, pièces de procédure ou consultations transmis après l'initialisation de la mise en relation.

ARTICLE 5. DURÉE, RECONDUCTION & RÉSILIATION

5.1. Durée initiale
Le présent contrat est conclu pour une durée ferme de un (1) an, prenant effet le : ${todayStr}.

5.2. Tacite reconduction
À l’échéance de la période initiale, le Contrat se renouvelle tacitement par périodes successives d'un (1) an, sauf dénonciation notifiée par l'une des Parties au moins trente (30) jours francs avant l'échéance contractuelle, par lettre recommandée avec accusé de réception (LRAR) ou par e-mail certifié avec accusé de transmission.

5.3. Droit de retrait déontologique unilatéral du Cabinet
Par dérogation expresse aux règles de durée ferme et afin de préserver l'indépendance de la profession, le Cabinet Partenaire dispose de la faculté discrétionnaire de demander son désengagement immédiat de l'annuaire LexIIA sous préavis de quinze (15) jours, par simple notification écrite, sans indemnité de rupture à sa charge. En cas d'exercice de ce droit de retrait, la redevance payée au titre de l'année en cours demeure acquise à l'Éditeur au titre des investissements initiaux de développement et d'intégration.

5.4. Résiliation pour faute
En cas de manquement grave par l'une des Parties à l'une de ses obligations contractuelles (notamment inexécution des prestations techniques ou défaut de paiement), non réparé dans un délai de quinze (15) jours suivant l'envoi d'une mise en demeure formelle, l'autre Partie peut prononcer la résiliation immédiate du Contrat de plein droit, sans préjudice des dommages et intérêts qu'elle pourrait faire valoir.

ARTICLE 6. RESPONSABILITÉ CIVILE & AMÉNAGEMENTS

6.1. Responsabilité de l'Éditeur
L’Éditeur n'est tenu qu'à une obligation de moyens au titre du fonctionnement technique de la Plateforme. En aucun cas, la responsabilité de l'Éditeur ne saurait être engagée quant au succès, à la pertinence, aux orientations stratégiques ou au bien-fondé des actions judiciaires, précontentieuses ou transactionnelles menées par le Cabinet Partenaire.
Sont expressément exclus de toute indemnisation les préjudices indirects, tels que notamment le préjudice commercial, la perte de clientèle, l'atteinte à l'image ou à la réputation, ainsi que toute perte de chance de gain de procès ou d'issue favorable d'un litige.

6.2. Plafond de responsabilité
De convention expresse entre professionnels, la responsabilité globale cumulée de l'Éditeur au titre du présent contrat, quel qu'en soit le fondement juridique, est expressément plafonnée au montant total des sommes effectivement encaissées par l'Éditeur au cours des douze (12) derniers mois d'exécution.

ARTICLE 7. CLAUSE ATTRIBUTIVE DE JURIDICTION & DROIT APPLICABLE

7.1. Droit matériel applicable
Le présent contrat, sa validité, son interprétation, son exécution et sa cessation sont régis exclusivement par le droit substantiel du Grand-Duché de Luxembourg.

7.2. Compétence juridictionnelle exclusive (Juridictions de Luxembourg)
Tout différend relatif à la formation, l'interprétation, l'exécution ou la rupture du présent contrat, qui n'aurait pu trouver de solution amiable dans un délai de trente (30) jours suivant sa notification, sera soumis à la compétence exclusive des juridictions de l'ordre judiciaire du Grand-Duché de Luxembourg siégeant dans le district judiciaire de et à Luxembourg (Justice de paix ou Tribunal d'arrondissement de Luxembourg selon le taux du ressort matériel), nonobstant pluralité de défendeurs, appel en garantie ou procédure en référé.

ARTICLE 8. DISPOSITIONS DIVERSES

- Intégralité : Le présent acte exprime l'intégralité de l'accord des Parties et annule toute discussion ou accord antérieur verbal ou écrit.
- Indépendance des clauses : Si une stipulation venait à être déclarée nulle ou inapplicable par une décision passée en force de chose jugée, les autres stipulations conserveront leur pleine validité.
- Frais & Dépens : En cas de contentieux, la partie succombante supportera l'ensemble des dépens ainsi qu'une indemnité sur le fondement de l'article 240 du Nouveau Code de procédure civile luxembourgeois (Article 240 NCPC luxembourgeois).

Fait à Luxembourg, le ${todayStr},
En deux (2) exemplaires originaux, chacune des Parties reconnaissant avoir reçu le sien (ou sous signature électronique qualifiée conforme au Règlement eIDAS).

Pour l'Éditeur :
LexIIA / Dootri Lux SARL
Représentée par M. Dieu Bénit KINDA, Gérant

Signature : ___________________________


Pour le Cabinet Partenaire :
Le Cabinet ${cabName}
Représenté par Maître ${cabSign}, Associé / Titulaire

Signature : ___________________________
`;
  }, [currentCabinet, cabinetSignatory, cabinetLegalForm, contractPriceNum, contractPriceWords, barreauName, todayStr]);

  const [editableContractText, setEditableContractText] = useState<string>(generateContractText);

  // Sync when cabinet or variables change
  useEffect(() => {
    setEditableContractText(generateContractText);
  }, [generateContractText]);

  // Export PDF function
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const leftMargin = 18;
      const rightMargin = 18;
      const pageWidth = 210;
      const textWidth = pageWidth - leftMargin - rightMargin;
      let y = 24;

      // Header helper
      const drawHeader = (pageNumber: number) => {
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, 210, 8, 'F');

        doc.setFillColor(217, 119, 6); // amber-600
        doc.rect(0, 8, 210, 1.5, 'F');

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text('DOOTRI LUX SARL • LEXIIA • CONTRAT DE PARTENARIAT TECHNOLOGIQUE', leftMargin, 16);
        doc.text(`Page ${pageNumber}`, pageWidth - rightMargin - 15, 16);

        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(leftMargin, 19, pageWidth - rightMargin, 19);
      };

      // Footer helper
      const drawFooter = () => {
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `Dootri Lux SARL (L-1911 Luxembourg) • Droit luxembourgeois • Tribunal d'arrondissement de Luxembourg • Non-courtage & Forfait fixe`,
          leftMargin,
          288
        );
      };

      let pageCount = 1;
      drawHeader(pageCount);
      drawFooter();

      // Title
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12.5);
      doc.setTextColor(15, 23, 42);
      doc.text('CONTRAT DE RÉFÉRENCEMENT, VISIBILITÉ NUMÉRIQUE', leftMargin, y);
      y += 5.5;
      doc.text('& PARTENARIAT TECHNOLOGIQUE', leftMargin, y);
      y += 5;

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(217, 119, 6);
      doc.text(`ÉDITEUR : DOOTRI LUX SARL (LEXIIA)  |  CABINET : ${currentCabinet.name.toUpperCase()}`, leftMargin, y);
      y += 6;

      doc.setDrawColor(203, 213, 225);
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += 6;

      // Split text into lines
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);

      const splitLines = doc.splitTextToSize(editableContractText, textWidth);

      for (let i = 0; i < splitLines.length; i++) {
        const line = splitLines[i];

        // New page check
        if (y > 274) {
          doc.addPage();
          pageCount++;
          drawHeader(pageCount);
          drawFooter();
          y = 26;
        }

        // Bold headings check
        if (
          line.startsWith('CONTRAT DE RÉFÉRENCEMENT') || 
          line.startsWith('ENTRE LES SOUSSIGNÉS') ||
          line.startsWith('PRÉAMBULE') ||
          line.startsWith('ARTICLE ') ||
          line.startsWith('Pour l\'Éditeur :') ||
          line.startsWith('Pour le Cabinet Partenaire :')
        ) {
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(15, 23, 42);
          y += 2.5;
          doc.text(line, leftMargin, y);
          y += 4.5;
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
        } else if (line.startsWith('══════') || line.startsWith('------')) {
          doc.setDrawColor(203, 213, 225);
          doc.line(leftMargin, y, pageWidth - rightMargin, y);
          y += 3.5;
        } else {
          doc.text(line, leftMargin, y);
          y += 4.1;
        }
      }

      // Save PDF
      const filename = `Contrat-Referencement-LexIIA-${currentCabinet.id}.pdf`;
      doc.save(filename);
      onShowToast(`✓ Contrat PDF « ${filename} » téléchargé avec succès !`);
    } catch (err: any) {
      console.error('[PDF Export Error]', err);
      onShowToast(`⚠️ Erreur lors de la génération du PDF : ${err?.message || 'Erreur inconnue'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(editableContractText);
    setIsCopied(true);
    onShowToast('✓ Texte intégral du contrat copié dans le presse-papier !');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleOpenEmail = () => {
    if (onOpenEmailWithContract) {
      const subject = `[Partenariat Technologique LexIIA] Proposition de contrat de référencement - ${currentCabinet.name}`;
      const body = `Bonjour Maître,

Nous avons le plaisir de vous transmettre le projet de « Contrat de Référencement, Visibilité Numérique & Partenariat Technologique » conclu avec Dootri Lux SARL pour la mise en avant de votre cabinet sur l'Annuaire Juridique LexIIA.

Ce contrat est régi par le droit luxembourgeois et garantit une indépendance déontologique absolue (absence de commission sur honoraires, redevance forfaitaire annuelle fixe).

Vous trouverez ci-dessous les termes contractuels complets prêts pour signature électronique :

----------------------------------------------------------------------
${editableContractText}
----------------------------------------------------------------------

Restant à votre entière disposition pour tout échange complémentaire.

Bien confraternellement,
Monsieur Dieu Bénit KINDA
Gérant, Dootri Lux SARL (LexIIA)
9 rue du boratoire, L-1911 Luxembourg
contact@lexiia.eu`;

      onOpenEmailWithContract(currentCabinet, subject, body);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-full max-w-5xl bg-[#0b0f19] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl relative my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>Contrat de Référencement & Partenariat Technologique</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Droit Luxembourgeois · Dootri Lux SARL
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Éditeur : Dootri Lux SARL (M. Dieu Bénit KINDA, Gérant) · Juridictions de Luxembourg-Ville.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Configuration Toolbar */}
          <div className="p-4 bg-slate-900/60 border-b border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* Cabinet selection */}
            <div>
              <label className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">Cabinet Partenaire</label>
              <select
                value={selectedCabinetId}
                onChange={(e) => setSelectedCabinetId(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500/50"
              >
                {lawyersList
                  .filter(l => l.type === 'cabinet')
                  .map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.country === 'LU' ? '🇱🇺 Luxembourg' : '🇫🇷 France'})
                    </option>
                  ))}
              </select>
            </div>

            {/* Legal form */}
            <div>
              <label className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">Forme Juridique Cabinet</label>
              <input
                type="text"
                value={cabinetLegalForm}
                onChange={(e) => setCabinetLegalForm(e.target.value)}
                placeholder="ex. SARL, SELARL, Association"
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Cabinet signatory */}
            <div>
              <label className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">Signataire Cabinet (Maître...)</label>
              <input
                type="text"
                value={cabinetSignatory}
                onChange={(e) => setCabinetSignatory(e.target.value)}
                placeholder="Nom, Prénom de l'associé gérant"
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Annual fee */}
            <div>
              <label className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">Redevance Annuelle Forfaitaire</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={contractPriceNum}
                  onChange={(e) => setContractPriceNum(e.target.value)}
                  placeholder="1 490"
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-xl text-amber-400 font-bold outline-none focus:border-amber-500/50"
                />
                <span className="text-slate-400 font-semibold shrink-0">€ HT</span>
              </div>
            </div>
          </div>

          {/* Sub-bar with View Tabs & Quick Stats */}
          <div className="px-5 py-2.5 bg-slate-950/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                Aperçu mise en page
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'edit'
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                Édition libre du texte
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Forfait technique annuel
              </span>
              <span>Loi luxembourgeoise · Juridictions de Luxembourg</span>
            </div>
          </div>

          {/* Main Contract Container */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#080b12]">
            {activeTab === 'preview' ? (
              <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 sm:p-8 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed shadow-inner max-w-4xl mx-auto space-y-4">
                {/* Visual Contract Header */}
                <div className="border-b border-white/10 pb-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-amber-500 font-bold">Dootri Lux SARL · LexIIA</div>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                      CONTRAT DE RÉFÉRENCEMENT, VISIBILITÉ NUMÉRIQUE & PARTENARIAT TECHNOLOGIQUE
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">
                      Entre <strong>Dootri Lux SARL</strong> (M. Dieu Bénit KINDA) et le Cabinet <strong>{currentCabinet.name}</strong>
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shrink-0">
                    {barreauName}
                  </div>
                </div>

                {/* Preformatted Text Display */}
                <pre className="font-sans whitespace-pre-wrap text-slate-300 leading-relaxed text-xs sm:text-[13px] select-text">
                  {editableContractText}
                </pre>
              </div>
            ) : (
              <div className="space-y-2 max-w-4xl mx-auto">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Modifiez directement les clauses contractuelles ci-dessous avant téléchargement en PDF :</span>
                  <button
                    onClick={() => setEditableContractText(generateContractText)}
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Réinitialiser le texte
                  </button>
                </div>
                <textarea
                  rows={20}
                  value={editableContractText}
                  onChange={(e) => setEditableContractText(e.target.value)}
                  className="w-full p-4 bg-slate-950 border border-white/10 rounded-2xl text-xs sm:text-sm text-slate-200 font-mono leading-relaxed outline-none focus:border-amber-500/60 resize-y"
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? 'Copié !' : 'Copier le contrat'}
              </button>

              <button
                onClick={handleOpenEmail}
                className="px-3.5 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Préparer un e-mail avec ce contrat pour le cabinet"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                Envoyer par mail au cabinet
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={isDownloading}
                onClick={handleDownloadPDF}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-950" />
                {isDownloading ? 'Génération du PDF...' : 'Télécharger le Contrat PDF officiel'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
