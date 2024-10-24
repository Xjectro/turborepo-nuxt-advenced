<template>
  <div class="flex flex-row items-center justify-start gap-10">
    <button
      v-for="(item, index) in references.themes"
      :key="index"
      class="transition-all relative flex flex-col items-center gap-2 text-base font-chakra-petch font-medium text-black dark:text-zinc-100"
      @click="setTheme(item.key)"
    >
      <div
        :class="
          $cn(
            'transition-all rounded-full w-16 h-16 outline outline-2 outline-offset-2',
            item.key == theme
              ? 'outline-primary-500'
              : 'outline-zinc-300 dark:outline-zinc-900',
          )
        "
        :style="{ backgroundColor: item.color, borderColor: item.color }"
      />
      <div
        :class="
          $cn(
            'transition-all absolute right-0 -m-1 flex items-center justify-center w-6 h-6 rounded-full border-2 border-solid border-primary-700 bg-primary-500 text-white',
            item.key == theme
              ? 'opacity-100 translate-y-0 translate-x-0'
              : 'opacity-0 -translate-y-4 translate-x-4',
          )
        "
      >
        <IconMousePointerClick />
      </div>
      {{ t(`ui.settings.views.app.appearance.themes.${item.key}`) }}
    </button>
  </div>
  <DashboardContentSubhead
    :label="t('ui.settings.views.app.appearance.subtitle')"
  />
  <UiDivider />
  <!-- Secondary Theme -->
  <div class="flex flex-wrap items-center gap-10">
    <button
      v-for="(item, index) in references.colors"
      :key="index"
      class="transition-all relative flex flex-col items-center gap-2 text-base group font-chakra-petch font-medium text-black dark:text-zinc-100"
      @click="setColorMode(item.key)"
    >
      <div
        :class="
          $cn(
            'transition-all rounded-full w-16 h-16 outline outline-2 outline-offset-2',
            item.key == color
              ? 'outline-primary-500'
              : 'outline-zinc-300 dark:outline-zinc-900',
          )
        "
        :style="{ backgroundColor: item.color, borderColor: item.color }"
      />
      <div
        :class="
          $cn(
            'transition-all absolute right-0 -m-1 flex items-center justify-center w-6 h-6 rounded-full border-2 border-solid border-primary-700 bg-primary-500 text-white',
            item.key == color
              ? 'opacity-100 translate-y-0 translate-x-0'
              : 'opacity-0 -translate-y-4 translate-x-4',
          )
        "
      >
        <IconMousePointerClick />
      </div>
      {{ t(`ui.settings.views.app.appearance.colors.${item.key}`) }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { setTheme, setColorMode, color, theme, references, pageStore } = useUi();

pageStore.dialog.settings.layout = {
  title: t("ui.settings.views.app.appearance.title"),
};
</script>
