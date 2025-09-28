import type { TranslationsByLocale } from '../types';
import { assignNestedValue } from '../utils/nested';

function initializeLocales(locales: string[]): TranslationsByLocale {
  const translations: TranslationsByLocale = {};

  for (const locale of locales) {
    if (locale) {
      translations[locale] = {};
    }
  }

  return translations;
}

function processTranslationRow(row: string[], header: string[], translations: TranslationsByLocale): void {
  const key = row[0];

  if (!key) {
    return;
  }

  for (let col = 1; col < header.length; col++) {
    const locale = header[col];
    const value = row[col];

    if (!locale || !value) {
      continue;
    }

    const bucket = translations[locale];

    if (bucket && typeof bucket === 'object') {
      assignNestedValue(bucket as Record<string, import('../types').TranslationTree>, key, value);
    }
  }
}

export function matrixToTranslations(values: string[][]): TranslationsByLocale {
  if (values.length === 0) {
    return {};
  }

  const [header, ...rows] = values;

  if (!header || header.length < 2) {
    return {};
  }

  const [keyHeader, ...locales] = header;

  if (!keyHeader) {
    return {};
  }

  const translations = initializeLocales(locales);

  for (const row of rows) {
    processTranslationRow(row, header, translations);
  }

  return translations;
}
