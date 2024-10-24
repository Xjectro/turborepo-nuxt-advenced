<template>
  <div>
    <NuxtLoadingIndicator
      :color="references.colors.find((c) => c.key == pageStore.ui.color)?.color"
    />
    <NuxtRouteAnnouncer />
    <div v-if="isLoaded">
      <ConfigProvider :dir="dir">
        <UiScrollAreaRoot class="w-full h-full">
          <UiScrollAreaViewport class="w-full max-h-screen">
            <NuxtPage />
          </UiScrollAreaViewport>
        </UiScrollAreaRoot>
        <SettingsProvider />
      </ConfigProvider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ConfigProvider } from "radix-vue";

const { locale, locales } = useI18n();
const { pageStore, references } = useUi();
const isLoaded = ref(false);

const textDirection = useTextDirection({ initialValue: "ltr" });

const currentLocale = computed(() =>
  locales.value.find((l) => l.code === locale.value),
);

const dir = computed(() =>
  currentLocale.value?.dir === "rtl" ? "rtl" : "ltr",
);

watch(locale, () => {
  textDirection.value = dir.value;
});

tryOnMounted(() => {
  isLoaded.value = true;
});

watch(
  () => pageStore.ui.color,
  (newValue, oldValue) => {
    if (oldValue) document.body.classList.remove(`${oldValue}-color-mode`);
    document.body.classList.add(`${newValue}-color-mode`);
  },
  { immediate: true },
);
</script>
