# Automation Landing

Сборка: **Vite + SCSS + PostCSS (autoprefixer) + ESLint (Digital Element)**.  
Верстка по БЭМ, адаптив до 360px. Модалка Let’s Talk с кастомной валидацией, отправкой и тостом.

## Требования
- Node.js 18+
- npm (или pnpm/yarn)

## Установка
```bash
npm i
```

## Скрипты
```bash
npm run dev      # dev-сервер
npm run build    # production сборка в dist/
npm run preview  # локальный просмотр dist
npm run lint     # проверка кода ESLint
npm run lint:fix # автоисправление
```

## Где менять URL отправки формы
`src/js/form.js` → свойство `endpoint`. По умолчанию: `https://httpbin.org/post`.

## Затраченное время на выполнение (считается с адаптивом и scss)
Верстка сделана по методологии БЭМ с pixel-perfect
- Блок hero около 5 часов
- Блок what we do примерно 4 часа
- Блок our client 5 часа
- Футер 4 часа
- Модальное окно около 2 часов
- Структура проекта (сборка vite, PostCSS, ESLint и т.д.) примерно 2 часа
- Правки после первой проверки около 5 часов

Итого: около 27 часов
