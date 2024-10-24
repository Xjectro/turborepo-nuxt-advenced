export const useImports = () => {
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
  };
};
