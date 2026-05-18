/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, 
  Send, 
  Plus, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Gavel, 
  ArrowRight,
  User,
  Bot,
  Loader2,
  Trash2,
  Download,
  AlertCircle,
  LogIn,
  LogOut,
  History,
  MessageSquare,
  FileCode,
  Twitter,
  Linkedin,
  MessageCircle,
  Monitor,
  Hexagon as PuzzlePiece,
  Cpu,
  ChevronRight,
  Menu,
  X,
  Clock,
  Search,
  Library,
  SquarePen,
  Plug2,
  Zap,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  ToggleLeft,
  ToggleRight,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { auth, loginWithGoogle, logout, testFirestoreConnection } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { historyService, Dossier, MessageRecord, AuditRecord } from './services/historyService';

interface Message {
  id?: string;
  role: 'user' | 'model';
  parts: [{ text: string }];
  planning?: string;
}

const SUGGESTIONS = [
  "Naviguer dans un scénario juridique complexe",
  "Rédiger un contrat personnalisé",
  "Quels sont mes droits en cas de divorce ?",
  "Analyser un document juridique"
];

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const authorizedDomain = (import.meta as any).env.VITE_AUTHORIZED_DOMAIN;
    if (authorizedDomain && authorizedDomain !== '*' && authorizedDomain !== 'localhost') {
      if (!window.location.hostname.includes(authorizedDomain)) {
        setIsLocked(true);
      }
    }
  }, []);

  if (isLocked) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <ShieldCheck className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 italic">ACCÈS RESTREINT</h1>
        <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
          Ce projet est une instance protégée de <b>Votre Avocat IA</b>. 
          Le fonctionnement sur ce domaine n'est pas autorisé. 
          Pour déployer votre propre version, veuillez configurer vos propres variables d'environnement.
        </p>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left font-mono text-[10px] text-slate-500">
          Error Level: DOMAIN_MISMATCH_SECURITY_LOCKED
        </div>
      </div>
    );
  }
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [currentDossier, setCurrentDossier] = useState<Dossier | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'agent' | 'schedule' | 'search' | 'library' | 'security' | 'connectors'>('chat');
  const [agentScenarioIndex, setAgentScenarioIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);
  const [useAgenticMode, setUseAgenticMode] = useState(false);

  interface Connector {
    id: string;
    type: 'whatsapp' | 'zapier' | 'email' | 'calendar';
    name: string;
    status: 'active' | 'inactive';
    config: any;
  }

  const [connectors, setConnectors] = useState<Connector[]>([
    { id: '1', type: 'whatsapp', name: 'WhatsApp Professional', status: 'inactive', config: {} },
    { id: '2', type: 'zapier', name: 'Legal Pipeline (Zapier)', status: 'inactive', config: {} },
    { id: '3', type: 'email', name: 'Maitres Emails', status: 'inactive', config: {} }
  ]);

  const scenarios = [
    "analyse", 
    "applications web", 
    "ventes", 
    "entreprise", 
    "marketing", 
    "recherche", 
    "flux de travail"
  ];

  useEffect(() => {
    if (activeTab === 'agent') {
      const interval = setInterval(() => {
        setAgentScenarioIndex((prev) => (prev + 1) % scenarios.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeTab]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderSidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
          ⚖️
        </div>
        <h1 className="text-xl font-bold font-display tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Avocat IA</h1>
      </div>

      <nav className="space-y-1 mb-8">
        <button 
          onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'chat' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <SquarePen className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Nouvelle tâche</span>
        </button>
        <button 
          onClick={() => { setActiveTab('agent'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'agent' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bot className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Agent</span>
        </button>
        <button 
          onClick={() => { setActiveTab('schedule'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'schedule' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Programmé</span>
        </button>
        <button 
          onClick={() => { setActiveTab('search'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'search' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Search className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Rechercher</span>
        </button>
        <button 
          onClick={() => { setActiveTab('library'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'library' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Library className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Bibliothèque</span>
        </button>
        <button 
          onClick={() => { setActiveTab('security'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'security' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400" />
          <span className="text-sm font-semibold">Sécurité MCP</span>
        </button>
        <button 
          onClick={() => { setActiveTab('connectors'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeTab === 'connectors' 
              ? 'bg-white/10 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Plug2 className="w-5 h-5 shrink-0 text-blue-400" />
          <span className="text-sm font-semibold">Connecteurs</span>
        </button>
      </nav>

      {user ? (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Historique</div>
            <button 
              onClick={() => createNewDossier()}
              className="p-1 hover:bg-white/10 rounded-md text-amber-400 transition-colors"
              title="Nouveau dossier"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {dossiers.length === 0 ? (
              <div className="text-center py-10 px-4">
                <History className="w-8 h-8 text-slate-700 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-slate-500 italic">Aucun dossier enregistré.</p>
              </div>
            ) : (
              dossiers.map((d) => (
                <button 
                  key={d.id}
                  onClick={() => selectDossier(d)}
                  className={`w-full text-left p-3 rounded-xl transition-all group flex items-center justify-between ${
                    currentDossier?.id === d.id 
                      ? 'bg-amber-500/20 border border-amber-500/30' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className={`text-sm font-medium truncate ${currentDossier?.id === d.id ? 'text-amber-400' : 'text-slate-300 group-hover:text-white'}`}>
                      {d.title}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MessageSquare className="w-2.5 h-2.5" />
                      {new Date(d.updatedAt?.toDate?.() || d.updatedAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <Trash2 
                    onClick={(e) => handleDeleteDossier(d.id, e)}
                    className="w-4 h-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" 
                  />
                </button>
              ))
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 mb-4">
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-white/20" />
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{user.displayName}</div>
                <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
              </div>
              <button 
                onClick={logout}
                className="ml-auto p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/5 border border-amber-500/10">
              <div className="text-[10px] font-semibold text-amber-200/80 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                SÉCURITÉ BLOCKCHAIN
              </div>
              <p className="text-[9px] text-amber-100/40 leading-relaxed uppercase tracking-tighter">
                HISTORIQUE PERSISTANT ET CHIFFRÉ VIA FIRESTORE.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
            <Scale className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-white font-semibold mb-2">Historique Privé</h3>
          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            Connectez-vous pour sauvegarder vos brouillons de contrats et vos consultations.
          </p>
          <button 
            onClick={loginWithGoogle}
            className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
          >
            <LogIn className="w-4 h-4" />
            Se connecter
          </button>
        </div>
      )}
    </>
  );

  useEffect(() => {
    testFirestoreConnection();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthLoading(false);
      if (u) loadDossiers();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeTab === 'security' && user) {
      historyService.getAuditLogs().then(setAuditLogs);
    }
  }, [activeTab, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isAnalyzing]);

  const loadDossiers = async () => {
    const list = await historyService.getDossiers();
    setDossiers(list);
  };

  const selectDossier = async (dossier: Dossier) => {
    setCurrentDossier(dossier);
    setIsLoading(true);
    const history = await historyService.getMessages(dossier.id);
    setMessages(history.map(m => ({
      id: m.id,
      role: m.role,
      parts: [{ text: m.content }]
    })));
    setIsLoading(false);
  };

  const createNewDossier = async (title: string = "Nouveau Dossier") => {
    const id = await historyService.createDossier(title);
    if (id) {
      await loadDossiers();
      const newDossier = { id, title, userId: user?.uid || '', createdAt: new Date(), updatedAt: new Date(), type: 'conseil' };
      setCurrentDossier(newDossier);
      setMessages([]);
    }
  };

  const welcomeMessageMarkdown = "Je suis votre assistant juridique personnel expert en droit français. Connectez-vous pour sauvegarder vos dossiers et accéder à votre historique.";

  const handleSend = async (text?: string) => {
    const messageText = typeof text === 'string' ? text : input;
    if (!messageText.trim() || isLoading) return;

    if (!user) {
      setError("Veuillez vous connecter pour discuter avec l'IA.");
      return;
    }

    let activeDossierId = currentDossier?.id;
    if (!activeDossierId) {
      activeDossierId = await historyService.createDossier(messageText.slice(0, 30) + "...");
      await loadDossiers();
      const docs = await historyService.getDossiers();
      const newlyCreated = docs.find(d => d.id === activeDossierId);
      if (newlyCreated) setCurrentDossier(newlyCreated);
    }

    const localId = Math.random().toString(36).substr(2, 9);
    const userMessage: Message = { id: `user-${localId}`, role: 'user', parts: [{ text: messageText }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Persist user message
    if (activeDossierId) {
      await historyService.addMessage(activeDossierId, 'user', messageText);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          history: messages,
          useAgenticMode 
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la communication avec l\'IA');

      const data = await response.json();
      const localModelId = Math.random().toString(36).substr(2, 9);
      const modelMessage: Message = { 
        id: `model-${localModelId}`, 
        role: 'model', 
        parts: [{ text: data.text }],
        planning: data.planning
      };
      setMessages(prev => [...prev, modelMessage]);

      // Persist AI response
      if (activeDossierId) {
        await historyService.addMessage(activeDossierId, 'model', data.text);
        // Automatically enrich contract draft if the AI provides one (heuristic)
        if (data.text.includes('CONTRAT') || data.text.includes('ARTICLE')) {
          await historyService.updateContract(activeDossierId, data.text);
        }
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!user) {
      setError("Veuillez vous connecter pour analyser un document.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    const localId = Math.random().toString(36).substr(2, 9);
    const userMessage: Message = { 
      id: `user-file-${localId}`,
      role: 'user', 
      parts: [{ text: `[Analyse de document: ${file.name}]` }] 
    };
    setMessages(prev => [...prev, userMessage]);

    let activeDossierId = currentDossier?.id;
    if (!activeDossierId) {
      activeDossierId = await historyService.createDossier(`Analyse: ${file.name}`, 'analyse');
      await loadDossiers();
      const docs = await historyService.getDossiers();
      const newlyCreated = docs.find(d => d.id === activeDossierId);
      if (newlyCreated) setCurrentDossier(newlyCreated);
    }

    if (activeDossierId) {
      await historyService.addMessage(activeDossierId, 'user', `[Document uploadé pour analyse: ${file.name}]`);
    }

    try {
      const response = await fetch('/api/analyze-doc', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur lors de l\'analyse du document');

      const data = await response.json();
      const localAnalysisId = Math.random().toString(36).substr(2, 9);
      const modelMessage: Message = { id: `model-analysis-${localAnalysisId}`, role: 'model', parts: [{ text: data.text }] };
      setMessages(prev => [...prev, modelMessage]);

      if (activeDossierId) {
        await historyService.addMessage(activeDossierId, 'model', data.text);
      }
    } catch (err: any) {
      setError(err.message || "Impossible d'analyser le document.");
    } finally {
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteDossier = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Supprimer ce dossier définitivement ?")) {
      await historyService.deleteDossier(id);
      if (currentDossier?.id === id) {
        setCurrentDossier(null);
        setMessages([]);
      }
      loadDossiers();
    }
  };

  const clearChat = () => {
    setCurrentDossier(null);
    setMessages([]);
    setError(null);
  };

  if (isAuthLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden relative font-sans">
      <div className="mesh-gradient-1"></div>
      <div className="mesh-gradient-2"></div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-slate-900 border-r border-white/10 p-6 z-[60] flex flex-col lg:hidden"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            {renderSidebarContent()}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col p-6 z-10 shrink-0">
        {renderSidebarContent()}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col z-10 relative min-w-0">
        <header className="flex justify-between items-center px-6 md:px-8 py-4 bg-transparent border-b border-white/5 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
             >
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm text-slate-400 font-medium tracking-wide">
                    {activeTab === 'agent' ? 'Configuration de l\'Agent' : currentDossier ? `Dossier: ${currentDossier.title}` : "Assistant Opérationnel"}
                  </span>
                </div>
                {activeTab === 'chat' && (
                  <button 
                    onClick={() => setUseAgenticMode(!useAgenticMode)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all border ${
                      useAgenticMode 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]' 
                        : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Zap className={`w-3 h-3 ${useAgenticMode ? 'animate-pulse' : ''}`} />
                    Deep Thinking
                  </button>
                )}
             </div>
          </div>
          <div className="flex gap-3">
            {activeTab === 'chat' && currentDossier?.contractDraft && (
              <button 
                onClick={() => {
                  const blob = new Blob([currentDossier.contractDraft || ''], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `contrat_${currentDossier.title.replace(/\s+/g, '_')}.txt`;
                  a.click();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
              >
                <Download className="w-3 h-3" />
                Exporter Contrat
              </button>
            )}
            {!user && (
              <button 
                onClick={loginWithGoogle}
                className="px-4 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition-all"
              >
                Connexion
              </button>
            )}
          </div>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-10 custom-scrollbar"
        >
          <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="popLayout">
              {activeTab === 'security' ? (
                <motion.div
                  key="security-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-white mb-2">Centre de Sécurité MCP</h2>
                      <p className="text-slate-400">Architecture conforme au protocole Legal-MCP pour la souveraineté des données.</p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold">
                      <ShieldCheck className="w-6 h-6" />
                      Statut: Protégé
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-amber-500" />
                        Politiques d'Intégration
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Anonymisation PII active (Middleware)
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Isolation des dossiers par Firebase Auth
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Chiffrement au repos (AES-256)
                        </li>
                      </ul>
                    </div>

                    <div className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <History className="w-5 h-5 text-amber-500" />
                        Audit Trail
                      </h3>
                      <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                        {auditLogs.length === 0 ? (
                          <div className="text-xs text-slate-600 italic">Aucun journal disponible.</div>
                        ) : (
                          auditLogs.map((log) => (
                            <div key={log.id} className="text-[10px] p-2 bg-white/5 rounded-lg border border-white/5">
                              <div className="flex justify-between font-bold text-slate-300">
                                <span>{log.action}</span>
                                <span>{new Date(log.timestamp?.toDate?.() || log.timestamp).toLocaleTimeString()}</span>
                              </div>
                              <div className="text-slate-500 truncate mt-1">{log.details}</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6">Optimisation Legal-MCP (Analysis)</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <h4 className="text-amber-400 font-bold mb-1 font-mono text-xs">ARCH_001: Data Minimization</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">Le système utilise désormais un middleware d'anonymisation pour ne transmettre que le contexte juridique abstrait à l'LLM, préservant l'identité des parties réelles (PII).</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <h4 className="text-amber-400 font-bold mb-1 font-mono text-xs">ARCH_002: Sandbox Execution</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">Les fichiers PDF ne sont plus stockés en clair. Ils sont parsés en mémoire, anonymisés, puis les fragments sont indexés dans un espace isolé lié à votre identité Firebase.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === 'connectors' ? (
                <motion.div
                  key="connectors-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                      <h3 className="text-lg font-bold text-white mb-4">Automatisation simple</h3>
                      <p className="text-sm text-slate-400 mb-6">Connectez vos agents à des milliers d'applications via Zapier ou des Webhooks personnalisés.</p>
                      <div className="space-y-4">
                        <button className="w-full p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-between hover:bg-orange-500/20 transition-all">
                          <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5" />
                            <span className="font-semibold">Connecter Zapier</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button className="w-full p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-between hover:bg-blue-500/20 transition-all">
                          <div className="flex items-center gap-3">
                            <LinkIcon className="w-5 h-5" />
                            <span className="font-semibold">Webhook Entrant (JSON)</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                      <h3 className="text-lg font-bold text-white mb-4">Intégrations Directes</h3>
                      <div className="space-y-3">
                        {connectors.map(c => (
                          <div key={c.id} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                              {c.type === 'whatsapp' && <Phone className="w-5 h-5 text-emerald-400" />}
                              {c.type === 'email' && <Mail className="w-5 h-5 text-amber-400" />}
                              <div className="text-sm">
                                <div className="font-semibold text-white">{c.name}</div>
                                <div className={`text-[10px] uppercase font-bold ${c.status === 'active' ? 'text-green-500' : 'text-slate-500'}`}>
                                  {c.status}
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                setConnectors(prev => prev.map(conn => conn.id === c.id ? {...conn, status: conn.status === 'active' ? 'inactive' : 'active'} : conn));
                                historyService.addAuditLog('TOGGLE_CONNECTOR', undefined, `Connector: ${c.name}, Status: ${c.status === 'active' ? 'inactive' : 'active'}`);
                              }}
                              className="p-1 text-slate-400 hover:text-white transition-colors"
                            >
                              {c.status === 'active' ? <ToggleRight className="w-8 h-8 text-green-500" /> : <ToggleLeft className="w-8 h-8" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] bg-amber-500/5 border border-amber-500/10">
                    <h3 className="text-xl font-bold text-amber-500 mb-4">Sécurité des Intégrations</h3>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                      Chaque connecteur utilise des tokens éphémères et respecte le protocole Legal-MCP. Les données sortantes sont filtrées pour éviter toute fuite de secret professionnel, même lors de l'envoi vers Zapier ou Mailgun.
                    </p>
                  </div>
                </motion.div>
              ) : activeTab === 'agent' ? (
                <motion.div
                  key="agent-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-12"
                >
                  <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight flex flex-wrap justify-center items-center gap-x-3">
                      <span>Déployez votre agent pour</span>
                      <div className="relative inline-block h-[1.2em] min-w-[200px] text-left">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={scenarios[agentScenarioIndex]}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute left-0 text-amber-500"
                          >
                            {scenarios[agentScenarioIndex]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* WhatsApp Card */}
                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all group relative overflow-hidden h-full">
                       <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                         <MessageCircle className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold mb-3">WhatsApp Business</h3>
                       <p className="text-sm text-slate-400 leading-relaxed mb-6">Connectez votre expert juridique directement aux conversations de vos clients sur WhatsApp.</p>
                       <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5">
                         Disponible maintenant
                       </div>
                    </div>
                    
                    {/* Twitter Card */}
                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all group relative overflow-hidden h-full">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                         <Twitter className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold mb-3">Twitter / X Integration</h3>
                       <p className="text-sm text-slate-400 leading-relaxed mb-6">Répondez automatiquement aux mentions juridiques et assurez une veille active sur les réseaux.</p>
                       <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5">
                         Bêta privée
                       </div>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all group relative overflow-hidden h-full">
                       <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                         <Linkedin className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold mb-3">LinkedIn Automator</h3>
                       <p className="text-sm text-slate-400 leading-relaxed mb-6">Générez des posts et interagissez avec votre réseau professionnel de manière experte.</p>
                       <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5">
                         En développement
                       </div>
                    </div>

                    {/* Features from Video */}
                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all group h-full">
                       <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 transition-transform group-hover:scale-110">
                         <Monitor className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold mb-3">Mémoire persistante</h3>
                       <p className="text-sm text-slate-400 leading-relaxed">Assistant cloud disponible 24/7 qui conserve tout le contexte et la mémoire.</p>
                    </div>

                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all group h-full">
                       <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 transition-transform group-hover:scale-110">
                         <PuzzlePiece className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold mb-3">Compétences</h3>
                       <p className="text-sm text-slate-400 leading-relaxed">Équipez votre assistant avec des connaissances expertes dans des domaines spécifiques.</p>
                    </div>

                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-all group h-full">
                       <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6 transition-transform group-hover:scale-110">
                         <Cpu className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold mb-3">API & Webhooks</h3>
                       <p className="text-sm text-slate-400 leading-relaxed">Intégrez l'intelligence directement dans vos outils métiers existants via notre API.</p>
                    </div>
                  </div>

                  <div className="mt-12 p-10 rounded-[40px] bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
                    <div className="relative z-10 text-center md:text-left">
                      <h3 className="text-3xl font-black text-slate-950 mb-3 tracking-tight">Prêt à automatiser ?</h3>
                      <p className="text-slate-950/70 font-semibold text-lg">Déployez votre agent intelligent en quelques clics.</p>
                    </div>
                    <button className="relative z-10 px-10 py-5 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3">
                       Démarrer maintenant
                       <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </motion.div>
              ) : messages.length === 0 ? (
                <motion.div 
                  key="chat-welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12 py-10"
                >
                  <div className="text-center space-y-4 px-4">
                    <h2 className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
                      Bonjour, je suis <span className="font-semibold italic text-amber-400 font-sans">Votre Avocat IA</span>.
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                      {welcomeMessageMarkdown}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button 
                      whileHover={{ y: -4 }}
                      onClick={() => handleSend("Rédiger un contrat personnalisé")}
                      className="p-6 text-left rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all group shadow-xl"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">📝</div>
                      <h3 className="font-semibold text-lg text-white mb-1">Rédiger un contrat</h3>
                      <p className="text-sm text-slate-400 leading-normal">Brouillon de contrat persistant et éditable par IA.</p>
                    </motion.button>

                    <motion.button 
                      whileHover={{ y: -4 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="p-6 text-left rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all group shadow-xl"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
                      <h3 className="font-semibold text-lg text-white mb-1">Dossier d'Analyse</h3>
                      <p className="text-sm text-slate-400 leading-normal">Sauvegardez vos rapports d'analyses de documents complexes.</p>
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((suggestion, idx) => (
                      <span 
                        key={`suggestion-${idx}`}
                        onClick={() => handleSend(suggestion)}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 cursor-pointer hover:border-white/30 hover:bg-white/10 transition-all"
                      >
                        "{suggestion}"
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="chat-messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8 pb-10"
                >
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id ? `msg-${msg.id}` : `msg-idx-${idx}-${msg.role}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'model' && (
                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex-shrink-0 flex items-center justify-center mt-1 shadow-lg shadow-amber-500/20">
                          <Gavel className="w-6 h-6 text-slate-950" />
                        </div>
                      )}
                      <div className={`max-w-[85%] rounded-2xl px-6 py-5 ${
                        msg.role === 'user' 
                          ? 'bg-amber-500 text-slate-950 font-medium shadow-xl'
                          : 'bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 shadow-2xl overflow-x-auto'
                      }`}>
                        {msg.planning && (
                          <div className="mb-4 p-4 bg-slate-900 border border-amber-500/20 rounded-xl text-[10px] font-mono text-slate-400">
                             <div className="flex items-center gap-2 mb-2 text-amber-500 font-bold uppercase tracking-widest">
                               <Zap className="w-3 h-3" /> Agent Execution Plan 
                             </div>
                             <Markdown>{msg.planning}</Markdown>
                          </div>
                        )}
                        <div className="markdown-body">
                          <Markdown>{msg.parts[0].text}</Markdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {(isLoading || isAnalyzing) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 justify-start pb-10"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center animate-pulse">
                    <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 shadow-xl backdrop-blur-md">
                    <p className="text-slate-400 text-sm flex items-center gap-3">
                      {isAnalyzing ? "Analyse experte et sauvegarde..." : "Traitement juridique et mémorisation..."}
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center pb-10"
                >
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-2xl flex items-center gap-3 text-sm backdrop-blur-md max-w-lg">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="p-6 md:px-12 bg-transparent border-t border-white/5 shrink-0">
          <AnimatePresence>
            {activeTab === 'chat' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative max-w-4xl mx-auto flex gap-3"
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button 
                  disabled={isLoading || isAnalyzing}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all shadow-xl backdrop-blur-xl shrink-0"
                  title="Uploader un document"
                >
                  <Upload className="w-6 h-6" />
                </button>
                
                <div className="relative flex-1">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={user ? "Message..." : "Connectez-vous..."}
                    disabled={!user}
                    className="w-full bg-white/10 border border-white/10 backdrop-blur-2xl rounded-2xl py-4 px-4 pr-16 md:px-6 md:pr-32 focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-500 text-slate-100 resize-none min-h-[56px] max-h-40 disabled:opacity-50 text-sm md:text-base"
                  />
                  <div className="absolute right-2 top-2 bottom-2 flex">
                    <button 
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading || isAnalyzing || !user}
                      className="px-4 md:px-6 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all disabled:opacity-30 disabled:hover:bg-amber-500 flex items-center justify-center"
                    >
                      <span className="hidden md:inline">Envoyer</span>
                      <Send className="w-5 h-5 md:hidden" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-center text-slate-600 mt-6 max-w-2xl mx-auto uppercase tracking-tighter">
            Mémoire à long terme activée via Firestore. Vos données sont persistées et sécurisées.
          </p>
        </footer>
      </main>
    </div>
  );
}


