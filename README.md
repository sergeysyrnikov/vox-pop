## Vox‑pop

Система пользовательских опросов (UGC). Frontend на **Next.js 16 (App Router)**.

### Стек

- **Next.js 16 / React 19** (App Router, серверные и клиентские компоненты)
- **Tailwind CSS 4**
- **shadcn/ui**, Radix UI
- **Axios** для работы с API

### Основные возможности

- Регистрация и авторизация пользователя (`/register`, `/login`)
- Список опросов пользователя и публичных опросов (`/surveys`)
- Просмотр и прохождение опроса (`/surveys/[id]`)
- Страница редактирования опроса (`/surveys/[id]/edit`)
- Создание нового опроса (`/surveys/new`)

### Запуск проекта

1. Установить зависимости:

```bash
npm install
```

2. Создать файл окружения:

```bash
cp .env.example .env.local
```

И задать значения переменных (как минимум):

- `BACKEND_API_URL` — базовый URL backend‑API (например, `http://127.0.0.1:8050/`)

3. Запустить dev‑сервер:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

### Полезные скрипты

- `npm run dev` — запуск dev‑сервера Next.js
- `npm run build` — production‑сборка
- `npm run start` — запуск production‑сборки
- `npm run lint` — запуск ESLint
- `npm run format` — автоформатирование кода Prettier
- `npm run format:check` — проверка форматирования без изменения файлов

### Архитектура

- `src/app` — маршруты и страницы (Next.js App Router)
  - `page.js` — корневая страница
  - `surveys/page.js` — список опросов
  - `surveys/[id]/page.js` — просмотр/прохождение опроса
  - `surveys/[id]/edit/page.js` — редактирование опроса
  - `surveys/new/page.js` — создание опроса
  - `login/page.js`, `register/page.js` — страницы аутентификации
- `src/components` — презентационные и контейнерные компоненты (например, `SurveyCard`)
- `src/components/ui` — обёртки над shadcn/ui
- `src/services` — работа с API (например, `authService`, `surveyService`)
- `src/lib` — вспомогательные модули (`axios`‑клиент, утилиты)

### Переменные окружения

Все переменные для разработки задаются в `.env.local`.  
Переменные с префиксом `NEXT_PUBLIC_` доступны на клиенте, остальные — только на сервере.

Пример (см. `.env.example`):

```env
BACKEND_API_URL=http://127.0.0.1:8050/
```

### Стиль кода

- JavaScript/React по правилам **Standard.js** (2 пробела, одинарные кавычки, без точек с запятой)
- Форматирование через **Prettier**
- Линтинг через **ESLint + eslint-config-next**

