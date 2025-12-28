// C:\Users\Admin\Desktop\project_new\homework\07-routing-nextjs\app\notes\@modal\(.)notes\[id]\NotePreview.client.tsx
"use client";
import css from "./NotePreview.module.css";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
// import Modal from "@/components/Modal/Modal";

function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  // new
  //   const noteData = note?.updatedAt
  //     ? `Updated at: ${note?.updatedAt}`
  //     : `Created at: ${note?.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <button onClick={() => router.back()}>Повернутися до списку</button>
      </div>
    </div>
  );
}

export default NotePreview;
