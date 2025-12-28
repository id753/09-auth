import Link from "next/link";
import css from "./SidebarNotes.module.css";

// Список тегов прописан в коде, так как API не предоставляет эндпоинт для их получения
const TAGS = ["Shopping", "Todo", "Work", "Personal", "Meeting"];

const SidebarNotes = () => {
  return (
    <nav>
      <ul className={css.menuList}>
        {/* Ссылка для отображения всех заметок */}
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>

        {/* Динамический список тегов */}
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNotes;
