<template>
  <aside ref="sidebarRoot">
    <div
      v-if="props.background"
      ref="sidebarBackground"
      class="transition-all absolute top-0 left-0 h-full order-2 bg-zinc-100 dark:bg-zinc-900/30 z-10"
    />
    <div ref="sidebarContent" class="order-1 z-20">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { SidebarProps } from ".";

const props = withDefaults(defineProps<SidebarProps>(), { background: false });

const sidebarRoot = ref<HTMLElement | null>(null);
const sidebarBackground = ref<HTMLElement | null>(null);

const bounding = useElementBounding(sidebarRoot);

watch(
  bounding.x,
  () => {
    if (sidebarBackground.value)
      sidebarBackground.value.style.width = `${bounding.x.value + bounding.width.value}px`;
  },
  { immediate: true },
);
</script>
