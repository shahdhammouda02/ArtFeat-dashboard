import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
});
