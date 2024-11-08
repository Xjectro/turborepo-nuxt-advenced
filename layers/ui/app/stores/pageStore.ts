import { defineStore } from "pinia";
import type { IPageStore } from "@repo/types/client";

export const usePageStore = defineStore({
  id: "pageStore",
  state: (): IPageStore => {
    return {
      dialog: {
        settings: {
          visible: false,
          path: "/account/profile",
          layout: {
            title: null,
            scopes: null as ["USER" | "ADMIN"] | null,
            message: {
              label: "null",
              visible: false,
              type: "" as "error" | "success",
            },
          },
        },
      },
      ui: {
        theme: useColorMode()?.preference || "system",
        color: "blue",
      },
      toasts: [],
      user: null,
    };
  },
  persist: {
    key: "page",
    pick: ["ui"],
  },
  getters: {},
  actions: {
    setUser(user: any) {
      this.user = user;
    },
  },
});
