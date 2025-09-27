export function getSheetsApiUrl(spreadsheetId: string, range: string): string {
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`,
  );

  url.searchParams.set('majorDimension', 'ROWS');

  return url.toString();
}
