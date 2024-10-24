<template>
  <div>
    <NuxtLayout name="form-auth" v-bind="layout" @interaction="onHandle">
      <template #context-area>
        <UiPinInput
          v-if="form.timeline == 'verify'"
          :repeat="5"
          @complate="onHandle"
        />
        <UiInputFloat
          v-if="form.timeline == 'check'"
          v-model="inputs.email"
          :label="t('pages.auth.login.inputs.email')"
          :disabled="layout.button.disabled"
          type="email"
          required
        />
        <UiInputFloat
          v-if="form.timeline == 'check'"
          v-model="inputs.password"
          :disabled="layout.button.disabled"
          :label="t('pages.auth.login.inputs.password')"
          type="password"
          required
        />
      </template>
      <template v-if="form.timeline == 'check'" #button-area>
        {{ t("pages.auth.login.buttons.check") }}
      </template>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { app } = useRuntimeConfig();

const form = reactive({
  timeline: "check",
});

const layout = reactive({
  label: t("pages.auth.login.label"),
  sublabel: t("pages.auth.login.sublabel"),
  loaded: true,
  header: {
    paragraph: t("pages.auth.login.header.subtext", { name: app.title }),
    button: { text: t("pages.auth.login.header.text"), to: "/auth/register" },
  },
  message: {
    label: t("pages.auth.login.messages.error"),
    visible: false,
    type: "error",
  },
  timeline: [
    t("pages.auth.login.timeline.verify"),
    t("pages.auth.login.timeline.submit"),
  ],
  button: {
    loaded: true,
    disabled: false,
  },
});

const inputs = reactive({
  email: "",
  password: "",
});

async function onHandle(usage_code?: string) {
  layout.button.loaded = false;
  layout.button.disabled = true;
  try {
    if (form.timeline === "check") {
      const data = await $fetch("/api/auth/login", {
        method: "POST",
        body: usage_code ? { usage_code } : inputs,
      });

      if (data?.message === "2FA required, check your email for the code.") {
        form.timeline = "verify";
      } else {
        setUser();
      }
    }
  } catch {
    layout.message.label = t("pages.auth.login.messages.error");
    layout.message.visible = true;
  } finally {
    layout.button.loaded = true;
    setTimeout(() => {
      layout.message.visible = false;
      layout.button.disabled = false;
    }, 5000);
  }
}

function setUser() {
  layout.message.label = t("pages.auth.login.messages.success");
  layout.message.type = "success";
  layout.message.visible = true;

  useDebounceFn(() => navigateTo("/"), 2000)();
}
</script>
