import { useAuthStore } from "@/store/auth-store"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

export default function App() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <LoginPage />
  }

  return <HomePage />
}
