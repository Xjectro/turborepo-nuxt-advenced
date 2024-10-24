<template>
  <NavigationMenuIndicator
    v-bind="props"
    class="data-[state=hidden]:opacity-0 duration-200 data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease]"
  >
    <div
      class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-zinc-100 dark:bg-zinc-900/30"
    />
  </NavigationMenuIndicator>
</template>

<script lang="ts" setup>
import {
  NavigationMenuIndicator,
  type NavigationMenuIndicatorProps,
} from "radix-vue";

const props = withDefaults(defineProps<NavigationMenuIndicatorProps>(), {});
</script>
