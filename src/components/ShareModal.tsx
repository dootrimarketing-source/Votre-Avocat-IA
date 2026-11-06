import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Share2, 
  FileText,
  Globe,
  Link2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sliders,
  Laptop
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

const DEFAULT_SHARED_URL = 'https://ais-pre-trjuxhsae5shtsbjbir2k2-236121352603.europe-west2.run.app';

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmailText, setCopiedEmailText] = useState(false);
  const [copiedRichHtml, setCopiedRichHtml] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'mask' | 'link' | 'guide'>('email');

  // Custom domain / masked link state
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [activeCustomUrl, setActiveCustomUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lexiia_custom_share_url') || '';
    }
    return '';
  });

  // Shortener state
  const [customAlias, setCustomAlias] = useState('lexiia-demo');
  const [generatedShortUrl, setGeneratedShortUrl] = useState<string>('');
  const [isShortening, setIsShortening] = useState(false);
  const [shortenerError, setShortenerError] = useState<string | null>(null);

  // Compute base public URL for testers
  const rawPublicUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      const origin = window.location.origin;
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return DEFAULT_SHARED_URL;
      }
      if (origin.includes('ais-dev-')) {
        return origin.replace('ais-dev-', 'ais-pre-');
      }
      return origin;
    }
    return DEFAULT_SHARED_URL;
  }, []);

  // Effective URL used everywhere (custom alias or short link if active, else raw public URL)
  const effectiveUrl = useMemo(() => {
    if (activeCustomUrl && activeCustomUrl.trim().startsWith('http')) {
      return activeCustomUrl.trim();
    }
    return rawPublicUrl;
  }, [activeCustomUrl, rawPublicUrl]);

  // Synchronize custom URL input with stored value
  useEffect(() => {
    if (activeCustomUrl) {
      setCustomUrlInput(activeCustomUrl);
    }
  }, [activeCustomUrl]);

  // Pre-configured email subject & body
  const emailSubject = useMemo(() => {
    return "Invitation à tester LexIIA — Assistant Juridique IA de nouvelle génération";
  }, []);

  const emailBody = useMemo(() => {
    const greeting = recipientName.trim() 
      ? `Bonjour ${recipientName.trim()},` 
      : "Bonjour,";

    return `${greeting}

Je t'invite à découvrir et tester LexIIA, notre assistant juridique expert propulsé par l'intelligence artificielle.

🔗 Lien d'accès direct pour tester :
${effectiveUrl}

⚡ Comment tester en 30 secondes :
1. Ouvre simplement le lien ci-dessus (compatible ordinateur, tablette et smartphone).
2. Aucun téléchargement ni carte bancaire requis : 5 consultations complètes sont offertes sans compte.
3. Tu peux te connecter en 1 clic avec Google pour conserver tes dossiers et débloquer toutes les fonctionnalités.

⚖️ Quelques fonctionnalités phares à essayer :
• Analyse & Rédaction de contrats : Soumets une clause sensible ou demande la rédaction d'un accord (NDA, pacte d'associés, CGV).
• Annuaire juridique interactif : Plus de 45 cabinets d'affaires référencés (Clifford Chance, Bredin Prat, Gide Loyrette Nouel, Latham & Watkins, White & Case, etc.).
• RAG & Recherche jurisprudentielle : Recherche approfondie avec sources officielles et références textuelles.
• Agent Juridique Autonome : Playbooks de négociation avec détection des clauses exorbitantes et seuils d'escalade.
• Export PDF certifié : Génération instantanée de mémos et projets d'actes haute-fidélité.

N'hésite pas à me faire part de tes retours d'expérience et impressions après avoir testé !

Bien cordialement,`;
  }, [recipientName, effectiveUrl]);

  // Handler to copy link
  const handleCopyLink = async (urlToCopy?: string) => {
    const target = urlToCopy || effectiveUrl;
    try {
      await navigator.clipboard.writeText(target);
      setCopiedLink(true);
      onShowToast("Lien copié dans le presse-papier !");
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      onShowToast("Lien prêt : " + target);
    }
  };

  // Handler to copy plain text email
  const handleCopyEmailText = async () => {
    try {
      const fullText = `Objet : ${emailSubject}\n\n${emailBody}`;
      await navigator.clipboard.writeText(fullText);
      setCopiedEmailText(true);
      onShowToast("Message complet d'invitation copié !");
      setTimeout(() => setCopiedEmailText(false), 2500);
    } catch {
      onShowToast("Texte copié !");
    }
  };

  // Handler to copy Rich Text HTML (with hidden URL under a styled clickable text/button)
  const handleCopyRichTextHtml = async () => {
    const greeting = recipientName.trim() ? `Bonjour ${recipientName.trim()},` : "Bonjour,";
    const htmlSnippet = `
<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1e293b;">
  <p><strong>Objet :</strong> ${emailSubject}</p>
  <p>${greeting}</p>
  <p>Je vous invite à découvrir et tester <strong>LexIIA</strong>, notre assistant juridique expert propulsé par l'intelligence artificielle.</p>
  <p style="margin: 20px 0;">
    <a href="${effectiveUrl}" target="_blank" style="background-color: #d97706; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      👉 Accéder à LexIIA &amp; Tester l'assistant juridique
    </a>
  </p>
  <p style="font-size: 12px; color: #64748b;">(Accès direct sans installation ni carte bancaire. 5 consultations gratuites incluses)</p>
  <p><strong>⚡ Ce que vous pouvez tester :</strong></p>
  <ul>
    <li><strong>Analyse &amp; Rédaction de contrats :</strong> Audit de clauses sensibles, pré-qualification de risques.</li>
    <li><strong>Annuaire d'avocats &amp; Cabinets d'affaires :</strong> Plus de 45 grands cabinets référencés.</li>
    <li><strong>Recherche jurisprudentielle RAG :</strong> Sources Légifrance et Judilibre vérifiées.</li>
    <li><strong>Export PDF haute fidélité :</strong> Mémos et consultations téléchargeables en 1 clic.</li>
  </ul>
  <p>N'hésitez pas à me faire part de vos impressions !</p>
  <p>Bien cordialement,</p>
</div>`;

    const plainText = `Objet : ${emailSubject}\n\n${greeting}\n\nJe vous invite à tester LexIIA : ${effectiveUrl}\n\nBien cordialement,`;

    try {
      if (typeof window !== 'undefined' && navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([htmlSnippet], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
        setCopiedRichHtml(true);
        onShowToast("E-mail avec lien masqué copié ! Prêt à être collé dans Gmail / Outlook");
        setTimeout(() => setCopiedRichHtml(false), 2500);
      } else {
        await navigator.clipboard.writeText(plainText);
        setCopiedRichHtml(true);
        onShowToast("Texte copié dans le presse-papier !");
        setTimeout(() => setCopiedRichHtml(false), 2500);
      }
    } catch {
      handleCopyEmailText();
    }
  };

  // Build standard mailto URL
  const mailtoLink = useMemo(() => {
    const to = recipientEmail.trim();
    const subjectParam = encodeURIComponent(emailSubject);
    const bodyParam = encodeURIComponent(emailBody);
    return `mailto:${to}?subject=${subjectParam}&body=${bodyParam}`;
  }, [recipientEmail, emailSubject, emailBody]);

  // Generate short URL without Google AI Studio in the link
  const handleGenerateShortUrl = async () => {
    setIsShortening(true);
    setShortenerError(null);
    try {
      const response = await fetch('/api/shorten-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: rawPublicUrl,
          customAlias: customAlias.trim() || undefined
        })
      });

      if (!response.ok) {
        throw new Error("Impossible de joindre le service de raccourcissement.");
      }

      const data = await response.json();
      if (data.shortUrl) {
        setGeneratedShortUrl(data.shortUrl);
        // Automatically save and activate this cleaner URL
        setActiveCustomUrl(data.shortUrl);
        if (typeof window !== 'undefined') {
          localStorage.setItem('lexiia_custom_share_url', data.shortUrl);
        }
        onShowToast(`Lien court généré avec succès (${data.provider || 'URL'}) !`);
      } else {
        throw new Error(data.error || "Réponse invalide du serveur");
      }
    } catch (err: any) {
      console.warn("API shorten failed:", err?.message || err);
      setShortenerError("Le service automatique est indisponible. Vous pouvez créer un lien court sur Dub.co ou Bitly et le coller ci-dessous.");
      onShowToast("Indiquez votre lien personnalisé ci-dessous.");
    } finally {
      setIsShortening(false);
    }
  };

  const handleSaveCustomDomain = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customUrlInput.trim();
    if (!cleaned) {
      setActiveCustomUrl('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lexiia_custom_share_url');
      }
      onShowToast("Retour à l'adresse par défaut.");
      return;
    }

    let formatted = cleaned;
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }

    setActiveCustomUrl(formatted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lexiia_custom_share_url', formatted);
    }
    onShowToast("Lien personnalisé activé pour tous vos partages !");
  };

  const handleResetToDefault = () => {
    setActiveCustomUrl('');
    setCustomUrlInput('');
    setGeneratedShortUrl('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lexiia_custom_share_url');
    }
    onShowToast("Lien par défaut rétabli.");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="w-full max-w-2xl bg-[#0b0f19] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-auto text-slate-100 font-sans"
        >
          {/* Subtle radial glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all z-20"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Partage & Test Utilisateur
                </span>
                {activeCustomUrl ? (
                  <span className="text-xs text-amber-400 flex items-center gap-1 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Globe className="w-3 h-3" /> Lien personnalisé actif
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Accès public sécurisé
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Partager l'application LexIIA
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Invitez vos confrères ou testeurs avec un lien direct, un e-mail prêt à l'emploi ou une adresse personnalisée masquant le domaine technique.
              </p>
            </div>
          </div>

          {/* Current Active URL Banner */}
          <div className="mb-5 p-3 rounded-2xl bg-[#131722] border border-[#1f2638] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
                <Link2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {activeCustomUrl ? "Lien personnalisé en cours de diffusion" : "Lien de partage actuel"}
                </div>
                <div className="text-xs font-mono text-amber-300 truncate">
                  {effectiveUrl}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                onClick={() => handleCopyLink(effectiveUrl)}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-all"
                title="Copier ce lien"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copié" : "Copier"}</span>
              </button>
              <button
                onClick={() => setActiveTab('mask')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  activeTab === 'mask' 
                    ? 'bg-amber-500 text-slate-950 font-bold' 
                    : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Masquer le lien</span>
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#131722] border border-[#1f2638] rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'email'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">Invitation E-mail</span>
            </button>
            <button
              onClick={() => setActiveTab('mask')}
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all relative ${
                activeTab === 'mask'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span className="truncate">Masquer l'adresse</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5 animate-pulse" />
            </button>
            <button
              onClick={() => setActiveTab('link')}
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'link'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Copy className="w-4 h-4 shrink-0" />
              <span className="truncate">Lien direct</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="truncate">Guide de test</span>
            </button>
          </div>

          {/* TAB 1: EMAIL */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Adresse e-mail du testeur
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="confrere@cabinet.com"
                      className="w-full bg-[#131722] border border-[#1f2638] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Prénom ou nom du confrère (optionnel)
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="ex: Me Laurent"
                    className="w-full bg-[#131722] border border-[#1f2638] rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              {/* Email Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Aperçu de l'e-mail d'invitation préparé
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyRichTextHtml}
                      className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 transition-colors"
                      title="Copier avec le lien masqué sous un bouton cliquable (idéal pour Gmail & Outlook)"
                    >
                      {copiedRichHtml ? <Check className="w-3 h-3 text-emerald-400" /> : <Sparkles className="w-3 h-3" />}
                      <span>{copiedRichHtml ? "HTML copié !" : "Format lien masqué (HTML)"}</span>
                    </button>
                    <button
                      onClick={handleCopyEmailText}
                      className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                    >
                      {copiedEmailText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmailText ? "Texte copié !" : "Copier le texte"}</span>
                    </button>
                  </div>
                </div>
                <div className="max-h-44 overflow-y-auto bg-[#131722] border border-[#1f2638] rounded-xl p-3.5 text-[11px] sm:text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed custom-scrollbar">
                  {emailBody}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <a
                  href={mailtoLink}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Ouvrir mon client e-mail (Mailto)</span>
                </a>
                <button
                  onClick={handleCopyRichTextHtml}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all active:scale-[0.98]"
                  title="Copie le texte avec un bouton cliquable pour que l'adresse technique n'apparaisse pas en clair"
                >
                  {copiedRichHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Copier (Lien masqué)</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                💡 Utilisez <strong>« Copier (Lien masqué) »</strong> pour coller dans Gmail ou Outlook : le destinataire clique sur un bouton soigné sans voir l'URL technique.
              </p>
            </div>
          )}

          {/* TAB 2: MASQUER L'ADRESSE / LIEN PERSONNALISÉ */}
          {activeTab === 'mask' && (
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-200 text-xs leading-relaxed flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Comment masquer l'URL Google AI Studio / Cloud Run ?</strong>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Les adresses de développement contiennent par défaut le domaine technique Google Cloud Run. Voici les 3 solutions pour présenter un lien professionnel et élégant à vos utilisateurs.
                  </p>
                </div>
              </div>

              {/* Solution 1: Raccourcisseur automatique en 1 clic */}
              <div className="p-4 rounded-2xl bg-[#131722] border border-[#1f2638] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      Raccourcisseur instantané en 1 clic (Gratuit & Neutre)
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Instantané
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Générez une adresse courte neutre qui redirige automatiquement vers votre application, sans afficher "google ai studio" ni "run.app".
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                      placeholder="alias-personnalise (ex: lexiia-demo)"
                      className="w-full bg-[#0b0f19] border border-[#1f2638] rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40"
                    />
                  </div>
                  <button
                    onClick={handleGenerateShortUrl}
                    disabled={isShortening}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-50 transition-all shrink-0 active:scale-95"
                  >
                    {isShortening ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Création...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Générer le lien court</span>
                      </>
                    )}
                  </button>
                </div>

                {generatedShortUrl && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-2 animate-fadeIn">
                    <div className="min-w-0">
                      <div className="text-[10px] text-emerald-400 font-bold uppercase">Lien court actif pour vos partages</div>
                      <div className="text-xs font-mono text-white truncate">{generatedShortUrl}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopyLink(generatedShortUrl)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-emerald-400 transition-all"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copier</span>
                      </button>
                      <a
                        href={generatedShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                        title="Tester le lien"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {shortenerError && (
                  <p className="text-[11px] text-amber-300 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {shortenerError}
                  </p>
                )}
              </div>

              {/* Solution 2: Nom de domaine personnalisé ou URL custom */}
              <div className="p-4 rounded-2xl bg-[#131722] border border-[#1f2638] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center">2</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      Votre propre Nom de Domaine ou Raccourcisseur (Bitly / Dub.co)
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    Sur mesure
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Si vous avez configuré un sous-domaine (ex: <code className="text-amber-300">app.moncabinet.fr</code> ou <code className="text-amber-300">lexiia.fr</code>) ou créé un lien court sur <strong className="text-white">Dub.co</strong> ou <strong className="text-white">Bitly</strong>, entrez-le ici :
                </p>

                <form onSubmit={handleSaveCustomDomain} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      placeholder="https://app.moncabinet.fr ou https://dub.sh/lexiia"
                      className="w-full bg-[#0b0f19] border border-[#1f2638] rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs transition-all active:scale-95"
                    >
                      Enregistrer
                    </button>
                    {activeCustomUrl && (
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-rose-400 text-xs transition-all"
                        title="Rétablir l'adresse Google par défaut"
                      >
                        Réinitialiser
                      </button>
                    )}
                  </div>
                </form>

                {/* Popular tools helper */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px]">
                  <a
                    href="https://dub.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-slate-300 group"
                  >
                    <div>
                      <strong className="text-white block group-hover:text-amber-400">Dub.co (Recommandé)</strong>
                      <span className="text-[10px] text-slate-500">Gratuit, crée des liens dub.sh/nom ou avec votre propre nom de domaine</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0 ml-2" />
                  </a>
                  <a
                    href="https://bitly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-slate-300 group"
                  >
                    <div>
                      <strong className="text-white block group-hover:text-amber-400">Bitly</strong>
                      <span className="text-[10px] text-slate-500">Service de référence pour obtenir un lien bit.ly/mon-projet en 30s</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0 ml-2" />
                  </a>
                </div>
              </div>

              {/* Solution 3: Masquer sous un bouton ou lien hypertexte dans l'e-mail */}
              <div className="p-4 rounded-2xl bg-[#131722] border border-[#1f2638] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Insérer en lien hypertexte dans Gmail ou Outlook (Sans rien installer)
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Dans votre messagerie, ne collez pas l'adresse brute. Écrivez par exemple : <span className="text-amber-300 font-semibold">« Cliquez ici pour essayer LexIIA »</span>, surlignez le texte et appuyez sur <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] border border-slate-700 font-mono">Ctrl + K</kbd> (ou <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] border border-slate-700 font-mono">Cmd + K</kbd>) pour lier l'adresse. Le destinataire clique simplement sur le texte sans voir l'URL Google.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Ou utilisez directement notre modèle prêt à coller :</span>
                  <button
                    onClick={handleCopyRichTextHtml}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    {copiedRichHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copier l'e-mail avec bouton masqué</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIRECT LINK */}
          {activeTab === 'link' && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Lien public actif pour les testeurs
                  </label>
                  {activeCustomUrl && (
                    <span className="text-[11px] text-amber-400 font-medium">
                      Lien masqué / personnalisé activé
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-[#131722] border border-[#1f2638] rounded-xl p-1.5 pl-3">
                  <span className="text-xs sm:text-sm text-slate-300 font-mono truncate flex-1 select-all">
                    {effectiveUrl}
                  </span>
                  <button
                    onClick={() => handleCopyLink(effectiveUrl)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shrink-0 active:scale-95"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copié !" : "Copier le lien"}</span>
                  </button>
                </div>
              </div>

              {/* Quick sharing options */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Partager en un clic sur d'autres canaux :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("Testez LexIIA, l'assistant juridique IA : " + effectiveUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 text-xs font-medium transition-all"
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(effectiveUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-blue-400 text-xs font-medium transition-all"
                  >
                    <span>💼 LinkedIn</span>
                  </a>
                  <a
                    href={effectiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Tester le lien</span>
                  </a>
                </div>
              </div>

              {/* What the tester gets */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ce que le testeur reçoit en ouvrant ce lien :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>5 consultations offertes immédiatement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Compatible PC, Mac, tablette et smartphone</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Aucun mot de passe ni CB requis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Sauvegarde des dossiers avec Google</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GUIDE DE TEST */}
          {activeTab === 'guide' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Scénarios recommandés que le destinataire peut tester pour évaluer LexIIA :
              </p>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                <div className="p-3 rounded-xl bg-[#131722] border border-[#1f2638] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Consultation juridique & Analyse de clauses</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Poser une question en droit des affaires ou soumettre une clause de non-concurrence ou d'indemnisation pour vérifier sa validité.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#131722] border border-[#1f2638] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Annuaire des 45+ Cabinets d'Avocats</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Rechercher des cabinets d'affaires référencés (Clifford Chance, Bredin Prat, Gide, Latham & Watkins, etc.) et associer un cabinet à un dossier.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#131722] border border-[#1f2638] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Agent Autonome & Playbook de négociation</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Tester la qualification automatique des litiges, le pre-screening NDA et la génération de règles de négociation strictes.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#131722] border border-[#1f2638] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 text-xs font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Export de contrats & mémos en PDF</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Télécharger un document juridique haute-fidélité prêt à être signé ou transmis au client final.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('email')}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Envoyer une invitation maintenant</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
