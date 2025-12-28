"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { useRouter } from "next/navigation";

function CreateNoteClient() {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={handleBack} />
      </div>
    </main>
  );
}

export default CreateNoteClient;
