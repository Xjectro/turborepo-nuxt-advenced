export default defineNuxtRouteMiddleware(async () => {
  const { accountStore } = useUtils();

  if (accountStore.connections.length == 0) {
    accountStore.initConnections();
  }
});
