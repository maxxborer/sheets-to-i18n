export function setEnvDefaults(options?: { force?: boolean }): void {
  const force = options?.force === true;

  if (force || process.env.GOOGLE_SHEETS_LOCALES_FILE_ID == null) {
    process.env.GOOGLE_SHEETS_LOCALES_FILE_ID = 'sheet-id';
  }

  if (force || process.env.GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL == null) {
    process.env.GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL = 'test@example.com';
  }

  if (force || process.env.GOOGLE_SHEETS_LOCALES_PRIVATE_KEY == null) {
    process.env.GOOGLE_SHEETS_LOCALES_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----';
  }
}
