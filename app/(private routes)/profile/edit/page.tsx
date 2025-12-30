"use client";
export const dynamic = "force-dynamic";
// Якщо сторінка редагування профілю позначена як Static (кружечок), це означає, що Next.js намагається скомпілювати її в чистий HTML під час білду. Оскільки це приватний маршрут, який залежить від стану користувача, він не повинен бути статичним.

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";

const EditProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // Стан для інпуту імені
  const [username, setUsername] = useState(user?.username || "");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Відправляємо об'єкт з новим ім'ям
      const updatedUser = await updateMe({ username: username });

      if (updatedUser) {
        // Оновлюємо дані в глобальному сторі, щоб ім'я змінилося всюди (в хедері тощо)
        setUser(updatedUser);
        router.push("/profile");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  // Якщо користувач ще не завантажився, можна повернути null або лоадер
  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
              required
            />
          </div>

          <p className={css.emailText}>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
