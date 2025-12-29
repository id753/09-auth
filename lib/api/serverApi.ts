//  для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers):

//     fetchNotes
//     fetchNoteById
//     getMe
//     checkSession.
import { api } from "./api";
// import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import { CheckSessionResponse, NoteData, NoteHttpResponse } from "./clientApi";
import { User } from "@/types/user";
import { cookies } from "next/headers";

// Функція-помічник для отримання заголовка з куками
const getAuthHeaders = () => {
  const cookieStore = cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

// --- Функції для серверних компонентів ---

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NoteData> => {
  const response = await api.get<NoteHttpResponse>("/notes", {
    ...getAuthHeaders(), // Додаємо куки в хедери
    params: {
      page,
      search,
      tag,
      perPage: 10,
    },
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`, getAuthHeaders());
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/session", getAuthHeaders());
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  try {
    await api.get("/auth/session", getAuthHeaders());
    return true;
  } catch (error) {
    return false;
  }
};
