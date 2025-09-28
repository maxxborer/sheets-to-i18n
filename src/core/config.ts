import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { DEFAULT_FILE_NAME, DEFAULT_OUTPUT_DIRECTORY, FORMAT_OPTIONS } from '../constants';
import { ENV } from '../env';
import { SheetsToI18nConfig } from '../types';

export function loadConfigFromEnv(): SheetsToI18nConfig {
  return {
    source: {
      spreadsheetId: ENV.GOOGLE_SHEETS_LOCALES_FILE_ID,
    },
    output: {
      directory: DEFAULT_OUTPUT_DIRECTORY,
      format: FORMAT_OPTIONS.JSON,
      fileName: ENV.SHEETS_TO_I18N_FILE_NAME || ENV.S2I_FILE_NAME || DEFAULT_FILE_NAME,
    },
  };
}

export function loadUserConfig(customPath?: string): Partial<SheetsToI18nConfig> {
  try {
    const cwd = process.cwd();

    const resolvedPath = customPath
      ? isAbsolute(customPath)
        ? customPath
        : join(cwd, customPath)
      : join(cwd, 'sheets-to-i18n.config.json');

    if (existsSync(resolvedPath)) {
      const raw = readFileSync(resolvedPath, 'utf8');

      return JSON.parse(raw) as Partial<SheetsToI18nConfig>;
    }
  } catch {
    // ignore
  }

  return {};
}

export function loadConfig(customPath?: string): SheetsToI18nConfig {
  const envConfig = loadConfigFromEnv();
  const fileConfig = loadUserConfig(customPath || ENV.SHEETS_TO_I18N_CONFIG || ENV.S2I_CONFIG);

  const merged: SheetsToI18nConfig = {
    source: {
      spreadsheetId: fileConfig.source?.spreadsheetId || envConfig.source.spreadsheetId,
      sheetTitle: fileConfig.source?.sheetTitle ?? envConfig.source.sheetTitle,
      range: fileConfig.source?.range ?? envConfig.source.range,
    },
    output: {
      directory: fileConfig.output?.directory || envConfig.output.directory,
      format: fileConfig.output?.format || envConfig.output.format,
      fileName: fileConfig.output?.fileName || envConfig.output.fileName,
    },
  };

  return merged;
}
