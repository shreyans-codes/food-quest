import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    define: {
      "process.env": {},
    },
    server: {
      open: true,
    },
    build: {
      outDir: "build",
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
  };
});
