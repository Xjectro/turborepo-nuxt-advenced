<template>
  <NuxtLayout name="callback" v-bind="layout" />
</template>

<script lang="ts" setup>
const { route, pageStore } = useImports();

const type = route.params.type as string;
const types = ["discord", "github", "twitch"];

const layout = reactive({
  type,
  loading: true,
  connected: false,
});

const { code } = route.query as { code?: string };

const { data } = await useAsyncData(
  `${type}Connection`,
  async () => {
    if (!code || !types.includes(type)) {
      navigateTo("/");
      return;
    }

    const data = await $fetch(`/api/users/connections/${type}`, {
      method: "GET",
      params: { code },
    });

    return data;
  },
  { immediate: true },
);

watchEffect(() => {
  layout.connected = !!data.value?.success;

  if (!layout.loading && layout.connected) {
    setTimeout(() => {
      pageStore.dialog.settings.visible = true;
      pageStore.dialog.settings.path = "/account/connections";
      navigateTo("/");
    }, 2000);
  }
});

watchEffect(() => {
  layout.loading = !data.value;
});
</script>
