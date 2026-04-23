import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // Mematikan error "Unexpected any"
    "@typescript-eslint/no-explicit-any": "off",

    // Mematikan warning v-html (XSS)
    "vue/no-v-html": "off",
  },
});
