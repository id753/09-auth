// app/notes/layout.tsx
import React from "react";

export default function NotesLayout({
  children,
}: // modal, // Это слот из папки @modal
{
  children: React.ReactNode;
  // modal: React.ReactNode;
}) {
  return (
    <div className="notes-wrapper">
      {/* children — это твои страницы (список заметок, фильтры и т.д.) */}
      {children}

      {/* modal — это место, где появится твоя модалка при перехвате маршрута */}
      {/* {modal} */}
    </div>
  );
}
