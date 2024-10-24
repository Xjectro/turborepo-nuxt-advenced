// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 6001,
  },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
  ],
  runtimeConfig: {
    app: {
      serverURI: process.env.SERVER_URI,
      title: "Turborepo Nuxt Advenced Starter",
    },
    public: {
      discord: {
        oauthUri: `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback%2Fdiscord&scope=email+identify`,
      },
      twitch: {
        oauthUri: `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000/callback/twitch&response_type=code&scope=user:read:email`,
      },
      github: {
        oauthUri: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/callback/github&scope=user:read`,
      },
      widgets: {
        baseUri: `${process.env.SERVER_URI}/api/widgets`,
      },
    },
  },
});
