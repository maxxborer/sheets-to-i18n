import { parseArgs } from './core/argv';
import { loadConfig } from './core/config';
import { fetchSheetValues, getAccessToken } from './core/googleSheets';
import { error, info } from './utils/logger';
import { writeTranslations } from './core/output';
import { matrixToTranslations } from './core/transform';
import { ENV } from './env';

export async function runUpdate(argv: string[] = process.argv): Promise<void> {
  const args = parseArgs(argv);
  const config = loadConfig(args.configPath);

  if (args.sheetTitle) {
    config.source.sheetTitle = args.sheetTitle;
  }

  if (args.range) {
    config.source.range = args.range;
  }

  if (args.outDir) {
    config.output.directory = args.outDir;
  }

  if (args.format) {
    config.output.format = args.format;
  }

  info('Update started');

  try {
    const clientEmail = ENV.GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL;
    const privateKey = ENV.GOOGLE_SHEETS_LOCALES_PRIVATE_KEY;
    const spreadsheetId = config.source.spreadsheetId;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      throw new Error('Missing GOOGLE_SHEETS_CLIENT_EMAIL/PRIVATE_KEY or spreadsheetId');
    }
    const token = await getAccessToken({ clientEmail, privateKey });
    const range = config.source.range ?? (config.source.sheetTitle ? `${config.source.sheetTitle}!A:Z` : 'A:Z');
    const values = await fetchSheetValues({ spreadsheetId, range }, token);
    const translations = matrixToTranslations(values);

    writeTranslations(config.output.directory, config.output.format, translations, config.output.fileName);
  } catch (err) {
    error('Update error:', err);
    throw err;
  }
  info('Update finished');
}
