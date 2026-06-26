import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  updateUserFields: (fields: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: true,
    }),

  updateUserFields: (fields) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...fields } : null,
    })),

  clearIsAuthenticated: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));
