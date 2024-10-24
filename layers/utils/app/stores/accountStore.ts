import { defineStore } from "pinia";
import type { IAccountType, IConnectionType } from "../../types/types.account";

export const useAccountStore = defineStore({
  id: "accountStore",
  state: () => ({
    user: null as IAccountType | null,
    connections: [] as IConnectionType[],
  }),
  getters: {
    _getUser: (state) => state.user,
    _getConnections: (state) => state.connections,
  },
  actions: {
    setUser(user: Record<string, string>) {
      this.user = { ...this.user, ...user } as IAccountType;
    },
    setConnections(connections: IConnectionType[]) {
      this.connections = connections;
    },
    async initUser() {
      const data = await $fetch("/api/users/@me", { method: "get" });

      if (data?.success) {
        this.setUser(data.data);
      }
    },
    async initConnections() {
      const data = await $fetch("/api/users/@me/connections", {
        method: "get",
      });

      if (data?.success) {
        this.setConnections(data.data);
      }
    },
  },
});
