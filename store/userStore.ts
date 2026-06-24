import { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

interface UserAction {
  setUser: (user: User) => void;
  clearUserStore: () => void;
}

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUserStore: () => set({ user: null, isAuthenticated: false }),
}));
