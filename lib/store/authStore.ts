import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  authVersion: number;

  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  bumpAuthVersion: () => void;
  updateUserFields: (fields: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      authVersion: 0,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      updateUserFields: (fields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...fields } : null,
        })),

      bumpAuthVersion: () =>
        set((state) => ({
          authVersion: state.authVersion + 1,
        })),

      clearIsAuthenticated: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        authVersion: state.authVersion,
      }),
    }
  )
);
