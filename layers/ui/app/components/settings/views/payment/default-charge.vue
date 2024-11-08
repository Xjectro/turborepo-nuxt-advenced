<template>
  <UiInput
    v-model="inputs.charge"
    :label="t('ui.settings.views.payment.defaultCharge.inputs.charge')"
  />
  <UiAlertDialog>
    <UiAlertDialogTrigger class="px-4 py-2.5">
      {{ t("ui.settings.views.payment.defaultCharge.buttons.update") }}
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogTitle>
        {{ t("ui.settings.views.payment.defaultCharge.alertDialog.title") }}
      </UiAlertDialogTitle>
      <UiAlertDialogDescription>
        {{
          t("ui.settings.views.payment.defaultCharge.alertDialog.description")
        }}
      </UiAlertDialogDescription>
      <template #button-section>
        <UiAlertDialogCancel />
        <UiAlertDialogAction :loading="!isLoaded" @interaction="onUpdate" />
      </template>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { accountStore } = useUtils();
const { pageStore } = useUi();

const isLoaded = ref(true);

const inputs = reactive({
  charge: (accountStore.user?.payment?.default_charge || 50).toString(),
});

pageStore.dialog.settings.layout = {
  scopes: ["USER"],
  title: t("ui.settings.views.payment.defaultCharge.title"),
  message: {
    label: t("ui.settings.views.payment.defaultCharge.messages.error"),
    visible: false,
    type: "error",
  },
};

const layout = computed(() => {
  return pageStore.dialog.settings.layout;
});

async function onUpdate() {
  if (!accountStore.user) return;
  isLoaded.value = false;
  try {
    await $fetch(`/api/payment/set/default-charge/${inputs.charge}`);

    accountStore.user.payment.default_charge = inputs.charge;

    layout.value.message = {
      type: "success",
      label: t("ui.settings.views.payment.defaultCharge.messages.success"),
      visible: true,
    };
  } catch {
    layout.value.message = {
      type: "error",
      label: t("ui.settings.views.payment.defaultCharge.messages.error"),
      visible: true,
    };
  } finally {
    isLoaded.value = true;
    if (!layout.value.message?.visible) return;
    setTimeout(() => (layout.value.message.visible = false), 5000);
  }
}
</script>
