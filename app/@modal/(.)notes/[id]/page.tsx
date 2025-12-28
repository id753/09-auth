// app/notes/@modal/(.)notes/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

export default function NoteModalPage() {
  const router = useRouter();

  return (
    // 1. Оболочка модалки (отвечает за фон и закрытие)
    <Modal onClose={() => router.back()}>
      {/* 2. Контент (отвечает за загрузку данных и отображение текста) */}
      <NotePreviewClient />
    </Modal>
  );
}
