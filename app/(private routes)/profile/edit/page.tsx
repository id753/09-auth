"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, updateAvatar, updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import Image from "next/image";

const EditProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMe().then((userData) => {
      setUsername(userData.username ?? "");
      setPhotoUrl(userData.avatar ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let currentAvatarUrl = photoUrl;

      //  Если выбран новый файл, сначала загружаем его на сервер
      if (imageFile) {
        currentAvatarUrl = await updateAvatar(imageFile);
      }

      //  Отправляем ОДИН запрос на обновление профиля с новым именем и URL фото
      const updatedUser = await updateMe({
        username,
        avatar: currentAvatarUrl,
      });

      if (updatedUser) {
        setUser(updatedUser);
        // Редирект только ПОСЛЕ успешного завершения всех операций
        router.push("/profile");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {/* Используем photoUrl для превью по умолчанию */}
        <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />
        <div className={css.avatarWrapper}>
          {/* <Image
            src={user.avatar || "/default-avatar.jpg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          /> */}
        </div>
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleChange}
              className={css.input}
              required
            />
          </div>

          <p className={css.emailText}>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
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
