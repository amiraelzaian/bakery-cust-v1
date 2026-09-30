import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isHydrated: false,

  // call once on app start: read the saved token
  init: () => {
    const token = localStorage.getItem("token");
    set({
      token,
      isLoggedIn: Boolean(token), 
      isHydrated: !token,         
    });
  },

  login: (user, token) =>
    set((s) => ({
      user,
      token: token ?? s.token,
      isLoggedIn: true,
      isHydrated: true,
    })),

  setUser: (user) => set({ user, isLoggedIn: Boolean(user), isHydrated: true }),

  logout: () =>
    set({ user: null, token: null, isLoggedIn: false, isHydrated: true }),

  setHydrated: (value) => set({ isHydrated: value }),
}));