<template>
  <UiInput v-model="state.inputs.currentPassword"
    :label="t('ui.settings.views.modification.password.inputs.currentPassword')" type="password" required />
  <UiInput v-model="state.inputs.newPassword" :label="t('ui.settings.views.modification.password.inputs.newPassword')"
    type="password" required />
  <UiInput v-model="state.inputs.newPasswordAgain" :label="t('ui.settings.views.modification.password.inputs.newPasswordAgain')
    " type="password" required />
  <UiButton class="px-5 py-2.5" :loading="state.button.loading" :disabled="state.button.disabled"
    @interaction="onUpdate">
    {{ t("ui.settings.views.modification.password.buttons.change") }}
  </UiButton>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { pageStore } = useUi();

pageStore.dialog.settings.layout = {
  scopes: ["USER", "ADMIN"],
  title: t("ui.settings.views.modification.password.title"),
  message: { label: "", visible: false, type: "success" },
};

const layout = computed(() => {
  return pageStore.dialog.settings.layout;
});

const state = reactive({
  inputs: {
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  },
  button: {
    loading: false,
    disabled: true,
  },
});

watch(
  () => state.inputs,
  () => {
    state.button.disabled =
      state.inputs.newPassword !== state.inputs.newPasswordAgain ||
      state.inputs.currentPassword.length < 8 ||
      state.inputs.newPassword.length < 8;
  },
  { deep: true },
);

async function onUpdate() {
  state.button.loading = true;
  try {
    await $fetch("/api/auth/modification/password", {
      method: "POST",
      body: state.inputs,
    });

    layout.value.message = {
      type: "success",
      label: t("ui.settings.views.modification.password.messages.success"),
      visible: true,
    };
  } catch {
    layout.value.message = {
      type: "error",
      label: t("ui.settings.views.modification.password.messages.error"),
      visible: true,
    };
  } finally {
    state.button.loading = false;
    Object.assign(state.inputs, {
      currentPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    });
    setTimeout(() => (layout.value.message.visible = false), 5000);
  }
}
</script>
