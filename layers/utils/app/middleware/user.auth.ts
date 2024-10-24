export default defineNuxtRouteMiddleware(async () => {
  const { accountStore } = useUtils();

  if (!accountStore.user) {
    accountStore.initUser();
  }
});
