import { auth, googleProvider, getAccessToken, setCachedAccessToken } from './firebase';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
}

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/documents.readonly',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
];

/**
 * Sign in with Google requesting Workspace Scopes (Drive, Docs, Sheets)
 */
export async function connectGoogleWorkspace(): Promise<{ user: User; accessToken: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    
    if (!token) {
      throw new Error("Impossible d'obtenir le jeton d'accès Google Workspace.");
    }
    
    setCachedAccessToken(token);
    return { user: result.user, accessToken: token };
  } catch (error: any) {
    console.error('[Google Workspace Auth Error]', error);
    throw error;
  }
}

export interface GoogleDriveFilesResponse {
  files: GoogleDriveFile[];
  nextPageToken?: string;
}

/**
 * Fetch files directly from user's Google Drive via Drive v3 API
 * Supports shared drives, team drives, and pagination.
 */
export async function fetchGoogleDriveFiles(
  query?: string,
  pageSize: number = 50,
  pageToken?: string
): Promise<GoogleDriveFilesResponse> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('AUTH_REQUIRED');
  }

  let q = "trashed = false";
  if (query && query.trim()) {
    const escaped = query.replace(/'/g, "\\'");
    q += ` and (name contains '${escaped}' or fullText contains '${escaped}')`;
  }

  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.set('q', q);
  url.searchParams.set('pageSize', Math.min(pageSize, 100).toString());
  url.searchParams.set('fields', 'nextPageToken, files(id, name, mimeType, modifiedTime, size, webViewLink, iconLink, thumbnailLink)');
  url.searchParams.set('orderBy', 'modifiedTime desc');
  url.searchParams.set('supportsAllDrives', 'true');
  url.searchParams.set('includeItemsFromAllDrives', 'true');

  if (pageToken) {
    url.searchParams.set('pageToken', pageToken);
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  } catch (netErr: any) {
    throw new Error("Impossible de joindre les serveurs Google Drive. Veuillez vérifier votre connexion.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      setCachedAccessToken(null);
      throw new Error('AUTH_REQUIRED');
    }
    const errText = await response.text();
    throw new Error(`Erreur Google Drive API (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken || undefined,
  };
}

/**
 * Read text content from a Google Doc using Docs v1 API
 */
export async function fetchGoogleDocContent(docId: string): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('AUTH_REQUIRED');
  }

  let response: Response;
  try {
    response = await fetch(`https://docs.googleapis.com/v1/documents/${docId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  } catch (netErr: any) {
    throw new Error("Impossible de joindre les serveurs Google Docs. Veuillez vérifier votre connexion.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      setCachedAccessToken(null);
      throw new Error('AUTH_REQUIRED');
    }
    throw new Error(`Impossible de lire le Google Doc (${response.status})`);
  }

  const doc = await response.json();
  const bodyContent = doc.body?.content || [];
  let extractedText = '';

  for (const element of bodyContent) {
    if (element.paragraph?.elements) {
      for (const pElem of element.paragraph.elements) {
        if (pElem.textRun?.content) {
          extractedText += pElem.textRun.content;
        }
      }
    }
  }

  return extractedText;
}

/**
 * Read spreadsheet data from Google Sheets v4 API
 */
export async function fetchGoogleSheetData(sheetId: string, range: string = 'A1:Z100'): Promise<string[][]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('AUTH_REQUIRED');
  }

  const encodedRange = encodeURIComponent(range);
  let response: Response;
  try {
    response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  } catch (netErr: any) {
    throw new Error("Impossible de joindre les serveurs Google Sheets. Veuillez vérifier votre connexion.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      setCachedAccessToken(null);
      throw new Error('AUTH_REQUIRED');
    }
    throw new Error(`Impossible de lire la feuille de calcul Google Sheets (${response.status})`);
  }

  const data = await response.json();
  return data.values || [];
}
