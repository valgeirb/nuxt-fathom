// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
  },
  dirs: {
    src: ["./playground"],
  },
}).append({
  ignores: ["dist", "node_modules"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
});
