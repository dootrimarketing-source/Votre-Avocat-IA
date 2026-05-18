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

  async createDossier(title: string, type: string = 'conseil', securityStatus: Dossier['securityStatus'] = 'standard') {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

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
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateSecurityStatus(dossierId: string, status: Dossier['securityStatus']) {
    const path = `dossiers/${dossierId}`;
    try {
      await updateDoc(doc(db, path), {
        securityStatus: status,
        updatedAt: serverTimestamp()
      });
      await this.addAuditLog('UPDATE_SECURITY', dossierId, `New status: ${status}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async getDossiers() {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const path = 'dossiers';
    try {
      const q = query(
        collection(db, path), 
        where("userId", "==", userId),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Dossier));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async getMessages(dossierId: string) {
    const path = `dossiers/${dossierId}/messages`;
    try {
      const q = query(collection(db, path), orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MessageRecord));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async addMessage(dossierId: string, role: 'user' | 'model', content: string) {
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
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateContract(dossierId: string, draft: string) {
    const path = `dossiers/${dossierId}`;
    try {
      await updateDoc(doc(db, path), {
        contractDraft: draft,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async deleteDossier(dossierId: string) {
    const path = `dossiers/${dossierId}`;
    try {
      await deleteDoc(doc(db, path));
      await this.addAuditLog('DELETE_DOSSIER', dossierId);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  async getAuditLogs() {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const path = 'auditLogs';
    try {
      const q = query(
        collection(db, path), 
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditRecord));
    } catch (error) {
      console.warn("Failed to fetch audit logs:", error);
      return [];
    }
  }
};
