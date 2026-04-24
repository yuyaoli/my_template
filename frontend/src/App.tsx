import { useEffect, useState } from "react"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

const ACCESS_TOKEN_KEY = "access_token"

export default function App() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ACCESS_TOKEN_KEY)
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const handleLogin = (nextToken: string) => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, nextToken)
    setToken(nextToken)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    setToken(null)
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <HomePage onLogout={handleLogout} token={token} />
}
