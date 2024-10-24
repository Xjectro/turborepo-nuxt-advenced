<template>
  <div>
    <NuxtLayout name="form-auth" v-bind="layout" @interaction="onHandle">
      <template #context-area>
        <UiInputFloat
          v-model="email"
          :label="t('pages.auth.forgotPassword.inputs.email')"
          type="email"
          :disabled="layout.button.disabled"
          required
        />
      </template>
      <template #button-area>
        {{ t("pages.auth.forgotPassword.buttons.submit") }}
      </template>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const email = ref("");

const layout = reactive({
  label: t("pages.auth.forgotPassword.label"),
  sublabel: t("pages.auth.forgotPassword.sublabel"),
  loaded: true,
  header: {
    paragraph: t("pages.auth.forgotPassword.header.subtext"),
    button: {
      text: t("pages.auth.forgotPassword.header.text"),
      to: "/auth/login",
    },
  },
  message: {
    label: "",
    visible: false,
    type: "error",
  },
  button: {
    loaded: true,
    disabled: false,
  },
});

async function onHandle() {
  layout.button.loaded = false;
  layout.message.visible = false;
  layout.button.disabled = true;

  try {
    await $fetch("/api/auth/forgot-password", {
      method: "POST",
      body: {
        email: email.value,
        redirect_uri: `${window.location.origin}/auth/refresh-password/[code]`,
      },
    });

    layout.message.label = t("pages.auth.forgotPassword.messages.success");
    layout.message.type = "success";
    layout.message.visible = true;
  } catch {
    layout.message.label = t("pages.auth.forgotPassword.messages.error");
    layout.message.visible = true;
  } finally {
    layout.button.loaded = true;
    setTimeout(() => {
      layout.message.visible = false;
      layout.button.disabled = false;
    }, 5000);
  }
}
</script>
