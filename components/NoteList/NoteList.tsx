"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../lib/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteNoteM, isPending } = useMutation({
    mutationFn: (id: Note["id"]) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  return (
    <div>
      <ul className={css.list}>
        {notes.map((item) => (
          <li key={item.id} className={css.listItem}>
            <h2 className={css.title}>{item.title}</h2>
            <p className={css.content}>{item.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{item.tag}</span>

              <Link href={`/notes/${item.id}`} className={css.link}>
                View details
              </Link>

              <button
                onClick={() => deleteNoteM(item.id)}
                disabled={isPending}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
