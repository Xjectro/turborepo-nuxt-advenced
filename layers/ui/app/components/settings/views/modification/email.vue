<template>
  <UiInput
    v-model="state.inputs.currentEmail"
    :label="t('ui.settings.views.modification.email.inputs.currentEmail')"
    type="text"
    disabled
    required
  />
  <UiInput
    v-model="state.inputs.newEmail"
    :label="t('ui.settings.views.modification.email.inputs.newEmail')"
    type="text"
    required
  />
  <UiInput
    v-model="state.inputs.newEmailAgain"
    :label="t('ui.settings.views.modification.email.inputs.newEmailAgain')"
    type="text"
    required
  />
  <UiButton
    class="px-5 py-2.5"
    :loading="state.button.loading"
    :disabled="state.button.disabled"
    @interaction="onUpdate"
  >
    {{ t("ui.settings.views.modification.email.buttons.change") }}
  </UiButton>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { accountStore } = useUtils();
const { maskEmail } = useString();
const { pageStore } = useUi();

const currentUser = computed(() => accountStore._getUser);

pageStore.dialog.settings.layout = {
  scopes: ["USER", "ADMIN"],
  title: t("ui.settings.views.modification.email.title"),
  message: { label: "", visible: false, type: "success" },
};

const layout = computed(() => {
  return pageStore.dialog.settings.layout;
});

const state = reactive({
  inputs: {
    currentEmail: maskEmail(currentUser.value?.auth?.email || ""),
    newEmail: "",
    newEmailAgain: "",
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
      state.inputs.newEmail !== state.inputs.newEmailAgain;
  },
  { deep: true },
);

async function onUpdate() {
  state.button.loading = true;
  try {
    await $fetch("/api/auth/modification/email", {
      method: "POST",
      body: state.inputs,
    });

    layout.value.message = {
      type: "success",
      label: t("ui.settings.views.modification.email.messages.success"),
      visible: true,
    };
  } catch {
    layout.value.message = {
      type: "error",
      label: t("ui.settings.views.modification.email.messages.error"),
      visible: true,
    };
  } finally {
    state.button.loading = false;
    Object.assign(state.inputs, {
      currentEmail: "",
      newEmail: "",
      newEmailAgain: "",
    });
    setTimeout(() => (layout.value.message.visible = false), 5000);
  }
}
</script>
