import { useState } from "react"
import { ArrowRight, CheckCircle2, LayoutTemplate, Palette } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { helloApiV1HelloGet } from "@/client/sdk.gen"
import type { HelloApiV1HelloGetResponses } from "@/client/types.gen"

const highlights = [
  {
    title: "shadcn/ui 基础模板",
    description: "以组合式组件为核心，便于按需扩展页面和业务模块。",
    icon: LayoutTemplate,
  },
  {
    title: "Lucide Icons",
    description: "统一改为 lucide-react，图标体积更可控，样式也更统一。",
    icon: Palette,
  },
  {
    title: "可直接对接 API",
    description: "保留现有 openapi-ts 客户端，按钮点击即可验证前后端连通性。",
    icon: CheckCircle2,
  },
]

export default function HelloPage() {
  const [response, setResponse] = useState<HelloApiV1HelloGetResponses[200] | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleClick = async () => {
    try {
      setLoading(true)
      setErrorMessage(null)
      const result = await helloApiV1HelloGet()
      setResponse(result.data ?? null)
    } catch (error: unknown) {
      console.error("API 调用失败:", error)
      setErrorMessage(error instanceof Error ? error.message : "请求失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              React + Vite + shadcn/ui
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">前端模板已切换为 shadcn/ui</h1>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                Chakra UI 依赖已经移除，当前示例页面使用 shadcn 风格组件与 Lucide Icons。
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>API 联调示例</CardTitle>
              <CardDescription>
                点击按钮调用 `helloApiV1HelloGet`，确认模板与后端服务连通正常。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full sm:w-auto" disabled={loading} onClick={handleClick}>
                {loading ? "请求中..." : "调用后端接口"}
                <ArrowRight className="size-4" />
              </Button>

              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                {errorMessage ? (
                  <span className="text-destructive">错误：{errorMessage}</span>
                ) : response ? (
                  <span className="text-foreground">响应数据：{response.message}</span>
                ) : (
                  "接口响应会显示在这里。"
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {highlights.map(({ title, description, icon: Icon }) => (
              <Card className="border-border/70" key={title}>
                <CardHeader className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
