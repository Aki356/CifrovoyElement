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
