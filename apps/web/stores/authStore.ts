// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  setUser: (user: User, token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      setUser: (user, token, role) => set({ user, token, role }),
      logout: () => set({ user: null, token: null, role: null }),
    }),
    {
      name: "auth-storage", // stored in localStorage
    },
  ),
);
