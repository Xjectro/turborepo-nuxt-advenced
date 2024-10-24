<template>
  <UiSwitch v-model:checked="enabled" />
  <p
    class="transition-all text-start text-base font-chakra-petch font-medium text-zinc-400 dark:text-zinc-400"
  >
    {{ t("ui.settings.views.auth.index.paragraph") }}
  </p>
  <UiButton
    class="px-4 py-2.5"
    :loading="!isLoaded"
    variant="danger"
    @interaction="onChange"
  >
    {{ t("ui.settings.views.auth.index.buttons.save") }}
  </UiButton>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { accountStore } = useUtils();
const { pageStore } = useUi();

const enabled = ref(!!accountStore._getUser?.auth.tfa);
const isLoaded = ref(true);

pageStore.dialog.settings.layout = {
  scopes: ["USER", "ADMIN"],
  title: t("ui.settings.views.auth.index.title"),
  message: {
    label: t("ui.settings.views.auth.index.messages.error"),
    visible: false,
    type: "error",
  },
};

const layout = computed(() => {
  return pageStore.dialog.settings.layout;
});

async function onChange() {
  if (!accountStore.user) return;
  isLoaded.value = false;
  try {
    await $fetch("/api/auth/tfa", {
      method: "POST",
      body: { enabled: enabled.value },
    });

    accountStore.user.auth.tfa = enabled.value;

    layout.value.message = {
      type: "success",
      label: t("ui.settings.views.auth.index.messages.success"),
      visible: true,
    };
  } catch {
    layout.value.message = {
      type: "error",
      label: t("ui.settings.views.auth.index.messages.error"),
      visible: true,
    };
  } finally {
    isLoaded.value = true;
    if (!layout.value.message?.visible) return;
    setTimeout(() => (layout.value.message.visible = false), 5000);
  }
}
</script>
