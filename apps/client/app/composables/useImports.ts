export const useImports = () => {
  const { accountStore } = useUtils();
  const { pageStore } = useUi();
  return {
    get router() {
      return useRouter();
    },
    get route() {
      return useRoute();
    },
    get runtimeConfig() {
      return useRuntimeConfig();
    },
    get accountStore() {
      return accountStore;
    },
    get pageStore() {
      return pageStore;
    },
  };
};
