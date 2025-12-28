import css from "./Home.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Page Not Found",
  description:
    "Sorry, the page you are looking for does not exist on NoteHub. Please check the URL or return to the main notes page.",

  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description:
      "The requested page was not found. Manage and organize your notes with ease on NoteHub.",
    url: "https://notehub.com/404", // Замініть на ваш реальний домен
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub logo",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
