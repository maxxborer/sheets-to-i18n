# Руководство для разработчиков

## Архитектура

- `src/cli.ts` — входная точка CLI, читает аргументы и вызывает `runUpdate`.
- `src/index.ts` — оркестратор: читает конфиг, получает токен, читает данные из Sheets, трансформирует, пишет файлы.
- `src/core/*` — основные модули домена:
  - `argv.ts` — парсинг аргументов CLI
  - `config.ts` — загрузка конфига из файла и ENV, мердж приоритетов
  - `googleSheets.ts` — получение Access Token (JWT), чтение значений через Google Sheets API
  - `transform.ts` — конвертация матрицы (первая строка — заголовки) в дерево переводов по локалям
  - `output.ts` — сериализация (json/cjs/js/ts) и запись файлов `public/locales/<locale>/<fileName>.*`
- `src/utils/*` — вспомогательные утилиты:
  - `nested.ts` — запись значения по вложенному ключу через точку
  - `logger.ts` — прокси для логирования
  - `formatApiToken.ts` — форматирование API токена
  - `getSheetsApiUrl.ts` — генерация URL для Google Sheets API
  - `types.ts` — вспомогательные типы
- `src/env.ts` — схема и валидация ENV переменных
- `src/types.ts` — основные типы проекта
- `src/constants.ts` — константы проекта

## Локальная разработка

1. Установите Node через nvm: `nvm use`
2. Установите зависимости: `npm ci`
3. Сборка: `npm run build` или watch: `npm run dev`
4. Проверки: `npm run verify` (линт + тесты + сборка)
5. Тесты: `npm test`, покрытие: `npm run test:coverage`

## Конфигурация и ENV

Приоритет (от высокого к низкому):

1. CLI флаги (`--config`, `--sheet`, `--range`, `--out-dir`, `--format`)
2. ENV `SHEETS_TO_I18N_CONFIG` или `S2I_CONFIG` (путь к конфигу)
3. ENV с префиксом `GOOGLE_SHEETS_LOCALES_*` (ID, E-mail, Private Key)
4. ENV `SHEETS_TO_I18N_FILE_NAME` или `S2I_FILE_NAME` (имя файла без расширения)
5. Файл `sheets-to-i18n.config.json` в проекте

Legacy ENV (`GOOGLE_SHEETS_*` без `LOCALES_`) поддерживаются с предупреждением.

## Тестирование

- Фреймворк: `vitest` (Node environment).
- Тесты лежат в `test/*.test.ts`.
- Для моков используйте `vi.mock` и при необходимости `vi.hoisted` (моки должны определяться до загрузки тестируемых модулей).
- Для файловой системы используйте временные директории (`tmpdir()`, `mkdtempSync`) и очищайте их.

## Стиль кода

- TypeScript, избегать `any`.
- ESLint + Prettier (`eslint.config.js`).
- Соблюдать правила линтера; не отключать без причины.

## Коммиты и релизы

- Формат коммитов — Conventional Commits:
  - `feat: ...` — новая функциональность
  - `fix: ...` — исправление багов
  - `docs: ...` — документация
  - `chore: ...`, `refactor: ...`, `test: ...` и т.д.
- Релизы — `semantic-release` (см. `.releaserc.json`):
  - Анализ коммитов, генерация релиз-нотов, обновление `CHANGELOG.md`
  - Публикация на GitHub и в npm
- Триггер релиза: push в ветку `main` (см. `.github/workflows/release.yml`).
- Локальная проверка релиза (без публикации): `npx semantic-release --dry-run`

## CI/CD

- CI (`.github/workflows/ci.yml`): Node из `.nvmrc`, кеш npm, `npm run verify`, покрытие.
- Release (`.github/workflows/release.yml`): `semantic-release` с `GITHUB_TOKEN` и `NPM_TOKEN`.
- Dependabot (`.github/dependabot.yml`) для обновления зависимостей.

## Code Review и приём MR

Чек-лист для авторов и ревьюеров:

- [ ] Коммиты в формате Conventional Commits
- [ ] Проходят проверки CI (`npm run verify`)
- [ ] Добавлены тесты для новой логики/регрессии
- [ ] Обновлена документация (`README.md`/`docs/*`) при необходимости
- [ ] Нет избыточных изменений форматирования
- [ ] Имена переменных и функций — осмысленные и понятные

## Как добавить новую функциональность

1. Создайте ветку: `git checkout -b feat/short-title`
2. Реализуйте изменения внутри соответствующих модулей `src/core/*` или оркестратора `src/index.ts`
3. Добавьте/обновите тесты в `test/`
4. Запустите локально: `nvm use && npm ci && npm run verify`
5. Откройте PR и опишите изменения, мотивацию и влияние

## Поддержка и безопасность

- Поддерживайте зависимости в актуальном состоянии (Dependabot PR).
- При необходимости можно подключить CodeQL/Snyk и добавить `SECURITY.md`.
