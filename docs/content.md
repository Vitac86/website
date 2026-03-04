# Контент

- Типы товаров: `content/types.json`.
- Категории: `content/categories.json`.
- Товары: `content/products/*.json`.

Обязательные поля товара:
`id`, `slug`, `name`, `synonyms`, `tags`, `type`, `category`, `shortDescription`, `description`, `specs`, `documents`, `image`.

Скрипт `npm run validate:content` проверяет:
- наличие обязательных полей,
- заполненность строк и массивов,
- уникальность `id` и `slug`.
