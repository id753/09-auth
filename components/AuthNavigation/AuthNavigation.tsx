// components\AuthNavigation\AuthNavigation.tsx
"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { logout } from "@/lib/api/clientApi";

const AuthNavigation = () => {
  const router = useRouter();

  // Отримуємо стан та метод очищення зі стору
  const { isAuthenticated, user } = useAuthStore();

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  // const handleLogout = async () => {
  //   try {
  //     // 1. Викликаємо ваш Route Handler (код якого ви надали вище)
  //     // Це видалить куки на сервері та в браузері
  //     await axios.post("/api/auth/logout");
  //     clearIsAuthenticated();
  //   } catch (err) {
  //     console.error(
  //       "Server logout failed, but we will clear local state anyway",
  //       err
  //     );
  //   } finally {
  //     // 2. Очищуємо стан у Zustand (user: null, isAuthenticated: false)
  //     // Це робиться обов'язково, навіть якщо серверний запит не вдався
  //     clearIsAuthenticated();

  //     // 3. Редірект на логін
  //     router.push("/sign-in");

  //     // 3. ПЕРЕЗАПУСКАЄМО додаток на сторінку логіну
  //     // Це очистить всі стани React та Zustand на 100%
  //     // window.location.href = "/sign-in";
  //   }
  // };
  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    // router.push("/sign-in");
    window.location.replace("/sign-in");
  };

  return (
    <ul className={css.navigationList}>
      {isAuthenticated ? (
        // Рендер для АВТОРИЗОВАНОГО користувача
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            {/* Виводимо реальний email користувача зі стору */}
            <p className={css.userEmail}>{user?.email}</p>

            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        // Рендер для НЕАВТОРИЗОВАНОГО користувача
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthNavigation;
