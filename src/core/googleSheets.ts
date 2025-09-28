import { JWT } from 'google-auth-library';
import { DEFAULT_GOOGLE_JWT_SCOPES } from '../constants';
import { formatApiToken } from '../utils/formatApiToken';
import { getSheetsApiUrl } from '../utils/getSheetsApiUrl';

export interface GoogleAuthConfig {
  clientEmail: string;
  privateKey: string;
  scopes?: string[];
}

export interface FetchValuesInput {
  spreadsheetId: string;
  range: string; // e.g. Sheet1!A:Z or A:Z
}

export async function getAccessToken(config: GoogleAuthConfig): Promise<string> {
  const jwt = new JWT({
    email: config.clientEmail,
    key: config.privateKey.replaceAll('\\n', '\n'),
    scopes: config.scopes ?? DEFAULT_GOOGLE_JWT_SCOPES,
  });
  const token = await jwt.getAccessToken();

  if (!token || typeof token !== 'string') {
    throw new Error('Failed to obtain Google access token');
  }

  return token;
}

export async function fetchSheetValues(
  { spreadsheetId, range }: FetchValuesInput,
  accessToken: string,
): Promise<string[][]> {
  const response = await fetch(getSheetsApiUrl(spreadsheetId, range), {
    headers: { Authorization: formatApiToken(accessToken) },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets API error ${response.status}: ${await response.text()}`);
  }

  return ((await response.json()) as { values?: string[][] }).values ?? [];
}
