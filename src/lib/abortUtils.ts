/**
 * Utility to reliably detect benign AbortErrors and Firebase popup/assertion
 * lifecycle events across browser engines, DOMExceptions, React StrictMode
 * unmount cycles, and network controllers.
 */

export const isFirebaseAuthBenignError = (err: any): boolean => {
  if (!err) return false;
  if (
    err.code === 'auth/cancelled-popup-request' ||
    err.code === 'auth/popup-blocked' ||
    err.code === 'auth/popup-closed-by-user'
  ) {
    return true;
  }

  const pieces: string[] = [];
  try {
    if (typeof err === 'string') pieces.push(err);
    if (err.code) pieces.push(String(err.code));
    if (err.name) pieces.push(String(err.name));
    if (err.message) pieces.push(String(err.message));
    if (err.reason) pieces.push(typeof err.reason === 'string' ? err.reason : String(err.reason?.message || err.reason?.name || err.reason));
    if (err.error) pieces.push(typeof err.error === 'string' ? err.error : String(err.error?.message || err.error?.name || err.error));
    if (err.cause) pieces.push(typeof err.cause === 'string' ? err.cause : String(err.cause?.message || err.cause?.name || err.cause));
    pieces.push(String(err));
  } catch {
    // Ignore extraction failure
  }

  const combined = pieces.join(' ').toLowerCase();
  return (
    combined.includes('cancelled-popup-request') ||
    combined.includes('popup-blocked') ||
    combined.includes('popup-closed-by-user') ||
    combined.includes('pending promise was never set') ||
    combined.includes('internal assertion failed')
  );
};

export const isAbortError = (err: any): boolean => {
  if (!err) return false;
  if (
    err.name === 'AbortError' ||
    err.name === 'CanceledError' ||
    err.name === 'AbortSignal' ||
    err.code === 20 ||
    err.code === 'ERR_CANCELED' ||
    err.code === 'ABORT_ERR' ||
    err.signal?.aborted === true
  ) {
    return true;
  }

  // Extract all potential string representations
  const pieces: string[] = [];
  try {
    if (typeof err === 'string') pieces.push(err);
    if (err.code) pieces.push(String(err.code));
    if (err.name) pieces.push(String(err.name));
    if (err.message) pieces.push(String(err.message));
    if (err.reason) pieces.push(typeof err.reason === 'string' ? err.reason : String(err.reason?.message || err.reason?.name || err.reason));
    if (err.error) pieces.push(typeof err.error === 'string' ? err.error : String(err.error?.message || err.error?.name || err.error));
    if (err.cause) pieces.push(typeof err.cause === 'string' ? err.cause : String(err.cause?.message || err.cause?.name || err.cause));
    if (err.type) pieces.push(String(err.type));
    pieces.push(String(err));
  } catch {
    // Ignore extraction failure
  }

  const combined = pieces.join(' ').toLowerCase();
  return (
    combined.includes('abort') ||
    combined.includes('aborted') ||
    combined.includes('cancel') ||
    combined.includes('cancelled') ||
    combined.includes('interrupted') ||
    combined.includes('user aborted') ||
    combined.includes('the user aborted a request') ||
    combined.includes('signal is aborted') ||
    combined.includes('signal is aborted without reason') ||
    combined.includes('component unmounted') ||
    combined.includes('new chat message sent') ||
    combined.includes('new search started') ||
    combined.includes('new api test started') ||
    combined.includes('user stopped response') ||
    combined.includes('user stopped analysis') ||
    isFirebaseAuthBenignError(err)
  );
};

export const formatFriendlyFetchError = (err: any, fallbackMessage: string = "Une erreur est survenue."): string => {
  if (!err) return fallbackMessage;
  const msg = String(err?.message || err?.error || err || '');
  const lower = msg.toLowerCase();
  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('load failed')) {
    return "La connexion au serveur a été temporairement interrompue. Veuillez relancer votre demande.";
  }
  return err?.message || fallbackMessage;
};

export const isFirestoreBenignError = (err: any): boolean => {
  if (!err) return false;
  const pieces: string[] = [];
  try {
    if (typeof err === 'string') pieces.push(err);
    if (err.code) pieces.push(String(err.code));
    if (err.name) pieces.push(String(err.name));
    if (err.message) pieces.push(String(err.message));
    if (err.reason) pieces.push(typeof err.reason === 'string' ? err.reason : String(err.reason?.message || err.reason?.name || err.reason));
    if (err.error) pieces.push(typeof err.error === 'string' ? err.error : String(err.error?.message || err.error?.name || err.error));
    if (err.cause) pieces.push(typeof err.cause === 'string' ? err.cause : String(err.cause?.message || err.cause?.name || err.cause));
    pieces.push(String(err));
  } catch {
    // Ignore extraction failure
  }

  const combined = pieces.join(' ').toLowerCase();
  return (
    combined.includes('could not reach cloud firestore backend') ||
    combined.includes("backend didn't respond within 10 seconds") ||
    combined.includes('client will operate in offline mode') ||
    combined.includes('the client is offline') ||
    combined.includes('failed to get document because the client is offline')
  );
};

export const isBenignError = (err: any): boolean => {
  return isAbortError(err) || isFirebaseAuthBenignError(err) || isFirestoreBenignError(err);
};

