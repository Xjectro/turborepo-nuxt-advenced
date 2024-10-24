import locales from "./app/constants/locales";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 6000,
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    lazy: true,
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: "./i18n.config",
    locales,
  },
});
