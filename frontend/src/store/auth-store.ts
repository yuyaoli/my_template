import { create } from "zustand"

const ACCESS_TOKEN_KEY = "access_token"

type AuthState = {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const getInitialToken = () => {
  if (typeof window === "undefined") {
    return null
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  login: (token) => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
    set({ token })
  },
  logout: () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    set({ token: null })
  },
}))
