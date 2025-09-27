import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { FormatOption, TranslationsByLocale, TranslationTree } from '../types';
import { FORMAT_OPTIONS } from '../constants';

function ensureDir(path: string): void {
  const dir = dirname(path);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function serialize(format: FormatOption, tree: TranslationTree): string {
  if (format === FORMAT_OPTIONS.CJS) {
    return `module.exports = ${JSON.stringify(tree, null, 2)}\n`;
  }

  if (format === FORMAT_OPTIONS.JS) {
    return `export default ${JSON.stringify(tree, null, 2)}\n`;
  }

  if (format === FORMAT_OPTIONS.TS) {
    return `export default ${JSON.stringify(tree, null, 2)} as const\n`;
  }

  // JSON
  return `${JSON.stringify(tree, null, 2)}\n`;
}

export function writeTranslations(
  baseDir: string,
  format: FormatOption,
  data: TranslationsByLocale,
  customFileName?: string
): void {
  const baseName = customFileName || 'translation';

  for (const [locale, tree] of Object.entries(data)) {
    const fileName = format === FORMAT_OPTIONS.JSON ? `${baseName}.json` : `${baseName}.${format}`;
    const path = join(baseDir, locale, fileName);

    ensureDir(path);
    writeFileSync(path, serialize(format, tree));
  }
}
