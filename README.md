# Company Site (MVP)
## Stack
Next.js + TypeScript + Tailwind + shadcn/ui
## Запуск
pnpm i
pnpm dev
## Контент
Товары лежат в `content/products/*.json`
## ENV
Скопируй `.env.example` → `.env.local` и заполни.
## Форма заявок
POST `/api/lead`
Провайдер выбирается через `LEAD_PROVIDER` (email/db/webhook)
