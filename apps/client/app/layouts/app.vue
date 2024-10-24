<template>
  <div>
    <CommonHeader />

    <div class="container">
      <slot />
    </div>

    <CommonFooter />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const { accountStore } = useUtils();

const currentUser = computed(() => accountStore._getUser);

const props = defineProps({
  scopes: {
    type: Array as PropType<string[]>,
    default: null,
  },
});

useHead({
  title: `${config.app.title}`,
  meta: [{ property: "og:title", content: `${config.app.title}` }],
});

onMounted(() => {
  if (props.scopes && !props.scopes?.includes(currentUser.value?.auth.role)) {
    navigateTo("/auth/login");
    return;
  }
});
</script>
