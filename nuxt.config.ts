// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/eslint"],

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPass: "",
    smtpTo: "",
  },

  app: {
    head: {
      title: "Syafiq's Blog",
      link: [
        { rel: "icon", type: "image/png", href: "/icon.png" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Personal blog by Syafiq" },
      ],
    },
  },

  css: ["~/assets/main.css"],

  imports: {
    dirs: ["store"],
  },
});
