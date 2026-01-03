This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Продовжено роботу над проєктом NoteHub, зосередившись на переходi на новий бекенд з авторизацією, який підтримує: захищені маршрути, токени, що зберігаються в куках, перевірку доступу до даних користувача. </br>
Попереднiй https://github.com/id753/08-zustand </br>
...................................................................................... </br>
Використано новий бекенд з авторизацією, який підтримує:</br>

    - Захищені маршрути (доступ лише для авторизованих користувачів)</br>
    - Токени, що зберігаються в куках</br>
    - Перевірку доступу до даних користувача</br>

Розділено маршрути на приватні та публічні</br>
Навігація по сторінкам AuthNavigation</br>
Сторінка профілю користувача. Додано на сторінку профілю усі небхідні meta-теги.</br>

Робота з API. Усі функції для роботи з API розділіть на три файли:</br>
     
     - для створення одного спільного екземпляра axios, з налаштуванням withCredentials: true для підтримки cookies;</br>
     - для функцій, які викликаються у клієнтських компонентах;</br>
     - для функцій, які викликаються у серверних компонентах.</br>

Сторінка реєстрації. Форма має надсилати запит до API з підтримкою cookies.</br>
Сторінка автентифікації. Форма має надсилати запит до API з підтримкою cookies.</br>
Перевірка авторизації.</br>
Для перевірки та зберігання стану авторизації створено Zustand-стор.</br>
Навігація в AuthNavigation.</br>
Внесено зміни в компонент AuthNavigation, щоб додати динамічну логіку залежно від статусу авторизації користувача та можливості перемикатися між новими сторінками.</br>
Захист маршрутів. Додано захист маршрутів на рівні Proxy. Налаштовано перевірку токенів у cookies: якщо неавторизований користувач намагається відкрити приватну сторінку — його перенаправляє на сторінку входу. Якщо авторизований користувач відкриває публічну сторінку — його перенаправляє на профіль.</br>
Сторінка редагування профілю.</br>
...................................................................................... </br>
   Проект розгорнуту на Vercel.</br>
    Проєкт створено за допомогою Next.js (App Router).</br>
    Усі компоненти, які не прив'язані безпосередньо до маршруту та їх частин, зберігаються в папці components, кожен — у власній папці.</br>
    Загальні типи та інтерфейси винесені до файлів types/note.ts, types/user.ts.</br>
    Функції роботи з API винесені в lib/api/ у вигляді окремих модулів.</br>
    Для HTTP-запитів використовується бібліотека axios.</br>
    Стан запитів у CSR-компонентах керується через TanStack Query (React Query).</br>
    Усі компоненти типізовані з використанням TypeScript.</br>
    Код відформатований за допомогою Prettier.</br>
    Стилізація — за допомогою CSS Modules.</br>
    У проєкті реалізована підтримка SSR та CSR відповідно до завдання.</br>
    ...................................................................................... 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
