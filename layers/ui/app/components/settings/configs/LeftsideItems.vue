<template>
  <div v-for="(category, index) in filteredCategories" :key="category.name"
    :class="$cn('w-full', index < filteredCategories.length - 1 ? 'mb-5' : '')">
    <h2
      class="transition-all mb-4 whitespace-nowrap text-sm font-medium font-chakra-petch text-zinc-500 dark:text-zinc-400">
      {{ $t(`ui.settings.configs.leftsideItems.${category.name}`) }}
    </h2>
    <div :class="$cn(
      'flex flex-col items-start gap-2 w-full',
      index < filteredCategories.length - 1 ? 'mb-5' : '',
    )
      ">
      <UiDrawerItem v-for="subCategory in category.subCategories" :key="subCategory.name" :here="subCategory.here"
        @click="pageStore.dialog.settings.path = subCategory.to">
        <component :is="subCategory.icon" class="w-4 h-4" />
        {{ $t(`ui.settings.configs.leftsideItems.${subCategory.name}`) }}
      </UiDrawerItem>
    </div>
    <UiDivider v-if="index < filteredCategories.length - 1" />
  </div>
</template>

<script lang="ts" setup>
const { accountStore } = useUtils();
const { pageStore } = useUi();

import categories from "./categories";

const filteredCategories = computed(() => {
  return categories.filter(
    (cat) => !!accountStore._getUser || cat.required,
  );
});

watch(
  () => pageStore.dialog.settings.path,
  (path) => {
    categories.forEach((cat) => {
      cat.subCategories.forEach((subCat) => {
        subCat.here = path.includes(subCat.to);
      });
    });
  },
  { immediate: true },
);
</script>
