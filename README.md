# Company Site MVP

MVP корпоративного сайта на Next.js (App Router) с каталогом, поиском и формой консультации.

## Стек
- Next.js + TypeScript
- TailwindCSS
- JSON-контент (`content/*`)
- Cloudflare Turnstile
- Upstash Redis REST API

## Запуск локально
1. Установите зависимости:
   ```bash
   pnpm i
   ```
2. Скопируйте `.env.example` в `.env.local` и заполните переменные.
3. Запустите проект:
   ```bash
   pnpm dev
   ```

## Где хранится контент
- Типы: `content/types.json`
- Категории: `content/categories.json`
- Товары: `content/products/*.json`

## Поиск
- Поле поиска в шапке на всех страницах.
- Подсказки до 8 результатов.
- Поддержка Enter / Arrow Up / Arrow Down / Escape.
- Ссылка «Показать все результаты» ведёт на `/katalog?q=...`.

## API заявок
`POST /api/lead`

Тело:
```json
{
  "name": "Иван",
  "phone": "+79000000000",
  "consent": true,
  "company": "",
  "turnstileToken": "token-from-widget",
  "formStartedAt": 1730000000000
}
```

### Антиспам-механизмы
- Honeypot `company`: заполненное поле приводит к soft-drop (`{ ok: true }`).
- Cloudflare Turnstile: токен обязателен, сервер валидирует его через Siteverify.
- Redis rate limit: до 5 запросов за 30 минут на один IP (sliding window).
- Min-fill-time + sanity timestamp: слишком быстрое заполнение, timestamp из будущего, слишком старый timestamp (>24ч), отсутствующий или невалидный `formStartedAt` приводят к soft-drop.
- Дедупликация `name + phone`: атомарный Redis-резерв слота (1-я и 2-я заявки за окно проходят, 3-я и далее soft-drop на 24 часа).

### Порядок обработки
1. Определение IP (`cf-connecting-ip` → `x-real-ip` → `x-forwarded-for` → `anonymous`).
2. Redis rate limit.
3. JSON parse.
4. Honeypot.
5. Базовая валидация полей.
6. Turnstile Siteverify.
7. Min-fill-time.
8. Дедупликация (атомарный reserve в Redis).
9. Отправка в provider (`email|db|webhook`). При ошибке provider резерв дедупликации откатывается.

### Провайдеры
Провайдер выбирается через `LEAD_PROVIDER` (`email|db|webhook`):
- `email`: серверный лог-заглушка.
- `webhook`: POST на `WEBHOOK_URL`.
- `db`: заглушка-экспорт.

## ENV переменные
- `LEAD_PROVIDER`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_TO`
- `WEBHOOK_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` *(обязательна для клиентского виджета формы)*
- `TURNSTILE_SECRET_KEY` *(обязательна для серверной валидации Turnstile)*
- `UPSTASH_REDIS_REST_URL` *(обязательна для rate-limit и дедупликации)*
- `UPSTASH_REDIS_REST_TOKEN` *(обязательна для rate-limit и дедупликации)*
- `LEAD_RATE_LIMIT_MAX` (по умолчанию `5`)
- `LEAD_RATE_LIMIT_WINDOW` (по умолчанию `30 m`)
- `LEAD_MIN_FILL_MS` (по умолчанию `3000`)
- `LEAD_DUPLICATE_WINDOW_HOURS` (по умолчанию `24`)
- `LEAD_DUPLICATE_MAX_ACCEPTED` (по умолчанию `2`)

## Настройка Turnstile и Redis
- **Turnstile**: создайте сайт в Cloudflare Turnstile, сохраните site key и secret key в env.
- **Redis/Upstash**: создайте базу в Upstash Redis и заполните `UPSTASH_REDIS_REST_URL` и `UPSTASH_REDIS_REST_TOKEN`.

## Поведение при неполной конфигурации
- Если Redis или Turnstile secret key не настроены, API заявок отвечает контролируемой ошибкой `503` с сообщением о проблеме конфигурации (без runtime-crash на клиенте).
- Если на клиенте не задан `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, виджет не инициализируется, кнопка отправки блокируется и показывается явная причина недоступности.
- Если скрипт Turnstile не загрузился или инициализация виджета завершилась ошибкой, форма не падает: отображается контролируемое сообщение, отправка блокируется до восстановления проверки.
