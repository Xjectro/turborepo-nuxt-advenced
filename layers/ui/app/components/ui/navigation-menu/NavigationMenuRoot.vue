<template>
  <NavigationMenuRoot
    v-bind="forwarded"
    class="relative z-[1] flex w-full justify-center"
  >
    <NavigationMenuList class="center m-0 flex list-none rounded-[6px] p-1">
      <slot />

      <NavigationMenuIndicator />
    </NavigationMenuList>

    <div class="absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuViewport
        class="data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)] bg-zinc-100 dark:bg-zinc-900/30"
      />
    </div>
  </NavigationMenuRoot>
</template>

<script lang="ts" setup>
import NavigationMenuIndicator from "./NavigationMenuIndicator.vue";
import {
  NavigationMenuRoot,
  useForwardPropsEmits,
  NavigationMenuViewport,
  NavigationMenuList,
  type NavigationMenuRootProps,
  type NavigationMenuRootEmits,
} from "radix-vue";

const props = withDefaults(defineProps<NavigationMenuRootProps>(), {});

const emits = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
