<template>
  <DrawerTrigger
    :class="
      $cn(
        'transition-all flex items-center justify-center outline-none mx-auto p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </DrawerTrigger>
</template>

<script lang="ts" setup>
import { DrawerTrigger, type DrawerTriggerProps } from "vaul-vue";
import { useForwardProps } from "radix-vue";

const props = defineProps<DrawerTriggerProps & { class?: string }>();

const forwardedProps = useForwardProps(props);
</script>
