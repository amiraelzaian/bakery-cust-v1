import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isHydrated: false,

  setUser: (user) =>
    set({
      user,
      isLoggedIn: Boolean(user),
    }),

  login: (user) =>
    set({
      user,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  setHydrated: (value) =>
    set({
      isHydrated: value,
    }),
}));