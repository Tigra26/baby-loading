"use client";

import { refreshSession } from "@/lib/api/authApi";
import { getUser } from "@/lib/api/userApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authVersion = useAuthStore((s) => s.authVersion);
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await refreshSession();

        if (!isAuthenticated) {
          clearIsAuthenticated();
          return;
        }

        const user = await getUser();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [authVersion, setUser, clearIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
