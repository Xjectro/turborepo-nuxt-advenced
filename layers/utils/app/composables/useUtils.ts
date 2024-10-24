import { useAccountStore } from "~/stores/accountStore";

export const useUtils = () => {
  const accountStore = useAccountStore();

  return {
    get accountStore() {
      return accountStore;
    },
  };
};
