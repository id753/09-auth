// C:\Users\Admin\Desktop\project_new\homework\07-routing-nextjs\app\notes\filter\[...slug]\page.tsx

// import NoteList from "@/components/NoteList/NoteList";
// import Pagination from "@/components/Pagination/Pagination";
// import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/clientApi";

import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string }>;
};

// Реалізація функції generateMetadata згідно з ТЗ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // аналог как в основной функции
  const actualValue = slug[0] === "filter" ? slug[1] : slug[0];
  const filterName =
    actualValue === "all" || !actualValue ? "All Notes" : actualValue;

  const title = `Notes: ${filterName} | NoteHub`;
  const description = `Browse and manage your ${filterName.toLowerCase()} notes efficiently on NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${actualValue || "all"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${filterName}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  let actualValue;

  if (slug[0] === "filter") {
    actualValue = slug[1]; // Берем то, что после /filter/
  } else {
    actualValue = slug[0]; // Если слова filter нет, берем первый сегмент
  }

  // 2. Теперь решаем, что отправить в API как тег
  let tag;

  if (actualValue === "all" || !actualValue) {
    tag = undefined; // Для API это означает "показать все"
  } else {
    tag = actualValue; // Иначе используем найденное слово как тег
  }

  // const currentPage = Number(pageParam) || 1;
  // const response = await fetchNotes(currentPage, "", tag);
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag], // додаємо tag у ключ, щоб дані були специфічні для категорії
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>

    // <NotesClient initialTag={tag} />
  );
}

/*
удален файл
\app\notes\page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./filter/[...slug]/Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Делаем prefetch начальных данных (1 страница, пустой поиск)
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, ""),
  });

  return (
    // Оборачиваем в HydrationBoundary, чтобы клиент увидел данные из queryClient
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
 */
