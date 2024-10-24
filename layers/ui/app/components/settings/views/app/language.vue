<template>
  <UiCard v-for="(item, index) in locales" :key="index">
    <template #start-area>
      <NuxtImg :src="item.flag" class="w-7 h-7 rounded-full" />
      <h5
        class="text-base font-chakra-petch font-medium text-black dark:text-zinc-100"
      >
        {{ item.name }}
      </h5>
    </template>
    <template #end-area>
      <UiButton
        :disabled="currentLocale?.code == item.code"
        class="px-4 py-1.5"
        @interaction="setI18n(item.code)"
      >
        {{
          currentLocale?.code == item.code
            ? t("ui.settings.views.app.language.buttons.current")
            : t("ui.settings.views.app.language.buttons.change")
        }}
      </UiButton>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
const { t, locale, locales, setLocale } = useI18n();
const { pageStore } = useUi();

pageStore.dialog.settings.layout = {
  title: t("ui.settings.views.app.language.title"),
};

const setI18n = (code: string) => {
  setLocale(code);
};

const currentLocale = computed(() => {
  return locales.value.find((l) => l.code == locale.value);
});
</script>
