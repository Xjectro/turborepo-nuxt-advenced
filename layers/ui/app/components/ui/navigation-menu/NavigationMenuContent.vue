<template>
  <NavigationMenuContent
    v-bind="forwarded"
    class="data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute top-0 left-0 w-full sm:w-auto backdrop-blur-3xl bg-zinc-100 dark:bg-zinc-900/30"
  >
    <ul
      class="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]"
    >
      <slot />
    </ul>
  </NavigationMenuContent>
</template>

<script lang="ts" setup>
import {
  NavigationMenuContent,
  useForwardPropsEmits,
  type NavigationMenuContentProps,
  type NavigationMenuContentEmits,
} from "radix-vue";

const props = withDefaults(defineProps<NavigationMenuContentProps>(), {});

const emits = defineEmits<NavigationMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
