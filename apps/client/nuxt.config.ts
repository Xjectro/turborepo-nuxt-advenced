// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  devServer: {
    port: 3000,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: ["nuxt-proxy", "@nuxt/eslint"],
  extends: ["@layers/utils", "@layers/translation", "@layers/ui"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/assets/images/app.png" },
      ],
    },
  },
  proxy: {
    options: {
      target: process.env.SERVER_URI,
      pathFilter: "/api",
      changeOrigin: true
    },
  },
});
