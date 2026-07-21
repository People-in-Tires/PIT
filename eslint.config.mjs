// @ts-check

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({
  files: ["**/*.{js,ts}"],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  ignores: ["**/pkg/**", "**/.venv/**", "build/**"],

  extends: [
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
  ],
});
