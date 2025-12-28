// Функції для виконання HTTP-запитів
import axios from "axios";
import type { Note } from "../types/note";

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface NoteData {
  notes: Note[];
  totalPages: number;
}
export interface CreateNoteData {
  title: string;
  content: string;
  tag: "Shopping" | "Meeting" | "Personal" | "Work" | "Todo";
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// Функция запроса данных
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NoteData> => {
  const response = await axios.get<NoteHttpResponse>("/notes", {
    params: {
      search,
      page: page,
      perPage: 10,
      tag,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const createNote = async (newNote: CreateNoteData) => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: Note["id"]) => {
  const response = await axios.delete(`/notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

// Функция запроса данных 1 note
export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const response = await axios.get<Note>(`notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};
// запит на отримання списку категорій

// export const getCategories = async (): Promise<string[]> => {
//   const response = await axios.get<string[]>("/notes/tags", {
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//     },
//   });

//   return response.data;
// };
