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
import {
  CheckSessionResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

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

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<CheckSessionResponse>("/auth/check");
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

// Partial<User>, Partial<T>?
// Это встроенный служебный тип (Utility Type), который делает все свойства объекта T необязательными.
export const updateMe = async (payload: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>("/auth/me", payload);
  return data;
};
