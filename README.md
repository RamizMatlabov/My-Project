# My-Project

Клиентское приложение на Next.js (App Router) для заказа питьевой воды. Использует React, модульные SCSS-стили, Firebase (Auth + Firestore) и EmailJS для отправки сообщений.

## Требования
- Node.js
- npm (или pnpm/yarn/bun)

## Установка
- Установить зависимости:

```bash
npm install
```

## Переменные окружения
- Создайте файл .env.local в корне проекта и добавьте значения Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- Конфигурация читается в [config.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/firebase/config.jsx#L9-L16) и инициализирует Auth/Firestore.

## Скрипты
- Разработка: `npm run dev` (Turbopack, порт 3000)
- Сборка: `npm run build`
- Прод-старт: `npm run start`
- Линт: `npm run lint`

## Запуск локально
- Стартовать dev-сервер и открыть http://localhost:3000:

```bash
npm run dev
```

## Структура
- Приложение (App Router): [app](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app)
  - Макет: [layout.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app/layout.jsx)
  - Главная: [page.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app/page.jsx)
  - Разделы: [products/page.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app/products/page.jsx), [order/page.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app/order/page.jsx), [types/page.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app/types/page.jsx)
- Компоненты: [src/components](file:///c:/Users/User/Desktop/IceWater/My-Project/src/components), например [Navigation.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/components/Navigation/Navigation.jsx)
- Стили: модульные SCSS и глобальные файлы в [src/styles](file:///c:/Users/User/Desktop/IceWater/My-Project/src/styles) и [src/app/globals.scss](file:///c:/Users/User/Desktop/IceWater/My-Project/src/app/globals.scss)
- Статика: [public](file:///c:/Users/User/Desktop/IceWater/My-Project/public) (иконки, изображения)
- Firebase: [src/firebase/config.jsx](file:///c:/Users/User/Desktop/IceWater/My-Project/src/firebase/config.jsx)

## Деплой
- Сборка: `npm run build`
- Прод-запуск: `npm run start`
- Подходит для деплоя на Vercel/любом Node-хостинге (переменные окружения обязательны).

## Используемые технологии
- Next.js 15 (App Router)
- React 19
- Firebase (Auth, Firestore)
- EmailJS (@emailjs/browser)
- Sass (SCSS-модули)
