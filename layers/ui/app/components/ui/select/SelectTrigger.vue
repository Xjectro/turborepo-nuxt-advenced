<template>
  <SelectTrigger
    :class="
      $cn(
        'transition-all outline-none bg-zinc-400/15 hover:bg-zinc-400/25 dark:bg-zinc-600/20 dark:hover:bg-zinc-600/30 text-black dark:text-zinc-10',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </SelectTrigger>
</template>

<script lang="ts" setup>
import {
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from "radix-vue";

const props = defineProps<SelectTriggerProps & { class?: string }>();

const forwardedProps = useForwardProps(props);
</script>
