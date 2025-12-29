// lib/api/clientApi.ts — для функцій, які викликаються у клієнтських компонентах:
//     fetchNotes
//     fetchNoteById
//     createNote
//     deleteNote
//     register
//     login
//     logout
//     checkSession
//     getMe
//     updateMe

import { api } from "./api";
import type { Note } from "../../types/note";
import { User } from "@/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  success: boolean;
}
// --- Інтерфейси ---

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

// --- Нотатки (Notes) ---
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NoteData> => {
  const response = await api.get<NoteHttpResponse>("/notes", {
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
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (payload: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (id: Note["id"]): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

// Аутентифікація
export const register = async (payload: RegisterPayload): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const login = async (credentials: LoginPayload): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/session");
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await api.get(`/auth/session?t=${Date.now()}`);

    // Перевіряємо, чи немає у відповіді success: false
    // Або чи є там дані користувача (наприклад, email)
    if (data && data.success === false) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
};

export const updateMe = async (payload: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};
