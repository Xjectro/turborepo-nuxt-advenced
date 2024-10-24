<template>
  <div>
    <NuxtLayout name="form-auth" v-bind="layout" @interaction="onHandle">
      <template #context-area>
        <div class="flex items-center w-full gap-5">
          <UiInputFloat
            v-model="inputs.firstName"
            :label="t('pages.auth.register.inputs.firstName')"
            type="text"
            :disabled="layout.button.disabled"
            required
          />
          <UiInputFloat
            v-model="inputs.lastName"
            :label="t('pages.auth.register.inputs.lastName')"
            type="text"
            :disabled="layout.button.disabled"
            required
          />
        </div>
        <UiInputFloat
          v-model="inputs.username"
          :label="t('pages.auth.register.inputs.username')"
          type="text"
          :disabled="layout.button.disabled"
          required
        />
        <UiInputFloat
          v-model="inputs.email"
          :label="t('pages.auth.register.inputs.email')"
          type="email"
          required
          :disabled="layout.button.disabled"
        />
        <UiInputFloat
          v-model="inputs.password"
          :label="t('pages.auth.register.inputs.password')"
          type="password"
          :disabled="layout.button.disabled"
          required
        />
      </template>
      <template #button-area>
        {{ t("pages.auth.register.buttons.submit") }}
      </template>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const inputs = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
});

const layout = reactive({
  label: t("pages.auth.register.label"),
  sublabel: t("pages.auth.register.sublabel"),
  loaded: true,
  header: {
    paragraph: t("pages.auth.register.header.subtext"),
    button: { text: t("pages.auth.register.header.text"), to: "/auth/login" },
  },
  message: {
    label: "",
    visible: false,
    type: "error",
  },
  button: {
    loaded: true,
    disabled: fase,
  },
});

async function onHandle() {
  layout.button.loaded = false;
  layout.message.visible = false;
  layout.button.disabled = true;
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: inputs,
    });

    layout.message.label = t("pages.auth.register.messages.success");
    layout.message.type = "success";
    layout.message.visible = true;

    useDebounceFn(() => navigateTo("/auth/login"), 2000)();
  } catch {
    layout.message.label = t("pages.auth.register.messages.error");
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
