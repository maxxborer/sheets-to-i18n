import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { writeTranslations } from '../src/core/output';

describe('writeTranslations', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 's2i-'));
  });

  it('пишет файлы переводов по локалям в json', () => {
    writeTranslations(dir, 'json', {
      en: { a: { b: 'x' } },
      ru: { a: { b: 'y' } },
    });
    const en = readFileSync(join(dir, 'en', 'translation.json'), 'utf8');
    const ru = readFileSync(join(dir, 'ru', 'translation.json'), 'utf8');

    expect(JSON.parse(en)).toEqual({ a: { b: 'x' } });
    expect(JSON.parse(ru)).toEqual({ a: { b: 'y' } });
    rmSync(dir, { recursive: true, force: true });
  });

  it('поддерживает кастомное имя файла', () => {
    writeTranslations(
      dir,
      'json',
      {
        en: { a: { b: 'x' } },
      },
      'messages',
    );

    const en = readFileSync(join(dir, 'en', 'messages.json'), 'utf8');

    expect(JSON.parse(en)).toEqual({ a: { b: 'x' } });
    rmSync(dir, { recursive: true, force: true });
  });
});
