# Company Site MVP

MVP корпоративного сайта на Next.js (App Router) с каталогом, поиском и формой консультации.

## Стек
- Next.js + TypeScript
- TailwindCSS
- JSON-контент (`content/*`)

## Запуск
```bash
pnpm i
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
  "company": ""
}
```

Поведение:
- Валидация name/phone/consent.
- Honeypot `company` (заполнено => reject).
- Простой in-memory rate limit по IP.
- Провайдер через `LEAD_PROVIDER` (`email|db|webhook`).
  - `email`: серверный лог-заглушка.
  - `webhook`: POST на `WEBHOOK_URL`.
  - `db`: заглушка-экспорт.
