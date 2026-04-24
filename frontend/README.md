# Frontend Template

这是一个基于 `React`、`TypeScript`、`Vite` 与 `bun` 的前端模板。

## 当前 UI 栈

- `shadcn/ui`
- `Tailwind CSS v4`
- `lucide-react`
- `next-themes`

## 常用命令

```bash
bun install
bun run dev
bun run build
bun run lint
```

## 目录说明

- `src/components/ui`: shadcn 风格的基础组件
- `src/lib/utils.ts`: `cn()` 等通用工具
- `src/pages/HelloPage.tsx`: 首页示例与 API 联调示例
- `src/client`: 由 `openapi-ts` 生成的接口客户端

## 新增组件

如果后续要继续扩展 shadcn 组件，建议保持以下别名约定：

- `@/components`
- `@/components/ui`
- `@/lib`

`components.json` 已经配置为使用 `Lucide Icons`。
