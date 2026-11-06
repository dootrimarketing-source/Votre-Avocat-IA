import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Dossier {
  id: string;
  title: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
  type: string;
  contractDraft?: string;
  securityStatus?: 'standard' | 'confidential' | 'restricted';
}

export interface MessageRecord {
  id: string;
  role: 'user' | 'model';
  content: string;
  createdAt: any;
}

export interface AuditRecord {
  id: string;
  userId: string;
  dossierId?: string;
  action: string;
  timestamp: any;
  details: string;
}

export const historyService = {
  async addAuditLog(action: string, dossierId?: string, details: string = "") {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await addDoc(collection(db, 'auditLogs'), {
        userId,
        dossierId: dossierId || null,
        action,
        timestamp: serverTimestamp(),
        details
      });
    } catch (error) {
       console.warn("Failed to write audit log:", error);
    }
  },

  async createDossier(title: string, type: string = 'conseil', securityStatus: Dossier['securityStatus'] = 'standard'): Promise<string | undefined> {
    const userId = auth.currentUser?.uid;
    if (!userId) return undefined;

    const path = 'dossiers';
    try {
      const docRef = await addDoc(collection(db, path), {
        title,
        userId,
        type,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        contractDraft: "",
        securityStatus
      });
      await this.addAuditLog('CREATE_DOSSIER', docRef.id, `Title: ${title}`);
      return docRef.id;
    } catch (error) {
      console.warn('[Firestore] createDossier warning (safe fallback):', error);
      return undefined;
    }
  },

  async updateSecurityStatus(dossierId: string, status: Dossier['securityStatus']) {
    if (!dossierId || dossierId.startsWith('dossier-') || dossierId.startsWith('guest-')) return;
    const path = `dossiers/${dossierId}`;
    try {
      await updateDoc(doc(db, path), {
        securityStatus: status,
        updatedAt: serverTimestamp()
      });
      await this.addAuditLog('UPDATE_SECURITY', dossierId, `New status: ${status}`);
    } catch (error) {
      console.warn('[Firestore] updateSecurityStatus warning (safe fallback):', error);
    }
  },

  async getDossiers(): Promise<Dossier[]> {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const path = 'dossiers';
    try {
      // Query without requiring compound composite index, sort in memory for 100% stability
      const q = query(
        collection(db, path), 
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Dossier));
      docs.sort((a, b) => {
        const timeA = a.updatedAt?.toMillis ? a.updatedAt.toMillis() : (a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : (a.updatedAt ? new Date(a.updatedAt).getTime() : 0));
        const timeB = b.updatedAt?.toMillis ? b.updatedAt.toMillis() : (b.updatedAt?.seconds ? b.updatedAt.seconds * 1000 : (b.updatedAt ? new Date(b.updatedAt).getTime() : 0));
        return timeB - timeA;
      });
      return docs;
    } catch (error) {
      console.warn('[Firestore] getDossiers warning (safe fallback):', error);
      return [];
    }
  },

  async getMessages(dossierId: string): Promise<MessageRecord[]> {
    if (!dossierId || dossierId.startsWith('dossier-') || dossierId.startsWith('guest-')) return [];
    const path = `dossiers/${dossierId}/messages`;
    try {
      const q = query(collection(db, path));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MessageRecord));
      docs.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0));
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0));
        return timeA - timeB;
      });
      return docs;
    } catch (error) {
      console.warn('[Firestore] getMessages warning (safe fallback):', error);
      return [];
    }
  },

  async addMessage(dossierId: string, role: 'user' | 'model', content: string) {
    if (!dossierId || dossierId.startsWith('dossier-') || dossierId.startsWith('guest-')) return;
    const path = `dossiers/${dossierId}/messages`;
    try {
      // Add message
      await addDoc(collection(db, path), {
        role,
        content,
        createdAt: serverTimestamp()
      });

      // Update dossier updatedAt
      await updateDoc(doc(db, 'dossiers', dossierId), {
        updatedAt: serverTimestamp()
      });

      // Audit log for critical actions (optional: log all for high security)
      await this.addAuditLog(role === 'user' ? 'USER_MESSAGE' : 'AI_RESPONSE', dossierId, `Role: ${role}`);
    } catch (error) {
      console.warn('[Firestore] addMessage warning (safe fallback):', error);
    }
  },

  async updateContract(dossierId: string, draft: string) {
    if (!dossierId || dossierId.startsWith('dossier-') || dossierId.startsWith('guest-')) return;
    const path = `dossiers/${dossierId}`;
    try {
      await updateDoc(doc(db, path), {
        contractDraft: draft,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.warn('[Firestore] updateContract warning (safe fallback):', error);
    }
  },

  async deleteDossier(dossierId: string) {
    if (!dossierId || dossierId.startsWith('dossier-') || dossierId.startsWith('guest-')) return;
    const path = `dossiers/${dossierId}`;
    try {
      await deleteDoc(doc(db, path));
      await this.addAuditLog('DELETE_DOSSIER', dossierId);
    } catch (error) {
      console.warn('[Firestore] deleteDossier warning (safe fallback):', error);
    }
  },

  async getAuditLogs() {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const path = 'auditLogs';
    try {
      const q = query(
        collection(db, path), 
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditRecord));
      docs.sort((a, b) => {
        const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp?.seconds ? a.timestamp.seconds * 1000 : (a.timestamp ? new Date(a.timestamp).getTime() : 0));
        const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp?.seconds ? b.timestamp.seconds * 1000 : (b.timestamp ? new Date(b.timestamp).getTime() : 0));
        return timeB - timeA;
      });
      return docs;
    } catch (error) {
      console.warn("Failed to fetch audit logs:", error);
      return [];
    }
  }
};
