import { api } from "./api";
import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import { NoteData, NoteHttpResponse } from "./clientApi";
import { User } from "@/types/user";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    headers: {
      Cookie: cookieString,
    },
  };
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NoteData> => {
  const authHeaders = await getAuthHeaders();

  const response = await api.get<NoteHttpResponse>("/notes", {
    ...authHeaders,
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
  const authHeaders = await getAuthHeaders();
  const response = await api.get<Note>(`/notes/${id}`, authHeaders);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const authHeaders = await getAuthHeaders();
  const { data } = await api.get<User>("/users/me", authHeaders);
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const authHeaders = await getAuthHeaders();
    await api.get("/auth/session", authHeaders);
    return true;
  } catch (error) {
    return false;
  }
};
