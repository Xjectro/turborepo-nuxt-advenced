<template>
  <UiFileUpload
    variant="card"
    v-model="state.inputs.avatarURL"
    :title="t('ui.settings.views.account.profile.inputs.avatar.title')"
    :description="
      t('ui.settings.views.account.profile.inputs.avatar.description')
    "
  />
  <UiFileUpload
    variant="card"
    v-model="state.inputs.bannerURL"
    :title="t('ui.settings.views.account.profile.inputs.banner.title')"
    :description="
      t('ui.settings.views.account.profile.inputs.banner.description')
    "
  />
  <UiDivider />
  <UiInput
    v-model="state.inputs.username"
    :label="t('ui.settings.views.account.profile.inputs.username')"
    type="text"
    required
  />
  <UiTextarea
    v-model="state.inputs.description"
    :label="t('ui.settings.views.account.profile.inputs.description')"
    type="text"
    minHeight="200px"
    maxHeight="300px"
    required
  />
  <UiButton
    :disabled="state.button.disabled"
    class="px-5 py-2.5"
    :loading="state.button.loading"
    @interaction="onUpdate"
  >
    {{ t("ui.settings.views.account.profile.buttons.update") }}
  </UiButton>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { tryUploadFile } = useFile();
const { accountStore } = useUtils();
const { pageStore } = useUi();

const currentUser = computed(() => accountStore._getUser);

const state = reactive({
  inputs: {
    username: currentUser.value?.username || "",
    description: currentUser.value?.description || "",
    avatarURL: currentUser.value?.avatarURL || ("" as File | string),
    bannerURL: currentUser.value?.bannerURL || ("" as File | string),
  },
  button: { disabled: true, loading: false },
});

pageStore.dialog.settings.layout = {
  scopes: ["USER"],
  title: t("ui.settings.views.account.profile.title"),
  message: { label: "", visible: false, type: "success" },
};

const layout = computed(() => {
  return pageStore.dialog.settings.layout;
});

const changes = computed(() => {
  return ["username", "avatarURL", "description", "bannerURL"].some(
    (key) =>
      state.inputs[key as "username"] !==
      currentUser.value?.[key as "username"],
  );
});

watch(
  changes,
  () => {
    state.button.disabled = !changes.value;
  },
  { immediate: true },
);

async function onUpdate() {
  if (!currentUser.value) return;
  state.button.loading = true;

  try {
    const payload = await createPayload();
    if (!payload) return;

    await $fetch("/api/users/@me/update", {
      method: "POST",
      body: payload,
    });

    accountStore.setUser(payload);

    layout.value.message = {
      type: "success",
      label: t("ui.settings.views.account.profile.messages.success"),
      visible: true,
    };
  } catch {
    layout.value.message = {
      type: "error",
      label: t("ui.settings.views.account.profile.messages.error"),
      visible: true,
    };
  } finally {
    state.button.loading = false;
    setTimeout(() => (layout.value.message.visible = false), 5000);
  }
}

async function createPayload() {
  const payload: Record<string, string | null> = {};
  const { avatarURL, bannerURL, username, description } = state.inputs;

  if (avatarURL !== currentUser.value?.avatarURL)
    payload.avatarURL = await tryUploadFile(avatarURL);
  if (bannerURL !== currentUser.value?.bannerURL)
    payload.bannerURL = await tryUploadFile(bannerURL);
  if (username !== currentUser.value?.username) payload.username = username;
  if (description !== currentUser.value?.description)
    payload.description = description;

  return Object.keys(payload).length ? payload : null;
}
</script>
