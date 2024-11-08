import { defineStore } from "pinia";
import type { IUser, IConnection, IAccountStore } from "@repo/types/client";

export const useAccountStore = defineStore({
  id: "accountStore",
  state: (): IAccountStore => ({
    user: null,
    connections: [],
  }),
  getters: {
    _getUser: (state) => state.user,
    _getConnections: (state) => state.connections,
  },
  actions: {
    setUser(user: Record<string, string>) {
      this.user = { ...this.user, ...user } as IUser;
    },
    setConnections(connections: IConnection[]) {
      this.connections = connections;
    },
    async initUser() {
      const data: any = await $fetch("/api/users/@me", { method: "get" });

      if (data?.success) {
        this.setUser(data.data);
      }
    },
    async initConnections() {
      const data: any = await $fetch("/api/users/@me/connections", {
        method: "get",
      });

      if (data?.success) {
        this.setConnections(data.data);
      }
    },
  },
});
