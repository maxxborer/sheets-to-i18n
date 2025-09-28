# sheets-to-i18n

[![npm version](https://img.shields.io/npm/v/sheets-to-i18n?color=blue)](https://www.npmjs.com/package/sheets-to-i18n)
[![CI](https://github.com/maxxborer/sheets-to-i18n/actions/workflows/ci.yml/badge.svg)](https://github.com/maxxborer/sheets-to-i18n/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 Generates translations from your Google Sheets 📑

## Быстрый старт (через npx)

```bash
npx sheets-to-i18n update
```

### Кастомный путь к конфигу

Можно указать свой путь к конфигу:

```bash
npx sheets-to-i18n update --config ./config/sheets-to-i18n.config.json
```

Также можно указать путь через ENV:

```bash
export SHEETS_TO_I18N_CONFIG=./config/sheets-to-i18n.config.json
# или короткий алиас
export S2I_CONFIG=./config/sheets-to-i18n.config.json

npx sheets-to-i18n update
```

## Формат Google Sheets

Ожидается таблица на первом листе (или укажите `sheetTitle`/`range`):

```text
| key               | en           | ru             | de         |
|-------------------|--------------|----------------|------------|
| app.title         | My App       | Моё приложение | Meine App  |
| app.greeting.hey  | Hey          | Привет         | Hey        |
| app.cta.submit    | Submit       | Отправить      | Senden     |
```

- Первая строка — заголовки. Первый столбец — `key`, далее — коды локалей в любом количестве.
- В строках ниже: в первой ячейке вложенный ключ через точку, далее — переводы по соответствующим локалям.
- Пустые значения игнорируются.

## Выходные файлы

По умолчанию создаются файлы в формате `public/locales/<locale>/<fileName>.<format>`, где:

- `<locale>` — код языка из Google Sheets (en, ru, de, etc.)
- `<fileName>` — настраиваемое имя файла (по умолчанию `translation`)
- `<format>` — один из поддерживаемых форматов

**Поддерживаемые форматы:**

- `json`: `translation.json` — обычный JSON: `{"key": "value"}`
- `cjs`: `translation.cjs` — CommonJS: `module.exports = {"key": "value"}`
- `js`: `translation.js` — ES Module: `export default {"key": "value"}`
- `ts`: `translation.ts` — TypeScript: `export default {"key": "value"} as const`

**Примеры путей к файлам:**

```shell
public/locales/en/translation.json   # по умолчанию
public/locales/ru/messages.json      # кастомное имя fileName="messages"
public/locales/de/i18n.ts            # кастомное имя + TypeScript формат
```

## Конфигурация (временная через ENV)

**Обязательные переменные:**

- `GOOGLE_SHEETS_LOCALES_FILE_ID` — ID таблицы.
- `GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL` — email сервис-аккаунта.
- `GOOGLE_SHEETS_LOCALES_PRIVATE_KEY` — приватный ключ, переносы как `\n`.

**Дополнительные настройки:**

- `SHEETS_TO_I18N_FILE_NAME` (или короткий алиас `S2I_FILE_NAME`) — имя файла без расширения (по умолчанию
  `translation`).

**Пример использования:**

```bash
export SHEETS_TO_I18N_FILE_NAME=messages
export GOOGLE_SHEETS_LOCALES_FILE_ID=your_sheet_id
export GOOGLE_SHEETS_LOCALES_CLIENT_EMAIL=your_service_account@email.com
export GOOGLE_SHEETS_LOCALES_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

npx sheets-to-i18n update
# Создаст файлы: public/locales/en/messages.json, public/locales/ru/messages.json, etc.
```

## Конфиг‑файл (опционально)

Создайте `sheets-to-i18n.config.json` в корне проекта:

```json
{
  "source": {
    "spreadsheetId": "1ABC...XYZ",
    "sheetTitle": "Sheet1",
    "range": "A:Z"
  },
  "output": {
    "directory": "public/locales",
    "format": "json",
    "fileName": "translation"
  }
}
```

**Примеры различных конфигураций:**

```json
{
  "output": {
    "directory": "src/i18n",
    "format": "ts",
    "fileName": "messages"
  }
}
```

☝️ Создаст файлы: `src/i18n/en/messages.ts`, `src/i18n/ru/messages.ts`

```json
{
  "output": {
    "directory": "locales",
    "format": "cjs",
    "fileName": "translations"
  }
}
```

☝️ Создаст файлы: `locales/en/translations.cjs`, `locales/ru/translations.cjs`

CLI-флаги перекрывают конфиг. ENV перекрывает дефолты конфига, если ключи в конфиге отсутствуют. Путь можно задать
флагом `--config`.

## Разработка

### Для контрибьюторов

- 📋 [CONTRIBUTING.md](CONTRIBUTING.md) — как внести вклад в проект
- 🏗️ [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — архитектура и разработка

### Быстрый старт для разработки

```bash
# Установка зависимостей
nvm use && npm ci

# Разработка с hot reload
npm run dev

# Проверки (линт + тесты + сборка)
npm run verify

# Тесты с покрытием
npm run test:coverage
```

### Создание релизов

Релизы создаются **только через GitHub Actions** для максимального контроля и безопасности:

1. Перейдите в **Actions** → **"Release"**
2. Выберите тип версии: patch, minor или major
3. Нажмите **"Run workflow"**

Процесс полностью автоматизирован:

- Обновление package.json
- Создание коммита и тега
- Запуск CI для проверки
- Публикация в npm при успешном CI

⚡ **Автоматическая надежность**: при неуспешном CI тег и коммит автоматически удаляются.

**Примеры:**

- Patch релиз: выберите "patch" → создается v1.0.1
- Minor релиз: выберите "minor" → создается v1.1.0
- Major релиз: выберите "major" → создается v2.0.0

## Поддержка

Если этот инструмент полезен, вы можете поддержать разработку:

- GitHub Sponsors: <https://github.com/sponsors/maxxborer>
- Boosty: <https://boosty.to/maxxborer/donate>
