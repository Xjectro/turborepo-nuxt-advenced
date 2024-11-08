<template>
  <div>
    <CommonHeader />
    <div :class="$cn('container', props.class)">
      <slot />
    </div>
    <CommonFooter />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const { accountStore } = useImports();

const currentUser = computed(() => accountStore._getUser);

const props = defineProps({
  scopes: {
    type: Array as PropType<string[]>,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

useHead({
  htmlAttrs: {
    class: "max-h-screen overflow-hidden",
  },
});

useSeoMeta({
  title: config.app.title,
  ogTitle: config.app.title,
});

onMounted(() => {
  if (
    props.scopes &&
    !useVerifyRole(props.scopes, currentUser.value.auth.roles)
  ) {
    navigateTo("/auth/login");
    return;
  }
});
</script>
