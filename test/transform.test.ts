import { describe, expect, it } from 'vitest';
import { matrixToTranslations } from '../src/core/transform';

describe('matrixToTranslations', () => {
  it('строит вложенные ключи и распределяет по локалям', () => {
    const values = [
      ['key', 'en', 'ru'],
      ['app.title', 'My App', 'Моё приложение'],
      ['app.greeting.hey', 'Hey', 'Привет'],
      ['app.cta.submit', 'Submit', 'Отправить'],
      ['empty.value', '', ''],
    ];
    const result = matrixToTranslations(values);

    expect(result.en).toEqual({
      app: {
        title: 'My App',
        greeting: { hey: 'Hey' },
        cta: { submit: 'Submit' },
      },
    });

    expect(result.ru).toEqual({
      app: {
        title: 'Моё приложение',
        greeting: { hey: 'Привет' },
        cta: { submit: 'Отправить' },
      },
    });
  });
});
