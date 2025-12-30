"use client";
import css from "../../../styles/SignInPage.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginPayload } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const LogIn = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError("");

    try {
      // ?
      const formValues = Object.fromEntries(
        formData
      ) as unknown as LoginPayload;

      const result = await login(formValues);

      if (result) {
        setUser(result); // Стан змінюється глобально
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? err.message ?? "Oops... some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default LogIn;
