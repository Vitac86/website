# Спецификация MVP

## Страницы
- `/` — Hero, типы товаров, форма консультации.
- `/produkciya` — типы и категории с переходом в каталог.
- `/katalog` — список товаров с query-параметрами `q`, `type`, `category`.
- `/tovar/[slug]` — карточка товара.
- `/o-kompanii`, `/kontakty`, `/konsultaciya`, `/privacy`, `/consent`.

## API
- `POST /api/lead` — валидация, honeypot, rate-limit, dispatch провайдера.
