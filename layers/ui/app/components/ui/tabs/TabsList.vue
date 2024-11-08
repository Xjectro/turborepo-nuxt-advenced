<template>
  <TabsList
    v-bind="forwardedProps"
    class="relative shrink-0 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800"
  >
    <slot />
  </TabsList>
</template>

<script setup lang="ts">
import { useForwardProps, TabsList, type TabsListProps } from "radix-vue";

const props = withDefaults(defineProps<TabsListProps>(), {});

const forwardedProps = useForwardProps(props);
</script>
