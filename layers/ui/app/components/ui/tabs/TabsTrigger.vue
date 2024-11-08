<template>
  <TabsTrigger
    v-bind="forwardedProps"
    class="px-4 h-[45px] flex items-center justify-center gap-2 text-[15px] leading-none select-none outline-none cursor-pointer focus-visible:relative rounded-t-xl font-inter font-medium text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
  >
    <slot />
  </TabsTrigger>
</template>

<script setup lang="ts">
import { useForwardProps, TabsTrigger, type TabsTriggerProps } from "radix-vue";

// data-[state=active]:

const props = withDefaults(defineProps<TabsTriggerProps>(), {});

const forwardedProps = useForwardProps(props);
</script>
