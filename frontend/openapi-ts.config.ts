import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  plugins: [
    "@hey-api/client-fetch",
    {
      name: "@tanstack/react-query",
      queryKeys: true,
      queryOptions: true,
    },
  ],
  input: "./openapi.json",
  output: "./src/client",
})
