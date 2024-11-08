<template>
  <NavigationMenuTrigger
    v-bind="props"
    class="group flex select-none items-center justify-between gap-[2px] text-base rounded-[4px] px-3 py-2 text-[15px] font-inter font-medium leading-none outline-none text-black dark:text-zinc-100"
  >
    <slot />
    <IconChevronDown
      :size="16"
      class="relative top-[1px] transition-transform duration-[250ms] ease-in group-data-[state=open]:-rotate-180"
    />
  </NavigationMenuTrigger>
</template>

<script lang="ts" setup>
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
} from "radix-vue";

const props = withDefaults(defineProps<NavigationMenuTriggerProps>(), {});
</script>
