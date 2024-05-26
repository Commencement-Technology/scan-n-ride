import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL, resolve } from "node:url";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
});