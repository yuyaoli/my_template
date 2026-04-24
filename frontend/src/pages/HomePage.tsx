import { useQuery, useQueryClient } from "@tanstack/react-query"
import { LogOut, UserRound } from "lucide-react"

import { readMeApiV1MeGetOptions } from "@/client/@tanstack/react-query.gen"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type HomePageProps = {
  token: string
  onLogout: () => void
}

export default function HomePage({ token, onLogout }: HomePageProps) {
  const queryClient = useQueryClient()

  const meQuery = useQuery({
    ...readMeApiV1MeGetOptions({
      auth: token,
    }),
  })

  const handleLogout = async () => {
    await queryClient.cancelQueries()
    queryClient.clear()
    onLogout()
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              TanStack Query + OpenAPI Client
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">首页</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                当前页面通过 `/api/v1/me` 拉取登录用户信息。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="outline">
              退出登录
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader className="space-y-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </div>
            <div className="space-y-1">
              <CardTitle>我的信息</CardTitle>
              <CardDescription>数据来自受保护接口 `/api/v1/me`。</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {meQuery.isPending ? (
              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                正在加载用户信息...
              </div>
            ) : meQuery.isError ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  获取 `/me` 信息失败，请重新登录后再试。
                </div>
                <Button onClick={handleLogout} variant="outline">
                  返回登录页
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/30 p-4">
                <dl className="grid gap-3 text-sm">
                  <div className="grid gap-1">
                    <dt className="text-muted-foreground">ID</dt>
                    <dd className="font-medium text-foreground">{meQuery.data.id}</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="text-muted-foreground">邮箱</dt>
                    <dd className="font-medium text-foreground">{meQuery.data.email}</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="text-muted-foreground">用户名</dt>
                    <dd className="font-medium text-foreground">
                      {meQuery.data.username ?? "未设置"}
                    </dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="text-muted-foreground">创建时间</dt>
                    <dd className="font-medium text-foreground">{meQuery.data.created_at}</dd>
                  </div>
                </dl>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
