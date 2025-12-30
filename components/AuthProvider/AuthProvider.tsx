"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const isSessionValid = await checkSession();

        if (isSessionValid) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
          // Якщо ми на приватній сторінці без сесії — викидаємо
          if (pathname.startsWith("/profile")) {
            router.push("/sign-in");
          }
        }
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated, pathname, router]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return <>{children}</>;
}
