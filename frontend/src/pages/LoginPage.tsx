import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { LogIn } from "lucide-react"

import { useAuthStore } from "@/store/auth-store"
import { createTokenApiV1TokensPostMutation } from "@/client/@tanstack/react-query.gen"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const login = useAuthStore((state) => state.login)

  const loginMutation = useMutation({
    ...createTokenApiV1TokensPostMutation(),
    onSuccess: (data) => {
      if (!data?.access_token) {
        setErrorMessage("登录成功但未返回 access token。")
        return
      }

      setErrorMessage(null)
      login(data.access_token)
    },
    onError: (error) => {
      console.error("登录失败:", error)
      setErrorMessage("邮箱或密码错误。")
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    await loginMutation.mutateAsync({
      body: {
        email,
        password,
      },
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <CardTitle>登录</CardTitle>
            <CardDescription>使用 `/api/v1/tokens` 获取 access token。</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  邮箱
                </label>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  密码
                </label>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="请输入密码"
                  required
                  type="password"
                  value={password}
                />
              </div>

              {errorMessage ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </div>
              ) : null}

              <Button className="w-full" disabled={loginMutation.isPending} type="submit">
                {loginMutation.isPending ? "登录中..." : "登录"}
                <LogIn className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
