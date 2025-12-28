import { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description:
    "Create a new note to stay organized and manage your tasks effectively.",

  openGraph: {
    title: "NoteHub - Create Note",
    description: "Easily create and save your new notes in NoteHub.",
    url: "https://notehub.com/notes/action/create", // Реальний шлях до сторінки
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

export default function CreateNotePage() {
  return <CreateNoteClient />;
}
// "Візьми весь код із файлу CreateNoteClient.tsx і відобрази його на цій сторінці ».
/**Файл page.tsx (Батько): Це «зовнішня оболонка». Вона відповідає за те, що бачать пошукові системи (SEO/Metadata).

Файл CreateNoteClient.tsx (Дитина): Це «начинка». Вона відповідає за те, як працює форма, кнопки та навігація. */
