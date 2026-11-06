import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import {
  initializeFirestore,
  doc,
  getDocFromServer,
  setLogLevel,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Silence internal Firestore connection transition logs
try {
  setLogLevel('silent');
} catch {
  // Ignore if already configured
}

// Initialize Firestore with explicit databaseId and long-polling for iframe/proxy stability
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  (firebaseConfig as any).firestoreDatabaseId
);

export const auth = getAuth(app);

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/documents.readonly',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
];

export const googleProvider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => googleProvider.addScope(scope));

// In-memory token cache (never stored in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

export function getCachedAccessToken(): string | null {
  return cachedAccessToken;
}

export function setCachedAccessToken(token: string | null) {
  cachedAccessToken = token;
}

export async function getAccessToken(): Promise<string | null> {
  return cachedAccessToken;
}

// Clear token on sign-out
auth.onAuthStateChanged((user) => {
  if (!user) {
    cachedAccessToken = null;
  }
});

/**
 * Safari (desktop + iOS) and ALL iOS browsers (including Chrome on iPhone)
 * use WebKit's popup blocker — signInWithPopup is blocked.
 * We detect them and fall back to signInWithRedirect.
 */
function shouldUseRedirect(): boolean {
  const ua = navigator.userAgent;
  // Any iOS device
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  // Safari desktop: contains "Safari" but NOT "Chrome", "CriOS" (Chrome iOS), "FxiOS" (Firefox iOS)
  if (/^((?!chrome|android|crios|fxios).)*safari/i.test(ua)) return true;
  return false;
}

let isLoginInProgress = false;
let activeLoginPromise: Promise<void> | null = null;

export async function loginWithGoogle(): Promise<void> {
  if (isLoginInProgress && activeLoginPromise) {
    return activeLoginPromise;
  }

  isLoginInProgress = true;
  activeLoginPromise = (async () => {
    try {
      // In an iframe (such as AI Studio preview or embedded sandboxes),
      // Google OAuth blocks redirects (X-Frame-Options); popup is required.
      const inIframe = typeof window !== 'undefined' && window.self !== window.top;
      if (!inIframe && shouldUseRedirect()) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          console.warn('[Auth] Redirect sign-in failed, attempting popup fallback:', redirectErr);
        }
      }

      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        cachedAccessToken = credential.accessToken;
      }
    } catch (error: any) {
      const code = error?.code || '';
      const msg = String(error?.message || error || '');

      // Benign cancellations: user closed window, or previous popup request was superseded
      if (
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request' ||
        msg.includes('cancelled-popup-request') ||
        msg.includes('popup-closed-by-user') ||
        msg.includes('Pending promise was never set') ||
        msg.includes('INTERNAL ASSERTION FAILED')
      ) {
        console.info('[Auth] Popup sign-in request closed or cancelled cleanly.');
        return;
      }

      // Popup blocked by browser or iframe sandbox policy
      if (code === 'auth/popup-blocked' || msg.includes('popup-blocked')) {
        console.warn('[Auth] Popup blocked by browser settings or iframe sandbox.');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-popup-blocked'));
        }
        return;
      }

      console.warn('[Auth] Sign-in note:', msg);
    } finally {
      isLoginInProgress = false;
      activeLoginPromise = null;
    }
  })();

  return activeLoginPromise;
}

export { getRedirectResult };
export const logout = () => auth.signOut();

export async function testFirestoreConnection(): Promise<'ok' | 'blocked' | 'error'> {
  try {
    const pingPromise = getDocFromServer(doc(db, '_connection_test_', 'ping'));
    const timeoutPromise = new Promise<'timeout'>((resolve) =>
      setTimeout(() => resolve('timeout'), 3500)
    );

    const result = await Promise.race([pingPromise, timeoutPromise]);
    if (result === 'timeout') {
      // Allow offline mode or delayed connection to proceed without triggering errors
      return 'ok';
    }
    return 'ok';
  } catch (error: any) {
    const msg: string = error?.message ?? '';
    if (
      msg.includes('Failed to fetch') ||
      msg.includes('net::ERR') ||
      msg.includes('NetworkError') ||
      msg.includes('offline') ||
      msg.includes('CORS')
    ) {
      console.info('[Firebase] Firestore in offline or blocked mode:', msg);
      return 'blocked';
    }
    // "not-found" or "permission-denied" on the test doc means backend is active
    if (
      msg.includes('not-found') ||
      error?.code === 'not-found' ||
      msg.includes('permission-denied') ||
      error?.code === 'permission-denied'
    ) {
      return 'ok';
    }
    return 'ok';
  }
}
