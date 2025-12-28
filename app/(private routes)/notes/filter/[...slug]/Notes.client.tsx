// C:\Users\Admin\Desktop\project_new\homework\07-routing-nextjs\app\notes\filter\[...slug]\Notes.client.tsx
"use client";
import styles from "./NotesPage.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, NoteData } from "@/lib/api/api";

import NoteList from "../../../../../components/NoteList/NoteList";
// *import Loader from "../../components/Loader/Loader";
// *import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Pagination from "../../../../../components/Pagination/Pagination";
import SearchBox from "../../../../../components/SearchBox/SearchBox";
// import Modal from "../../../../components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
import Link from "next/link";

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useQuery<NoteData>({
    queryKey: ["notes", currentPage, search, initialTag],
    queryFn: () => fetchNotes(currentPage, search, initialTag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  const debounceSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.toLowerCase());
      setCurrentPage(1);
    },
    300
  );

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox search={search} onChange={debounceSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {/* Внесіть зміну у клієнтський компонент сторінки NotesClient, тепер нам в ньому не потрібна логіка з модалкою. Кнопка Create note + тепер має бути посиланням, яке веде на маршрут /notes/action/create. */}
        {/* <button onClick={() => setIsModalOpen(true)} className={styles.button}>
          Create note +
        </button> */}
        <Link href="/notes/action/create" className={styles.button}>
          Create note +
        </Link>
      </header>

      {/*//* {isLoading && <Loader />}
      { //*isError && <ErrorMessage />}  */}

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <p>Заметки не найдены.</p>
      )}

      {/* {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onPageChange={setCurrentPage}
          />
        </Modal>
      )} */}
    </div>
  );
}
