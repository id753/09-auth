# 📚NoteHub APP
## A full-stack note-taking web app featuring a custom REST API, secure authentication, and built-in SEO optimization. 

### NoteHub (individual coursework project) is a sophisticated note-taking platform 🏷️ where I engineered the entire API interaction layer and authentication flow using Next.js App Router. </br> The project showcases a robust architectural approach, including secure 🍪 cookie-based session handling, middleware protection, and state management 🧹 with Zustand and TanStack Query. </br>While the UI was built using provided style guidelines, the core focus remained on building 🧱 a scalable and secure backend-integrated frontend.

<p align="center">
  <img src="https://github.com/user-attachments/assets/64448477-ddf9-4dc4-9af9-414d64de1273" " alt="NoteHub App Screenshot" width="450" />
  <br>
  <sub>NoteHub App Screenshot</sub>
</p>


## [Live Project](https://09-auth-eosin-iota.vercel.app/) 
⚠️ Note: The server is on a free plan, so it may take 30-50s to wake up 🚀 on the first load.
## [Backend Code](https://github.com/id753/nodejs-hw)

## Tech Stack
### 🎨 Frontend Tech Stack: Next.js (App Router), React, TypeScript; Zustand (+ persist middleware), TanStack Query, Axios; CSS Modules; Next.js Metadata API, SEO, Open Graph; Versel
### ⚙️ [Backend](https://github.com/id753/todo-project-api) Tech Stack: Node.js, Express.js, MongoDB & Mongoose, Joi & Celebrate (validation), Cloudinary (image storage), Nodemailer (emails), bcrypt (password hashing), JWT (password reset tokens), Pino (logging), Multer (file uploads)
Dev Tools & Environment: dotenv (environment variables), ES Modules (import/export), CORS configuration, async/await, Postman (API testing), Render (deployment)


## Features
### Frontend Experience
- ✅ **Custom API Integration**: Engineered a modular API layer using Axios with withCredentials support, separating logic for Server and Client components.
- ✅ **Secure Authentication**: Full login/register flow with cookie-based session handling and global state management via Zustand.
- ✅ **Advanced Routing**: Implemented Next.js Middleware for route protection, ensuring seamless redirection between public and private pages.
- ✅ **Dynamic Notes CRUD**: Complete Create, Read, Update, and Delete functionality with real-time UI updates using TanStack Query.
- ✅ **Robust Form Handling**: Managed complex forms with validation, ensuring data integrity before server submission.
- ✅ **UX Optimization**: Integrated loading/error states and sophisticated navigation logic for a smooth user experience.
- ✅ **SEO & Social Sharing**: Full metadata configuration including Open Graph support for enhanced social media visibility.
- ✅ **Architecture-First UI**: While the visual styles were provided as part of the technical assignment, I focused on building a clean, scalable architecture and efficient CSS Modules implementation.

## 🔢 Getting Started (Frontend)
Clone the repository
      
    git clone git@github.com:id753/note_hub_app.git
Install dependencies

     npm install
Environment Variables
Create a .env file in the root directory (use .env.example as a template):

    VITE_API_URL=http://localhost:3000
Run the app

    npm run dev
Open http://localhost:3000 in your browser.

## ⚠️ Note: The server is hosted on Render's free plan and may “sleep” when idle — the first load after waking up can take 30–50 seconds.
Previous project: https://github.com/id753/08-zustand </br>
<!--               
## Фіналізовано роботу над проєктом NoteHub, зосередившись на переходi на свій  [бекенд](https://github.com/id753/nodejs-hw) з авторизацією, який підтримує: захищені маршрути, токени, що зберігаються в куках, перевірку доступу до даних користувача. </br>
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
-->
