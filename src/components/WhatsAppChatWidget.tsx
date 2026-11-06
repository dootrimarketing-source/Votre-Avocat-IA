import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Phone, MessageCircle, Sparkles, CheckCheck } from 'lucide-react';

interface WhatsAppChatWidgetProps {
  phoneNumber?: string; // e.g. "07 83 75 72 58"
  internationalNumber?: string; // e.g. "33783757258"
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({
  phoneNumber = "07 83 75 72 58",
  internationalNumber = "33783757258"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPillDismissed, setIsPillDismissed] = useState(false);

  const quickPrompts = [
    "Bonjour, j'ai une question sur un problème juridique.",
    "Bonjour, j'aimerais être mis en relation avec un avocat partenaire.",
    "Bonjour, pouvez-vous m'aider sur un devis ou abonnement LexIIA ?"
  ];

  const handleSelectPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const getWhatsAppUrl = (textToSend: string) => {
    const text = textToSend.trim() || "Bonjour, je souhaite poser une question à propos de LexIIA.";
    return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div 
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 rounded-3xl bg-[#0c101a] border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
            style={{
              boxShadow: '0 20px 50px -10px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.15)'
            }}
          >
            {/* Header WhatsApp */}
            <div className="bg-gradient-to-r from-[#075e54] to-[#128c7e] p-4 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow-md">
                      {/* WhatsApp official SVG icon */}
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.584 1.83.896 2.796.896 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.782-5.768-5.782zm3.364 8.204c-.143.402-.828.749-1.157.798-.316.046-.723.072-2.18-.535-1.745-.726-2.883-2.5-2.97-2.618-.087-.118-.707-.941-.707-1.794 0-.853.447-1.274.606-1.448.159-.174.346-.218.462-.218.116 0 .232.001.332.006.107.005.25-.041.391.298.144.347.492 1.2.535 1.288.043.087.072.189.015.304-.058.116-.087.189-.174.291-.087.102-.183.228-.261.306-.088.087-.179.182-.077.357.102.174.453.747.971 1.209.667.594 1.23.778 1.404.865.174.088.275.073.378-.044.102-.116.435-.508.551-.682.116-.174.232-.145.391-.087.159.058 1.013.478 1.187.565.174.087.29.13.333.203.043.073.043.421-.1.823z" />
                      </svg>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075e54]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                      <span>Assistance & Contact Direct</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    </h3>
                    <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      En ligne · WhatsApp {phoneNumber}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-emerald-100 hover:text-white transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Preview / Body */}
            <div className="p-4 space-y-3 bg-[#0a0d14]/90 max-h-[360px] overflow-y-auto custom-scrollbar">
              {/* Agent Bubble */}
              <div className="flex items-start gap-2 max-w-[90%]">
                <div className="p-3 rounded-2xl rounded-tl-sm bg-[#17222c] border border-emerald-500/20 text-xs text-slate-200 leading-relaxed shadow-sm">
                  <p className="font-bold text-emerald-400 text-[11px] mb-1 flex items-center gap-1">
                    <span>Équipe LexIIA</span>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </p>
                  <p>
                    Bonjour ! 👋 Vous souhaitez poser une question, être orienté vers le bon cabinet ou échanger sur un dossier ?
                  </p>
                  <p className="mt-1.5 text-slate-300">
                    Discutez en direct avec nous sur WhatsApp au <strong className="text-white font-mono">{phoneNumber}</strong>.
                  </p>
                  <span className="block text-[9px] text-slate-500 text-right mt-1">À l'instant</span>
                </div>
              </div>

              {/* Quick Prompt Pills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">
                  Questions rapides suggérées :
                </span>
                <div className="space-y-1">
                  {quickPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(p)}
                      className="w-full text-left p-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-[11px] text-slate-300 hover:text-emerald-300 transition-all cursor-pointer truncate block"
                    >
                      💬 {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input & Direct Action Area */}
            <div className="p-3 border-t border-white/10 bg-[#090d14] space-y-2.5">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message ici..."
                  rows={2}
                  className="w-full p-2.5 pr-2 rounded-xl bg-[#131926] border border-white/10 focus:border-emerald-500 text-xs text-white placeholder-slate-500 focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>Envoyer sur WhatsApp</span>
                </a>

                <a
                  href={`tel:+33${internationalNumber.slice(2)}`}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title={`Appeler le ${phoneNumber}`}
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-0.5">
                <span>WhatsApp : {phoneNumber}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Chiffré de bout en bout
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-2 justify-end">
        {!isOpen && !isPillDismissed && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c101a]/95 border border-emerald-500/30 text-xs text-slate-200 shadow-xl backdrop-blur-md cursor-pointer select-none group"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
              Une question ? WhatsApp direct
            </span>
            <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              {phoneNumber}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPillDismissed(true);
              }}
              className="p-0.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors ml-0.5 cursor-pointer"
              title="Masquer"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contacter sur WhatsApp"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128c7e] to-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 border-2 border-white/20 transition-all cursor-pointer group"
        >
          {/* Animated rings */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }} />

          {isOpen ? (
            <X className="w-6 h-6 text-slate-950 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              {/* WhatsApp Icon */}
              <svg className="w-7 h-7 fill-slate-950 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              {/* Online indicator dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#04060a]" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
