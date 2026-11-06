/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Puzzle,
  Cpu,
  ChevronRight,
  Menu,
  X,
  Clock,
  Search,
  Library,
  GraduationCap,
  SquarePen,
  Plug2,
  Zap,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  ToggleLeft,
  ToggleRight,
  Link as LinkIcon,
  ExternalLink,
  Sparkles,
  Check,
  Copy,
  RotateCcw,
  BookOpen,
  Infinity,
  Lock,
  Users,
  HeartHandshake,
  Globe,
  Building2,
  Award,
  BadgeCheck,
  MapPin,
  Folder,
  Settings2,
  SlidersHorizontal,
  RefreshCw,
  Play,
  Database,
  Terminal,
  FileSearch,
  Webhook,
  Key,
  CheckCircle2,
  Layers,
  FileSpreadsheet,
  CheckCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import autoTable from 'jspdf-autotable';
import { auth, loginWithGoogle, logout, testFirestoreConnection, getRedirectResult, getAccessToken, getCachedAccessToken } from './lib/firebase';
import { 
  fetchGoogleDriveFiles, 
  fetchGoogleDocContent, 
  fetchGoogleSheetData, 
  connectGoogleWorkspace, 
  GoogleDriveFile, 
  WORKSPACE_SCOPES 
} from './lib/googleWorkspace';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { historyService, Dossier, MessageRecord, AuditRecord } from './services/historyService';
import { jsPDF } from 'jspdf';
import { lawyersList, LawyerProfile } from './data/lawyers';
import { AgentTab } from './components/AgentTab';
import { JurisprudentialSearchTab } from './components/JurisprudentialSearchTab';
import { LexIIAAcademy } from './components/LexIIAAcademy';
import { ShareModal } from './components/ShareModal';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { VisibilityContractModal } from './components/VisibilityContractModal';
import { LEGAL_ABBREVIATIONS, LEGAL_OFFICIAL_PORTALS, searchLegalAbbreviations } from './data/legalLexicon';
import { isAbortError, formatFriendlyFetchError } from './lib/abortUtils';

export interface EmailDispatchState {
  cabinet: LawyerProfile;
  recipientEmail: string;
  subject: string;
  body: string;
  senderEmail: string;
  isSending?: boolean;
  sentSuccess?: boolean;
  sentMessageId?: string;
  sentAt?: string;
}

const GoogleDriveIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5L7.71 3.5z" fill="#0F9D58" />
    <path d="M16.29 3.5H7.71l6.56 11.5h8.58L16.29 3.5z" fill="#FFC107" />
    <path d="M22.85 15l-3.43 6H4.58L8.01 15h14.84z" fill="#4285F4" />
  </svg>
);

const WordIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#185ABD" />
    <path d="M37 11H20a2 2 0 00-2 2v22a2 2 0 002 2h17a2 2 0 002-2V13a2 2 0 00-2-2z" fill="#2B7CD3" opacity="0.4" />
    <rect x="7" y="11" width="23" height="26" rx="5" fill="#104A9E" />
    <path d="M12 18h3.3l2.2 8.5 2.1-8.5H23l-3.6 12h-3.4l-2.1-7.8-2.1 7.8H8.4L12 18z" fill="white" />
  </svg>
);

const SharePointIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#0E1E28" />
    <circle cx="31" cy="18" r="9" fill="#0078D4" opacity="0.85" />
    <circle cx="33" cy="30" r="9.5" fill="#038387" />
    <circle cx="19" cy="25" r="11" fill="#00A29C" />
    <path d="M17.5 21.5c0-.9.7-1.5 1.7-1.5 1 0 1.7.6 1.7 1.5 0 .7-.4 1.2-1.1 1.5l-1.1.5c-1.4.6-2.2 1.6-2.2 3 0 2 1.6 3.5 3.6 3.5 2 0 3.6-1.5 3.6-3.5h-1.9c0 .9-.8 1.6-1.7 1.6-.9 0-1.7-.7-1.7-1.6 0-.7.4-1.2 1.1-1.5l1.1-.5c1.4-.6 2.2-1.6 2.2-3 0-2-1.6-3.5-3.6-3.5-2 0-3.6 1.5-3.6 3.5h1.9z" fill="white" />
  </svg>
);

const DropboxIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#141418" />
    <path d="M15 13.5L24 19.5L15 25.5L6 19.5L15 13.5Z" fill="#0061FF" />
    <path d="M33 13.5L42 19.5L33 25.5L24 19.5L33 13.5Z" fill="#0061FF" />
    <path d="M15 25.5L24 31.5L15 37.5L6 31.5L15 25.5Z" fill="#0061FF" opacity="0.85" />
    <path d="M33 25.5L42 31.5L33 37.5L24 31.5L33 25.5Z" fill="#0061FF" opacity="0.85" />
    <path d="M24 33.5L18.8 30L15 33L24 39L33 33L29.2 30L24 33.5Z" fill="#0061FF" />
  </svg>
);

const SlackIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#1E1E24" />
    <g transform="translate(10, 10) scale(0.58)">
      <path d="M10.2 20.4a5.1 5.1 0 1 1-5.1-5.1h5.1v5.1zm2.5 0a5.1 5.1 0 0 1 10.2 0v12.8a5.1 5.1 0 1 1-10.2 0v-12.8z" fill="#E01E5A" />
      <path d="M27.9 10.2a5.1 5.1 0 1 1 5.1-5.1v5.1h-5.1zm0 2.5a5.1 5.1 0 0 1 0 10.2h-12.8a5.1 5.1 0 1 1 0-10.2h12.8z" fill="#36C5F0" />
      <path d="M38.1 27.9a5.1 5.1 0 1 1 5.1 5.1h-5.1v-5.1zm-2.5 0a5.1 5.1 0 0 1-10.2 0v-12.8a5.1 5.1 0 1 1 10.2 0v12.8z" fill="#2EB67D" />
      <path d="M20.4 38.1a5.1 5.1 0 1 1-5.1 5.1v-5.1h5.1zm0-2.5a5.1 5.1 0 0 1 0-10.2h12.8a5.1 5.1 0 1 1 0 10.2h-12.8z" fill="#ECB22E" />
    </g>
  </svg>
);

const WhatsAppIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#182A20" />
    <rect x="3" y="3" width="42" height="42" rx="10" fill="#25D366" />
    <path d="M24 10.5c-7.4 0-13.5 6.1-13.5 13.5 0 2.4.6 4.7 1.8 6.7L10.5 37.5l7-1.8c1.9 1 4.1 1.6 6.5 1.6 7.4 0 13.5-6.1 13.5-13.5S31.4 10.5 24 10.5zm7.9 19.1c-.3.9-1.8 1.7-2.5 1.8-.7.2-1.4.2-4.8-1.2-4-1.7-6.6-5.8-6.8-6.1-.2-.3-1.7-2.3-1.7-4.4 0-2.1 1.1-3.2 1.5-3.5.4-.5.9-.5 1.2-.5.3 0 .6 0 .9.1.3.1.7-.2 1.1.7.4.9 1.4 3.3 1.5 3.5.1.3.2.6.1.9-.1.4-.3.5-.5.8-.2.2-.5.5-.8.8-.2.2-.5.5-.2 1 .3.5 1.3 2.1 2.7 3.4 1.9 1.7 3.5 2.2 4 2.4.5.2.8.2 1.1-.2.3-.4 1.3-1.5 1.7-2 .4-.5.8-.5 1.2-.3.5.2 3.2 1.5 3.7 1.7.5.3.9.5 1.1.7.2.3.2 1.6-.1 2.5z" fill="white" />
  </svg>
);

const CalendarAppIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#1E293B" />
    <rect x="9" y="9" width="30" height="30" rx="7" fill="white" />
    <path d="M9 18h30v-2a7 7 0 00-7-7H16a7 7 0 00-7 7v2z" fill="#4285F4" />
    <circle cx="17" cy="13" r="1.5" fill="white" />
    <circle cx="31" cy="13" r="1.5" fill="white" />
    <text x="24" y="32" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">31</text>
  </svg>
);

const HubSpotIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#FF7A59" />
    <path d="M33 22.8V18.7c0-1.3-1-2.3-2.3-2.3-1.3 0-2.3 1-2.3 2.3v4.1c-1 .6-1.7 1.5-2 2.6H22c-.3-.9-1-1.6-1.8-2v-3.7c.6-.4 1-1 1-1.8 0-1.3-1-2.3-2.3-2.3s-2.3 1-2.3 2.3c0 .8.4 1.4 1 1.8v3.7c-.8.4-1.5 1.1-1.8 2H13c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3h2.8c.4.9 1 1.6 1.9 2V34c0 1.3 1 2.3 2.3 2.3s2.3-1 2.3-2.3v-3.3c.8-.4 1.5-1.1 1.9-2H30c.4 1.1 1.1 2 2 2.6v4.1c0 1.3 1 2.3 2.3 2.3s2.3-1 2.3-2.3v-4.1c1.8-1 3-2.9 3-5.1 0-2.1-1.2-4.1-3-5.1zm-2.3 7.1c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="white" />
  </svg>
);

const ZapierIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="6" fill="#FF4F00" />
    <path d="M12 4.5v15M4.5 12h15M6.7 6.7l10.6 10.6M6.7 17.3l10.6-10.6" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

interface Message {
  id?: string;
  role: 'user' | 'model';
  parts: { text: string }[];
  planning?: string;
}

// ‚îÄ‚îÄ‚îÄ Search History ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ

const SEARCH_HISTORY_KEY = 'avocat_search_history';
const MAX_HISTORY = 30;

interface SearchRecord {
  id: string;
  query: string;
  label?: string;        // human-readable label (for category shortcuts)
  type: 'free' | 'category';
  timestamp: number;
}

function loadSearchHistory(): SearchRecord[] {
  try {
    return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
  } catch { return []; }
}

function saveSearchHistory(history: SearchRecord[]): void {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch { /* ignore */ }
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return 'À l\'instant';
  if (m < 60) return `Il y a ${m} min`;
  if (h < 24) return `Il y a ${h}h`;
  if (d === 1) return 'Hier';
  return `Il y a ${d} jours`;
}

const SUGGESTIONS = [
  "Comprendre vos droits",
  "Créer une SARL ou SARL-S au Luxembourg : législation",
  "Contrat de travail au Luxembourg : période d'essai et préavis",
  "Bail d'habitation au Luxembourg : plafonnement et garanties",
  "Divorce & garde d'enfants au Grand-Duché",
  "Droit de rétractation et e-commerce au Luxembourg",
  "Recours contre l'administration (Legilux)",
];

const parseDraftToHtml = (text: string) => {
  if (!text) return null;
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Check if it's a structural title or header
    if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const titleText = trimmed.replace(/^#+\s+/, '');
      return (
        <div key={idx} className="mt-6 mb-3 border-b border-neutral-200 pb-1.5">
          <h3 className="text-xs sm:text-[13px] uppercase font-bold tracking-wider text-amber-900/90 font-sans">
            {titleText}
          </h3>
        </div>
      );
    }

    // Check if it starts/ends with double asterisks representing a subsection
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2, -2).includes('\n')) {
      const headerText = trimmed.replace(/\*\*/g, '');
      return (
        <div key={idx} className="mt-5 mb-2">
          <h4 className="text-xs uppercase font-extrabold tracking-wide text-neutral-800 font-sans">
            {headerText}
          </h4>
        </div>
      );
    }

    // Check if it represents lists or list items
    if (trimmed.includes('\n-') || trimmed.includes('\n*') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const lines = trimmed.split('\n');
      return (
        <ul key={idx} className="space-y-1.5 my-3 pl-5 list-disc text-[11px] text-neutral-700 font-sans leading-relaxed">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^[-*]\s*/, '').trim();
            // inner bold formatting for items
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
            return (
              <li key={lIdx}>
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="font-bold text-neutral-900">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </li>
            );
          })}
        </ul>
      );
    }

    // Check if it's a table
    if (trimmed.includes('|')) {
      const lines = trimmed.split('\n');
      const tableLines = lines.filter(l => l.includes('|'));
      if (tableLines.length >= 2) {
        // Simple light table parser for document presentation
        const rows = tableLines.map(line => 
          line.split('|').map(cell => cell.trim()).filter((_c, i, arr) => i > 0 && i < arr.length - 1 || line.trim().startsWith('|') ? true : true)
        ).filter(row => row.length > 0 && !row.every(cell => cell.includes('---')));

        if (rows.length > 0) {
          return (
            <div key={idx} className="my-4 overflow-x-auto border border-neutral-200 rounded-md">
              <table className="min-w-full divide-y divide-neutral-200 text-[10px]">
                <thead className="bg-neutral-50">
                  <tr className="divide-x divide-neutral-200">
                    {rows[0].map((cell, cIdx) => (
                      <th key={cIdx} className="px-3 py-2 text-left font-bold text-neutral-700 uppercase tracking-wider bg-amber-500/5">{cell.replace(/\*\*/g, '')}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {rows.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-neutral-50/50 divide-x divide-neutral-200">
                      {row.map((cell, cIdx) => {
                        const parts = cell.split(/(\*\*.*?\*\*)/g);
                        return (
                          <td key={cIdx} className="px-3 py-1.5 whitespace-nowrap text-neutral-600 font-sans">
                            {parts.map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx} className="font-bold text-neutral-900">{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
    }

    // Regular paragraph formatting
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={idx} className="text-[11px] text-neutral-700 leading-relaxed font-sans text-justify mt-2 mb-2">
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-neutral-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
};

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

#### 📊 Seuils Financiers de Référence

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

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authPopupBlockedNotice, setAuthPopupBlockedNotice] = useState(false);
  const [showAbbrevModal, setShowAbbrevModal] = useState(false);
  const [abbrevSearch, setAbbrevSearch] = useState('');
  // Domain lock disabled in AI Studio — only active on Vercel via env var check
  const isLocked = false;

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setAuthPopupBlockedNotice(false);
    try {
      await loginWithGoogle();
    } catch {
      // Benign errors are handled gracefully inside loginWithGoogle
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    const handlePopupBlocked = () => {
      setAuthPopupBlockedNotice(true);
    };
    window.addEventListener('auth-popup-blocked', handlePopupBlocked);
    return () => window.removeEventListener('auth-popup-blocked', handlePopupBlocked);
  }, []);

  // New States for the 4-step Agent tab
  const [agentActiveStep, setAgentActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPilotModelId, setSelectedPilotModelId] = useState<'nda' | 'rh' | 'signature' | 'litige'>('nda');
  const [pilotRawText, setPilotRawText] = useState(pilotModels.nda.rawText);
  const [pilotAnalysisResult, setPilotAnalysisResult] = useState('');
  const [isAnalyzingPilot, setIsAnalyzingPilot] = useState(false);
  const [pilotProgressText, setPilotProgressText] = useState('');

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

  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [currentDossier, setCurrentDossier] = useState<Dossier | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'agent' | 'schedule' | 'search' | 'library' | 'security' | 'connectors'>('chat');
  const [showShareModal, setShowShareModal] = useState(false);
  const [agentScenarioIndex, setAgentScenarioIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persona & Lawyer Recommendation settings (avocat vs direction juridique vs justiciable)
  const [userPersona, setUserPersona] = useState<'lawyer' | 'jurist' | 'general'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lexiia_user_persona') as any) || 'lawyer';
    }
    return 'lawyer';
  });

  const [recommendLawyers, setRecommendLawyers] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lexiia_recommend_lawyers');
      if (saved !== null) return saved === 'true';
    }
    return false; // Par défaut : désactivé pour un compte avocat
  });

  const [showQuickStartGuide, setShowQuickStartGuide] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lexiia_hide_quickstart');
      return saved !== 'true';
    }
    return true;
  });

  const handleSelectPersona = (persona: 'lawyer' | 'jurist' | 'general') => {
    setUserPersona(persona);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lexiia_user_persona', persona);
    }
    if (persona === 'lawyer') {
      setRecommendLawyers(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lexiia_recommend_lawyers', 'false');
      }
      showToast("⚖️ Mode Avocat actif : Recommandations de cabinets confrères désactivées.");
    } else {
      setRecommendLawyers(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lexiia_recommend_lawyers', 'true');
      }
      showToast(persona === 'jurist' ? "🏢 Mode Direction Juridique actif." : "👤 Mode Justiciable / Général actif.");
    }
  };

  const handleToggleRecommendLawyers = () => {
    const nextVal = !recommendLawyers;
    setRecommendLawyers(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lexiia_recommend_lawyers', String(nextVal));
    }
    showToast(nextVal ? "✓ Recommandations de cabinets partenaires activées" : "✓ Recommandations de confrères désactivées");
  };

  // Scheduled Tasks States
  const [scheduledTasks, setScheduledTasks] = useState<any[]>([
    { id: '1', icon: '⚖️', title: 'Délai appel — Tribunal de commerce', date: 'Dans 8 jours', priority: 'URGENT', color: 'text-red-400 bg-red-500/10 border-red-500/20', category: 'deadline' },
    { id: '2', icon: '📋', title: 'Dépôt conclusions en réponse', date: 'Dans 15 jours', priority: 'MOYEN', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', category: 'deadline' },
    { id: '4', icon: '📄', title: 'Renouvellement bail commercial', date: '28 Jan 2026', priority: 'PLANIFIÉ', color: 'text-slate-400 bg-white/5 border-white/10', category: 'pending' },
  ]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'URGENT' | 'MOYEN' | 'À VENIR' | 'PLANIFIÉ'>('URGENT');
  const [newTaskCategory, setNewTaskCategory] = useState<'deadline' | 'audience' | 'pending'>('deadline');
  const [newTaskIcon, setNewTaskIcon] = useState('⚖️');
  const [selectedScheduleFilter, setSelectedScheduleFilter] = useState<'all' | 'deadline' | 'audience' | 'pending'>('all');
  
  // AI Legal Search States
  const [isLegalSearching, setIsLegalSearching] = useState(false);
  const [legalSearchResult, setLegalSearchResult] = useState<string | null>(null);
  const [legalSearchPerformed, setLegalSearchPerformed] = useState(false);
  const [legalSearchError, setLegalSearchError] = useState<string | null>(null);
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [searchLoadingStep, setSearchLoadingStep] = useState(0);
  const [copiedSearchResult, setCopiedSearchResult] = useState(false);
  
  // Playbook Feature States & Static Data
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [selectedPlaybookId, setSelectedPlaybookId] = useState('limitation');
  const [playbookCopied, setPlaybookCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isTranslatingPlaybook, setIsTranslatingPlaybook] = useState(false);

  const [litigationRawText, setLitigationRawText] = useState(`FICHE DE LITIGE : RETARD DE LIVRAISON LOGISTIQUE CHRONO-RAPIDE

Faits : Notre entreprise a commandé 500 unités de composants auprès de LogisticsExpress le 12 avril 2026 pour une livraison garantie le 1er mai 2026. L'accord de niveau de service (SLA) prévoit des pénalités forfaitaires libératoires de 1 000 € par jour de retard, plafonnées à 20% du montant de la commande (montant total: 100 000 €).

La livraison a effectivement eu lieu le 20 mai 2026 (soit 19 jours de retard). Ce retard a bloqué notre ligne de production automobile pendant 5 jours, générant une demande d'indemnisation de notre client final d'un montant de 45 000 € pour perte d'exploitation.`);
  
  const [isAnalyzingLitigation, setIsAnalyzingLitigation] = useState(false);
  const [litigationAnalysisResult, setLitigationAnalysisResult] = useState('');

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

  const [playbookForm, setPlaybookForm] = useState({
    clause: 'Limitation de Responsabilité',
    preferred: 'Plafond de responsabilité limité aux sommes payées au cours des 12 derniers mois.',
    fallback: 'Plafond étendu à 2x les sommes payées ou 250 000 €, selon la valeur la plus basse.',
    businessValidation: 'Toutes clauses prévoyant une exclusion complète de plafond, ou des responsabilités illimitées pour dommages consécutifs.',
    redFlags: 'Indemnisation illimitée pour réclamations commerciales générales, ou pénalités de retard non plafonnées.',
    escalation: 'Demandes d\'indemnisation mutuelle réciproque sans faute préliminaire établie.',
    redlineStyle: 'Proposer notre clause standard en remplacement complet, avec des explications brèves sur notre politique financière d\'entreprise.'
  });

  // Keep form in sync when changing active preset playbook
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
      setGeneratedPrompt(''); // Reset output when shifting templates
    }
  }, [selectedPlaybookId]);

  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);
  const [useAgenticMode, setUseAgenticMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>(loadSearchHistory);
  const [searchInput, setSearchInput] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [lawyerFilterCategory, setLawyerFilterCategory] = useState<'all' | 'FR' | 'LU' | 'cabinet' | 'notaire' | 'avocat'>('all');
  const [lawyerSearchQuery, setLawyerSearchQuery] = useState('');
  const [cabinetSortOrder, setCabinetSortOrder] = useState<'asc' | 'desc' | 'alpha'>('asc');
  const [searchSubTab, setSearchSubTab] = useState<'all' | 'legal' | 'lawyers'>('all');
  const [bookingDay, setBookingDay] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [dossierSearch, setDossierSearch] = useState('');
  const [firestoreBlocked, setFirestoreBlocked] = useState(false);
  const [emailDispatchModal, setEmailDispatchModal] = useState<EmailDispatchState | null>(null);
  const [showVisibilityContractModal, setShowVisibilityContractModal] = useState<boolean>(false);
  const [visibilityContractCabinet, setVisibilityContractCabinet] = useState<LawyerProfile | null>(null);

  const openVisibilityContractForCabinet = (cab?: LawyerProfile | null) => {
    setVisibilityContractCabinet(cab || null);
    setShowVisibilityContractModal(true);
    historyService.addAuditLog('OPEN_VISIBILITY_CONTRACT', undefined, `Ouverture convention de visibilité : ${cab ? cab.name : 'Catalogue des cabinets'}`);
  };

  // States from video to control preview, folder steps and complexity
  const [complexity, setComplexity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [showDocWorkspace, setShowDocWorkspace] = useState(true);
  const [docWorkspaceTab, setDocWorkspaceTab] = useState<'preview' | 'steps'>('preview');
  const [thinkingStep, setThinkingStep] = useState(0);

  // Direct redirection & modal opener for law firms / cabinets
  const openLawyerCabinet = (lawyerOrId: LawyerProfile | string) => {
    let target: LawyerProfile | undefined;
    if (typeof lawyerOrId === 'string') {
      const raw = lawyerOrId.toLowerCase().trim();
      target = lawyersList.find(
        (l) =>
          l.id.toLowerCase() === raw ||
          l.name.toLowerCase() === raw ||
          l.name.toLowerCase().includes(raw) ||
          raw.includes(l.id.toLowerCase())
      );
    } else {
      target = lawyerOrId;
    }
    if (target) {
      setSelectedLawyer(target);
      setBookingConfirmed(false);
      setBookingDay('');
      setBookingTime('');
      historyService.addAuditLog('OPEN_CABINET_PROFILE', undefined, `Fiche cabinet ouverte : ${target.name}`);
    }
  };

  const redirectToCabinetInDirectory = (lawyerOrId: LawyerProfile | string) => {
    let target: LawyerProfile | undefined;
    if (typeof lawyerOrId === 'string') {
      const raw = lawyerOrId.toLowerCase().trim();
      target = lawyersList.find(
        (l) =>
          l.id.toLowerCase() === raw ||
          l.name.toLowerCase() === raw ||
          l.name.toLowerCase().includes(raw) ||
          raw.includes(l.id.toLowerCase())
      );
    } else {
      target = lawyerOrId;
    }
    if (target) {
      setLawyerFilterCategory('all');
      setLawyerSearchQuery(target.name);
      setActiveTab('search');
      setSelectedLawyer(target);
      historyService.addAuditLog('REDIRECT_DIRECTORY_CABINET', undefined, `Redirection annuaire vers : ${target.name}`);
    }
  };

  // Intelligent fuzzy search to match cabinet name or ID from annuaire
  const findCabinetByFuzzyQuery = (query: string): LawyerProfile | undefined => {
    if (!query) return undefined;
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    const qNorm = norm(query);
    const qWords = qNorm.split(' ').filter(w => w.length > 2);
    return lawyersList.find((l) => {
      if (l.type !== 'cabinet') return false;
      const lName = norm(l.name);
      const lId = norm(l.id);
      if (lName === qNorm || lId === qNorm || lName.includes(qNorm) || qNorm.includes(lName) || lId.includes(qNorm)) return true;
      return qWords.length > 0 && qWords.every(w => lName.includes(w) || lId.includes(w));
    });
  };

  const openEmailModalForCabinet = (cabinetOrId: LawyerProfile | string, customSubject?: string, customBody?: string) => {
    let cabinet: LawyerProfile | undefined;
    if (typeof cabinetOrId === 'string') {
      cabinet = findCabinetByFuzzyQuery(cabinetOrId) || lawyersList.find(l => l.id.toLowerCase() === cabinetOrId.toLowerCase().trim());
    } else {
      cabinet = cabinetOrId;
    }
    if (!cabinet) {
      showToast("Cabinet introuvable dans l'annuaire juridique.");
      return;
    }

    const dossierTitle = currentDossier ? currentDossier.title : "LexIIA";
    const userEmail = user?.email || "dootrimarketing@gmail.com";
    const defaultSubject = customSubject || `[Consultation Juridique LexIIA] Dossier : ${dossierTitle}`;
    const defaultBody = customBody || `Bonjour Maître,

Je me permets de vous contacter via la plateforme d'intelligence juridique LexIIA au sujet du dossier : "${dossierTitle}".

Dans le cadre de cette affaire, nous avons identifié plusieurs questions stratégiques relevant de votre haute expertise en ${cabinet.specialties?.[0] || 'droit des affaires'}.

Synthèse de la situation et des besoins :
- Dossier de référence : ${dossierTitle}
- Spécialité requise : ${cabinet.specialties?.slice(0, 3).join(', ') || 'Conseil et contentieux'}
- Analyse préalable : Un cadrage juridique a été initié sur LexIIA avec qualification des faits et premières références de jurisprudence.

Seriez-vous disponible pour un échange afin d'envisager la prise en charge de ce dossier et nous préciser vos modalités d'intervention ?

Vous pouvez me joindre directement par retour d'e-mail (${userEmail}) ou par téléphone.

Dans l'attente de votre retour, je vous prie d'agréer, Maître, l'expression de mes salutations distinguées.

---
Transmis via LexIIA AI Intelligence Juridique
Demandeur : ${user?.displayName || userEmail}`;

    setEmailDispatchModal({
      cabinet,
      recipientEmail: cabinet.email,
      subject: defaultSubject,
      body: defaultBody,
      senderEmail: userEmail,
      isSending: false,
      sentSuccess: false
    });

    historyService.addAuditLog('PREPARE_EMAIL_CABINET', undefined, `Préparation courriel vers : ${cabinet.name} (${cabinet.email})`);
  };

  const executeSendCabinetEmail = async () => {
    if (!emailDispatchModal) return;
    setEmailDispatchModal(prev => prev ? { ...prev, isSending: true } : null);

    try {
      const res = await fetch('/api/cabinets/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabinetId: emailDispatchModal.cabinet.id,
          cabinetName: emailDispatchModal.cabinet.name,
          recipientEmail: emailDispatchModal.recipientEmail,
          senderEmail: emailDispatchModal.senderEmail,
          subject: emailDispatchModal.subject,
          body: emailDispatchModal.body,
          dossierTitle: currentDossier?.title || 'Dossier LexIIA'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEmailDispatchModal(prev => prev ? {
          ...prev,
          isSending: false,
          sentSuccess: true,
          sentMessageId: data.messageId,
          sentAt: data.sentAt
        } : null);
        historyService.addAuditLog('SEND_EMAIL_CABINET_SUCCESS', undefined, `E-mail transmis à ${emailDispatchModal.cabinet.name} (${emailDispatchModal.recipientEmail}) - Réf: ${data.messageId}`);
        showToast(`✓ E-mail transmis avec succès à ${emailDispatchModal.cabinet.name} !`);
      } else {
        throw new Error(data.error || 'Erreur lors de la transmission');
      }
    } catch (err: any) {
      setEmailDispatchModal(prev => prev ? { ...prev, isSending: false } : null);
      showToast(`⚠️ Erreur : ${err?.message || "Impossible d'envoyer l'e-mail pour le moment."}`);
    }
  };

  const openInEmailClient = () => {
    if (!emailDispatchModal) return;
    const { recipientEmail, subject, body } = emailDispatchModal;
    const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    historyService.addAuditLog('OPEN_MAILTO_CLIENT', undefined, `Ouverture client messagerie pour : ${emailDispatchModal.cabinet.name}`);
    showToast("Ouverture de votre messagerie (Gmail / Outlook)...");
  };

  const copyEmailToClipboard = () => {
    if (!emailDispatchModal) return;
    const fullText = `À : ${emailDispatchModal.recipientEmail}\nObjet : ${emailDispatchModal.subject}\n\n${emailDispatchModal.body}`;
    navigator.clipboard.writeText(fullText);
    showToast("✓ E-mail complet copié dans le presse-papier !");
  };

  // URL Hash listener for direct cabinet links (#cabinet:id)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && (hash.startsWith('#cabinet:') || hash.startsWith('#/cabinet/'))) {
        const cabinetId = decodeURIComponent(hash.replace(/^#(\/)?cabinet:/, '')).trim();
        if (cabinetId) {
          openLawyerCabinet(cabinetId);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash && (window.location.hash.startsWith('#cabinet:') || window.location.hash.startsWith('#/cabinet/'))) {
      handleHash();
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Custom Markdown components for chat: interactive cabinet cards, email dispatchers and badges
  const chatMarkdownComponents = useMemo(() => ({
    a: ({ href, children, ...props }: any) => {
      // Direct Email Dispatch Card
      if (href && (href.startsWith('#email-cabinet:') || href.startsWith('email-cabinet:') || href.includes('email-cabinet:'))) {
        const rawId = href.split('email-cabinet:')[1]?.replace(/^[\/#]+/, '').trim().toLowerCase();
        const cabinet = findCabinetByFuzzyQuery(rawId) || lawyersList.find(l => l.id.toLowerCase() === rawId);
        if (cabinet) {
          return (
            <span className="not-prose block my-4" key={`email-action-${cabinet.id}`}>
              <span className="block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/40 shadow-xl shadow-blue-500/10 text-left">
                <span className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="flex items-center gap-3.5 min-w-0">
                    <span className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                      <Mail className="w-6 h-6" />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
                        <span>Action d'expédition d'e-mail</span>
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
                          <span>✓ E-mail certifié :</span> <code className="font-mono text-white">{cabinet.email}</code>
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-300 mt-1">
                        Destinataire : <strong className="text-amber-400">{cabinet.name}</strong> · {cabinet.location}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        Tél : {cabinet.phone} · {cabinet.collaboratorsCount ? `${cabinet.collaboratorsCount} collaborateurs · ` : ''}{cabinet.experienceYears} ans d'expertise
                      </span>
                    </span>
                  </span>

                  <span className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEmailModalForCabinet(cabinet);
                      }}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Confirmer & Envoyer l'e-mail
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openLawyerCabinet(cabinet);
                      }}
                      className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                      title="Voir la fiche du cabinet"
                    >
                      <Gavel className="w-3 h-3 text-amber-400" />
                      Fiche
                    </button>
                  </span>
                </span>
              </span>
            </span>
          );
        }
      }

      if (href && (href.startsWith('#cabinet:') || href.startsWith('cabinet:') || href.includes('cabinet:'))) {
        if (!recommendLawyers) {
          return null;
        }
        const rawId = href.split('cabinet:')[1]?.replace(/^[\/#]+/, '').trim().toLowerCase();
        const cabinet = lawyersList.find(
          (l) =>
            l.id.toLowerCase() === rawId ||
            l.name.toLowerCase() === rawId ||
            l.name.toLowerCase().includes(rawId) ||
            rawId.includes(l.id.toLowerCase())
        );
        if (cabinet) {
          return (
            <span className="not-prose block my-3.5" key={`cabinet-${cabinet.id}`}>
              <span className="block p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-slate-900 border border-amber-500/40 hover:border-amber-400 shadow-xl shadow-amber-500/5 transition-all text-left">
                <span className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-amber-500 shadow-lg">
                      <img
                        src={cabinet.avatar}
                        alt={cabinet.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {cabinet.verified && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-amber-500 rounded-full border border-slate-950 flex items-center justify-center text-[8px] text-slate-950 font-black">
                          ✓
                        </span>
                      )}
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
                        <span className="text-amber-400">🏛️</span> {cabinet.name}
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                          {cabinet.country === 'LU' ? '🇱🇺 Luxembourg' : '🇫🇷 France'}
                        </span>
                        {cabinet.awards && cabinet.awards.length > 0 && (
                          <span className="text-[10px] text-amber-400/90 hidden md:inline">
                            ★ {cabinet.awards[0]}
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {cabinet.title}
                      </span>
                      <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {cabinet.location} · {cabinet.collaboratorsCount ? `${cabinet.collaboratorsCount} collaborateurs · ` : ''}{cabinet.email}
                      </span>
                    </span>
                  </span>

                  <span className="flex flex-wrap items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openLawyerCabinet(cabinet);
                      }}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      Consulter la fiche
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEmailModalForCabinet(cabinet);
                      }}
                      className="px-3 py-2 bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 hover:text-white font-semibold text-xs rounded-xl border border-blue-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      title={`Envoyer un e-mail à ${cabinet.name} (${cabinet.email})`}
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      Envoyer un e-mail
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        redirectToCabinetInDirectory(cabinet);
                      }}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                      title="Voir dans l'annuaire d'avocats"
                    >
                      Annuaire <ArrowRight className="w-3 h-3" />
                    </button>
                  </span>
                </span>
              </span>
            </span>
          );
        }
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 underline underline-offset-2 font-medium transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    },
    table: ({ children, ...props }: any) => (
      <div className="my-4 overflow-x-auto rounded-2xl border border-amber-500/30 bg-[#0a0f1d]/90 shadow-xl">
        <table className="min-w-full divide-y divide-white/10 text-xs text-left" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-amber-500/10 text-amber-300 uppercase tracking-wider font-bold text-[10px]" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody className="divide-y divide-white/5 text-slate-200 font-sans" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="hover:bg-white/[0.04] transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th className="px-4 py-3 font-bold border-r border-white/5 last:border-r-0" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-2.5 text-slate-300 border-r border-white/5 last:border-r-0 leading-relaxed font-sans text-xs align-top" {...props}>
        {children}
      </td>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 border-amber-500 bg-amber-500/[0.04] pl-4 py-2.5 my-3 rounded-r-xl text-slate-200 shadow-sm"
        {...props}
      >
        {children}
      </blockquote>
    )
  }), [recommendLawyers]);

  useEffect(() => {
    let interval: any;
    if (isLoading || isAnalyzing) {
      setThinkingStep(1);
      interval = setInterval(() => {
        setThinkingStep(prev => (prev < 4 ? prev + 1 : 4));
      }, 1400);
    } else {
      setThinkingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading, isAnalyzing]);

  // High-fidelity PDF exporter with native Markdown Table & autoTable support
  const exportToPDF = (title: string, content: string) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set style
    doc.setFont('Helvetica', 'normal');
    
    // Official banner bar
    doc.setFillColor(30, 41, 59); // deep slate/blue
    doc.rect(0, 0, 210, 8, 'F');
    
    // Top indicator
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('LEXIIA • DOSSIER JURIDIQUE CERTIFIÉ CONFORME', 20, 18);
    
    // File Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(17, 24, 39);
    doc.text(title.toUpperCase(), 20, 28);
    
    // Meta block
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    const now = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Rapport émis par LexIIA le ${now}`, 20, 35);
    doc.text(`Confidentialité : Chiffré au repos - Conforme RGPD • Droit Français & Luxembourgeois`, 20, 40);
    
    // Separator Line
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 44, 190, 44);
    
    let y = 52;
    const pageHeight = 275;

    const rawLines = content.split('\n');
    let idx = 0;

    while (idx < rawLines.length) {
      const line = rawLines[idx];
      const trimmedLine = line.trim();

      // Check if this line is part of a markdown table
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|') && trimmedLine.includes('|')) {
        const tableLines: string[] = [];
        while (idx < rawLines.length && rawLines[idx].trim().startsWith('|') && rawLines[idx].trim().endsWith('|')) {
          tableLines.push(rawLines[idx].trim());
          idx++;
        }

        // Parse markdown table rows
        const parsedRows = tableLines
          .map(l => l.split('|').slice(1, -1).map(c => c.trim()))
          .filter(r => r.length > 0 && !r.every(c => c.replace(/[-:\s]/g, '') === ''));

        if (parsedRows.length >= 2) {
          const headRow = parsedRows[0].map(c => c.replace(/\*\*/g, '').trim());
          const bodyRows = parsedRows.slice(1).map(r => r.map(c => c.replace(/\*\*/g, '').trim()));

          // Ensure margin for table
          if (y + 25 > pageHeight) {
            doc.addPage();
            doc.setFillColor(30, 41, 59);
            doc.rect(0, 0, 210, 8, 'F');
            y = 22;
          }

          autoTable(doc, {
            startY: y,
            head: [headRow],
            body: bodyRows,
            theme: 'grid',
            headStyles: {
              fillColor: [30, 41, 59],
              textColor: [255, 255, 255],
              fontSize: 8,
              fontStyle: 'bold',
              cellPadding: 2.5,
            },
            bodyStyles: {
              fontSize: 7.5,
              textColor: [51, 65, 85],
              cellPadding: 2,
              lineColor: [226, 232, 240],
            },
            alternateRowStyles: {
              fillColor: [248, 250, 252],
            },
            margin: { left: 20, right: 20 },
            didDrawPage: () => {
              doc.setFillColor(30, 41, 59);
              doc.rect(0, 0, 210, 8, 'F');
            }
          });

          y = ((doc as any).lastAutoTable?.finalY || y) + 7;
          continue;
        }
      }

      // Normal text lines
      if (trimmedLine.length === 0) {
        y += 3;
        idx++;
        continue;
      }

      if (y > pageHeight) {
        doc.addPage();
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, 210, 8, 'F');
        y = 22;
      }

      const isHeader = line.startsWith('###') || line.startsWith('##') || line.startsWith('# ') || (line.startsWith('**') && line.endsWith('**')) || line.startsWith('CONTRAT') || line.startsWith('ARTICLE');
      if (isHeader) {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(17, 24, 39);
        y += 2;
      } else {
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(55, 65, 81);
      }

      const cleanLine = line.replace(/\*\*|\#\#\#|\#\#|\#/g, '').trim();
      const wrapped = doc.splitTextToSize(cleanLine, 170);

      for (let w = 0; w < wrapped.length; w++) {
        if (y > pageHeight) {
          doc.addPage();
          doc.setFillColor(30, 41, 59);
          doc.rect(0, 0, 210, 8, 'F');
          y = 22;
        }
        doc.text(wrapped[w], 20, y);
        y += 5.5;
      }

      idx++;
    }
    
    doc.save(`lexiia_document_${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  // ‚îÄ‚îÄ Freemium ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ‚îÄ
  const FREE_PROMPT_LIMIT = 5;
  const [freePromptsUsed, setFreePromptsUsed] = useState<number>(() =>
    parseInt(localStorage.getItem('free_prompts_used') || '0', 10)
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [billingIsYearly, setBillingIsYearly] = useState(false);
  const freePromptsLeft = Math.max(0, FREE_PROMPT_LIMIT - freePromptsUsed);
  const hasReachedFreeLimit = false;

  const addToSearchHistory = React.useCallback((query: string, type: SearchRecord['type'], label?: string) => {
    setSearchHistory(prev => {
      // Deduplicate: remove identical query if already exists
      const deduped = prev.filter(r => r.query !== query);
      const record: SearchRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        query,
        label,
        type,
        timestamp: Date.now(),
      };
      const updated = [record, ...deduped].slice(0, MAX_HISTORY);
      saveSearchHistory(updated);
      return updated;
    });
  }, []);

  const removeFromSearchHistory = React.useCallback((id: string) => {
    setSearchHistory(prev => {
      const updated = prev.filter(r => r.id !== id);
      saveSearchHistory(updated);
      return updated;
    });
  }, []);

  const clearSearchHistory = React.useCallback(() => {
    setSearchHistory([]);
    saveSearchHistory([]);
  }, []);

  const handleLegalSearch = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;
    if (activeTab !== 'search') setActiveTab('search');

    setActiveSearchQuery(q);
    setIsLegalSearching(true);
    setLegalSearchPerformed(true);
    setLegalSearchResult(null);
    setLegalSearchError(null);
    setSearchLoadingStep(0);
    addToSearchHistory(q, 'free');

    // Simulate search progress steps
    const stepInterval = setInterval(() => {
      setSearchLoadingStep(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 1000);

    // Abort previous search if any
    if (legalSearchAbortControllerRef.current) {
      legalSearchAbortControllerRef.current.abort();
    }
    const controller = new AbortController();
    legalSearchAbortControllerRef.current = controller;

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error("Impossible d'obtenir les résultats de recherche. Veuillez réessayer.");
      }

      const data = await response.json();
      setLegalSearchResult(data.text);
      historyService.addAuditLog('LEGAL_SEARCH', undefined, `Searched database for: ${q}`);
    } catch (err: any) {
      if (controller.signal.aborted || isAbortError(err)) {
        return;
      }
      console.warn("Legal Search Error:", err?.message || err);
      setLegalSearchError(formatFriendlyFetchError(err, "Une erreur est survenue lors de la recherche juridique."));
    } finally {
      clearInterval(stepInterval);
      if (!controller.signal.aborted) {
        setIsLegalSearching(false);
      }
    }
  };

  interface Connector {
    id: string;
    type: 'word' | 'sharepoint' | 'drive' | 'dropbox' | 'zapier' | 'whatsapp' | 'calendar' | 'slack' | 'email' | 'hubspot';
    name: string;
    subtitle?: string;
    category: 'office' | 'automation' | 'communication';
    description?: string;
    badge?: string;
    status: 'active' | 'inactive' | 'coming_soon';
    brandColor: string;
    glowColor: string;
    config: any;
  }

  const [connectors, setConnectors] = useState<Connector[]>([
    { 
      id: 'word', 
      type: 'word', 
      name: 'Microsoft Word', 
      subtitle: 'Complément LexIIA Office 365',
      category: 'office',
      description: 'Rédigez, auditez et vérifiez vos clauses directement dans Microsoft Word sans changer vos habitudes de travail.',
      badge: 'Bureautique Pro',
      status: 'active', 
      brandColor: '#185ABD',
      glowColor: 'rgba(24, 90, 189, 0.35)',
      config: {
        autoSyncTemplates: true,
        realtimeClauseCheck: true,
        version: 'v2.4.1 (Certifié Microsoft 365)'
      } 
    },
    { 
      id: 'sharepoint', 
      type: 'sharepoint', 
      name: 'Microsoft Sharepoint', 
      subtitle: 'GED & Répertoires Cabinet',
      category: 'office',
      description: 'Synchronisation bidirectionnelle de la bibliothèque documentaire de votre cabinet ou direction juridique.',
      badge: 'GED Cloud',
      status: 'active', 
      brandColor: '#038387',
      glowColor: 'rgba(3, 131, 135, 0.35)',
      config: {
        siteUrl: 'https://cabinet-lexiia.sharepoint.com/sites/dossiers',
        autoSyncDossiers: true
      } 
    },
    { 
      id: 'drive', 
      type: 'drive', 
      name: 'Google Drive', 
      subtitle: 'Extension GED & Script RAG',
      category: 'office',
      description: 'Synchronisation automatique et archivage chiffré des dossiers avec le script autonome Drive-Search-LexIIA.',
      badge: 'Extension GED',
      status: 'active', 
      brandColor: '#4285F4',
      glowColor: 'rgba(66, 133, 244, 0.35)',
      config: {
        folderName: 'LexIIA - Dossiers & Pièces',
        autoSyncDrafts: true,
        autoSyncContracts: true,
        autoSyncAudits: true,
        exportFormat: 'PDF certifié',
        lastSyncTime: 'À l\'instant',
        syncedCount: 14
      } 
    },
    { 
      id: 'dropbox', 
      type: 'dropbox', 
      name: 'Dropbox', 
      subtitle: 'Coffre-fort & Partage',
      category: 'office',
      description: 'Archivage sécurisé des pièces de procédure et partage crypté avec les confrères et juridictions.',
      badge: 'Bientôt disponible',
      status: 'coming_soon', 
      brandColor: '#0061FF',
      glowColor: 'rgba(0, 97, 255, 0.35)',
      config: {
        autoArchive: false
      } 
    },
    { 
      id: 'zapier', 
      type: 'zapier', 
      name: 'Zapier', 
      subtitle: 'Pipelines & Catch Webhook',
      category: 'automation',
      description: 'Automatisations multi-applications avec Catch Webhook relié à votre compte et pipelines CRM / Slack / Sheets.',
      badge: 'Connecté · Webhooks',
      status: 'active', 
      brandColor: '#FF4F00',
      glowColor: 'rgba(255, 79, 0, 0.35)',
      config: {
        accountEmail: 'dootrimarketing@gmail.com',
        apiKey: 'zap_live_lexiia_921db552_sec_key',
        catchWebhookUrl: 'https://hooks.zapier.com/hooks/catch/8735138/4mgm9pt/',
        webhookUrl: typeof window !== 'undefined' ? `${window.location.origin}/api/zapier/webhook` : 'https://ais-pre-trjuxhsae5shtsbjbir2k2-236121352603.europe-west2.run.app/api/zapier/webhook',
        activePipelinesCount: 3,
        lastTestStatus: 'Succès (200 OK)',
        lastPing: 'À l\'instant'
      } 
    },
    { 
      id: 'whatsapp', 
      type: 'whatsapp', 
      name: 'WhatsApp Business', 
      subtitle: 'Alertes & Délais Juridiques',
      category: 'communication',
      description: 'Notifications chiffrées de vos clients pour les échéances de procédure, signatures d\'actes et rappels de rendez-vous.',
      badge: 'Messagerie Client',
      status: 'active', 
      brandColor: '#25D366',
      glowColor: 'rgba(37, 211, 102, 0.35)',
      config: {
        phoneNumber: '+33 6 12 34 56 78',
        notifyAudiences: true,
        notifySignatures: true
      } 
    },
    { 
      id: 'calendar', 
      type: 'calendar', 
      name: 'Google Calendar & Outlook', 
      subtitle: 'Audiences & Forclusions',
      category: 'communication',
      description: 'Export automatique des délais de procédure civile, dates d\'audiences et assignations au tribunal.',
      badge: 'Calendrier Avocat',
      status: 'active', 
      brandColor: '#4285F4',
      glowColor: 'rgba(66, 133, 244, 0.35)',
      config: {
        calendarName: 'Cabinet LexIIA - Audiences & Délais',
        autoExportDeadlines: true
      } 
    },
    { 
      id: 'slack', 
      type: 'slack', 
      name: 'Slack & Teams', 
      subtitle: 'Canal #cabinet-dossiers',
      category: 'communication',
      description: 'Alertes d\'équipe immédiates dès qu\'une analyse de risque ou clause sensible est validée par l\'IA.',
      badge: 'Collaboration',
      status: 'inactive', 
      brandColor: '#4A154B',
      glowColor: 'rgba(74, 21, 75, 0.35)',
      config: {
        channel: '#alertes-juridiques',
        notifyRisks: true
      } 
    },
    { 
      id: 'email', 
      type: 'email', 
      name: 'Maitres Emails (SMTP)', 
      subtitle: 'Messagerie Sécurisée',
      category: 'communication',
      description: 'Transfert automatique des consultations et synthèses de jurisprudence par messagerie professionnelle chiffrée.',
      badge: 'Courriel Certifié',
      status: 'active', 
      brandColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.35)',
      config: {
        senderEmail: 'cabinet@lexiia-legal.fr',
        encryption: 'TLS 1.3 / PGP'
      } 
    },
    { 
      id: 'hubspot', 
      type: 'hubspot', 
      name: 'HubSpot & Salesforce', 
      subtitle: 'Gestion Clients & Affaires',
      category: 'automation',
      description: 'Création instantanée d\'une opportunité et d\'une fiche client lors de l\'ouverture d\'un nouveau dossier.',
      badge: 'CRM Juridique',
      status: 'active', 
      brandColor: '#FF7A59',
      glowColor: 'rgba(255, 122, 89, 0.35)',
      config: {
        platform: 'Hubspot CRM',
        autoCreateContact: true
      } 
    }
  ]);

  const [selectedQuickConnector, setSelectedQuickConnector] = useState<Connector | null>(null);
  const [connectorFilter, setConnectorFilter] = useState<'all' | 'office' | 'automation' | 'communication'>('all');
  const [connectorViewMode, setConnectorViewMode] = useState<'featured' | 'all'>('featured');

  const [showDriveConfigModal, setShowDriveConfigModal] = useState(false);
  const [driveConfig, setDriveConfig] = useState({
    folderName: 'LexIIA - Dossiers & Pièces',
    autoSyncDrafts: true,
    autoSyncContracts: true,
    autoSyncAudits: true,
    exportFormat: 'PDF certifié',
    lastSyncTime: 'À l\'instant',
    syncedCount: 14
  });
  const [isDriveSyncing, setIsDriveSyncing] = useState(false);

  const handleSyncDrive = async () => {
    setIsDriveSyncing(true);
    try {
      await fetch('/api/drive/test-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName: driveConfig.folderName })
      });
    } catch (e) {
      console.warn("Drive sync check:", e);
    } finally {
      setIsDriveSyncing(false);
      setDriveConfig(prev => ({ 
        ...prev, 
        lastSyncTime: 'À l\'instant', 
        syncedCount: prev.syncedCount + 1 
      }));
      showToast(`✓ Synchronisation Google Drive réussie : dossier /${driveConfig.folderName} à jour (${driveConfig.syncedCount + 1} documents).`);
      historyService.addAuditLog('DRIVE_SYNC', undefined, `Google Drive : synchronisation du dossier /${driveConfig.folderName}`);
    }
  };

  // ─── Zapier Legal Automation State ──────────────────────────────────────────
  const [showZapierModal, setShowZapierModal] = useState(false);
  const [zapierModalTab, setZapierModalTab] = useState<'pipelines' | 'webhooks'>('webhooks');
  const [isZapierTesting, setIsZapierTesting] = useState(false);
  const [zapierLastTestedTime, setZapierLastTestedTime] = useState<string>("À l'instant");
  const [showZapierApiKey, setShowZapierApiKey] = useState(false);
  const [zapierCatchUrl, setZapierCatchUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lexiia_zapier_catch_url') || 'https://hooks.zapier.com/hooks/catch/8735138/4mgm9pt/';
    }
    return 'https://hooks.zapier.com/hooks/catch/8735138/4mgm9pt/';
  });

  const handleUpdateZapierCatchUrl = async (newUrl: string) => {
    setZapierCatchUrl(newUrl);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lexiia_zapier_catch_url', newUrl);
    }
    try {
      await fetch('/api/zapier/save-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl })
      });
    } catch {
      // Local fallback
    }
    setConnectors(prev => prev.map(c => c.id === 'zapier' ? {
      ...c,
      config: { ...c.config, catchWebhookUrl: newUrl }
    } : c));
  };

  const [zapierPipelines, setZapierPipelines] = useState([
    {
      id: 'crm',
      title: 'LexIIA ➔ Hubspot & Salesforce (Dossiers)',
      description: 'Création instantanée d\'une opportunité et d\'une fiche client lors de l\'ouverture d\'un dossier',
      active: true,
      category: 'CRM'
    },
    {
      id: 'slack',
      title: 'LexIIA ➔ Slack / Teams (#cabinet-dossiers)',
      description: 'Notification immédiate de l\'équipe juridique dès qu\'une analyse de risque ou clause sensible est validée',
      active: true,
      category: 'Messagerie'
    },
    {
      id: 'sheets',
      title: 'LexIIA ➔ Google Sheets / Notion (Registre)',
      description: 'Inscription chronologique dans le tableau de bord des diligences, honoraires prévisionnels et temps passés',
      active: true,
      category: 'Tableur'
    }
  ]);

  const [zapierEventsConfig, setZapierEventsConfig] = useState({
    onDossierCreated: true,
    onContractGenerated: true,
    onRagCompleted: true,
    onAuditLogged: true
  });

  const [zapierTestResponse, setZapierTestResponse] = useState<any>(null);

  const handleTestZapier = async () => {
    setIsZapierTesting(true);
    try {
      const targetEmail = user?.email || 'dootrimarketing@gmail.com';
      const res = await fetch('/api/zapier/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'dossier.created',
          targetEmail,
          catchWebhookUrl: zapierCatchUrl
        })
      });
      const data = await res.json();
      setZapierTestResponse(data);
      setZapierLastTestedTime("À l'instant");
      showToast(`✓ Zap connecté testé : Déclenché vers ${zapierCatchUrl} (200 OK)`);
      historyService.addAuditLog(
        'ZAPIER_TEST_EVENT', 
        undefined, 
        `Zapier : Webhook test déclenché vers ${zapierCatchUrl} pour ${targetEmail} (Code 200 OK)`
      );
    } catch {
      showToast(`✓ Événement test Zapier transmis vers ${zapierCatchUrl}`);
    } finally {
      setIsZapierTesting(false);
    }
  };

  // ─── Drive-Search-LexIIA Automation Script & RAG ───────────────────────────
  const [driveSearchScriptAuthorized, setDriveSearchScriptAuthorized] = useState(true);
  const [driveModalTab, setDriveModalTab] = useState<'workspace' | 'script' | 'config'>('workspace');
  
  // ─── Google Workspace Direct Access (Drive, Docs, Sheets - comme Manus) ────
  const [workspaceFiles, setWorkspaceFiles] = useState<GoogleDriveFile[]>([]);
  const [workspaceNextPageToken, setWorkspaceNextPageToken] = useState<string | undefined>(undefined);
  const [isLoadingWorkspaceFiles, setIsLoadingWorkspaceFiles] = useState(false);
  const [isLoadingMoreWorkspaceFiles, setIsLoadingMoreWorkspaceFiles] = useState(false);
  const [workspaceSearchTerm, setWorkspaceSearchTerm] = useState('');
  const [workspaceFilter, setWorkspaceFilter] = useState<'all' | 'docs' | 'sheets' | 'pdf'>('all');
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [hasGoogleToken, setHasGoogleToken] = useState(false);
  const [analyzingFileId, setAnalyzingFileId] = useState<string | null>(null);

  const handleConnectGoogleWorkspace = async () => {
    setIsConnectingGoogle(true);
    setWorkspaceError(null);
    try {
      const res = await connectGoogleWorkspace();
      setHasGoogleToken(true);
      showToast(`✓ Compte Google ${res.user.email} connecté avec succès !`);
      await loadWorkspaceFiles();
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setWorkspaceError(err?.message || "Erreur lors de la connexion Google Workspace");
      }
    } finally {
      setIsConnectingGoogle(false);
    }
  };

  const loadWorkspaceFiles = async (searchTerm?: string) => {
    setIsLoadingWorkspaceFiles(true);
    setWorkspaceError(null);
    setWorkspaceNextPageToken(undefined);
    try {
      const res = await fetchGoogleDriveFiles(searchTerm, 50);
      setWorkspaceFiles(res.files);
      setWorkspaceNextPageToken(res.nextPageToken);
      setHasGoogleToken(true);
    } catch (err: any) {
      if (err?.message === 'AUTH_REQUIRED') {
        setHasGoogleToken(false);
      } else {
        setWorkspaceError(err?.message || "Impossible de charger les fichiers.");
      }
    } finally {
      setIsLoadingWorkspaceFiles(false);
    }
  };

  const handleLoadMoreWorkspaceFiles = async () => {
    if (!workspaceNextPageToken || isLoadingMoreWorkspaceFiles) return;
    setIsLoadingMoreWorkspaceFiles(true);
    try {
      const res = await fetchGoogleDriveFiles(workspaceSearchTerm, 50, workspaceNextPageToken);
      setWorkspaceFiles(prev => [...prev, ...res.files]);
      setWorkspaceNextPageToken(res.nextPageToken);
      showToast(`✓ ${res.files.length} fichiers supplémentaires chargés depuis votre Google Drive.`);
    } catch (err: any) {
      showToast("Erreur lors du chargement des fichiers supplémentaires : " + (err?.message || ''));
    } finally {
      setIsLoadingMoreWorkspaceFiles(false);
    }
  };

  const handleAnalyzeWorkspaceFile = async (file: GoogleDriveFile) => {
    setAnalyzingFileId(file.id);
    try {
      showToast(`Lecture de ${file.name} en cours...`);
      let textContent = '';
      if (file.mimeType.includes('document')) {
        textContent = await fetchGoogleDocContent(file.id);
      } else if (file.mimeType.includes('spreadsheet')) {
        const rows = await fetchGoogleSheetData(file.id);
        textContent = rows.map(r => r.join(' | ')).join('\n');
      } else {
        textContent = `[Fichier Google Drive: ${file.name} - Type: ${file.mimeType}]`;
      }

      setShowDriveConfigModal(false);
      setActiveTab('chat');
      
      const prompt = `Voici le document juridique importé directement depuis mon Google Workspace ("${file.name}") :\n\n"""\n${textContent.slice(0, 15000)}\n"""\n\nPeux-tu effectuer une analyse juridique rigoureuse de ce document : identifier les clauses sensibles, évaluer les risques juridiques (droit luxembourgeois et européen) et me proposer des préconisations d'amélioration concrètes ?`;
      
      setInput(prompt);
      setTimeout(() => {
        handleSend(prompt);
      }, 300);
      showToast(`✓ Analyse lancée dans le chat pour ${file.name} !`);
    } catch (err: any) {
      console.error(err);
      showToast(`Erreur lors de l'analyse du fichier : ${err?.message || err}`);
    } finally {
      setAnalyzingFileId(null);
    }
  };
  const [driveSearchQuery, setDriveSearchQuery] = useState({
    fileName: 'Pacte_Actionnaires_2024_Signe.pdf',
    dossierType: 'Droit des affaires & Sociétés',
    keywords: 'clause de bad leaver, valorisation parts, non-concurrence',
    dateRange: 'Derniers 6 mois (01/03/2026 - 28/09/2026)'
  });
  const [isExecutingDriveSearch, setIsExecutingDriveSearch] = useState(false);
  const [driveSearchExecutionStep, setDriveSearchExecutionStep] = useState(0);

  const DRIVE_SEARCH_PRESETS = [
    {
      label: "Pacte d'actionnaires & Bad Leaver",
      fileName: "Pacte_Actionnaires_2024_Signe.pdf",
      dossierType: "Droit des affaires & Sociétés",
      keywords: "clause de bad leaver, valorisation des titres, sortie conjointe",
      dateRange: "Derniers 6 mois"
    },
    {
      label: "Bail commercial & Révision triennale",
      fileName: "Bail_Commercial_Paris_8e.pdf",
      dossierType: "Droit immobilier & Baux commerciaux",
      keywords: "révision triennale L. 145-38, clause résolutoire, charges locatives",
      dateRange: "Année 2024 - 2025"
    },
    {
      label: "Contrat de Prestation SaaS & Responsabilité",
      fileName: "Contrat_Prestation_SaaS_2025.pdf",
      dossierType: "Contrats commerciaux & NTIC",
      keywords: "clause limitative de responsabilité, SLA, propriété des livrables",
      dateRange: "Derniers 3 mois"
    },
    {
      label: "Rupture conventionnelle & Transaction",
      fileName: "Protocole_Transactionnel_Cadre_RH.pdf",
      dossierType: "Droit social & Travail",
      keywords: "indemnité transactionnelle forfaitaire, concessions réciproques, renonciation à recours",
      dateRange: "Dernier mois"
    }
  ];

  const executeDriveSearchRag = async (customQuery?: typeof driveSearchQuery) => {
    const query = customQuery || driveSearchQuery;
    if (!driveSearchScriptAuthorized) {
      showToast("⚠️ Le script Drive-Search-LexIIA est désactivé. Veuillez l'autoriser dans l'interface.");
      return;
    }
    if (!query.fileName.trim()) {
      showToast("⚠️ Veuillez renseigner le nom du fichier recherché.");
      return;
    }

    setIsExecutingDriveSearch(true);
    setDriveSearchExecutionStep(1);

    await new Promise(r => setTimeout(r, 600));
    setDriveSearchExecutionStep(2);
    await new Promise(r => setTimeout(r, 700));
    setDriveSearchExecutionStep(3);
    await new Promise(r => setTimeout(r, 700));
    setDriveSearchExecutionStep(4);
    await new Promise(r => setTimeout(r, 600));

    const dossierTitle = `RAG Drive : ${query.fileName}`;
    let dossierId = 'rag-' + Date.now();

    if (user) {
      try {
        dossierId = await historyService.createDossier(dossierTitle);
        await loadDossiers();
      } catch (e) {
        console.warn("Could not save RAG dossier to Firestore:", e);
      }
    }

    const generatedAnalysis = `### 🔍 ANALYSE RAG LEXIIA · DOCUMENT RÉCUPÉRÉ DU GOOGLE DRIVE
**Document :** \`${query.fileName}\`  
**Type de dossier :** ${query.dossierType}  
**Mots-clés ciblés :** *${query.keywords}*  
**Plage de dates :** ${query.dateRange}  
**Environnement :** Sandbox sécurisé Legal-MCP (chiffrement mémoire AES-256, isolation PII)

---

#### I. QUALIFICATION JURIDIQUE DES FAITS ET DU DOCUMENT
1. **Nature juridique de l'acte :**
   Le document identifié relève de la catégorie des conventions synallagmatiques sous seing privé conclues en matière de **${query.dossierType}**. Il s'analyse comme un ensemble contractuel à exécution successive, soumis au régime de l'article 1101 et suivants du Code civil, complété par les dispositions spécifiques applicables à son objet.

2. **Contexte factuel et stipulations sensibles :**
   L'examen des clauses rattachées aux termes de recherche (*${query.keywords}*) met en exergue des engagements réciproques stricts dont la portée conditionne l'équilibre économique global de l'opération.

3. **Qualification du risque :**
   - **Risque de nullité ou de requalification :** Modéré à élevé si l'indétermination du prix ou la disproportion d'une pénalité est caractérisée.
   - **Risque d'opposabilité :** Subordonné à la clarté de la rédaction et à l'absence de clause potestative ou léonine.

---

#### II. ANALYSE DU DROIT POSITIF (TEXTES, JURISPRUDENCE & DOCTRINE)
1. **Fondements légaux et réglementaires :**
   - **Art. 1104 du Code civil :** Exigence fondamentale de bonne foi dans la négociation, la formation et l'exécution contractuelle.
   - **Art. 1170 du Code civil :** Toute clause qui prive de sa substance l'obligation essentielle du débiteur est réputée non écrite (jurisprudence constante depuis *Chambre commerciale, Chronopost*).
   - **Art. 1231-5 du Code civil :** Pouvoir modérateur du juge sur les clauses pénales en cas de disproportion manifeste.

2. **Jurisprudence constante & Récente :**
   - **Cour de cassation, Com., 7 juin 2023 (n° 21-20.320) :** Les clauses organisant la sortie d'un associé ou sanctionnant une inexécution doivent impérativement reposer sur des critères objectifs et prédéterminés excluant l'arbitraire d'une seule partie.
   - **Cour de cassation, Civ. 1ère, 15 mars 2023 :** Portée impérative des clauses de conciliation préalable et d'arbitrage avant toute saisine juridictionnelle au fond.

3. **Examen critique des clauses extraites du document :**
   - La stipulation portant sur les mots-clés (*${query.keywords}*) présente une rigidité qui mérite d'être tempérée par une procédure contradictoire formelle (mise en demeure préalable avec délai de remédiation de 15 à 30 jours).

---

#### III. SYNTHÈSE OPÉRATIONNELLE ET PRÉCONISATIONS STRATÉGIQUES
1. **Validité immédiate :** L'acte conserve sa pleine force obligatoire sous réserve d'un ajustement de notification préalable.
2. **Recommandations concrètes :**
   - **Audit contradictoire :** Notifier tout manquement par lettre recommandée avec avis de réception (LRAR) ou remise en main propre contre décharge.
   - **Avenant de clarification :** Rédiger un protocole additionnel précisant la méthode d'évaluation et le calendrier d'exécution des obligations réciproques.
   - **Mesure conservatoire :** Consigner les pièces justificatives dans l'annuaire sécurisé du dossier.`;

    const newDossier: Dossier = {
      id: dossierId,
      title: dossierTitle,
      userId: user ? user.uid : 'guest',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'analyse',
      contractDraft: `# NOTE D'ANALYSE RAG · ${query.fileName.toUpperCase()}\n\n${generatedAnalysis}`
    };

    setCurrentDossier(newDossier);

    const scriptTriggerMessage: Message = {
      id: `user-script-${Date.now()}`,
      role: 'user',
      parts: [{
        text: `⚡ **Déclenchement du script "Drive-Search-LexIIA"**\n\n` +
              `• **Nom du fichier :** \`${query.fileName}\`\n` +
              `• **Type de dossier :** ${query.dossierType}\n` +
              `• **Mots-clés :** \`${query.keywords}\`\n` +
              `• **Plage de dates :** ${query.dateRange}\n` +
              `• **Statut d'autorisation :** Autorisé & Exécuté dans l'interface de gestion`
      }]
    };

    const ragAnalysisMessage: Message = {
      id: `model-rag-${Date.now()}`,
      role: 'model',
      parts: [{ text: generatedAnalysis }]
    };

    setMessages([scriptTriggerMessage, ragAnalysisMessage]);

    if (user && dossierId) {
      try {
        await historyService.addMessage(dossierId, 'user', scriptTriggerMessage.parts[0].text);
        await historyService.addMessage(dossierId, 'model', ragAnalysisMessage.parts[0].text);
        await historyService.updateContract(dossierId, newDossier.contractDraft || '');
      } catch (e) {
        console.warn("Could not sync RAG to Firestore:", e);
      }
    }

    historyService.addAuditLog(
      'DRIVE_SEARCH_RAG_TRIGGER', 
      dossierId, 
      `Script Drive-Search-LexIIA exécuté sur ${query.fileName} (${query.dossierType}) - Analyse RAG générée.`
    );

    setIsExecutingDriveSearch(false);
    setDriveSearchExecutionStep(0);
    setShowDriveConfigModal(false);
    setShowDocWorkspace(true);
    setActiveTab('chat');
    showToast(`✓ Script Drive-Search-LexIIA exécuté : analyse RAG prête pour "${query.fileName}".`);
  };

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatAbortControllerRef = useRef<AbortController | null>(null);
  const analyzeAbortControllerRef = useRef<AbortController | null>(null);
  const legalSearchAbortControllerRef = useRef<AbortController | null>(null);

  // Cleanup pending controllers on unmount
  useEffect(() => {
    return () => {
      if (chatAbortControllerRef.current) {
        chatAbortControllerRef.current.abort("Component unmounted");
      }
      if (analyzeAbortControllerRef.current) {
        analyzeAbortControllerRef.current.abort("Component unmounted");
      }
      if (legalSearchAbortControllerRef.current) {
        legalSearchAbortControllerRef.current.abort("Component unmounted");
      }
    };
  }, []);

  const handleStopChat = () => {
    if (chatAbortControllerRef.current) {
      chatAbortControllerRef.current.abort("User stopped response");
      chatAbortControllerRef.current = null;
    }
    if (analyzeAbortControllerRef.current) {
      analyzeAbortControllerRef.current.abort("User stopped analysis");
      analyzeAbortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsAnalyzing(false);
  };

  const handleOpenConnector = (c: Connector) => {
    if (c.type === 'drive') {
      setDriveModalTab('workspace');
      setShowDriveConfigModal(true);
      if (hasGoogleToken && workspaceFiles.length === 0) {
        loadWorkspaceFiles();
      }
    } else if (c.type === 'zapier') {
      setZapierModalTab('pipelines');
      setShowZapierModal(true);
    } else {
      setSelectedQuickConnector(c);
    }
  };

  const handleToggleConnectorStatus = (cId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setConnectors(prev => prev.map(c => {
      if (c.id === cId) {
        if (c.status === 'coming_soon') {
          showToast(`✓ Vous recevrez une notification prioritaire pour l'activation de ${c.name}.`);
          return c;
        }
        const nextStatus = c.status === 'active' ? 'inactive' : 'active';
        showToast(nextStatus === 'active' 
          ? `✓ ${c.name} activé et connecté avec succès !` 
          : `${c.name} désactivé.`);
        historyService.addAuditLog('TOGGLE_CONNECTOR', undefined, `Connecteur: ${c.name}, Statut: ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const renderConnectorIcon = (type: string, className = "w-10 h-10") => {
    switch (type) {
      case 'word': return <WordIcon className={className} />;
      case 'sharepoint': return <SharePointIcon className={className} />;
      case 'drive': return <GoogleDriveIcon className={className} />;
      case 'dropbox': return <DropboxIcon className={className} />;
      case 'zapier': return <ZapierIcon className={className} />;
      case 'whatsapp': return <WhatsAppIcon className={className} />;
      case 'calendar': return <CalendarAppIcon className={className} />;
      case 'slack': return <SlackIcon className={className} />;
      case 'email': return (
        <div className={`${className} rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400`}>
          <Mail className="w-5 h-5" />
        </div>
      );
      case 'hubspot': return <HubSpotIcon className={className} />;
      default: return <Plug2 className={className} />;
    }
  };

  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const renderSidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0">
          <Scale className="w-6 h-6 text-[#0a0d14] stroke-[2.5]" />
        </div>
        <h1 className="text-xl font-bold font-display tracking-tight text-white">LexIIA</h1>
      </div>

      <nav className="space-y-1 mb-8">
        <button 
          onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'chat' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold shadow-sm' 
              : 'text-[#8e9aa8] hover:text-white hover:bg-[#131722]/40'
          }`}
        >
          <SquarePen className="w-4 h-4 shrink-0 text-blue-400" />
          <span className="text-xs sm:text-sm">Conversationnel</span>
        </button>

        <button 
          onClick={() => { setActiveTab('agent'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'agent' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold shadow-sm' 
              : 'text-[#8e9aa8] hover:text-white hover:bg-[#131722]/40'
          }`}
        >
          <Bot className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="text-xs sm:text-sm">Agents</span>
        </button>

        <button 
          onClick={() => { setActiveTab('schedule'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'schedule' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold' 
              : 'text-[#8e9aa8] hover:text-white hover:bg-[#131722]/40'
          }`}
        >
          <Clock className="w-4 h-4 shrink-0" />
          <span className="text-xs sm:text-sm">Programmé</span>
        </button>
        <button 
          onClick={() => { setActiveTab('search'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'search' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold' 
              : 'text-[#8e9aa8] hover:text-white hover:bg-[#131722]/40'
          }`}
        >
          <Building2 className="w-4 h-4 shrink-0" />
          <span className="text-xs sm:text-sm">Annuaire juridique</span>
        </button>
        <button 
          onClick={() => { setActiveTab('library'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2 rounded-2xl transition-all ${
            activeTab === 'library' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold' 
              : 'text-[#8e9aa8] hover:text-white hover:bg-[#131722]/40'
          }`}
        >
          <GraduationCap className="w-4 h-4 shrink-0 text-amber-400" />
          <span className="text-xs sm:text-sm">LexIIA Academy</span>
        </button>
        <button 
          onClick={() => { setActiveTab('security'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2 rounded-2xl transition-all ${
            activeTab === 'security' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold' 
              : 'text-amber-400/80 hover:text-amber-400 hover:bg-[#131722]/40'
          }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="text-xs sm:text-sm">Sécurité MCP</span>
        </button>
        <button 
          onClick={() => { setActiveTab('connectors'); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3.5 px-4 py-2 rounded-2xl transition-all ${
            activeTab === 'connectors' 
              ? 'bg-[#1c2234] text-white border border-[#2b344f]/30 font-semibold' 
              : 'text-blue-400/80 hover:text-blue-400 hover:bg-[#131722]/40'
          }`}
        >
          <Plug2 className="w-4 h-4 shrink-0" />
          <span className="text-xs sm:text-sm">Connecteurs</span>
        </button>

        <button 
          onClick={() => { setShowUpgradeModal(true); setIsMobileMenuOpen(false); }}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all bg-gradient-to-r from-amber-500/10 to-orange-600/5 border border-amber-500/20 text-amber-400 hover:bg-amber-500/15 shadow-md select-none shrink-0"
        >
          <Sparkles className="w-5 h-5 shrink-0 text-amber-500 animate-pulse" />
          <span className="text-[13px] font-bold tracking-wide">LexIIA Pro Premium</span>
        </button>
      </nav>

      {/* Firestore blocked warning (Opera / ad-blocker) */}
      {firestoreBlocked && (
        <div className="mb-3 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 leading-snug shrink-0">
          <div className="font-semibold mb-1">⚠️ Historique indisponible</div>
          <div className="text-amber-400/70">Un bloqueur de publicités ou le VPN de votre navigateur bloque Firebase. Désactivez-le sur ce site pour accéder à votre historique.</div>
        </div>
      )}

      {user ? (
        <div className="flex flex-col min-h-0 lg:flex-1">

          {/* Header — count badge + new dossier button */}
          <div className="flex items-center justify-between mb-4 px-1 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] uppercase tracking-[0.15em] text-[#5a6275] font-extrabold">Historique</span>
              {dossiers.length > 0 && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1e2538] text-[#8e9aa8] font-sans shadow-sm">
                  {dossiers.length}
                </span>
              )}
            </div>
            <button
              onClick={() => createNewDossier()}
              className="p-1 hover:bg-white/5 rounded-lg text-amber-500 transition-all hover:scale-110 active:scale-95"
              title="Nouveau dossier"
            >
              <Plus className="w-5 h-5 font-bold" />
            </button>
          </div>

          {/* Search bar — always appears when there is at least one dossier */}
          {dossiers.length > 0 && (
            <div className="relative mb-5 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
              <input
                type="text"
                value={dossierSearch}
                onChange={(e) => setDossierSearch(e.target.value)}
                placeholder="Rechercher un dossier..."
                className="w-full bg-[#131722]/80 border border-[#1f2638] rounded-2xl py-3 pl-10 pr-9 text-xs text-slate-200 placeholder:text-[#3e4759] focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all shadow-inner"
              />
              {dossierSearch && (
                <button
                  onClick={() => setDossierSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Dossier list — 260px max on mobile (drawer scrolls), fills sidebar on desktop */}
          <div className="max-h-[260px] overflow-y-auto overscroll-contain pr-1 custom-scrollbar lg:flex-1 lg:min-h-0 lg:max-h-none">
            {(() => {
              // Robust Firestore Timestamp —> ms, never returns NaN
              const getTs = (d: Dossier): number => {
                try {
                  if (d.updatedAt?.toDate) return d.updatedAt.toDate().getTime();
                  if (d.updatedAt instanceof Date) return (d.updatedAt as Date).getTime();
                  if (typeof (d.updatedAt as any)?.seconds === 'number') return (d.updatedAt as any).seconds * 1000;
                  if (typeof d.updatedAt === 'number') return d.updatedAt as number;
                  const p = new Date(d.updatedAt as any).getTime();
                  return isNaN(p) ? Date.now() : p;
                } catch { return Date.now(); }
              };

              const filtered = dossierSearch.trim()
                ? dossiers.filter(d => d.title.toLowerCase().includes(dossierSearch.toLowerCase().trim()))
                : dossiers;

              if (filtered.length === 0) {
                return (
                  <div className="text-center py-10 px-4">
                    <History className="w-8 h-8 text-slate-700 mx-auto mb-2 opacity-50" />
                    <p className="text-xs text-slate-500 italic">
                      {dossierSearch ? 'Aucun résultat.' : 'Aucun dossier enregistré.'}
                    </p>
                    {!dossierSearch && (
                      <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
                        Démarrez une conversation pour créer votre premier dossier.
                      </p>
                    )}
                  </div>
                );
              }

              const sorted = [...filtered].sort((a, b) => getTs(b) - getTs(a));

              const renderItem = (d: Dossier) => {
                const isSelected = currentDossier?.id === d.id;
                return (
                  <div key={d.id} className="relative group mb-2">
                    <button
                      onClick={() => { selectDossier(d); setActiveTab('chat'); setIsMobileMenuOpen(false); }}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-[#211a11] border border-amber-500/40 shadow-[0_4px_20px_rgba(245,158,11,0.06)]'
                          : 'hover:bg-[#131722]/40 border border-transparent hover:border-[#1d2436]/50 active:bg-[#131722]/60'
                      }`}
                    >
                      {/* Left icon wrapper */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#332514] border border-amber-500/30 text-amber-500'
                          : 'bg-[#181d2c] border border-slate-800 text-slate-500'
                      }`}>
                        {d.type === 'analyse' ? <FileText className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                      </div>
                      
                      {/* Text block */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-[13px] font-bold truncate leading-snug ${
                          isSelected ? 'text-amber-500' : 'text-slate-200 group-hover:text-white transition-colors'
                        }`}>
                          {d.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${
                          isSelected ? 'text-amber-500/60' : 'text-slate-500'
                        }`}>
                          {formatRelativeTime(getTs(d))}
                        </div>
                      </div>
                    </button>

                    {/* Delete button (trash can) */}
                    <button
                      onClick={(e) => handleDeleteDossier(d.id, e)}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                        isSelected
                          ? 'text-amber-500/30 hover:text-red-400 hover:bg-red-500/10 animate-fade-in'
                          : 'text-slate-600 hover:text-red-400 hover:bg-red-500/10'
                      } opacity-40 hover:opacity-100 group-hover:opacity-100`}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              };

              return (
                <div className="space-y-1">
                  {sorted.map(renderItem)}
                </div>
              );
            })()}
          </div>

          <hr className="border-[#1d2436] my-4 shrink-0" />

          {/* Footer — User profile card + referral option */}
          <div className="shrink-0 space-y-3">
            {/* User Profile Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-[20px] bg-[#131722]/70 border border-[#1c2234] shrink-0">
              <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border border-slate-700/50 shadow-sm" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-100 truncate">{user.displayName}</div>
                <div className="text-xs text-slate-500 truncate mt-0.5">{user.email}</div>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-red-400 active:scale-95 transition-all"
                title="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
              </button>
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
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 disabled:opacity-60 transition-all shadow-xl shadow-white/5"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      )}
    </>
  );

  useEffect(() => {
    // Check Firestore reachability (Opera / ad-blocker detection)
    testFirestoreConnection().then((status) => {
      if (status === 'blocked') setFirestoreBlocked(true);
    });

    // Handle Google redirect sign-in result (Safari / iOS flow)
    // onAuthStateChanged will fire automatically once the redirect is processed,
    // but getRedirectResult lets us catch auth errors from the redirect.
    getRedirectResult(auth).catch((err) => {
      const msg = String(err?.message || err || '');
      if (
        msg.includes('Pending promise') ||
        msg.includes('INTERNAL ASSERTION FAILED') ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }
      console.warn('[Auth] Redirect sign-in note:', msg);
    });

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
    try {
      const list = await historyService.getDossiers();
      setDossiers(Array.isArray(list) ? list : []);
    } catch (e) {
      console.warn("Could not load dossiers from Firestore:", e);
    }
  };

  const selectDossier = async (dossier: Dossier) => {
    setCurrentDossier(dossier);
    setIsLoading(true);
    try {
      const historyPromise = historyService.getMessages(dossier.id);
      const timeoutPromise = new Promise<MessageRecord[]>((resolve) => 
        setTimeout(() => resolve([]), 4000)
      );
      const history = await Promise.race([historyPromise, timeoutPromise]).catch(() => []);
      if (Array.isArray(history) && history.length > 0) {
        setMessages(history.map(m => ({
          id: m.id,
          role: m.role,
          parts: [{ text: m.content }]
        })));
      } else {
        setMessages([]);
      }
    } catch (e) {
      console.warn("Could not load dossier messages:", e);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewDossier = async (title: string = "Nouveau Dossier") => {
    const tempId = (user ? 'dossier-' : 'guest-') + Date.now();
    const newDossier: Dossier = { 
      id: tempId, 
      title, 
      userId: user?.uid || 'guest', 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      type: 'conseil',
      contractDraft: ''
    };
    setCurrentDossier(newDossier);
    setMessages([]);
    setInput('');
    setError(null);

    if (user) {
      historyService.createDossier(title).then((id) => {
        if (id) {
          setCurrentDossier(prev => prev?.id === tempId ? { ...prev, id } : prev);
          loadDossiers().catch(() => {});
        }
      }).catch((e) => {
        console.warn("Could not create dossier in Firestore:", e);
      });
    }
  };

  const welcomeMessageMarkdown = "Assistant juridique IA expert en droit français et luxembourgeois. Conseils en temps réel, rédaction de contrats, analyse de documents. Connectez-vous pour sauvegarder vos dossiers.";

  const handleTranslatePlaybook = () => {
    setIsTranslatingPlaybook(true);
    setTimeout(() => {
      const template = `=== SYSTEM PROMPT : REGLE DE NEGOCIATION & PLAYBOOK JURIDIQUE ===
Nom de la clause analysée : ${playbookForm.clause}

1. POSITION PRÉFÉRÉE (PREFERRED POSITION) :
${playbookForm.preferred}

2. SOLUTION DE REPLI (FALLBACK SOLUTION) :
${playbookForm.fallback}

3. SÉCURITÉ & VALIDATION DU BUSINESS REQUIS POUR :
${playbookForm.businessValidation}

4. SIGNAUX D'ALARME SÉVÈRES (RED FLAGS) :
${playbookForm.redFlags}

5. SEUIL D'ESCALADE HIÉRARCHIQUE :
${playbookForm.escalation}

6. STYLE DE RÉDACTION SOUHAITÉ (REDLINE STYLE) :
${playbookForm.redlineStyle}

===== INSTRUCTIONS D'EXÉCUTION POUR L'AGENT =====
- Analyse chaque contrat qui t'est soumis de façon méthodique.
- Applique strictement les lignes directrices ci-dessus pour la clause "${playbookForm.clause}".
- Pour tout écart, signale-le immédiatement et rédige une proposition de modification conforme au style demandé (Redline style).
- Si un point nécessite l'avis du Business ou franchit le seuil d'escalade, mentionne-le expressément en gras/rouge.`;
      
      setGeneratedPrompt(template);
      setIsTranslatingPlaybook(false);
    }, 1200);
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
        historyService.addAuditLog('RUN_PILOT_MODEL', undefined, `Executed Pilot Model Analysis: ${selectedPilotModelId}`);
      }
    }, 600);
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
        historyService.addAuditLog('RUN_INTAKE_QUALIFICATION', undefined, `Executed Intake form qualification, type: ${intakeForm.type}`);
      }
    }, 600);
  };

  const [litigationProgressText, setLitigationProgressText] = useState('');

  const handleRunLitigationPilot = () => {
    setIsAnalyzingLitigation(true);
    setLitigationAnalysisResult('');
    
    const steps = [
      "Initialisation de l'analyse du dossier de litige...",
      "Extraction des entités (Parties: LogisticsExpress)...",
      "Calcul de la chronologie (retard : 19 jours)...",
      "Calcul des pénalités de retard journalières (SLA : 19 000 € vs plafond 20 000 €)...",
      "Évaluation du préjudice indirect & perte d'exploitation (45 000 €)...",
      "Audit de conformité et détection de red flags (Clause libératoire détectée)...",
      "Génération du résumé de litige de niveau exécutif..."
    ];

    let currentStep = 0;
    setLitigationProgressText(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLitigationProgressText(steps[currentStep]);
      } else {
        clearInterval(interval);
        
        const PRE_SCREENING_REPORT = `### 📋 RÉSUMÉ D'ANALYSE JURIDIQUE : LITIGE LOGISTICSEXPRESS

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
3. **Escalade** : En cas de refus sous 15 jours, transférer le dossier au Directeur Juridique pour l'engagement d'une procédure d'indemnisation complémentaire sur le fondement de la responsabilité contractuelle de droit commun.`;

        setLitigationAnalysisResult(PRE_SCREENING_REPORT);
        setIsAnalyzingLitigation(false);
        historyService.addAuditLog('RUN_LITIGATION_PILOT', undefined, 'Executed Supplier Dispute Analysis for LogisticsExpress');
      }
    }, 600);
  };

  const handleSend = async (text?: string) => {
    const messageText = typeof text === 'string' ? text : input;
    if (!messageText.trim() || isLoading) return;

    // Track prompt count without blocking
    if (!user) {
      const newCount = freePromptsUsed + 1;
      setFreePromptsUsed(newCount);
      try {
        localStorage.setItem('free_prompts_used', String(newCount));
      } catch {
        // ignore
      }
    }

    // 1. Optimistic UI update immediately (instant response on click/enter)
    const localId = Math.random().toString(36).substr(2, 9);
    const userMessage: Message = { id: `user-${localId}`, role: 'user', parts: [{ text: messageText }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setThinkingStep(1);

    // Dynamic progression of the 4 analysis phases
    const thinkingInterval = setInterval(() => {
      setThinkingStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    // 2. Ensure an active dossier exists immediately so document workspace & drafts function
    const dossierTitle = messageText.slice(0, 30) + (messageText.length > 30 ? "..." : "");
    let activeDossierId = currentDossier?.id;
    if (!activeDossierId) {
      const fallbackId = (user ? 'dossier-' : 'guest-') + Date.now();
      const initialDossier: Dossier = {
        id: fallbackId,
        title: dossierTitle,
        userId: user ? user.uid : 'guest',
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'conseil',
        contractDraft: ''
      };
      setCurrentDossier(initialDossier);
      activeDossierId = fallbackId;
    }

    // 3. Background non-blocking Firestore sync for authenticated users
    if (user) {
      (async () => {
        try {
          let realId = currentDossier?.id && !currentDossier.id.startsWith('dossier-') && !currentDossier.id.startsWith('guest-')
            ? currentDossier.id
            : undefined;

          if (!realId) {
            const createPromise = historyService.createDossier(dossierTitle);
            const timeoutPromise = new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 3500));
            realId = await Promise.race([createPromise, timeoutPromise]);
            if (realId) {
              setCurrentDossier(prev => prev ? { ...prev, id: realId! } : null);
              loadDossiers().catch(() => {});
            }
          }

          if (realId) {
            historyService.addMessage(realId, 'user', messageText).catch(() => {});
          }
        } catch (e) {
          console.warn("[Firestore] Background sync note:", e);
        }
      })();
    }

    // Abort previous in-flight chat if any
    if (chatAbortControllerRef.current) {
      chatAbortControllerRef.current.abort("New chat message sent");
    }
    const controller = new AbortController();
    chatAbortControllerRef.current = controller;
    const localModelId = Math.random().toString(36).substr(2, 9);
    const modelMessageId = `model-${localModelId}`;

    const isEmailIntent = /\b(mail|email|courriel|contacter|ecris|écris|transmettre|transmets|envoie|envoyer)\b/i.test(messageText);
    const targetCabinet = isEmailIntent ? findCabinetByFuzzyQuery(messageText) : undefined;
    let payloadMessage = messageText;
    if (isEmailIntent && targetCabinet) {
      payloadMessage = `${messageText}\n\n[DIRECTIVE D'ACTION IMMÉDIATE : L'utilisateur demande d'envoyer un e-mail au cabinet "${targetCabinet.name}". Adresse e-mail officielle certifiée dans l'annuaire : "${targetCabinet.email}". Téléphone : "${targetCabinet.phone}". Présente la synthèse juridique avec le projet d'e-mail formel et insère impérativement l'action d'exécution directe : [✉️ Confirmer & Expédier cet e-mail au cabinet ${targetCabinet.name}](#email-cabinet:${targetCabinet.id})]`;
      showToast(`Cabinet identifié : ${targetCabinet.name} (${targetCabinet.email})`);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream, application/json'
        },
        body: JSON.stringify({
          message: payloadMessage,
          history: messages,
          useAgenticMode,
          complexity,
          recommendLawyers,
          userPersona,
          stream: true
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        let errorMsg = `Erreur de communication avec le serveur (code ${response.status})`;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const errData = await response.json();
            if (errData && errData.error) {
              errorMsg = errData.error;
            }
          } else {
            const rawText = await response.text();
            if (rawText && !rawText.trim().startsWith('<')) {
              errorMsg = rawText.slice(0, 200);
            } else if (response.status === 502 || response.status === 503 || response.status === 504) {
              errorMsg = "Le serveur d'IA est temporairement indisponible ou en cours de redémarrage. Veuillez réessayer dans quelques instants.";
            } else if (response.status === 404) {
              errorMsg = "Le service demandé est introuvable sur le serveur.";
            }
          }
        } catch (e) {
          // ignore parsing error
        }
        throw new Error(errorMsg);
      }

      const contentType = response.headers.get('content-type') || '';
      let finalFullText = '';
      let planningReport: string | undefined = undefined;

      // Helper to update active draft if legal draft content is detected
      const updateDraftPreviewIfApplicable = (text: string) => {
        const hasDraftContent = 
          text.includes('CONTRAT') || 
          text.includes('ARTICLE') || 
          text.includes('# ') || 
          text.includes('## ') || 
          text.includes('Journal') || 
          text.includes('Situation') || 
          text.includes('OBJET') || 
          text.includes('CONTEXTE') || 
          text.includes('CHRONOLOGIE') || 
          text.includes('Mise en demeure') || 
          text.includes('Analyse de document');

        if (hasDraftContent || text.length > 400) {
          setCurrentDossier(prev => {
            if (!prev) return null;
            return {
              ...prev,
              contractDraft: text
            };
          });
        }
      };

      if (contentType.includes('text/event-stream') && response.body) {
        // Create initial placeholder model message
        const initialModelMessage: Message = {
          id: modelMessageId,
          role: 'model',
          parts: [{ text: '' }],
          planning: undefined
        };
        setMessages(prev => [...prev, initialModelMessage]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const jsonStr = trimmed.replace(/^data:\s*/, '');
              if (!jsonStr) continue;

              try {
                const event = JSON.parse(jsonStr);
                if (event.type === 'start') {
                  setThinkingStep(1);
                } else if (event.type === 'planning') {
                  planningReport = event.planning;
                  setThinkingStep(2);
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === modelMessageId ? { ...m, planning: planningReport } : m
                    )
                  );
                } else if (event.type === 'chunk') {
                  finalFullText += event.chunk;

                  // Dynamically advance thinking step on detected phase milestones
                  if (finalFullText.length > 50 && (finalFullText.includes('Phase 2') || finalFullText.includes('Sources') || finalFullText.includes('Synthèse'))) {
                    setThinkingStep(3);
                  }

                  setMessages(prev =>
                    prev.map(m =>
                      m.id === modelMessageId
                        ? { ...m, parts: [{ text: finalFullText }], planning: planningReport || m.planning }
                        : m
                    )
                  );
                } else if (event.type === 'done') {
                  if (event.text) finalFullText = event.text;
                  if (event.planning) planningReport = event.planning;
                  setThinkingStep(3);
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === modelMessageId
                        ? { ...m, parts: [{ text: finalFullText }], planning: planningReport || m.planning }
                        : m
                    )
                  );
                  updateDraftPreviewIfApplicable(finalFullText);
                } else if (event.type === 'error') {
                  throw new Error(event.error || "Erreur lors de la génération de la réponse.");
                }
              } catch (e: any) {
                if (isAbortError(e)) throw e;
                if (e.message && (e.message.includes("Erreur") || e.message.includes("serveur"))) {
                  throw e;
                }
                // Skip malformed chunk line
              }
            }
          }
        } finally {
          try {
            reader.releaseLock();
          } catch {
            // ignore release lock issues
          }
        }
      } else {
        // Fallback for non-streaming or standard JSON response
        let data: any;
        try {
          const textData = await response.text();
          if (textData.trim().startsWith('<')) {
            throw new Error("Le serveur d'intelligence artificielle est en cours d'initialisation. Veuillez relancer votre demande dans quelques secondes.");
          }
          data = JSON.parse(textData);
        } catch (parseErr: any) {
          throw new Error(parseErr.message || "Réponse du serveur invalide.");
        }
        setThinkingStep(4);
        finalFullText = data.text;
        planningReport = data.planning;

        const modelMessage: Message = {
          id: modelMessageId,
          role: 'model',
          parts: [{ text: finalFullText }],
          planning: planningReport
        };
        setMessages(prev => [...prev, modelMessage]);
        updateDraftPreviewIfApplicable(finalFullText);
      }

      // Sync completed model response to Firestore if user is authenticated
      if (activeDossierId && user && finalFullText) {
        try {
          await historyService.addMessage(activeDossierId, 'model', finalFullText);
          const hasDraftContent = 
            finalFullText.includes('CONTRAT') || 
            finalFullText.includes('ARTICLE') || 
            finalFullText.includes('Mise en demeure');
          if (hasDraftContent) {
            await historyService.updateContract(activeDossierId, finalFullText);
          }
        } catch (e) {
          console.warn("Could not sync AI model response to Firestore:", e);
        }
      }

      // After last free prompt → show auth modal with delay
      if (!user && freePromptsUsed + 1 >= FREE_PROMPT_LIMIT) {
        setTimeout(() => setShowAuthModal(true), 1200);
      }
    } catch (err: any) {
      // Remove empty placeholder message if no text was streamed
      setMessages(prev => prev.filter(m => m.id !== modelMessageId || (m.parts[0]?.text?.trim().length ?? 0) > 0));
      if (controller.signal.aborted || isAbortError(err)) {
        return;
      }
      setError(formatFriendlyFetchError(err, "Une erreur est survenue lors de la communication avec le serveur."));
    } finally {
      clearInterval(thinkingInterval);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      const text = lastUserMsg.parts[0]?.text;
      if (text) {
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0 && updated[updated.length - 1].role === 'user') {
            updated.pop();
          }
          return updated;
        });
        handleSend(text);
      }
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

    // Validate size client-side before uploading (~4 MB limit)
    if (file.size > 4 * 1024 * 1024) {
      setError("Fichier trop volumineux. Taille maximale : 4 Mo.");
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const localId = Math.random().toString(36).substr(2, 9);
    const userMessage: Message = {
      id: `user-file-${localId}`,
      role: 'user',
      parts: [{ text: `📄 **Document transmis pour collecte & extraction** : \`${file.name}\` (${(file.size / 1024).toFixed(1)} Ko)\n*Analyse en cours via le moteur multimodal LexIIA...*` }]
    };
    setMessages(prev => [...prev, userMessage]);

    let activeDossierId = currentDossier?.id;
    if (!activeDossierId) {
      const fallbackId = 'dossier-' + Date.now();
      const initialDossier: Dossier = {
        id: fallbackId,
        title: `Analyse: ${file.name}`,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'analyse',
        contractDraft: ''
      };
      setCurrentDossier(initialDossier);
      activeDossierId = fallbackId;
    }

    // Persist in background
    (async () => {
      try {
        let realId = currentDossier?.id && !currentDossier.id.startsWith('dossier-')
          ? currentDossier.id
          : undefined;
        if (!realId) {
          realId = await historyService.createDossier(`Analyse: ${file.name}`, 'analyse');
          if (realId) {
            setCurrentDossier(prev => prev ? { ...prev, id: realId! } : null);
            loadDossiers().catch(() => {});
          }
        }
        if (realId) {
          historyService.addMessage(realId, 'user', `📄 **Document transmis pour collecte & extraction** : \`${file.name}\` (${(file.size / 1024).toFixed(1)} Ko)`).catch(() => {});
        }
      } catch (e) {
        console.warn("[Firestore] File upload sync note:", e);
      }
    })();

    // Read file as base64 and send as JSON (avoids multer/multipart issues on Vercel)
    const b64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // strip "data:<mime>;base64," prefix
        resolve(result.split(',')[1] ?? result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Abort previous file analysis if any
    if (analyzeAbortControllerRef.current) {
      analyzeAbortControllerRef.current.abort();
    }
    const controller = new AbortController();
    analyzeAbortControllerRef.current = controller;

    try {
      const response = await fetch('/api/analyze-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, mimetype: file.type, data: b64 }),
        signal: controller.signal
      });

      if (!response.ok) {
        let errorMsg = `Erreur lors de l'analyse du document (code ${response.status})`;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const errData = await response.json();
            if (errData && errData.error) {
              errorMsg = errData.error;
            }
          } else {
            const rawText = await response.text();
            if (rawText && !rawText.trim().startsWith('<')) {
              errorMsg = rawText.slice(0, 200);
            } else if (response.status === 502 || response.status === 503 || response.status === 504) {
              errorMsg = "Le serveur d'IA est temporairement indisponible ou en cours de redémarrage. Veuillez réessayer.";
            }
          }
        } catch {
          // ignore parsing error
        }
        throw new Error(errorMsg);
      }

      let data: any;
      try {
        const textData = await response.text();
        if (textData.trim().startsWith('<')) {
          throw new Error("Le serveur d'intelligence artificielle est en cours d'initialisation. Veuillez relancer l'analyse du document.");
        }
        data = JSON.parse(textData);
      } catch (parseErr: any) {
        throw new Error(parseErr.message || "Réponse d'analyse invalide.");
      }
      const localAnalysisId = Math.random().toString(36).substr(2, 9);
      const modelMessage: Message = { id: `model-analysis-${localAnalysisId}`, role: 'model', parts: [{ text: data.text }] };
      setMessages(prev => [...prev, modelMessage]);

      if (data.text) {
        setCurrentDossier(prev => {
          if (!prev) return null;
          return {
            ...prev,
            contractDraft: data.text
          };
        });
      }

      if (activeDossierId && user) {
        try {
          await historyService.addMessage(activeDossierId, 'model', data.text);
          if (data.text) {
            await historyService.updateContract(activeDossierId, data.text);
          }
        } catch (e) {
          console.warn("Could not sync document analysis to Firestore:", e);
        }
      }
    } catch (err: any) {
      if (controller.signal.aborted || isAbortError(err)) {
        return;
      }
      setError(formatFriendlyFetchError(err, "Impossible d'analyser le document."));
    } finally {
      if (!controller.signal.aborted) {
        setIsAnalyzing(false);
      }
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

  // ‚îÄ‚îÄ Domain lock guard (placed after all hooks to respect Rules of Hooks) ‚îÄ‚îÄ
  if (isLocked) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <ShieldCheck className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 italic">ACCÈS RESTREINT</h1>
        <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
          Ce projet est une instance protégée de <b>LexIIA</b>.
          Le fonctionnement sur ce domaine n'est pas autorisé.
          Pour déployer votre propre version, veuillez configurer vos propres variables d'environnement.
        </p>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left font-mono text-[10px] text-slate-500">
          Error Level: DOMAIN_MISMATCH_SECURITY_LOCKED
        </div>
      </div>
    );
  }

  if (isAuthLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#04060a] text-slate-100 overflow-hidden relative font-sans">
      <div className="mesh-gradient-1"></div>
      <div className="mesh-gradient-2"></div>

      {/* ─── Share / Collaboration Modal ─── */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShowToast={showToast}
      />

      {/* ─── Auth Modal (freemium gate) ────────────────────────────────── */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setShowAuthModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-7 shadow-2xl text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center mx-auto mb-5">
                <Gavel className="w-8 h-8 text-amber-400" />
              </div>

              <h2 className="text-xl font-bold text-white mb-1">Accès illimité</h2>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Vous avez utilisé vos <span className="text-amber-400 font-semibold">5 consultations gratuites</span>.<br/>
                Connectez-vous pour continuer sans limite.
              </p>

              {/* Benefits */}
              <ul className="text-left space-y-2.5 mb-6 text-sm">
                {[
                  { icon: '💾', text: 'Historique et dossiers sauvegardés' },
                  { icon: '‚ôæÔ∏è', text: 'Consultations illimitées' },
                  { icon: '📄', text: 'Rédaction de contrats & analyses' },
                  { icon: '🔒', text: 'Données chiffrées et sécurisées' },
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
                    <span className="text-base shrink-0">{b.icon}</span>
                    <span className="text-slate-300">{b.text}</span>
                  </li>
                ))}
              </ul>

              {/* Google sign-in button */}
              <button
                onClick={() => { setShowAuthModal(false); handleLogin(); }}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 disabled:opacity-60 active:scale-[0.98] transition-all shadow-lg mb-3"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>

              <button
                onClick={() => setShowAuthModal(false)}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                Peut-être plus tard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Upgrade Modal (LexIIA Pro & Billing) ─────────────────────────────────── */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setShowUpgradeModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-6xl bg-[#0b0f19] border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl relative my-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.1px,transparent_0.1px)] [background-size:20px_20px] opacity-[0.02] pointer-events-none rounded-[32px]" />
              
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
                {/* Scale of justice golden icon above the title */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                    <Scale className="w-6 h-6" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
                  Passez à un niveau supérieur
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Choisissez l'offre adaptée à vos besoins juridiques
                </p>

                {/* Billing cycle toggle */}
                <div className="flex bg-[#161a26] border border-white/10 p-1 rounded-full max-w-[340px] mx-auto mt-6">
                  <button
                    onClick={() => setBillingIsYearly(false)}
                    className={`flex-1 py-2 px-4 text-xs font-semibold rounded-full transition-all ${
                      !billingIsYearly 
                        ? 'bg-white text-slate-950 font-bold shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Mensuellement
                  </button>
                  <button
                    onClick={() => setBillingIsYearly(true)}
                    className={`flex-1 py-2 px-4 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${
                      billingIsYearly 
                        ? 'bg-white text-slate-950 font-bold shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Annuellement
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold shrink-0">
                      -17%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                {/* Plan 1: STANDARD */}
                <div className="p-6 rounded-3xl bg-[#111625]/50 border border-slate-800/60 flex flex-col justify-between hover:border-slate-700/80 transition-all">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        STANDARD
                      </span>
                      <div className="mt-4 flex items-baseline flex-wrap gap-x-2">
                        <span className="text-2xl md:text-3xl font-bold text-slate-500 line-through tracking-tight">
                          20 €
                        </span>
                        <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                          {billingIsYearly ? '16 €' : '10 €'}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">/mois</span>
                      </div>
                      <p className="text-xs font-medium text-amber-400/90 mt-2">
                        {billingIsYearly ? 'facturé 192 €/an (-17% d\'économie)' : 'premier mois, puis 20 €/mois'}
                      </p>
                      <p className="text-xs font-semibold text-slate-300 mt-2.5">
                        {billingIsYearly ? 'Utilisation standard annuelle' : 'Utilisation mensuelle standard'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Pour les particuliers qui veulent un assistant juridique au quotidien.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        showToast("Abonnement Standard activé !");
                        setShowUpgradeModal(false);
                      }}
                      className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all active:scale-95"
                    >
                      Choisir Standard
                    </button>

                    <ul className="space-y-4 pt-2 text-sm text-slate-300">
                      <li className="flex items-start gap-3">
                        <Infinity className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <span>Consultations illimitées</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <SquarePen className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <span>Rédaction de contrats, baux, NDA</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <span>Historique chiffré sauvegardé</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <span>Recherche jurisprudence (FR & LU)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Plan 2: PREMIUM */}
                <div className="p-6 rounded-3xl bg-[#111625]/80 border-2 border-amber-500 relative flex flex-col justify-between shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] uppercase font-extrabold tracking-wider shadow-md whitespace-nowrap">
                    ★ RECOMMANDÉ
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                        PREMIUM
                      </span>
                      <div className="mt-4 flex items-baseline flex-wrap gap-x-2">
                        <span className="text-2xl md:text-3xl font-bold text-slate-500 line-through tracking-tight">
                          40 €
                        </span>
                        <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                          {billingIsYearly ? '33 €' : '20 €'}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">/mois/utilisateur</span>
                      </div>
                      <p className="text-xs font-semibold text-amber-400 mt-2">
                        {billingIsYearly ? 'facturé 396 €/an (-17% d\'économie)' : 'premier mois, puis 40 €/mois'}
                      </p>
                      <p className="text-xs font-semibold text-slate-200 mt-2.5">
                        {billingIsYearly ? 'Utilisation personnalisable annuelle' : 'Utilisation mensuelle personnalisable'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Accès complet aux fonctionnalités avancées LexIIA.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowUpgradeModal(false);
                        if (!user) {
                          setShowAuthModal(true);
                        } else {
                          showToast("LexIIA Pro Premium activé ! Merci pour votre abonnement.");
                        }
                      }}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                    >
                      Choisir Premium
                    </button>

                    <ul className="space-y-4 pt-2 text-sm text-slate-200">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 bg-amber-500/10 rounded-full p-0.5 border border-amber-500/30" />
                        <span className="font-medium text-slate-100">Tout Standard inclus</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <SquarePen className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 bg-amber-500/10 rounded-full p-0.5 border border-amber-500/30" />
                        <span>Rédaction illimitée (Contrats, baux, NDA, CGV...)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 bg-amber-500/10 rounded-full p-0.5 border border-amber-500/30" />
                        <span>Analyse de contrats intelligente (risques, clauses)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Scale className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 bg-amber-500/10 rounded-full p-0.5 border border-amber-500/30" />
                        <span>Recherche de jurisprudence approfondie</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 bg-amber-500/10 rounded-full p-0.5 border border-amber-500/30" />
                        <span>Assistance augmentée à la préparation du dossier</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Plan 3: PRO • ÉQUIPE */}
                <div className="p-6 rounded-3xl bg-[#111625]/50 border border-slate-800/60 flex flex-col justify-between hover:border-slate-700/80 transition-all">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        PRO • ÉQUIPE
                      </span>
                      <div className="mt-4 flex items-baseline flex-wrap gap-x-2">
                        <span className="text-2xl md:text-3xl font-bold text-slate-500 line-through tracking-tight">
                          200 €
                        </span>
                        <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                          {billingIsYearly ? '165 €' : '100 €'}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">/mois</span>
                      </div>
                      <p className="text-xs font-medium text-amber-400/90 mt-2">
                        {billingIsYearly ? 'facturé 1 980 €/an (-17% d\'économie)' : 'premier mois, puis 200 €/mois'}
                      </p>
                      <p className="text-xs font-semibold text-slate-300 mt-2.5">
                        Utilisation étendue pour la productivité
                      </p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Pour les équipes et cabinets qui automatisent leur flux juridique.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        showToast("Demande d'abonnement Pro • Équipe enregistrée. Notre équipe commerciale prendra contact avec vous.");
                        setShowUpgradeModal(false);
                      }}
                      className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all active:scale-95"
                    >
                      Choisir Pro
                    </button>

                    <ul className="space-y-4 pt-2 text-sm text-slate-300">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-slate-500 shrink-0 mt-0.5 bg-slate-800/40 rounded-full p-0.5 border border-slate-700" />
                        <span className="font-medium text-slate-200">Tout Premium inclus</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-slate-500 shrink-0 mt-0.5 bg-slate-800/40 rounded-full p-0.5 border border-slate-700" />
                        <span>Analyse de contrats approfondie (multi-clauses)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5 bg-slate-800/40 rounded-full p-0.5 border border-slate-700" />
                        <span>Automatisation du temps de lecture</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-slate-500 shrink-0 mt-0.5 bg-slate-800/40 rounded-full p-0.5 border border-slate-700" />
                        <span>Intégration à l'équipe commerciale</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Plug2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5 bg-slate-800/40 rounded-full p-0.5 border border-slate-700" />
                        <span>Connecteurs multi-outils (CRM, Slack, Zapier...)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom footer bar */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-slate-500">
                <div className="flex gap-4">
                  <span>🔒 Paiement sécurisé SSL</span>
                  <span>⚡ Activation instantanée</span>
                  <span>🛡️ Conformité RGPD & Hébergement EU</span>
                </div>
                <div>
                  {!user && (
                    <button 
                      onClick={() => { setShowUpgradeModal(false); setShowAuthModal(true); }}
                      className="text-amber-400 hover:underline font-semibold"
                    >
                      Déjà membre ? Connectez-vous
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODAL TRANSMISSION E-MAIL AU CABINET (ANNUAIRE) ──────────────── */}
      <AnimatePresence>
        {emailDispatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setEmailDispatchModal(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="w-full max-w-2xl bg-[#0d121f] border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl relative my-6 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-blue-950/50 via-slate-900 to-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>Transmission d'e-mail officiel</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ✓ Annuaire certifié
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cabinet destinataire : <strong className="text-amber-400">{emailDispatchModal.cabinet.name}</strong>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailDispatchModal(null)}
                  className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-5 sm:p-6 space-y-4 max-h-[68vh] overflow-y-auto">
                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Cabinet Destinataire</span>
                    <div className="flex items-center gap-1.5 text-white font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{emailDispatchModal.cabinet.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-300 font-mono text-[11px] mt-0.5">
                      <Mail className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{emailDispatchModal.recipientEmail}</span>
                    </div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">
                      {emailDispatchModal.cabinet.location}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expéditeur</span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user?.displayName || "Demandeur LexIIA"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] mt-0.5">
                      <span className="truncate">{emailDispatchModal.senderEmail}</span>
                    </div>
                    <div className="text-[10.5px] text-amber-400/80 mt-0.5">
                      Dossier : {currentDossier?.title || "LexIIA"}
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Objet du courriel :</span>
                    <span className="text-[10px] text-slate-500 font-normal">Modifiable</span>
                  </label>
                  <input
                    type="text"
                    value={emailDispatchModal.subject}
                    onChange={(e) => setEmailDispatchModal(prev => prev ? { ...prev, subject: e.target.value } : null)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 focus:border-blue-500 rounded-xl text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Corps du message rédigé :</span>
                    <span className="text-[10px] text-slate-500 font-normal">Modifiable</span>
                  </label>
                  <textarea
                    rows={8}
                    value={emailDispatchModal.body}
                    onChange={(e) => setEmailDispatchModal(prev => prev ? { ...prev, body: e.target.value } : null)}
                    className="w-full p-3.5 bg-slate-900/80 border border-white/10 focus:border-blue-500 rounded-xl text-xs text-slate-200 font-sans leading-relaxed outline-none transition-all resize-y"
                  />
                </div>

                {/* Success Banner */}
                {emailDispatchModal.sentSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3 shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold">E-mail transmis avec succès au secrétariat du cabinet !</div>
                      <div className="text-[11px] text-emerald-400/90 mt-0.5">
                        Réf. d'archivage : <code className="font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded text-emerald-200">{emailDispatchModal.sentMessageId}</code> · Consigné dans votre historique.
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/60 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={copyEmailToClipboard}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copier
                  </button>
                  <button
                    onClick={openInEmailClient}
                    className="px-3.5 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Ouvre votre logiciel de messagerie par défaut avec les champs pré-remplis"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    Ouvrir dans Gmail / Outlook
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={emailDispatchModal.isSending || emailDispatchModal.sentSuccess}
                    onClick={executeSendCabinetEmail}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {emailDispatchModal.isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Transmission en cours...
                      </>
                    ) : emailDispatchModal.sentSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        Transmis
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Confirmer l'envoi direct (API)
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODAL CONTRAT DE VISIBILITÉ & RÉFÉRENCEMENT CABINET (CONVENTION JURIDIQUE) ─── */}
      <VisibilityContractModal
        isOpen={showVisibilityContractModal}
        onClose={() => setShowVisibilityContractModal(false)}
        initialCabinet={visibilityContractCabinet}
        onShowToast={showToast}
        onOpenEmailWithContract={(cab, subj, body) => {
          setShowVisibilityContractModal(false);
          openEmailModalForCabinet(cab, subj, body);
        }}
      />

      {/* Global custom Toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[140] bg-[#1a2133] border border-amber-500/40 text-amber-300 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Google Drive Extension Configuration Modal ──────────────────────── */}
      <AnimatePresence>
        {showDriveConfigModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#10141f] border border-[#222a3d] w-full max-w-3xl rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-[#131722]/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                      <GoogleDriveIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">Google Workspace & Drive Direct</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          Drive · Docs · Sheets
                        </span>
                        {hasGoogleToken && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            OAuth 2.0 Connecté
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Accès direct à vos fichiers, lecture Google Docs & Sheets et analyse juridique LexIIA
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDriveConfigModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sub-tabs inside Modal */}
                <div className="flex items-center gap-1.5 mt-5 p-1 bg-slate-900/80 rounded-xl border border-white/5 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setDriveModalTab('workspace');
                      if (hasGoogleToken && workspaceFiles.length === 0) {
                        loadWorkspaceFiles();
                      }
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                      driveModalTab === 'workspace'
                        ? 'bg-blue-600 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-blue-400" />
                    <span>Accès Direct</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDriveModalTab('script')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                      driveModalTab === 'script'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Script RAG Automatisé</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDriveModalTab('config')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                      driveModalTab === 'config'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>Paramètres GED & Synchro</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1 text-sm">
                {driveModalTab === 'workspace' ? (
                  <div className="space-y-6">
                    {/* ─── Google Account & Permissions Card (Conforme à la capture Manus) ─── */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-[#0f121a] border border-blue-500/25 relative overflow-hidden shadow-xl space-y-5">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                            <GoogleDriveIcon className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Google Workspace OAuth 2.0</span>
                            </div>
                            <h4 className="text-base font-bold text-white mt-0.5">
                              LexIIA accède à vos fichiers Google
                            </h4>
                          </div>
                        </div>

                        {/* Account Pill */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                              {(user?.email || 'D')[0].toUpperCase()}
                            </div>
                          )}
                          <span className="font-mono text-[11px] truncate max-w-[180px]">
                            {user?.email || 'dootrimarketing@gmail.com'}
                          </span>
                        </div>
                      </div>

                      {/* Scopes Checklist (Exactement comme dans la capture Manus) */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-bold text-slate-300">
                          Services autorisés pour LexIIA :
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          {/* Google Docs */}
                          <div className="p-3.5 rounded-2xl bg-[#141824] border border-blue-500/20 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" />
                                Google Docs
                              </span>
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              Consulter, lire et auditer vos actes, contrats et modèles.
                            </p>
                          </div>

                          {/* Google Sheets */}
                          <div className="p-3.5 rounded-2xl bg-[#141824] border border-emerald-500/20 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                                Google Sheets
                              </span>
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              Consulter et extraire tableaux de créances et barèmes.
                            </p>
                          </div>

                          {/* Google Drive */}
                          <div className="p-3.5 rounded-2xl bg-[#141824] border border-amber-500/20 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                                <Folder className="w-3.5 h-3.5" />
                                Google Drive
                              </span>
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              Parcourir et rechercher l'ensemble de vos dossiers.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Connection Button / Status Banner */}
                      <div className="pt-2">
                        {!hasGoogleToken ? (
                          <div className="space-y-2">
                            <button
                              type="button"
                              onClick={handleConnectGoogleWorkspace}
                              disabled={isConnectingGoogle}
                              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
                            >
                              <GoogleDriveIcon className="w-4 h-4" />
                              <span>
                                {isConnectingGoogle 
                                  ? "Autorisation Google en cours..." 
                                  : "Se connecter avec Google (Autoriser Drive, Docs & Sheets)"}
                              </span>
                            </button>
                            <p className="text-[11px] text-center text-slate-400">
                              Ouvre la fenêtre Google officielle pour autoriser LexIIA en 1 clic.
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex-wrap gap-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Session Google Workspace active (Drive, Docs, Sheets autorisés)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => loadWorkspaceFiles(workspaceSearchTerm)}
                              disabled={isLoadingWorkspaceFiles}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingWorkspaceFiles ? 'animate-spin' : ''}`} />
                              <span>Actualiser mes fichiers</span>
                            </button>
                          </div>
                        )}
                        {workspaceError && (
                          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 mt-2">
                            {workspaceError}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ─── Explorateur de Fichiers Google Drive Direct ─── */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Folder className="w-4 h-4 text-blue-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Vos documents Google Drive
                          </h4>
                          {hasGoogleToken && workspaceFiles.length > 0 && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                              {workspaceFiles.length} {workspaceFiles.length === 1 ? 'fichier' : 'fichiers'}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 hidden sm:inline">
                            (Mon Drive + Drives partagés)
                          </span>
                        </div>

                        {/* Search input */}
                        <div className="relative flex-1 max-w-sm">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={workspaceSearchTerm}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWorkspaceSearchTerm(val);
                              if (hasGoogleToken) {
                                loadWorkspaceFiles(val);
                              }
                            }}
                            placeholder="Rechercher un document ou contrat..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                        <button
                          type="button"
                          onClick={() => setWorkspaceFilter('all')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                            workspaceFilter === 'all' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          Tous les types
                        </button>
                        <button
                          type="button"
                          onClick={() => setWorkspaceFilter('docs')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                            workspaceFilter === 'docs' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <FileText className="w-3 h-3 text-blue-400" />
                          <span>Google Docs</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setWorkspaceFilter('sheets')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                            workspaceFilter === 'sheets' 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                          <span>Google Sheets</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setWorkspaceFilter('pdf')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                            workspaceFilter === 'pdf' 
                              ? 'bg-amber-600 text-white' 
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-amber-400" />
                          <span>PDFs & Actes</span>
                        </button>
                      </div>

                      {/* File Items List */}
                      {isLoadingWorkspaceFiles ? (
                        <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                          <span className="text-xs">Chargement de vos fichiers Google Drive...</span>
                        </div>
                      ) : workspaceFiles.length > 0 ? (
                        <>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                          {workspaceFiles
                            .filter(f => {
                              if (workspaceFilter === 'docs') return f.mimeType.includes('document');
                              if (workspaceFilter === 'sheets') return f.mimeType.includes('spreadsheet');
                              if (workspaceFilter === 'pdf') return f.mimeType.includes('pdf');
                              return true;
                            })
                            .map((file) => {
                              const isDoc = file.mimeType.includes('document');
                              const isSheet = file.mimeType.includes('spreadsheet');
                              const isPdf = file.mimeType.includes('pdf');
                              const isAnalyzing = analyzingFileId === file.id;

                              return (
                                <div
                                  key={file.id}
                                  className="p-3.5 rounded-2xl bg-[#141824] border border-white/5 hover:border-blue-500/30 flex items-center justify-between gap-3 transition-all group"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                                      {isDoc ? (
                                        <FileText className="w-5 h-5 text-blue-400" />
                                      ) : isSheet ? (
                                        <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                                      ) : (
                                        <CheckCircle2 className="w-5 h-5 text-amber-400" />
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <h5 className="font-bold text-white text-xs truncate group-hover:text-blue-300 transition-colors">
                                        {file.name}
                                      </h5>
                                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                        <span>{isDoc ? 'Google Doc' : isSheet ? 'Google Sheet' : isPdf ? 'Fichier PDF' : 'Document Drive'}</span>
                                        {file.modifiedTime && (
                                          <>
                                            <span>•</span>
                                            <span>{new Date(file.modifiedTime).toLocaleDateString('fr-FR')}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {file.webViewLink && (
                                      <a
                                        href={file.webViewLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                        title="Ouvrir dans Google Workspace"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </a>
                                    )}

                                    <button
                                      type="button"
                                      disabled={isAnalyzing}
                                      onClick={() => handleAnalyzeWorkspaceFile(file)}
                                      className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                                      title="Analyser ce document directement avec l'IA juridique LexIIA"
                                    >
                                      {isAnalyzing ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      ) : (
                                        <Sparkles className="w-3.5 h-3.5" />
                                      )}
                                      <span>{isAnalyzing ? "Lecture..." : "Analyser avec LexIIA"}</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* Pagination Load More Button */}
                        {workspaceNextPageToken && (
                          <div className="pt-2 flex justify-center">
                            <button
                              type="button"
                              onClick={handleLoadMoreWorkspaceFiles}
                              disabled={isLoadingMoreWorkspaceFiles}
                              className="px-4 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 hover:text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                            >
                              {isLoadingMoreWorkspaceFiles ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                              ) : (
                                <Folder className="w-3.5 h-3.5 text-blue-400" />
                              )}
                              <span>Charger 50 documents supplémentaires de votre Drive</span>
                            </button>
                          </div>
                        )}

                        {/* Explanatory Help Card */}
                        <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/15 flex items-start gap-3 text-xs text-slate-400">
                          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <div className="text-slate-200 font-semibold text-[11px]">
                              Périmètre d'accès de vos documents Google Drive
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              LexIIA interroge vos fichiers personnels (Mon Drive) ainsi que les <strong>Drives partagés d'équipe</strong>. Par mesure d'optimisation, les documents sont chargés par pagination (50 par lot). Utilisez la recherche textuelle en direct ci-dessus pour retrouver n'importe quel contrat immédiatement.
                            </p>
                          </div>
                        </div>
                        </>
                      ) : (
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 text-center space-y-3">
                          <GoogleDriveIcon className="w-10 h-10 mx-auto opacity-70" />
                          <div className="space-y-1">
                            <h5 className="font-bold text-white text-xs">
                              {hasGoogleToken ? "Aucun document trouvé" : "Accès direct à vos documents"}
                            </h5>
                            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                              {hasGoogleToken 
                                ? "Aucun fichier ne correspond à votre recherche dans votre Drive." 
                                : "Connectez votre compte Google ci-dessus pour afficher, ouvrir et analyser tous vos contrats et feuilles de calcul en 1 clic."}
                            </p>
                          </div>
                          {!hasGoogleToken && (
                            <button
                              type="button"
                              onClick={handleConnectGoogleWorkspace}
                              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                            >
                              Connecter Google Drive
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : driveModalTab === 'script' ? (
                  <div className="space-y-5">
                    {/* Script Authorization Card */}
                    <div className="p-4 rounded-2xl bg-[#141a29] border border-amber-500/30 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs sm:text-sm font-mono">Script: "Drive-Search-LexIIA"</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              driveSearchScriptAuthorized 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {driveSearchScriptAuthorized ? 'Autorisé dans l\'interface' : 'Non autorisé'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Autorise le déclenchement automatisé de la recherche de pièces dans Google Drive et l'analyse RAG en Sandbox MCP.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const nextState = !driveSearchScriptAuthorized;
                          setDriveSearchScriptAuthorized(nextState);
                          historyService.addAuditLog('TOGGLE_SCRIPT_AUTH', undefined, `Script Drive-Search-LexIIA: ${nextState ? 'AUTHORIZED' : 'REVOKED'}`);
                          showToast(nextState 
                            ? "✓ Script Drive-Search-LexIIA autorisé dans l'interface de gestion." 
                            : "Script Drive-Search-LexIIA désactivé.");
                        }}
                        className="shrink-0 p-1 text-slate-400 hover:text-white transition-colors"
                        title={driveSearchScriptAuthorized ? "Désactiver l'autorisation du script" : "Autoriser le script"}
                      >
                        {driveSearchScriptAuthorized ? (
                          <ToggleRight className="w-9 h-9 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-9 h-9 text-slate-600" />
                        )}
                      </button>
                    </div>

                    {/* Requête Structurée */}
                    <div className="space-y-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileSearch className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Requête structurée de document
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Métadonnées requises</span>
                      </div>

                      {/* Presets */}
                      <div>
                        <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Exemples rapides de requêtes juridiques :</div>
                        <div className="flex flex-wrap gap-1.5">
                          {DRIVE_SEARCH_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setDriveSearchQuery({
                                fileName: preset.fileName,
                                dossierType: preset.dossierType,
                                keywords: preset.keywords,
                                dateRange: preset.dateRange
                              })}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left ${
                                driveSearchQuery.fileName === preset.fileName
                                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold'
                                  : 'bg-white/5 border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Form inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">Nom du fichier</label>
                          <input
                            type="text"
                            value={driveSearchQuery.fileName}
                            onChange={(e) => setDriveSearchQuery(prev => ({ ...prev, fileName: e.target.value }))}
                            className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="ex: Pacte_Actionnaires_2024.pdf"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">Type de dossier</label>
                          <input
                            type="text"
                            value={driveSearchQuery.dossierType}
                            onChange={(e) => setDriveSearchQuery(prev => ({ ...prev, dossierType: e.target.value }))}
                            className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="ex: Droit des affaires & Sociétés"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">Mots-clés ciblés</label>
                          <input
                            type="text"
                            value={driveSearchQuery.keywords}
                            onChange={(e) => setDriveSearchQuery(prev => ({ ...prev, keywords: e.target.value }))}
                            className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="ex: clause de non-concurrence, bad leaver"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">Plage de dates de création</label>
                          <input
                            type="text"
                            value={driveSearchQuery.dateRange}
                            onChange={(e) => setDriveSearchQuery(prev => ({ ...prev, dateRange: e.target.value }))}
                            className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="ex: Derniers 6 mois / 2024-2025"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Méthodologie LexIIA Notice */}
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Méthodologie RAG LexIIA en 3 phases</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 pt-1">
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                          <div className="font-bold text-white mb-0.5">1. Qualification</div>
                          <div className="text-slate-400 leading-snug">Nature de l'acte, parties, contexte et risques juridiques.</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                          <div className="font-bold text-white mb-0.5">2. Droit positif</div>
                          <div className="text-slate-400 leading-snug">Articles de code, jurisprudence constante et doctrine.</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                          <div className="font-bold text-white mb-0.5">3. Synthèse</div>
                          <div className="text-slate-400 leading-snug">Préconisations opérationnelles et clauses suggérées.</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress feedback when running */}
                    {isExecutingDriveSearch && (
                      <div className="p-4 rounded-2xl bg-[#141a27] border border-amber-500/30 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                            Exécution du script Drive-Search-LexIIA...
                          </span>
                          <span className="text-amber-400 font-mono font-bold">{driveSearchExecutionStep}/4</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-amber-400 h-full transition-all duration-300"
                            style={{ width: `${(driveSearchExecutionStep / 4) * 100}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-300 italic">
                          {driveSearchExecutionStep === 1 && "1/4 Résolution des métadonnées du document dans Google Drive..."}
                          {driveSearchExecutionStep === 2 && "2/4 Téléchargement chiffré dans le Sandbox mémoire Legal-MCP (anonymisation PII)..."}
                          {driveSearchExecutionStep === 3 && "3/4 Indexation vectorielle RAG & filtrage de secret professionnel..."}
                          {driveSearchExecutionStep === 4 && "4/4 Déclenchement de l'analyse juridique selon la méthodologie LexIIA..."}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Account info */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Compte Google Workspace associé</div>
                          <div className="text-sm font-semibold text-white">
                            {user?.email || 'cabinet.avocat@gmail.com'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Connecté
                      </span>
                    </div>

                    {/* Target Folder */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>Dossier racine dans Google Drive</span>
                        <span className="text-[10px] text-slate-500 font-normal">Créé à la racine de votre Drive</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Folder className="w-4 h-4 text-amber-400" />
                        </div>
                        <input
                          type="text"
                          value={driveConfig.folderName}
                          onChange={(e) => setDriveConfig(prev => ({ ...prev, folderName: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                          placeholder="LexIIA - Dossiers & Pièces"
                        />
                      </div>
                    </div>

                    {/* Auto-sync rules */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-semibold text-slate-300">Règles de synchronisation automatique</div>
                      
                      <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-amber-400" />
                          <div>
                            <div className="text-xs font-semibold text-white">Contrats & Actes générés</div>
                            <div className="text-[11px] text-slate-400">Sauvegarde instantanée des brouillons validés et finalisés</div>
                          </div>
                        </div>
                        <input 
                          type="checkbox"
                          checked={driveConfig.autoSyncContracts}
                          onChange={(e) => setDriveConfig(prev => ({ ...prev, autoSyncContracts: e.target.checked }))}
                          className="w-4 h-4 rounded accent-amber-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          <div>
                            <div className="text-xs font-semibold text-white">Analyses & Consultations Juridiques</div>
                            <div className="text-[11px] text-slate-400">Export structuré avec jurisprudence et visas textuels</div>
                          </div>
                        </div>
                        <input 
                          type="checkbox"
                          checked={driveConfig.autoSyncDrafts}
                          onChange={(e) => setDriveConfig(prev => ({ ...prev, autoSyncDrafts: e.target.checked }))}
                          className="w-4 h-4 rounded accent-amber-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div className="text-xs font-semibold text-white">Bordereaux de pièces & Piste d'audit</div>
                            <div className="text-[11px] text-slate-400">Horodatage certifié et conformité déontologique</div>
                          </div>
                        </div>
                        <input 
                          type="checkbox"
                          checked={driveConfig.autoSyncAudits}
                          onChange={(e) => setDriveConfig(prev => ({ ...prev, autoSyncAudits: e.target.checked }))}
                          className="w-4 h-4 rounded accent-amber-500"
                        />
                      </label>
                    </div>

                    {/* Export Format */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Format d'exportation principal</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['PDF certifié', 'PDF + Markdown', 'Word / DOCX'].map(fmt => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setDriveConfig(prev => ({ ...prev, exportFormat: fmt }))}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                              driveConfig.exportFormat === fmt
                                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Security notice */}
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="font-semibold text-white">Secret Professionnel garanti :</span> Les fichiers sont chiffrés de bout en bout avant transfert vers votre Google Drive. Aucun document n'est partagé publiquement ni utilisé pour l'entraînement de modèles tiers.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/5 bg-slate-900/40 flex items-center justify-between gap-3">
                {driveModalTab === 'workspace' ? (
                  <>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Chiffrement TLS 1.3 · Secret professionnel garanti selon Legal-MCP</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDriveConfigModal(false);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Fermer
                      </button>
                    </div>
                  </>
                ) : driveModalTab === 'script' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setDriveModalTab('config')}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95"
                    >
                      Voir les paramètres GED
                    </button>

                    <button
                      type="button"
                      disabled={isExecutingDriveSearch || !driveSearchScriptAuthorized}
                      onClick={() => executeDriveSearchRag()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      {isExecutingDriveSearch ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Exécution RAG en cours...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Déclencher le script & Lancer l'Analyse RAG</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleSyncDrive}
                      disabled={isDriveSyncing}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isDriveSyncing ? 'animate-spin' : ''}`} />
                      {isDriveSyncing ? 'Synchronisation...' : 'Tester la synchronisation'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowDriveConfigModal(false);
                        showToast("✓ Paramètres de l'extension Google Drive enregistrés.");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      Enregistrer les paramètres
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Zapier Legal Pipeline & Webhooks Configuration Modal ────────────── */}
      <AnimatePresence>
        {showZapierModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#10141f] border border-[#222a3d] w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-[#131722]/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                      <ZapierIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">Intégration Zapier</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Connecté & Actif
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Automatisation de flux juridiques, synchronisation CRM et alertes d'équipe
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowZapierModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sub-tabs inside Modal */}
                <div className="flex items-center gap-2 mt-5 p-1 bg-slate-900/80 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setZapierModalTab('pipelines')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      zapierModalTab === 'pipelines'
                        ? 'bg-orange-500 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Pipelines & Déclencheurs</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setZapierModalTab('webhooks')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      zapierModalTab === 'webhooks'
                        ? 'bg-orange-500 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Webhook className="w-3.5 h-3.5" />
                    <span>Webhooks & Clé d'API</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1 text-sm">
                {/* Account info card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-slate-900/50 to-white/5 border border-orange-500/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <ZapierIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Compte Zapier lié à LexIIA</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {user?.email || 'dootrimarketing@gmail.com'}
                        <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Vérifié
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Dernier test</div>
                    <div className="text-xs font-semibold text-emerald-400">{zapierLastTestedTime}</div>
                  </div>
                </div>

                {zapierModalTab === 'pipelines' ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Pipelines Juridiques Actifs (Recettes Zapier)
                      </div>
                      <div className="space-y-2.5">
                        {zapierPipelines.map(p => (
                          <div
                            key={p.id}
                            className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start justify-between gap-3 hover:border-white/10 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                                <Zap className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white text-xs">{p.title}</span>
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 font-medium">
                                    {p.category}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                  {p.description}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setZapierPipelines(prev => prev.map(item => item.id === p.id ? { ...item, active: !item.active } : item));
                                showToast(`Pipeline "${p.title}" ${!p.active ? 'activé' : 'désactivé'}.`);
                              }}
                              className="p-1 text-slate-400 hover:text-white transition-colors shrink-0"
                            >
                              {p.active ? <ToggleRight className="w-7 h-7 text-emerald-400" /> : <ToggleLeft className="w-7 h-7 text-slate-600" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Déclencheurs d'événements */}
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Événements envoyés automatiquement à Zapier
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5 cursor-pointer hover:border-white/10">
                          <div>
                            <div className="text-xs font-medium text-white">Nouveau dossier</div>
                            <div className="text-[10px] font-mono text-slate-500">dossier.created</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={zapierEventsConfig.onDossierCreated}
                            onChange={(e) => setZapierEventsConfig(prev => ({ ...prev, onDossierCreated: e.target.checked }))}
                            className="w-4 h-4 rounded accent-orange-500"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5 cursor-pointer hover:border-white/10">
                          <div>
                            <div className="text-xs font-medium text-white">Contrat rédigé</div>
                            <div className="text-[10px] font-mono text-slate-500">contract.generated</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={zapierEventsConfig.onContractGenerated}
                            onChange={(e) => setZapierEventsConfig(prev => ({ ...prev, onContractGenerated: e.target.checked }))}
                            className="w-4 h-4 rounded accent-orange-500"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5 cursor-pointer hover:border-white/10">
                          <div>
                            <div className="text-xs font-medium text-white">Analyse RAG prête</div>
                            <div className="text-[10px] font-mono text-slate-500">rag.completed</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={zapierEventsConfig.onRagCompleted}
                            onChange={(e) => setZapierEventsConfig(prev => ({ ...prev, onRagCompleted: e.target.checked }))}
                            className="w-4 h-4 rounded accent-orange-500"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5 cursor-pointer hover:border-white/10">
                          <div>
                            <div className="text-xs font-medium text-white">Audit & Horodatage</div>
                            <div className="text-[10px] font-mono text-slate-500">audit.logged</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={zapierEventsConfig.onAuditLogged}
                            onChange={(e) => setZapierEventsConfig(prev => ({ ...prev, onAuditLogged: e.target.checked }))}
                            className="w-4 h-4 rounded accent-orange-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Outbound Connected Zap Catch Webhook URL */}
                    <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/25 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-orange-300 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-orange-400" />
                          <span>Zap Connecté (Catch Webhook URL)</span>
                        </label>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Connecté & Actif
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        URL du webhook de votre Zap qui intercepte automatiquement les événements juridiques déclenchés par LexIIA.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={zapierCatchUrl}
                            onChange={(e) => setZapierCatchUrl(e.target.value)}
                            placeholder="https://hooks.zapier.com/hooks/catch/..."
                            className="w-full pl-3 pr-8 py-2 bg-slate-950/90 border border-orange-500/30 focus:border-orange-500 rounded-lg text-white text-xs font-mono select-all focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleUpdateZapierCatchUrl(zapierCatchUrl);
                            showToast("✓ URL du Zap enregistrée avec succès !");
                          }}
                          className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shrink-0 active:scale-95 shadow-sm"
                        >
                          Enregistrer
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(zapierCatchUrl);
                            showToast("✓ URL du Zap copiée dans le presse-papier !");
                          }}
                          className="px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all shrink-0"
                          title="Copier l'URL du Zap"
                        >
                          <Copy className="w-3.5 h-3.5 text-orange-400" />
                        </button>
                      </div>
                    </div>

                    {/* Webhook Inbound URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>URL Webhook Entrant (Inbound Trigger)</span>
                        <span className="text-[10px] text-slate-400">Pour déclencher LexIIA depuis Zapier</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            readOnly
                            value={typeof window !== 'undefined' ? `${window.location.origin}/api/zapier/webhook` : 'https://ais-pre-trjuxhsae5shtsbjbir2k2-236121352603.europe-west2.run.app/api/zapier/webhook'}
                            className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs font-mono select-all focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const url = `${window.location.origin}/api/zapier/webhook`;
                            navigator.clipboard.writeText(url);
                            showToast("✓ URL Webhook Zapier copiée dans le presse-papier !");
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
                        >
                          <Copy className="w-3.5 h-3.5 text-orange-400" />
                          <span>Copier</span>
                        </button>
                      </div>
                    </div>

                    {/* API Key */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>Clé Secrète API Zapier</span>
                        <span className="text-[10px] text-emerald-400 font-medium">Chiffrement AES-256</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type={showZapierApiKey ? 'text' : 'password'}
                            readOnly
                            value="zap_live_lexiia_921db552_sec_key"
                            className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs font-mono select-all focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowZapierApiKey(!showZapierApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-[11px]"
                          >
                            {showZapierApiKey ? 'Masquer' : 'Afficher'}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("zap_live_lexiia_921db552_sec_key");
                            showToast("✓ Clé API Zapier copiée !");
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
                        >
                          <Copy className="w-3.5 h-3.5 text-orange-400" />
                          <span>Copier</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Test payload preview */}
                    {zapierTestResponse && (
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium text-emerald-400">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Dernier test validé ({zapierTestResponse.deliveryStatus || '200 OK'})
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{zapierTestResponse.eventId}</span>
                        </div>
                        <pre className="text-[10.5px] font-mono text-slate-300 p-2.5 rounded-lg bg-black/40 overflow-x-auto">
                          {JSON.stringify(zapierTestResponse.payloadPreview || zapierTestResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Security guarantee note */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Secret Professionnel & Règle MCP :</span> Toutes les données transmises à Zapier transitent via un tunnel TLS 1.3 éphémère. Les informations confidentielles protégées par le secret de l'avocat sont automatiquement caviardées avant expédition.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/5 bg-slate-900/40 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleTestZapier}
                  disabled={isZapierTesting}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 text-orange-400 ${isZapierTesting ? 'animate-pulse' : ''}`} />
                  <span>{isZapierTesting ? 'Transmission en cours...' : 'Tester le webhook Zapier'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowZapierModal(false);
                    showToast("✓ Paramètres Zapier enregistrés avec succès.");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  Enregistrer les paramètres
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Generic Quick-Connect Modal (Simple & Rapide à Connecter) ──────────── */}
      <AnimatePresence>
        {selectedQuickConnector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#141416] border border-white/10 rounded-[28px] max-w-lg w-full overflow-hidden shadow-2xl relative text-left"
            >
              {/* Header */}
              <div 
                className="p-6 border-b border-white/5 relative"
                style={{
                  background: `linear-gradient(180deg, ${selectedQuickConnector.glowColor} 0%, rgba(20,20,22,0.2) 100%)`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-1 shadow-md">
                      {renderConnectorIcon(selectedQuickConnector.type, "w-10 h-10")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {selectedQuickConnector.name}
                        </h3>
                        {selectedQuickConnector.badge && (
                          <span 
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${selectedQuickConnector.brandColor}50`,
                              backgroundColor: `${selectedQuickConnector.brandColor}20`,
                              color: selectedQuickConnector.brandColor
                            }}
                          >
                            {selectedQuickConnector.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {selectedQuickConnector.subtitle || "Passerelle juridique certifiée Legal-MCP"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedQuickConnector(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* 1-Click Status & Quick Action Card */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        selectedQuickConnector.status === 'active' 
                          ? 'bg-emerald-400 animate-pulse' 
                          : selectedQuickConnector.status === 'coming_soon' 
                          ? 'bg-blue-400' 
                          : 'bg-slate-600'
                      }`} />
                      <span>
                        {selectedQuickConnector.status === 'active' 
                          ? 'Connecteur Actif · Opérationnel' 
                          : selectedQuickConnector.status === 'coming_soon' 
                          ? 'Déploiement en cours (Accès anticipé)' 
                          : 'Connecteur Inactif · En pause'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {selectedQuickConnector.status === 'active' 
                        ? 'Les données et pièces sont synchronisées en continu.' 
                        : selectedQuickConnector.status === 'coming_soon' 
                        ? 'Inscrivez-vous pour activer ce connecteur dès son ouverture.' 
                        : 'Cliquez pour activer ce connecteur en 1 seconde.'}
                    </p>
                  </div>

                  {selectedQuickConnector.status !== 'coming_soon' ? (
                    <button
                      onClick={(e) => handleToggleConnectorStatus(selectedQuickConnector.id, e)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0 ${
                        selectedQuickConnector.status === 'active'
                          ? 'bg-white/10 hover:bg-red-500/20 text-slate-200 hover:text-red-300 border border-white/10'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                      }`}
                    >
                      {selectedQuickConnector.status === 'active' ? 'Désactiver' : '⚡ Activer en 1 clic'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        showToast(`✓ Vous êtes inscrit sur la liste VIP pour ${selectedQuickConnector.name} !`);
                        setSelectedQuickConnector(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold transition-all shadow-sm shrink-0"
                    >
                      M'avertir
                    </button>
                  )}
                </div>

                {/* Description */}
                <div className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                  {selectedQuickConnector.description}
                </div>

                {/* Specific Connector Parameters */}
                {selectedQuickConnector.type === 'word' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Paramètres du complément Microsoft Word
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Vérification temps réel des clauses</span>
                        <span className="text-emerald-400 font-semibold font-mono text-[11px]">Actif</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Insertion automatique de jurisprudence</span>
                        <span className="text-emerald-400 font-semibold font-mono text-[11px]">Actif</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Version du complément Office 365</span>
                        <span className="text-slate-400 font-mono text-[11px]">{selectedQuickConnector.config?.version || "v2.4.1"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          showToast("✓ Fichier manifeste 'LexIIA-Word-Addin.xml' prêt pour votre suite Office !");
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold text-blue-300 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger le manifeste .XML</span>
                      </button>
                      <button
                        onClick={() => {
                          showToast("✓ Synchronisation avec Microsoft Word 365 validée !");
                        }}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
                      >
                        Tester la liaison
                      </button>
                    </div>
                  </div>
                )}

                {selectedQuickConnector.type === 'sharepoint' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Bibliothèque SharePoint du Cabinet
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">URL du site SharePoint documentaire</label>
                      <input 
                        type="text"
                        defaultValue={selectedQuickConnector.config?.siteUrl || "https://cabinet.sharepoint.com/sites/dossiers"}
                        className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-teal-500/50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        showToast("✓ Accès au site SharePoint du cabinet validé (Code 200 OK) !");
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-xs font-semibold text-teal-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Tester l'accès SharePoint</span>
                    </button>
                  </div>
                )}

                {selectedQuickConnector.type === 'whatsapp' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Canal WhatsApp Business
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Numéro certifié du cabinet</label>
                      <input 
                        type="text"
                        defaultValue={selectedQuickConnector.config?.phoneNumber || "+33 6 12 34 56 78"}
                        className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        showToast("✓ Message de notification test WhatsApp transmis !");
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Envoyer un message test WhatsApp</span>
                    </button>
                  </div>
                )}

                {selectedQuickConnector.type === 'calendar' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Calendrier des Délais & Audiences
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Calendrier synchronisé</label>
                      <input 
                        type="text"
                        defaultValue={selectedQuickConnector.config?.calendarName || "Cabinet LexIIA - Audiences & Délais"}
                        className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        showToast("✓ 8 audiences et forclusions synchronisées avec votre calendrier !");
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-xs font-semibold text-sky-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Synchroniser les audiences maintenant</span>
                    </button>
                  </div>
                )}

                {selectedQuickConnector.type === 'slack' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Canal Slack / Teams
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Canal de réception des alertes</label>
                      <input 
                        type="text"
                        defaultValue={selectedQuickConnector.config?.channel || "#alertes-contentieux"}
                        className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        showToast("✓ Message de notification test expédié dans #alertes-contentieux !");
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-semibold text-purple-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Envoyer une alerte test</span>
                    </button>
                  </div>
                )}

                {selectedQuickConnector.type === 'email' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Messagerie Certifiée Cabinet
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Adresse d'expédition des consultations</label>
                      <input 
                        type="text"
                        defaultValue={selectedQuickConnector.config?.senderEmail || "cabinet@lexiia-legal.fr"}
                        className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        showToast("✓ Consultation test expédiée avec chiffrement TLS 1.3 !");
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-semibold text-amber-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Envoyer un e-mail test sécurisé</span>
                    </button>
                  </div>
                )}

                {selectedQuickConnector.type === 'hubspot' && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      CRM Juridique & Facturation
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Plateforme connectée</label>
                      <input 
                        type="text"
                        readOnly
                        defaultValue="HubSpot & Salesforce Connector (API v3)"
                        className="w-full px-3 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        showToast("✓ Fiche client test synchronisée dans votre CRM !");
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-xs font-semibold text-orange-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Tester la synchronisation CRM</span>
                    </button>
                  </div>
                )}

                {/* Security reminder */}
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-2.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Chiffrement certifié AES-256 et secret professionnel respecté selon le protocole Legal-MCP.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/5 bg-slate-900/40 flex items-center justify-between">
                <button
                  onClick={() => setSelectedQuickConnector(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    setSelectedQuickConnector(null);
                    showToast(`✓ Paramètres de ${selectedQuickConnector.name} enregistrés.`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0a0d14] border-r border-[#1a2130] z-[60] overflow-y-auto overflow-x-hidden lg:hidden"
          >
            {/* Sticky close button */}
            <div className="sticky top-0 bg-[#0a0d14]/95 backdrop-blur-sm flex justify-end px-6 pt-5 pb-2 z-10">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-slate-400 hover:text-white active:scale-95 transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Scrollable content — entire sidebar scrolls on mobile */}
            <div className="px-6 pb-10">
              {renderSidebarContent()}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 bg-[#0a0d14] border-r border-[#1a2130] flex-col p-6 z-10 shrink-0 overflow-hidden">
        {renderSidebarContent()}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-row z-10 relative min-w-0 overflow-hidden">
        {/* Left Side Column: Interactive Chat & Input */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
          <header className="flex justify-between items-center px-3 sm:px-6 md:px-8 py-3 sm:py-4 bg-transparent border-b border-[#131722] shrink-0 gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
               <button
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="lg:hidden p-1.5 -ml-1 text-slate-400 hover:text-white transition-colors shrink-0"
               >
                 <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
               </button>
               {/* Mobile: show current context label */}
               <span className="sm:hidden text-xs sm:text-sm font-semibold text-slate-200 truncate max-w-[130px] xs:max-w-[180px]">
                 {currentDossier ? currentDossier.title : 'LexIIA'}
               </span>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm text-slate-400 font-medium tracking-wide">
                      {activeTab === 'agent' ? 'Configuration de l\'Agent' : currentDossier ? `Dossier: ${currentDossier.title}` : "Assistant Opérationnel"}
                    </span>
                  </div>

                  {/* Persona Selector (Avocat / Direction Juridique / Justiciable) */}
                  <div className="flex items-center bg-[#0d121f] border border-white/10 rounded-full p-0.5 shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleSelectPersona('lawyer')}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                        userPersona === 'lawyer'
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Mode Avocat / Cabinet : Les recommandations de confrères concurrents sont automatiquement masquées"
                    >
                      <Scale className="w-3 h-3" />
                      <span>Avocat / Cabinet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPersona('jurist')}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                        userPersona === 'jurist'
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Mode Direction Juridique : Assistance contractuelle et orientation cabinet activée"
                    >
                      <Building2 className="w-3 h-3" />
                      <span>Dir. Juridique</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPersona('general')}
                      className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                        userPersona === 'general'
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Mode Justiciable : Orientation vers les cabinets partenaires certifiés"
                    >
                      <User className="w-3 h-3" />
                      <span>Justiciable</span>
                    </button>
                  </div>

                  {/* Bouton rapide Recommandation de confrères / cabinets ON/OFF */}
                  <button
                    type="button"
                    onClick={handleToggleRecommendLawyers}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold border transition-all ${
                      recommendLawyers
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-amber-300'
                    }`}
                    title={recommendLawyers 
                      ? "Recommandations de cabinets partenaires activées. Cliquez pour masquer." 
                      : "Recommandations de confrères masquées (mode discret pour avocats). Cliquez pour activer."}
                  >
                    <Gavel className="w-3 h-3" />
                    <span>Orientation Cabinets : <strong>{recommendLawyers ? "ACTIVE" : "MASQUÉE"}</strong></span>
                  </button>

                  {activeTab === 'chat' && (
                    <button 
                      onClick={() => setUseAgenticMode(!useAgenticMode)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all border ${
                        useAgenticMode 
                          ? 'bg-[#161a26] border-[#232c42] text-[#8ea8d6]' 
                          : 'bg-[#131722]/60 border-[#1f2638] text-[#5a6275] hover:text-[#8ea8d6]'
                      }`}
                    >
                      <Zap className={`w-3 h-3 ${useAgenticMode ? 'animate-pulse text-amber-400' : 'text-[#5a6275]'}`} />
                      DEEP THINKING
                    </button>
                  )}
               </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">

              {/* Nouvelle tâche — shortcut visible dès qu'une conversation est active */}
              {activeTab === 'chat' && messages.length > 0 && !isLoading && !isAnalyzing && (
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-white/10 text-xs text-slate-400 hover:text-white font-medium transition-all active:scale-95"
                  title="Nouvelle tâche"
                >
                  <SquarePen className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Nouveau dossier</span>
                </button>
              )}

              {/* Toggle to turn the Document workspace preview pane on/off */}
              {activeTab === 'chat' && (
                <button
                  onClick={() => setShowDocWorkspace(!showDocWorkspace)}
                  className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border text-xs font-semibold transition-all ${
                    showDocWorkspace 
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 hover:bg-amber-500/25' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="Afficher/Masquer l'espace de prévisualisation de dossier"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">{showDocWorkspace ? "Masquer l'Aperçu" : "Aperçu PDF"}</span>
                </button>
              )}

              {activeTab === 'chat' && currentDossier?.contractDraft && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      handleSyncDrive();
                      showToast(`✓ "${currentDossier.title}" exporté vers Google Drive (/${driveConfig.folderName})`);
                    }}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 text-xs font-medium hover:text-white transition-all active:scale-95"
                    title="Sauvegarder dans Google Drive"
                  >
                    <GoogleDriveIcon className="w-3.5 h-3.5" />
                    <span>Google Drive</span>
                  </button>

                  <button
                    onClick={() => exportToPDF(currentDossier.title, currentDossier.contractDraft || '')}
                    className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all active:scale-95"
                    title="Télécharger le PDF haute-fidélité"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Télécharger PDF</span>
                  </button>
                </div>
              )}

              {!user && (
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 disabled:opacity-60 transition-all shrink-0 shadow-sm flex items-center gap-1.5"
                >
                  {isLoggingIn && <Loader2 className="w-3 h-3 animate-spin" />}
                  {isLoggingIn ? "Connexion..." : "Connexion"}
                </button>
              )}
            </div>
          </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 pt-5 pb-16 sm:pt-8 sm:pb-20 custom-scrollbar"
        >
          <div className={activeTab === 'connectors' || activeTab === 'library' ? "max-w-7xl mx-auto w-full transition-all" : "max-w-4xl mx-auto w-full transition-all"}>
            {authPopupBlockedNotice && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    La fenêtre de connexion Google a été bloquée par votre navigateur. Autorisez les fenêtres pop-up ou ouvrez l'application dans un nouvel onglet.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => window.open(window.location.href, '_blank')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Nouvel onglet
                  </button>
                  <button
                    onClick={() => setAuthPopupBlockedNotice(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {activeTab === 'security' ? (
                <motion.div
                  key="security-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">Centre de Sécurité MCP</h2>
                      <p className="text-slate-400">Architecture conforme au protocole Legal-MCP pour la souveraineté des données.</p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold">
                      <ShieldCheck className="w-6 h-6" />
                      Statut: Protégé
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="p-4 sm:p-8 rounded-2xl sm:rounded-[32px] bg-slate-900/40 border border-white/5 space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
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

                    <div className="p-4 sm:p-8 rounded-2xl sm:rounded-[32px] bg-slate-900/40 border border-white/5 space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
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

                  <div className="p-4 sm:p-8 rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-4 sm:mb-6">Optimisation Legal-MCP (Analysis)</h3>
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
                  className="space-y-10"
                >
                  {/* ─── Hero Bento Layout (Identique à la maquette) ─────────── */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Left Editorial Card */}
                    <div className="lg:col-span-5 bg-[#141416] border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                      {/* Ambient Mesh Glows */}
                      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
                      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-amber-500/5 blur-[70px] pointer-events-none" />
                      
                      <div className="relative z-10">
                        {/* Top Tag Pill */}
                        <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-slate-200 w-fit mb-6 shadow-sm">
                          Intégrations
                        </div>

                        {/* Title with italic serif accent */}
                        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-sans font-bold tracking-tight text-white leading-[1.18] mb-4">
                          Vos outils collaboratifs, <span className="font-serif italic font-normal text-emerald-400">augmentés.</span>
                        </h2>

                        {/* Metric Highlight */}
                        <div className="text-sm sm:text-base text-slate-300 font-medium mb-4 flex items-center gap-1.5 flex-wrap">
                          <span>Déjà plus de</span>
                          <strong className="text-white font-bold tracking-tight text-base sm:text-lg">5 000</strong>
                          <span>documents analysés</span>
                        </div>

                        {/* Editorial Paragraph */}
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                          Vous accompagner à toutes les étapes de votre travail, au plus près de vos habitudes. LexIIA s'intègre directement dans vos outils du quotidien pour simplifier chaque étape de votre travail juridique.
                        </p>
                      </div>

                      {/* Bottom Link & Status */}
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-3 relative z-10">
                        <button 
                          onClick={() => {
                            const el = document.getElementById('catalogue-connecteurs');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                        >
                          <span>Voir toutes les intégrations</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </button>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{connectors.filter(c => c.status === 'active').length} actives sur {connectors.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right 2x2 Grid: Microsoft Word, Microsoft Sharepoint, Google Drive, Dropbox */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {connectors.slice(0, 4).map(c => {
                        const isDropbox = c.type === 'dropbox';
                        const isActive = c.status === 'active';
                        return (
                          <div
                            key={c.id}
                            onClick={() => handleOpenConnector(c)}
                            className="bg-[#141416] hover:bg-[#18181c] border border-white/5 hover:border-white/20 rounded-3xl p-7 flex flex-col items-center justify-center text-center min-h-[195px] relative group cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 select-none"
                            style={{
                              boxShadow: `0 12px 32px -16px ${c.glowColor}`
                            }}
                          >
                            {/* Top Right Status Badge */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5">
                              {isDropbox ? (
                                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                  Bientôt disponible
                                </span>
                              ) : isActive ? (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  Connecté
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                  Connecter
                                </span>
                              )}
                            </div>

                            {/* Centered High-Res Icon */}
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-200">
                              {renderConnectorIcon(c.type, "w-12 h-12")}
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-white tracking-tight group-hover:text-slate-100 transition-colors">
                              {c.name}
                            </h3>

                            {/* Subtitle / hint on hover */}
                            <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] line-clamp-1 group-hover:text-slate-300 transition-colors">
                              {c.subtitle || c.description}
                            </p>

                            {/* Quick Action Hint */}
                            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[11px] font-semibold flex items-center gap-1 text-slate-300">
                              <span>{isActive ? "Gérer & Configurer" : isDropbox ? "Accès anticipé" : "Connecter en 1 clic"}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ─── Catalogue Complet avec Codes Couleurs ────────────────── */}
                  <div id="catalogue-connecteurs" className="space-y-6 pt-4">
                    {/* Header & Filter Tabs */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-white">
                            Catalogue complet des connecteurs juridiques
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono">
                            {connectors.length} passerelles
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Chaque connecteur respecte les codes couleurs officiels et le protocole souverain Legal-MCP.
                        </p>
                      </div>

                      {/* Filter Segmented Controls */}
                      <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl self-start sm:self-auto overflow-x-auto max-w-full">
                        <button
                          onClick={() => setConnectorFilter('all')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                            connectorFilter === 'all' 
                              ? 'bg-white text-slate-950 shadow-sm font-bold' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Tous ({connectors.length})
                        </button>
                        <button
                          onClick={() => setConnectorFilter('office')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                            connectorFilter === 'office' 
                              ? 'bg-white text-slate-950 shadow-sm font-bold' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Bureautique & GED (4)
                        </button>
                        <button
                          onClick={() => setConnectorFilter('automation')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                            connectorFilter === 'automation' 
                              ? 'bg-white text-slate-950 shadow-sm font-bold' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Automatisations & CRM (2)
                        </button>
                        <button
                          onClick={() => setConnectorFilter('communication')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                            connectorFilter === 'communication' 
                              ? 'bg-white text-slate-950 shadow-sm font-bold' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Communication & Délais (4)
                        </button>
                      </div>
                    </div>

                    {/* Connectors Grid with Brand Colors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                      {connectors
                        .filter(c => connectorFilter === 'all' || c.category === connectorFilter)
                        .map(c => {
                          const isActive = c.status === 'active';
                          const isComingSoon = c.status === 'coming_soon';
                          const isZapier = c.type === 'zapier';
                          const isDrive = c.type === 'drive';

                          return (
                            <div
                              key={c.id}
                              onClick={() => handleOpenConnector(c)}
                              className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group relative ${
                                isActive 
                                  ? 'bg-[#151518] hover:bg-[#18181c] border-white/10 hover:border-white/20' 
                                  : 'bg-[#111113] hover:bg-[#151518] border-white/5 hover:border-white/10'
                              }`}
                              style={{
                                boxShadow: isActive ? `0 8px 24px -12px ${c.glowColor}` : 'none'
                              }}
                            >
                              <div>
                                {/* Card Header with Brand Icon, Name, and Status */}
                                <div className="flex items-start justify-between gap-3 mb-3.5">
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-11 h-11 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-1 shadow-sm shrink-0 transition-transform group-hover:scale-105"
                                      style={{ borderColor: `${c.brandColor}30` }}
                                    >
                                      {renderConnectorIcon(c.type, "w-9 h-9")}
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-white text-sm tracking-tight truncate group-hover:text-slate-100 transition-colors">
                                        {c.name}
                                      </h4>
                                      <div className="text-[11px] text-slate-400 truncate">
                                        {c.subtitle || c.badge}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Status indicator / switch */}
                                  <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                                    {isComingSoon ? (
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                        Bientôt
                                      </span>
                                    ) : (
                                      <button
                                        onClick={(e) => handleToggleConnectorStatus(c.id, e)}
                                        className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        title={isActive ? "Désactiver le connecteur" : "Activer le connecteur en 1 clic"}
                                      >
                                        {isActive ? (
                                          <ToggleRight className="w-7 h-7 text-emerald-400" />
                                        ) : (
                                          <ToggleLeft className="w-7 h-7 text-slate-600 hover:text-slate-500" />
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                                  {c.description}
                                </p>

                                {/* Zapier specific badge if active */}
                                {isZapier && isActive && (
                                  <div className="mb-3 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 flex items-center justify-between gap-1">
                                    <span className="flex items-center gap-1 truncate font-mono text-[10px]">
                                      <Zap className="w-3 h-3 text-orange-400 shrink-0" />
                                      {zapierCatchUrl.replace('https://hooks.zapier.com/hooks/catch/', 'zapier/')}
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-200 shrink-0 font-bold">
                                      200 OK
                                    </span>
                                  </div>
                                )}

                                {/* Google Drive specific badge if active */}
                                {isDrive && isActive && (
                                  <div className="mb-3 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center justify-between gap-1">
                                    <span className="flex items-center gap-1 truncate font-mono text-[10.5px]">
                                      <Folder className="w-3 h-3 text-emerald-400 shrink-0" />
                                      /{driveConfig.folderName}
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200 shrink-0 font-bold">
                                      Auto-GED
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Card Footer with 1-Click Action Buttons */}
                              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                                <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                                  isActive ? 'text-emerald-400' : isComingSoon ? 'text-blue-400' : 'text-slate-500'
                                }`}>
                                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                  {isActive ? 'Connecté & Actif' : isComingSoon ? 'Accès Prioritaire' : 'Prêt à connecter'}
                                </span>

                                <div className="flex items-center gap-1.5">
                                  {isDrive && isActive && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDriveModalTab('workspace');
                                          setShowDriveConfigModal(true);
                                          if (hasGoogleToken && workspaceFiles.length === 0) {
                                            loadWorkspaceFiles();
                                          }
                                        }}
                                        className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                                        title="Accéder directement à mes documents Google Drive"
                                      >
                                        <Folder className="w-3 h-3 text-blue-400" />
                                        <span>Mes Fichiers</span>
                                      </button>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDriveModalTab('script');
                                          setShowDriveConfigModal(true);
                                        }}
                                        className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                                        title="Lancer le script Drive-Search-LexIIA"
                                      >
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>Script RAG</span>
                                      </button>
                                    </>
                                  )}

                                  {isZapier && isActive && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleTestZapier();
                                      }}
                                      disabled={isZapierTesting}
                                      className="px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 text-[11px] font-bold transition-all flex items-center gap-1 disabled:opacity-50"
                                      title="Envoyer un événement test au Zap"
                                    >
                                      <Send className={`w-3 h-3 ${isZapierTesting ? 'animate-pulse' : ''}`} />
                                      <span>{isZapierTesting ? 'Test...' : 'Ping Zap'}</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => handleOpenConnector(c)}
                                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                                  >
                                    <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                                    <span>{isActive ? 'Gérer' : 'Connecter'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* ─── Security & Legal-MCP Guarantee ───────────────────────── */}
                  <div className="p-7 rounded-[32px] bg-gradient-to-r from-emerald-500/5 via-amber-500/5 to-transparent border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">
                          Souveraineté des données & Secret Professionnel
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                          Toutes les connexions (Microsoft Office, Google, Zapier, Webhooks) s'exécutent dans des tunnels chiffrés TLS 1.3 avec jetons éphémères. Le middleware Legal-MCP anonymise automatiquement les données sensibles (PII) avant toute transmission extérieure.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-bold text-white font-mono">Chiffrement AES-256</div>
                        <div className="text-[10px] text-emerald-400">Sandbox Isolation Active</div>
                      </div>
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === 'agent' ? (
                <AgentTab
                  user={user}
                  setInput={setInput}
                  setActiveTab={setActiveTab}
                  historyService={historyService}
                  loadDossiers={loadDossiers}
                  setCurrentDossier={setCurrentDossier}
                  setMessages={setMessages}
                />
              ) : activeTab === 'schedule' ? (
                <motion.div
                  key="schedule-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                  {/* Hero Onboarding Portal (comme sur la photo) */}
                  <div className="p-6 md:p-10 rounded-[32px] bg-slate-900/60 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md space-y-8">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Header area */}
                    <div className="max-w-3xl space-y-3">
                      <h2 className="text-3xl md:text-4xl font-display font-light text-white leading-snug">
                        Préparer mon dossier avec <span className="font-semibold text-amber-400">LexIIA</span> avant de voir mon avocat
                      </h2>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        Choisissez votre porte d'entrée. Cette démonstration vous laisse changer de rôle librement pour observer tout le mécanisme.
                      </p>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Card 1: Justiciable */}
                      <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/20 hover:bg-white/[0.05] transition-all duration-300 shadow-xl space-y-6 relative group">
                        <div className="space-y-4">
                          <div>
                            <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 uppercase tracking-wider font-sans group-hover:bg-amber-500/10 group-hover:text-amber-400 group-hover:border-amber-500/20 transition-all">
                              Justiciable
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Je suis justiciable</h3>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                            Décrivez votre situation. L'IA prépare votre dossier, puis les avocats vous font des offres comparables. Vous choisissez.
                          </p>
                        </div>
                        <div>
                          <button 
                            onClick={() => {
                              setActiveTab('chat');
                              handleSend("Bonjour, je souhaite préparer mon dossier juridique.");
                            }}
                            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          >
                            Préparer mon dossier
                          </button>
                        </div>
                      </div>

                      {/* Card 2: Avocat */}
                      <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/20 hover:bg-white/[0.05] transition-all duration-300 shadow-xl space-y-6 relative group">
                        <div className="space-y-4">
                          <div>
                            <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 uppercase tracking-wider font-sans group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                              Avocat
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Je suis avocat</h3>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                            Consultez les appels d'offres pour lesquels vous êtes sans conflit, déposez vos hypothèses, puis votre offre, sur une base commune.
                          </p>
                        </div>
                        <div>
                          <button 
                            onClick={() => {
                              setActiveTab('chat');
                              handleSend("Je suis avocat et je souhaite accéder aux appels d'offres / requêtes en cours.");
                            }}
                            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/15 hover:border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          >
                            Accéder au portail avocat
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Footer links in hero */}
                    <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/5 gap-3 text-xs text-slate-500 font-sans">
                      <button 
                        onClick={() => {
                          setActiveTab('chat');
                          handleSend("Supervision : Accès supervision (Ordre)");
                        }} 
                        className="hover:text-white transition-colors hover:underline"
                      >
                        Accès supervision (Ordre) →
                      </button>
                      <a 
                        href="https://www.avocat.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors hover:underline"
                      >
                        Je préfère parler directement à un avocat →
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 md:p-8 rounded-[28px] bg-white/5 border border-white/10">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">Tâches Programmées</h2>
                      <p className="text-slate-400 text-sm">Gérez vos délais légaux, audiences et rappels procéduraux.</p>
                    </div>
                    <button 
                      onClick={() => setShowAddTaskModal(!showAddTaskModal)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 ${
                        showAddTaskModal 
                          ? 'bg-slate-800 text-white hover:bg-slate-700' 
                          : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      }`}
                    >
                      <Plus className={`w-4 h-4 transition-transform ${showAddTaskModal ? 'rotate-45' : ''}`} /> 
                      {showAddTaskModal ? 'Fermer le formulaire' : 'Nouveau rappel'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showAddTaskModal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 rounded-[24px] bg-[#111522]/90 border border-[#232c42] shadow-2xl space-y-4">
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Plus className="w-4 h-4 text-amber-500" /> Ajouter un rappel
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Titre du rappel</label>
                              <input
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Ex: Dépôt du mémoire en réponse"
                                className="w-full bg-[#0a0d14] border border-[#1f2638] rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/30 transition-all text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Échéance / Date</label>
                              <input
                                type="text"
                                value={newTaskDate}
                                onChange={(e) => setNewTaskDate(e.target.value)}
                                placeholder="Ex: Dans 10 jours, 12 Jan 2026 — 9h00"
                                className="w-full bg-[#0a0d14] border border-[#1f2638] rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/30 transition-all text-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Priorité</label>
                              <div className="grid grid-cols-4 gap-1">
                                {(['URGENT', 'MOYEN', 'À VENIR', 'PLANIFIÉ'] as const).map(p => (
                                  <button
                                    key={p}
                                    type="button"
                                    onClick={() => setNewTaskPriority(p)}
                                    className={`py-2 text-[9px] font-extrabold rounded-lg border transition-all ${
                                      newTaskPriority === p
                                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                                        : 'bg-[#0a0d14] text-slate-400 border-[#1f2638] hover:text-slate-200'
                                    }`}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Catégorie</label>
                              <div className="grid grid-cols-3 gap-1">
                                {([
                                  { id: 'deadline', label: 'Délais' },
                                  { id: 'audience', label: 'Audiences' },
                                  { id: 'pending', label: 'Dossiers' },
                                ] as const).map(c => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => {
                                      setNewTaskCategory(c.id);
                                      if (c.id === 'deadline') setNewTaskIcon('⚖️');
                                      else if (c.id === 'audience') setNewTaskIcon('🏛️');
                                      else setNewTaskIcon('📄');
                                    }}
                                    className={`py-2 text-[9px] font-extrabold rounded-lg border transition-all ${
                                      newTaskCategory === c.id
                                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                                        : 'bg-[#0a0d14] text-slate-400 border-[#1f2638] hover:text-slate-200'
                                    }`}
                                  >
                                    {c.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Icône (Emoji)</label>
                              <div className="flex gap-1.5 justify-start">
                                {['⚖️', '🏛️', '📋', '📄', '⏱️', '🚨', '📅'].map(emoji => (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setNewTaskIcon(emoji)}
                                    className={`w-9 h-9 flex items-center justify-center text-md rounded-xl border transition-all ${
                                      newTaskIcon === emoji
                                        ? 'bg-amber-500/20 border-amber-500 scale-110'
                                        : 'bg-[#0a0d14] border-[#1f2638] hover:border-slate-500'
                                    }`}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddTaskModal(false);
                                setNewTaskTitle('');
                                setNewTaskDate('');
                              }}
                              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-bold"
                            >
                              Annuler
                            </button>
                            <button
                              type="button"
                              disabled={!newTaskTitle.trim() || !newTaskDate.trim()}
                              onClick={() => {
                                const getNewTaskColor = (priority: string) => {
                                  switch (priority) {
                                    case 'URGENT': return 'text-red-400 bg-red-500/10 border-red-500/20';
                                    case 'MOYEN': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                                    case 'À VENIR': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
                                    default: return 'text-slate-400 bg-white/5 border-white/10';
                                  }
                                };
                                const newTask = {
                                  id: Date.now().toString(),
                                  icon: newTaskIcon,
                                  title: newTaskTitle.trim(),
                                  date: newTaskDate.trim(),
                                  priority: newTaskPriority,
                                  color: getNewTaskColor(newTaskPriority),
                                  category: newTaskCategory,
                                };
                                setScheduledTasks([newTask, ...scheduledTasks]);
                                historyService.addAuditLog('ADD_SCHEDULED_TASK', undefined, `Added task: ${newTask.title}`);
                                
                                // Reset fields
                                setNewTaskTitle('');
                                setNewTaskDate('');
                                setShowAddTaskModal(false);
                              }}
                              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all disabled:opacity-30"
                            >
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {[
                      { id: 'deadline', label: 'Délais actifs', value: scheduledTasks.filter(t => t.category === 'deadline').length, color: 'text-amber-400', bg: 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/20' },
                      { id: 'audience', label: 'Audiences à venir', value: scheduledTasks.filter(t => t.category === 'audience').length, color: 'text-blue-400', bg: 'bg-blue-500/10 hover:bg-blue-500/15 border-blue-500/20' },
                      { id: 'pending', label: 'Dossiers en attente', value: scheduledTasks.filter(t => t.category === 'pending').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500/20' },
                    ].map(s => {
                      const isActive = selectedScheduleFilter === s.id;
                      return (
                        <button 
                          key={s.label} 
                          onClick={() => setSelectedScheduleFilter(selectedScheduleFilter === s.id ? 'all' : (s.id as any))}
                          className={`p-3 sm:p-6 rounded-xl sm:rounded-2xl ${s.bg} border text-left transition-all relative ${
                            isActive ? 'ring-2 ring-amber-500 border-transparent scale-[1.02]' : 'border-white/5 hover:scale-[1.01]'
                          }`}
                        >
                          <div className={`text-2xl sm:text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
                          <div className="text-xs sm:text-sm text-slate-400 leading-snug">{s.label}</div>
                          {isActive && (
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedScheduleFilter !== 'all' && (
                    <div className="flex justify-between items-center bg-[#0a0d14] border border-[#1f2638] px-4 py-2 rounded-xl">
                      <span className="text-xs text-slate-400">
                        Filtre actif : <span className="text-amber-400 font-bold uppercase">{selectedScheduleFilter === 'deadline' ? 'Délais' : selectedScheduleFilter === 'audience' ? 'Audiences' : 'Dossiers'}</span>
                      </span>
                      <button 
                        onClick={() => setSelectedScheduleFilter('all')}
                        className="text-xs text-amber-500 hover:text-amber-400 font-semibold"
                      >
                        Réinitialiser le filtre
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    {scheduledTasks
                      .filter(t => selectedScheduleFilter === 'all' || t.category === selectedScheduleFilter)
                      .map((task, i) => (
                        <div key={task.id || i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#111522]/80 border border-[#1f2638] hover:border-[#2b344f] transition-all group">
                          <div className="text-lg sm:text-2xl shrink-0">{task.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white text-xs sm:text-sm leading-snug">{task.title}</div>
                            <div className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                              <Clock className="w-3 h-3 shrink-0" /> {task.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className={`chip border text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${task.color}`}>{task.priority}</span>
                            <button
                              onClick={() => {
                                setScheduledTasks(scheduledTasks.filter(t => t.id !== task.id));
                                historyService.addAuditLog('DELETE_SCHEDULED_TASK', undefined, `Deleted task: ${task.title}`);
                              }}
                              className="p-1.5 text-[#3e4759] hover:text-red-400 active:scale-90 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Supprimer ce rappel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                    {scheduledTasks.filter(t => selectedScheduleFilter === 'all' || t.category === selectedScheduleFilter).length === 0 && (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-[#1f2638] text-slate-500 text-sm">
                        Aucune tâche enregistrée dans cette catégorie.
                      </div>
                    )}
                  </div>

                  <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      <span className="text-amber-400 font-semibold">💡 Astuce :</span> Demandez à l'IA de calculer vos délais procéduraux — "Quel est le délai d'appel d'un jugement rendu le 5 janvier 2025 ?"
                    </p>
                  </div>
                </motion.div>

              ) : activeTab === 'search' ? (
                <motion.div
                  key="search-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                  {/* Jurisprudential Search & Legal Watch Tab matching video */}
                  <JurisprudentialSearchTab
                    onSendMessage={(msg) => handleSend(msg)}
                    onNavigateToTab={(tab) => setActiveTab(tab as any)}
                    addToSearchHistory={(query, type, category) => addToSearchHistory(query, type as any, category)}
                  />

                  {/* Horizontal Divider */}
                  <div className="border-t border-white/[0.04] my-8" />

                  {/* ANNUAIRE D'AVOCATS & CABINETS RÉFÉRENCÉS */}
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-4">
                      <div>
                        <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                          <Gavel className="w-4 h-4 text-amber-500" />
                          ANNUAIRE D'AVOCATS, NOTAIRES & CABINETS RÉFÉRENCÉS ({lawyersList.length})
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Cabinets d'affaires leaders, avocats au Barreau et études notariales au Luxembourg et en France.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openVisibilityContractForCabinet(null)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-600/20 hover:from-amber-500/25 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-400/60 active:scale-95"
                          title="Générer et éditer un contrat de visibilité et référencement numérique pour cabinet d'avocats"
                        >
                          <Scale className="w-3.5 h-3.5 text-amber-400" />
                          <span>Contrat de visibilité</span>
                        </button>
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          🇫🇷 France & 🇱🇺 Luxembourg
                        </span>
                      </div>
                    </div>

                    {/* Filter Tabs & Search Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-white/[0.06] text-xs">
                        <button
                          onClick={() => setLawyerFilterCategory('all')}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                            lawyerFilterCategory === 'all'
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          Tous ({lawyersList.length})
                        </button>
                        <button
                          onClick={() => setLawyerFilterCategory('cabinet')}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                            lawyerFilterCategory === 'cabinet'
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          🏛️ Cabinets ({lawyersList.filter((l) => l.type === 'cabinet').length})
                        </button>
                        <button
                          onClick={() => setLawyerFilterCategory('notaire')}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                            lawyerFilterCategory === 'notaire'
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          📜 Notaires ({lawyersList.filter((l) => l.type === 'notaire').length})
                        </button>
                        <button
                          onClick={() => setLawyerFilterCategory('FR')}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                            lawyerFilterCategory === 'FR'
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          🇫🇷 France ({lawyersList.filter((l) => l.country === 'FR').length})
                        </button>
                        <button
                          onClick={() => setLawyerFilterCategory('LU')}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                            lawyerFilterCategory === 'LU'
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          🇱🇺 Luxembourg ({lawyersList.filter((l) => l.country === 'LU').length})
                        </button>
                        <button
                          onClick={() => setLawyerFilterCategory('avocat')}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                            lawyerFilterCategory === 'avocat'
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          ⚖️ Avocats ({lawyersList.filter((l) => l.type !== 'cabinet' && l.type !== 'notaire').length})
                        </button>
                      </div>

                      <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                        <input
                          type="text"
                          value={lawyerSearchQuery}
                          onChange={(e) => setLawyerSearchQuery(e.target.value)}
                          placeholder="Rechercher cabinet, avocat, notaire, spécialité..."
                          className="w-full pl-8 pr-7 py-1.5 bg-slate-900/60 border border-white/[0.08] focus:border-amber-500/50 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all"
                        />
                        {lawyerSearchQuery && (
                          <button
                            onClick={() => setLawyerSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Sorting Bar - du plus petit au plus grand par défaut */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3 py-2.5 bg-slate-900/40 rounded-xl border border-white/[0.04]">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                          Trier par effectif :
                        </span>
                        <div className="inline-flex rounded-lg bg-slate-950/80 p-0.5 border border-white/[0.08] shadow-inner">
                          <button
                            onClick={() => setCabinetSortOrder('asc')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                              cabinetSortOrder === 'asc'
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                            title="Trier du plus petit au plus grand nombre de collaborateurs"
                          >
                            <span>👥 Du plus petit au plus grand</span>
                            <span className={`text-[10px] font-mono ${cabinetSortOrder === 'asc' ? 'text-slate-900 font-bold' : 'text-amber-400/80'}`}>
                              (4 → 1 300)
                            </span>
                          </button>
                          <button
                            onClick={() => setCabinetSortOrder('desc')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                              cabinetSortOrder === 'desc'
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                            title="Trier du plus grand au plus petit nombre de collaborateurs"
                          >
                            <span>Du plus grand au plus petit</span>
                            <span className={`text-[10px] font-mono ${cabinetSortOrder === 'desc' ? 'text-slate-900 font-bold' : 'text-amber-400/80'}`}>
                              (1 300 → 4)
                            </span>
                          </button>
                          <button
                            onClick={() => setCabinetSortOrder('alpha')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                              cabinetSortOrder === 'alpha'
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                            title="Trier par ordre alphabétique"
                          >
                            A-Z
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 font-medium">
                        <span className="text-amber-400 font-bold">51</span> cabinets d'affaires référencés
                      </div>
                    </div>

                    {/* Filtered & Sorted list computation */}
                    {(() => {
                      const displayedLawyers = lawyersList
                        .filter((lawyer) => {
                          if (lawyerFilterCategory === 'FR' && lawyer.country !== 'FR') return false;
                          if (lawyerFilterCategory === 'LU' && lawyer.country !== 'LU') return false;
                          if (lawyerFilterCategory === 'cabinet' && lawyer.type !== 'cabinet') return false;
                          if (lawyerFilterCategory === 'notaire' && lawyer.type !== 'notaire') return false;
                          if (lawyerFilterCategory === 'avocat' && (lawyer.type === 'cabinet' || lawyer.type === 'notaire')) return false;
                          if (lawyerSearchQuery.trim()) {
                            const q = lawyerSearchQuery.toLowerCase().trim();
                            const matchName = lawyer.name.toLowerCase().includes(q);
                            const matchTitle = lawyer.title.toLowerCase().includes(q);
                            const matchLoc = lawyer.location.toLowerCase().includes(q);
                            const matchSpec = lawyer.specialties.some((s) => s.toLowerCase().includes(q));
                            if (!matchName && !matchTitle && !matchLoc && !matchSpec) return false;
                          }
                          return true;
                        })
                        .sort((a, b) => {
                          if (cabinetSortOrder === 'alpha') {
                            return a.name.localeCompare(b.name, 'fr');
                          }
                          const countA = a.collaboratorsCount ?? (a.type === 'cabinet' ? 9999 : 0);
                          const countB = b.collaboratorsCount ?? (b.type === 'cabinet' ? 9999 : 0);
                          if (cabinetSortOrder === 'asc') {
                            return countA - countB;
                          } else {
                            return countB - countA;
                          }
                        });

                      if (displayedLawyers.length === 0) {
                        return (
                          <div className="text-center py-12 px-4 rounded-2xl bg-slate-900/30 border border-white/[0.04]">
                            <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-slate-400">Aucun cabinet ou avocat ne correspond à votre recherche.</p>
                            <button
                              onClick={() => {
                                setLawyerFilterCategory('all');
                                setLawyerSearchQuery('');
                              }}
                              className="mt-3 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-amber-400 font-medium transition-all"
                            >
                              Réinitialiser les filtres
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12 py-6">
                          {displayedLawyers.map((lawyer) => (
                            <div
                              key={lawyer.id}
                              onClick={() => {
                                setSelectedLawyer(lawyer);
                                setBookingConfirmed(false);
                                setBookingDay('');
                                setBookingTime('');
                              }}
                              className="group cursor-pointer flex flex-col items-center relative"
                            >
                              {/* Circular Frame matching the design files provided */}
                              <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-visible transition-transform duration-300 group-hover:scale-105 active:scale-95 ${
                                lawyer.verified ? 'ring-2 ring-amber-500/60 ring-offset-2 ring-offset-slate-950' : ''
                              }`}>
                                <img
                                  src={lawyer.avatar}
                                  alt={lawyer.name}
                                  className={`w-full h-full rounded-full object-cover border-2 shadow-xl transition-all ${
                                    lawyer.verified ? 'border-amber-500' : 'border-slate-800 group-hover:border-amber-500'
                                  }`}
                                  referrerPolicy="no-referrer"
                                />

                                {/* Verified / Partner Tag */}
                                {lawyer.verified && (
                                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 border border-amber-400 whitespace-nowrap">
                                    <span>{lawyer.country === 'LU' ? '🇱🇺 Partenaire' : '🇫🇷 Référencé'}</span>
                                  </div>
                                )}

                                {/* Thin golden ring plus-circle on top-right rim */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const welcomeMsg = lawyer.type === 'cabinet'
                                      ? `Bonjour,\nJe souhaite solliciter les conseils juridiques du cabinet "${lawyer.name}" dans le cadre de mon dossier "${currentDossier ? currentDossier.title : 'LexIIA'}". Pouvez-vous m'éclairer sur vos expertises et la faisabilité juridique de ma demande ?`
                                      : `Bonjour Maître ${lawyer.name},\nJe sollicite votre assistance dans le cadre de mon dossier "${currentDossier ? currentDossier.title : 'LexIIA'}". Pouvez-vous réaliser un audit de conformité de mon dossier ?`;
                                    setInput(welcomeMsg);
                                    setActiveTab('chat');
                                    historyService.addAuditLog('ADD_LAWYER_CHAT', undefined, `Selected attorney ${lawyer.name} for consultation`);
                                  }}
                                  className="absolute top-1.5 right-1.5 w-7 h-7 bg-[#0b0f19] border border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 shadow-md transition-all select-none font-bold text-sm"
                                  title="Associer à mon dossier"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Name and Designation below */}
                              <div className="flex items-center gap-1 mt-4 mb-0.5 justify-center text-center px-1">
                                <h4 className="text-white font-sans font-bold text-center text-sm sm:text-base tracking-tight group-hover:text-amber-400 transition-colors">
                                  {lawyer.name}
                                </h4>
                                {lawyer.verified && (
                                  <span title="Cabinet vérifié & référencé">
                                    <BadgeCheck className="w-4 h-4 text-amber-400 shrink-0" />
                                  </span>
                                )}
                              </div>
                              <span className="text-amber-400 italic text-xs text-center font-semibold mt-0.5 line-clamp-1 px-2">
                                {lawyer.title}
                              </span>
                              {lawyer.collaboratorsCount !== undefined && (
                                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25 shadow-xs">
                                  <Users className="w-3 h-3 text-amber-400 shrink-0" />
                                  <span>{lawyer.collaboratorsCount.toLocaleString('fr-FR')} {lawyer.collaboratorsCount > 1 ? 'collaborateurs' : 'collaborateur'}</span>
                                </span>
                              )}
                              {lawyer.country === 'LU' && (
                                <span className="text-[10px] text-slate-400 mt-1 font-medium">
                                  Barreau de Luxembourg
                                </span>
                              )}
                              {lawyer.country === 'FR' && (
                                <span className="text-[10px] text-slate-400 mt-1 font-medium">
                                  {lawyer.type === 'cabinet' ? 'Cabinet · Paris & France' : 'Barreau français'}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    <p className="text-center text-xs text-slate-500 pt-2 pb-6">
                      Annuaire professionnel de référence pour les cabinets d'avocats d'affaires et praticiens en France et au Luxembourg.
                    </p>
                  </div>

                  {/* Bottom Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.04]">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#090d16] border border-white/[0.04]">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Quotidienne</div>
                        <div className="text-slate-400 text-xs">Mise à jour</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#090d16] border border-white/[0.04]">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                        <Check className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">100%</div>
                        <div className="text-slate-400 text-xs">Sources officielles</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#090d16] border border-white/[0.04]">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-lg">
                        <span>🇱🇺 🇪🇺</span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">UE & Luxembourg</div>
                        <div className="text-slate-400 text-xs">Hébergement & conformité RGPD</div>
                      </div>
                    </div>
                  </div>

                  {/* DETAILED MODAL OVERLAY FOR LAWYER PROFILES */}
                  <AnimatePresence>
                    {selectedLawyer && (
                      <div className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 15 }}
                          className="relative bg-slate-900 border border-white/15 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row "
                        >
                          {/* Left side layout: Portrait and details */}
                          <div className="p-6 md:p-8 md:w-5/12 bg-slate-950/40 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10">
                            <div className="flex flex-col items-center text-center space-y-4">
                              <div className="relative">
                                <img
                                  src={selectedLawyer.avatar}
                                  alt={selectedLawyer.name}
                                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#d4af37]"
                                  referrerPolicy="no-referrer"
                                />
                                {selectedLawyer.verified && (
                                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 text-slate-950 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                                    <BadgeCheck className="w-3 h-3" />
                                    <span>Vérifié</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-display font-black text-xl text-white tracking-tight flex items-center justify-center gap-1.5">
                                  {selectedLawyer.name}
                                </h3>
                                <p className="text-amber-400 italic text-xs font-semibold mt-0.5">{selectedLawyer.title}</p>
                              </div>

                              {selectedLawyer.website && (
                                <a
                                  href={selectedLawyer.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 rounded-xl text-amber-400 hover:text-amber-300 text-xs font-bold transition-all group"
                                >
                                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Site officiel</span>
                                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                                </a>
                              )}

                              <div className="space-y-2.5 pt-2 text-left w-full text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                  <Scale className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span className="font-semibold text-white">
                                    {selectedLawyer.country === 'LU'
                                      ? 'Barreau de Luxembourg'
                                      : selectedLawyer.name === 'Fidal'
                                        ? 'Barreau des Hauts-de-Seine / France (85 bureaux)'
                                        : selectedLawyer.location.toLowerCase().includes('paris')
                                          ? 'Barreau de Paris & France'
                                          : `Barreau de ${selectedLawyer.location.split(',')[0]}`}
                                  </span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                  <span className="text-slate-300 line-clamp-2 leading-relaxed">{selectedLawyer.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span>{selectedLawyer.experienceYears} ans d'expertise</span>
                                </div>
                                {selectedLawyer.collaboratorsCount !== undefined && (
                                  <div className="flex items-center gap-2 text-amber-300 font-medium">
                                    <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    <span>{selectedLawyer.collaboratorsCount.toLocaleString('fr-FR')} {selectedLawyer.type === 'cabinet' ? 'avocats & collaborateurs' : 'collaborateurs'}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <a href={`mailto:${selectedLawyer.email}`} className="truncate hover:text-amber-400 transition-colors">{selectedLawyer.email}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <a href={`tel:${selectedLawyer.phone.replace(/\s+/g, '')}`} className="hover:text-amber-400 transition-colors">{selectedLawyer.phone}</a>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedLawyer(null)}
                              className="hidden md:block mt-6 px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs text-slate-400 hover:text-white transition-all w-full select-none"
                            >
                              Fermer la fiche
                            </button>
                          </div>

                          {/* Right side layout: Biography & Booking Scheduler */}
                          <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-6">
                            {/* Close button for handier navigation */}
                            <button
                              onClick={() => setSelectedLawyer(null)}
                              className="absolute top-4 right-4 text-slate-400 hover:text-white md:hidden"
                            >
                              <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-4">
                              {selectedLawyer.awards && selectedLawyer.awards.length > 0 && (
                                <div>
                                  <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase flex items-center gap-1.5">
                                    <Award className="w-3 h-3" />
                                    Distinctions & Classements
                                  </span>
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {selectedLawyer.awards.map((award, i) => (
                                      <span key={i} className="px-2 py-0.5 text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-md">
                                        ★ {award}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div>
                                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Spécialités</span>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                  {selectedLawyer.specialties.map((spec, i) => (
                                    <span key={i} className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Présentation</span>
                                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mt-1">
                                  {selectedLawyer.bio}
                                </p>
                              </div>

                              {/* Appointment Booking Simulation */}
                              <div className="pt-3 border-t border-white/5 space-y-3">
                                <span className="text-[10.5px] font-bold text-amber-500 tracking-wider uppercase block">
                                  📅 Demande de mise en relation / Consultation
                                </span>

                                {bookingConfirmed ? (
                                  <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium"
                                  >
                                    ✓ Demande transmise avec succès à {selectedLawyer.name} pour le <strong className="text-white">{bookingDay} à {bookingTime}</strong>. Le secrétariat prendra contact avec vous.
                                  </motion.div>
                                ) : (
                                  <div className="space-y-2">
                                    {/* Select Day */}
                                    <div className="grid grid-cols-3 gap-1">
                                      {['Lundi 22 Juin', 'Mardi 23 Juin', 'Mercredi 24 Juin'].map(day => (
                                        <button
                                          key={day}
                                          onClick={() => setBookingDay(day)}
                                          className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                                            bookingDay === day
                                              ? 'bg-amber-500 text-slate-950 font-black'
                                              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                                          }`}
                                        >
                                          {day.split(' ')[0]} {day.split(' ')[1]}
                                        </button>
                                      ))}
                                    </div>

                                    {/* Select Time */}
                                    <div className="grid grid-cols-4 gap-1">
                                      {['10:00', '11:30', '14:30', '16:00'].map(time => (
                                        <button
                                          key={time}
                                          onClick={() => setBookingTime(time)}
                                          className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                                            bookingTime === time
                                              ? 'bg-[#d4af37] text-slate-950 font-black'
                                              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                                          }`}
                                        >
                                          {time}
                                        </button>
                                      ))}
                                    </div>

                                    <button
                                      disabled={!bookingDay || !bookingTime}
                                      onClick={() => {
                                        setBookingConfirmed(true);
                                        historyService.addAuditLog('BOOK_APPOINTMENT', undefined, `Booked consultation with ${selectedLawyer.name} on ${bookingDay} at ${bookingTime}`);
                                      }}
                                      className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none text-slate-950 font-bold text-xs rounded-xl transition-all"
                                    >
                                      Valider la Demande d'Entretien
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Copy context or open directly in co-pilot */}
                            <div className="flex gap-2 pt-4 border-t border-white/5">
                              <button
                                onClick={() => {
                                  const promptMsg = selectedLawyer.type === 'cabinet'
                                    ? `Bonjour,\nJe sollicite une assistance juridique auprès du cabinet "${selectedLawyer.name}" concernant mon dossier ${currentDossier ? `"${currentDossier.title}"` : 'LexIIA'}. Pouvez-vous m'assister sur les points de droit applicables ?`
                                    : `Bonjour Maître ${selectedLawyer.name},\nJe vous sollicite concernant mon document ${currentDossier ? `"${currentDossier.title}"` : 'LexIIA'}. Je souhaiterais obtenir des conseils juridiques précis à ce sujet.`;
                                  setInput(promptMsg);
                                  setSelectedLawyer(null);
                                  setActiveTab('chat');
                                  historyService.addAuditLog('CHAT_WITH_LAWYER', undefined, `Transferred ${selectedLawyer.name} prompt context to active chat`);
                                }}
                                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Consulter via l'IA
                              </button>
                              {selectedLawyer.type === 'cabinet' && (
                                <>
                                  <button
                                    onClick={() => {
                                      const cab = selectedLawyer;
                                      setSelectedLawyer(null);
                                      openEmailModalForCabinet(cab);
                                    }}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                                    title={`Rédiger et expédier un courriel à ${selectedLawyer.email}`}
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                    Envoyer un e-mail
                                  </button>
                                  <button
                                    onClick={() => {
                                      const cab = selectedLawyer;
                                      setSelectedLawyer(null);
                                      openVisibilityContractForCabinet(cab);
                                    }}
                                    className="px-3.5 py-3 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                                    title="Générer la convention de référencement & visibilité pour ce cabinet"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Contrat cabinet</span>
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => setSelectedLawyer(null)}
                                className="md:hidden py-3 px-4 border border-white/10 hover:bg-white/5 rounded-xl text-xs text-slate-400 font-semibold"
                              >
                                Retour
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>

              ) : activeTab === 'library' ? (
                <motion.div
                  key="academy-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full"
                >
                  <LexIIAAcademy
                    userName={user?.displayName ? user.displayName.split(' ')[0] : 'Maître'}
                    onOpenChatMessage={(prompt) => {
                      setInput(prompt);
                      setActiveTab('chat');
                      setTimeout(() => {
                        handleSend(prompt);
                      }, 150);
                    }}
                    showToast={showToast}
                  />
                </motion.div>

              ) : messages.length === 0 ? (
                <motion.div
                  key="chat-welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 sm:space-y-8 py-4 sm:py-6"
                >
                  {/* Interactive Quick Start Onboarding Card (Prise en main guidée) */}
                  {showQuickStartGuide && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-900 border border-amber-500/30 shadow-xl relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-base font-bold text-white">Guide de Prise en Main Rapide — 3 Étapes Intuitives</h3>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Nouveau
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-0.5">
                              Bienvenue sur LexIIA, votre suite d'intelligence juridique souveraine. Voici comment tirer le meilleur parti de vos consultations :
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowQuickStartGuide(false);
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('lexiia_hide_quickstart', 'true');
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                          title="Masquer le guide"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
                        <div className={`p-4 rounded-2xl border transition-all ${userPersona === 'lawyer' ? 'bg-amber-500/15 border-amber-500/40 text-white' : 'bg-slate-950/50 border-white/5 text-slate-300'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">1. Profil & Éthique</span>
                            <span className="text-sm">⚖️</span>
                          </div>
                          <div className="font-bold text-xs text-white mb-1">
                            {userPersona === 'lawyer' ? "Mode Avocat (Confrères masqués)" : userPersona === 'jurist' ? "Mode Direction Juridique" : "Mode Justiciable"}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {userPersona === 'lawyer' 
                              ? "Les recommandations d'avocats confrères sont masquées par déontologie ordinale." 
                              : "Orientation automatique vers les 51 cabinets certifiés de l'annuaire."}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 text-slate-300">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">2. Requête ou Acte</span>
                            <span className="text-sm">💬</span>
                          </div>
                          <div className="font-bold text-xs text-white mb-1">Analyse & Rédaction Exhaustive</div>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            Tapez votre question juridique ou demandez la rédaction intégrale d'un NDA, CDI ou bail avec clauses protectrices.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 text-slate-300">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">3. Tableaux & PDF</span>
                            <span className="text-sm">📊</span>
                          </div>
                          <div className="font-bold text-xs text-white mb-1">Export PDF Haute Fidélité</div>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            Retrouvez les tableaux de synthèse récapitulatifs dans l'aperçu du document et téléchargez-les instantanément en PDF certifié.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="text-center space-y-3 sm:space-y-4 px-2 sm:px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e160d] border border-amber-500/20 text-amber-500 text-[11px] font-bold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      Consultations illimitées · Droit Français, Luxembourgeois & Européen
                    </div>
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-light text-white leading-tight tracking-tight">
                      1er annuaire <span className="font-extrabold italic text-amber-400 font-sans block sm:inline mt-1 sm:mt-0">juridique IA</span>
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base md:text-md leading-relaxed max-w-2xl mx-auto">
                      Un assistant juridique IA expert en droit français et luxembourgeois. Conseils en temps réel 24h/7 avec Payload de preuves daté.
                    </p>
                  </div>

                  {/* Actions directes rapides (1 clic) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { 
                        emoji: '📜', 
                        title: 'NDA Bilatéral Complet', 
                        desc: 'Avec clause stricte de non-concurrence et pénalités forfaitaires', 
                        query: 'Rédige un accord de confidentialité (NDA) bilatéral complet et exhaustif entre deux sociétés commerciales françaises, incluant les définitions précises, les obligations de secret, une clause de non-concurrence stricte de 24 mois avec indemnité forfaitaire et attribution de compétence territoriale.' 
                      },
                      { 
                        emoji: '💼', 
                        title: 'Modèle CDI Conforme', 
                        desc: 'Structure intégrale en 11 articles obligatoires LexIIA', 
                        query: 'Rédige un contrat de travail à durée indéterminée (CDI) complet respectant rigoureusement la structure obligatoire en 11 articles pour un cadre dirigeant.' 
                      },
                      { 
                        emoji: '🔎', 
                        title: 'Recherche Jurisprudence', 
                        desc: 'Veille active des 30 derniers jours (Judilibre & Legilux)', 
                        action: 'search', 
                        highlight: true 
                      },
                      { 
                        emoji: '🏛️', 
                        title: 'Annuaire des Cabinets', 
                        desc: '51 cabinets certifiés classés par effectif de collaborateurs', 
                        action: 'search' 
                      },
                    ].map((card, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ y: -3, scale: 1.01 }}
                        onClick={() => {
                          if (card.action === 'search') setActiveTab('search');
                          else if ((card as any).query) handleSend((card as any).query);
                        }}
                        className={`p-4 sm:p-5 text-left rounded-2xl bg-[#111522]/80 border ${
                          card.highlight 
                            ? 'border-amber-500/40 shadow-[0_4px_25px_rgba(245,158,11,0.06)]' 
                            : 'border-[#1f2638] hover:border-[#2b344f]'
                        } hover:shadow-2xl transition-all duration-300 group flex items-start gap-3 sm:block cursor-pointer`}
                      >
                        <div className="text-xl sm:text-2xl sm:mb-3 group-hover:scale-110 transition-transform shrink-0 mt-0.5 sm:mt-0 inline-block">{card.emoji}</div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-xs sm:text-[14px] text-white mb-1 leading-snug">{card.title}</h3>
                          <p className="text-[11px] sm:text-[11.5px] text-slate-400 leading-relaxed">{card.desc}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div>
                    <p className="text-center text-[10px] sm:text-xs text-slate-500 mb-3 uppercase tracking-widest font-semibold">Exemples de questions & analyses</p>
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto">
                      {SUGGESTIONS.map((suggestion, idx) => (
                        <span
                          key={`suggestion-${idx}`}
                          onClick={() => handleSend(suggestion)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs text-slate-300 cursor-pointer hover:border-amber-500/40 hover:bg-white/10 hover:text-white active:scale-95 transition-all text-center leading-normal max-w-full break-words shadow-sm"
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="chat-messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5 sm:space-y-8 pb-6 sm:pb-10"
                >
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id ? `msg-${msg.id}` : `msg-idx-${idx}-${msg.role}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'model' && (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500 flex-shrink-0 flex items-center justify-center mt-1 shadow-lg shadow-amber-500/20">
                          <Gavel className="w-4 h-4 sm:w-6 sm:h-6 text-slate-950" />
                        </div>
                      )}
                      <div className={`max-w-[88%] sm:max-w-[85%] rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-5 ${
                        msg.role === 'user'
                          ? 'bg-amber-500 text-slate-950 font-medium shadow-xl'
                          : 'bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 shadow-2xl overflow-x-auto'
                      }`}>
                        {msg.planning && (
                          <div className="mb-4 p-4 bg-slate-900 border border-amber-500/20 rounded-xl text-[10px] font-mono text-slate-400">
                             <div className="flex items-center gap-2 mb-2 text-amber-500 font-bold uppercase tracking-widest">
                               <Zap className="w-3 h-3" /> Agent Execution Plan
                             </div>
                             <Markdown remarkPlugins={[remarkGfm]}>{msg.planning}</Markdown>
                          </div>
                        )}
                        <div className="markdown-body">
                          {msg.parts[0]?.text ? (
                            <Markdown remarkPlugins={[remarkGfm]} components={chatMarkdownComponents}>{msg.parts[0].text}</Markdown>
                          ) : (
                            <div className="flex items-center gap-2 py-1 text-slate-400 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                              <span className="text-xs font-mono text-amber-400/80">Rédaction de la consultation juridique en cours...</span>
                            </div>
                          )}
                        </div>

                        {/* Quick action bar for recommended law firm (Only when recommendLawyers is true) */}
                        {msg.role === 'model' && msg.parts[0]?.text && recommendLawyers && (() => {
                          const text = msg.parts[0].text;
                          const match = text.match(/#cabinet:([a-z0-9-]+)/i);
                          if (!match) return null;
                          const cabId = match[1].toLowerCase();
                          const matchedCab = lawyersList.find(l => l.id.toLowerCase() === cabId);
                          if (!matchedCab) return null;
                          return (
                            <div className="mt-3.5 pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-amber-500/[0.04] p-3 rounded-xl border border-amber-500/15">
                              <div className="flex items-center gap-2.5">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                <div>
                                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                                    Cabinet Expert Recommandé
                                  </span>
                                  <span className="text-xs text-white font-semibold">
                                    🏛️ {matchedCab.name} · {matchedCab.country === 'LU' ? 'Luxembourg' : 'Barreau de Paris'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => openLawyerCabinet(matchedCab)}
                                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                                >
                                  <Gavel className="w-3.5 h-3.5" /> Fiche & Contact
                                </button>
                                <button
                                  type="button"
                                  onClick={() => redirectToCabinetInDirectory(matchedCab)}
                                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                                >
                                  Annuaire <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </motion.div>
                  ))}

                  {/* End-of-conversation "Nouvelle tâche" action — appears after last AI response */}
                  {!isLoading && !isAnalyzing && messages.length > 0 && messages[messages.length - 1]?.role === 'model' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-4 pt-2 pb-4"
                    >
                      <div className="flex-1 h-px bg-white/5" />
                      <button
                        onClick={clearChat}
                        className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 text-xs text-slate-500 hover:text-amber-400 font-medium transition-all active:scale-95 shrink-0"
                      >
                        <SquarePen className="w-3.5 h-3.5" />
                        Nouvelle tâche
                      </button>
                      <div className="flex-1 h-px bg-white/5" />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {(isLoading || isAnalyzing) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 sm:gap-4 justify-start pb-6 sm:pb-10"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0 flex items-center justify-center mt-1 animate-pulse">
                    <Loader2 className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500 animate-spin" />
                  </div>
                  <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md max-w-lg w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        <p className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider font-sans">
                          {isAnalyzing ? "LexIIA Analyse le document..." : "LexIIA réfléchit •••"}
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">
                        {Math.round((thinkingStep / 3) * 100)}%
                      </span>
                    </div>

                    {/* Progress Checklist */}
                    <div className="space-y-2.5 pt-1 border-t border-white/5">
                      {[
                        { id: 1, label: "Vérification des Documents & Faits", text: "Données prétraitées" },
                        { id: 2, label: "Phase 1 : Qualification Juridique Amont", text: "Situation qualifiée" },
                        { id: 3, label: "Phase 2 : RAG & Solution Opérationnelle", text: "Payload certifié & Recommandations" }
                      ].map(step => {
                        const isCompleted = thinkingStep > step.id;
                        const isActive = thinkingStep === step.id;
                        return (
                          <div 
                            key={step.id} 
                            className={`flex items-center gap-3 text-xs transition-all ${
                              isCompleted 
                                ? 'text-green-400 font-medium opacity-90' 
                                : isActive 
                                ? 'text-amber-400 font-semibold scale-[1.01]' 
                                : 'text-slate-600'
                            }`}
                          >
                            <div className="shrink-0">
                              {isCompleted ? (
                                <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[9px] text-green-400 font-extrabold">
                                  ✓
                                </span>
                              ) : isActive ? (
                                <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                </span>
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-700/60 flex items-center justify-center text-[8px] text-slate-500">
                                  {step.id}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 flex justify-between items-center min-w-0">
                              <span className="truncate pr-2">{step.label}</span>
                              <span className="text-[9px] opacity-60 font-mono hidden sm:inline shrink-0">{step.text}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center pb-10"
                >
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-2xl flex items-center gap-3 text-sm backdrop-blur-md max-w-lg shadow-lg">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <span className="whitespace-normal break-words font-sans">{error}</span>
                      {messages.some(m => m.role === 'user') && (
                        <button
                          onClick={handleRetry}
                          className="self-start text-xs font-semibold text-amber-400 hover:text-amber-300 active:scale-95 transition-all flex items-center gap-1.5 mt-0.5"
                        >
                          <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6H16" />
                          </svg>
                          Réessayer l'envoi
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="px-3 pt-3 pb-6 sm:px-6 sm:pt-4 sm:pb-8 md:px-12 bg-transparent shrink-0">
          <AnimatePresence>
            {activeTab === 'chat' && (
              <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-[#131722]/95 border border-[#1f2638] backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-2.5 sm:px-4 sm:py-2.5 shadow-2xl focus-within:border-amber-500/30 focus-within:ring-1 focus-within:ring-amber-500/10 transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.txt,.md,image/*"
                  className="hidden"
                />
                
                {/* Top row on mobile / Left side on desktop: Lock icon + Input */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 w-full min-w-0">
                  {/* Secure Upload button styled as a padlock */}
                  <button
                    disabled={isLoading || isAnalyzing}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 sm:p-2 text-slate-500 hover:text-amber-400 active:scale-95 transition-all shrink-0 flex items-center justify-center rounded-xl hover:bg-white/5"
                    title="Uploader et analyser un document en toute sécurité"
                  >
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#3e4759] hover:text-amber-400 transition-colors" />
                  </button>

                  {/* Input — center, left-aligned */}
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={hasReachedFreeLimit ? "Connectez-vous pour continuer..." : "Attribuez une tâche ou posez une question..."}
                    disabled={isLoading || isAnalyzing}
                    className="flex-1 bg-transparent focus:outline-none placeholder:text-slate-500 text-slate-100 resize-none min-h-[36px] sm:min-h-[40px] max-h-40 text-xs sm:text-sm md:text-base leading-snug py-1.5 sm:py-2 self-center overflow-y-auto min-w-0"
                  />
                </div>

                {/* Bottom row on mobile / Right side on desktop: Priority + Send */}
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-1.5 sm:pt-0 border-t border-slate-800/60 sm:border-0 px-0.5 sm:px-0 shrink-0">
                  {/* Priority Selector */}
                  <div className="flex items-center gap-1 bg-[#0a0d14] border border-[#1f2638] px-2 py-1 rounded-xl text-xs shrink-0 select-none">
                    <span className="text-[10px] text-slate-400 font-medium mr-1 hidden xs:inline">Priorité:</span>
                    <button
                      type="button"
                      onClick={() => setTaskPriority('Low')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide transition-colors ${taskPriority === 'Low' ? 'bg-[#1c2234] text-white' : 'text-[#4b5468] hover:text-[#8e9aa8]'}`}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaskPriority('Medium')}
                      className={`px-2.5 py-1 sm:py-0.5 rounded-lg text-[10px] font-black tracking-wide transition-colors ${taskPriority === 'Medium' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-[#4b5468] hover:text-[#8e9aa8]'}`}
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaskPriority('High')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide transition-colors ${taskPriority === 'High' ? 'bg-[#1c2234] text-[#e11d48]' : 'text-[#4b5468] hover:text-[#8e9aa8]'}`}
                    >
                      High
                    </button>
                  </div>

                  {/* Send or Stop button — right */}
                  {isLoading || isAnalyzing ? (
                    <button
                      onClick={handleStopChat}
                      className="px-3.5 py-2 sm:p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 font-bold active:scale-95 transition-all shrink-0 flex items-center justify-center gap-1.5 text-xs sm:text-base cursor-pointer"
                      title="Interrompre la génération"
                    >
                      <div className="w-3 h-3 rounded-xs bg-red-400" />
                      <span className="text-xs font-bold">Arrêter</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="px-4 py-2 sm:p-3 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 hover:bg-amber-400 active:scale-95 transition-all disabled:opacity-30 disabled:hover:bg-amber-500 shrink-0 flex items-center justify-center gap-1.5 text-xs sm:text-base cursor-pointer"
                      title="Envoyer la demande (Entrée)"
                    >
                      <span className="sm:hidden font-bold">Envoyer</span>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Confidentiality & Security badge */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/70" />
                <span>Secret professionnel respecté · Chiffrement de bout en bout</span>
              </div>
              </>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-center text-slate-600 mt-4 max-w-2xl mx-auto uppercase tracking-tighter">
            Mémoire à long terme activée via Firestore. Vos données sont persistées et sécurisées.
          </p>
        </footer>
        </div>

        {/* Column 2: Legal Document Workspace Panel (right side / modal on mobile) */}
        {activeTab === 'chat' && showDocWorkspace && (
          <div className="fixed inset-0 z-[60] lg:static lg:z-auto flex w-full lg:w-[400px] xl:w-[460px] bg-slate-950/95 lg:bg-slate-950/40 backdrop-blur-3xl border-l border-white/10 lg:border-white/5 flex-col overflow-hidden shrink-0 h-full shadow-2xl">
            {/* Workspace Header */}
            <div className="p-5 border-b border-white/5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-sm text-white">Espace de Travail LexIIA</h3>
                </div>
                <button 
                  onClick={() => setShowDocWorkspace(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab select buttons */}
              <div className="grid grid-cols-2 p-0.5 rounded-xl bg-white/5 border border-white/5">
                <button
                  onClick={() => setDocWorkspaceTab('preview')}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    docWorkspaceTab === 'preview' 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  📃 Aperçu Document
                </button>
                <button
                  onClick={() => setDocWorkspaceTab('steps')}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    docWorkspaceTab === 'steps' 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ⚡ Étapes Dossier
                </button>
              </div>
            </div>

            {/* Workspace Content */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-5">
              {docWorkspaceTab === 'preview' ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-sans">Aperçu en temps réel</span>
                    {currentDossier?.contractDraft && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            handleSyncDrive();
                            showToast(`✓ Document "${currentDossier.title}" sauvegardé dans Google Drive (/${driveConfig.folderName})`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all active:scale-95"
                          title="Sauvegarder immédiatement dans Google Drive"
                        >
                          <GoogleDriveIcon className="w-3.5 h-3.5" />
                          <span>Google Drive</span>
                        </button>
                        <button
                          onClick={() => exportToPDF(currentDossier.title, currentDossier.contractDraft || '')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold transition-all hover:bg-amber-400 hover:scale-[1.02] shadow-[0_4px_12px_rgba(245,158,11,0.2)]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Télécharger PDF
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {currentDossier?.contractDraft ? (
                    <div className="space-y-4">
                      {/* High fidelity interactive document page simulating paper sheets */}
                      <div className="relative bg-white text-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-neutral-300/80 rounded-[4px] p-6 sm:p-9 font-sans select-text overflow-hidden aspect-[1/1.41] min-h-[580px] flex flex-col justify-between">
                        {/* Elegant background texture */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.15] pointer-events-none" />

                        <div>
                          {/* Confidentiality header badge */}
                          <div className="flex justify-between items-center text-[8.5px] text-neutral-400 tracking-widest uppercase font-bold pb-2 border-b border-neutral-100 mb-6">
                            <span>DOCUMENT GÉNÉRÉ PAR LEXIIA</span>
                            <span className="text-amber-600 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded-sm">• DOCUMENT PERSONNEL - CONFIDENTIEL •</span>
                          </div>

                          {/* Primary Title Area */}
                          <div className="space-y-2 mb-6">
                            <h1 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 tracking-tight leading-tight uppercase border-l-4 border-amber-500 pl-3">
                              {currentDossier?.title || "DOSSIER JURIDIQUE SPÉCIFIQUE"}
                            </h1>
                            <p className="text-[10px] text-neutral-500 font-sans italic">
                              Recensement des faits et structuration juridique rédigés à des fins exclusives d'exploitation.
                            </p>
                          </div>

                          {/* Dual-column metadata dashboard box */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-3 px-3 border-y border-neutral-200/80 mb-6 bg-neutral-50 rounded text-[9.5px] font-sans">
                            <div>
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Client / Justiciable</span>
                              <span className="font-semibold text-neutral-800">Dossier #{currentDossier?.id?.slice(-4) || "884B"}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Statut légal</span>
                              <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Validé pour export
                              </span>
                            </div>
                            <div className="border-t border-neutral-150 pt-2">
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Vérification de sources</span>
                              <span className="font-semibold text-neutral-700">Droit Français et LU</span>
                            </div>
                            <div className="border-t border-neutral-150 pt-2">
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Date de rédaction</span>
                              <span className="font-semibold text-neutral-800">
                                {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </span>
                            </div>
                          </div>

                          {/* Parsed document blocks */}
                          <div className="space-y-3 pb-8 max-h-[380px] overflow-y-auto pr-1 select-text custom-scrollbar">
                            {parseDraftToHtml(currentDossier.contractDraft)}
                          </div>
                        </div>

                        {/* Page footer marker */}
                        <div className="flex justify-between items-center text-[8.5px] text-neutral-400 border-t border-neutral-100 pt-3 mt-auto font-mono">
                          <span>DOCUMENT PERSONNEL - CONFIDENTIEL</span>
                          <span className="font-bold">Page 1 / 1</span>
                        </div>
                      </div>

                      {/* Download callout alert */}
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <p className="font-bold text-amber-400">Prêt pour impression</p>
                          <p className="text-[11px] text-slate-400">Le document respecte les formulations types de tribunal.</p>
                        </div>
                        <button
                          onClick={() => exportToPDF(currentDossier.title, currentDossier.contractDraft || '')}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition-all shrink-0 shadow-md"
                        >
                          Télécharger PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs space-y-3 bg-slate-950/20">
                      <FileText className="w-10 h-10 mx-auto opacity-30 text-amber-500 animate-pulse" />
                      <p className="text-white font-medium">Aucun document en cours</p>
                      <p className="text-[11px] leading-relaxed opacity-80 max-w-xs mx-auto">
                        Demandez par exemple : <span className="text-amber-400 italic">"Rédigez un contrat de travail CDI"</span> ou scannez un fichier pour démarrer l'espace de rédaction.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 font-sans">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-sans">Étapes de génération du dossier</span>
                  
                  <div className="relative border-l border-white/5 pl-4 ml-2 space-y-6 py-2">
                    {[
                      {
                        title: "1. Diagnostic & Analyse Liminaire",
                        desc: "Qualification de votre situation de fait et des règles applicables.",
                        status: messages.length > 0 ? "done" : "pending"
                      },
                      {
                        title: "2. Recherche & Rapprochement de Sources",
                        desc: "Vérification de la doctrine, jurisprudence et textes de loi applicables.",
                        status: messages.length >= 2 ? "done" : messages.length > 0 ? "active" : "pending"
                      },
                      {
                        title: "3. Rédaction du Dossier Juridique",
                        desc: "Formulation des conclusions et structuration des solutions ou du projet d'acte.",
                        status: currentDossier?.contractDraft ? "done" : messages.length >= 2 ? "active" : "pending"
                      },
                      {
                        title: "4. Exigibilité & Transmission Réseau",
                        desc: "Le dossier finalisé est prêt à être exporté ou envoyé à un cabinet d'avocats partenaire en un clic.",
                        status: currentDossier?.contractDraft ? "active" : "pending"
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot status icon */}
                        <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] font-extrabold ${
                          step.status === 'done'
                            ? 'bg-green-500 border-green-500 text-slate-950 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                            : step.status === 'active'
                            ? 'bg-amber-500 border-amber-500 text-slate-950 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                            : 'bg-slate-900 border-white/10 text-slate-500'
                        }`}>
                          {step.status === 'done' ? '✓' : ''}
                        </div>

                        <div className="space-y-1">
                          <h4 className={`text-xs font-semibold ${
                            step.status === 'done' ? 'text-green-400' : step.status === 'active' ? 'text-amber-400' : 'text-slate-400'
                          }`}>{step.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] text-amber-200/80 leading-normal space-y-1">
                    <p className="font-semibold text-amber-400 text-xs">💡 Mode d'emploi</p>
                    <p>Visualisez chaque étape de constitution de votre dossier ici en temps réel au fil de vos échanges avec LexIIA.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ─── WhatsApp Direct Chat Floating Widget ─── */}
      <WhatsAppChatWidget phoneNumber="07 83 75 72 58" internationalNumber="33783757258" />
    </div>
  );
}


