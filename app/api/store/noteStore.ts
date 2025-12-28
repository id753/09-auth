import { create } from "zustand";
import { CreateNoteData } from "../api";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: CreateNoteData;
  setDraft: (note: CreateNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: "note-draft",
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
