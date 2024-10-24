<template>
  <div>
    <NuxtLayout name="form-auth" v-bind="layout" @interaction="onHandle">
      <template v-if="form.timeline === 'change'" #context-area>
        <UiInputFloat
          v-model="newPassword"
          :label="t('pages.auth.refreshPassword.inputs.password')"
          type="password"
          :disabled="layout.button.disabled"
          required
        />
      </template>
      <template v-if="form.timeline === 'change'" #button-area>
        {{ t("pages.auth.refreshPassword.buttons.submit") }}
      </template>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { route } = useImports();

const newPassword = ref("");
const usage_code = route.params.usage_code;

const form = reactive({
  timeline: "check",
  access_token: "Bearer",
});

const layout = reactive({
  label: t("pages.auth.refreshPassword.label"),
  sublabel: t("pages.auth.refreshPassword.sublabel"),
  loaded: false,
  header: {
    paragraph: t("pages.auth.refreshPassword.header.subtext"),
    button: {
      text: t("pages.auth.refreshPassword.header.text"),
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
  layout.button.disabled = true;
  try {
    await $fetch("/api/auth/refresh-password", {
      method: "POST",
      body: {
        newPassword: newPassword.value,
        usage_code,
      },
    });

    layout.message.label = t("pages.auth.refreshPassword.messages.success");
    layout.message.type = "success";
    layout.message.visible = true;

    useDebounceFn(() => navigateTo("/auth/login"), 2000)();
  } catch {
    layout.message.label = t("pages.auth.refreshPassword.messages.error");
    layout.message.visible = true;
  } finally {
    layout.button.loaded = true;
    setTimeout(() => {
      layout.message.visible = false;
      layout.button.disabled = false;
    }, 5000);
  }
}

tryOnMounted(async () => {
  if (!usage_code) {
    return navigateTo("/api/auth/forgot-password");
  }
  try {
    await $fetch("/api/auth/tfa/verify", {
      method: "POST",
      body: {
        interaction: "forgot_password",
        usage_code,
      },
    });

    form.timeline = "change";
  } catch {
    layout.message.label = t("pages.auth.refreshPassword.messages.error");
    layout.message.visible = true;
  } finally {
    layout.button.loaded = true;
    layout.loaded = true;
  }
});
</script>
