<template>
  <NuxtLink
    :to="props.to"
    :class="
      $cn(
        'flex items-center justify-between w-full py-2 px-2 cursor-pointer whitespace-nowrap rounded-lg group font-medium font-inter bg-transparent',
        props.here
          ? 'bg-zinc-400/15 hover:bg-zinc-400/25 dark:bg-zinc-600/20 dark:hover:bg-zinc-600/30 text-black dark:text-zinc-100'
          : 'hover:bg-zinc-400/15 dark:hover:bg-zinc-600/20 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100',
      )
    "
  >
    <span class="flex items-center gap-3">
      <slot />
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
const { $cn } = useNuxtApp();

const props = defineProps({
  to: { type: String, required: false, default: null },
  here: Boolean,
});
</script>
