<template>
  <SelectTrigger
    :class="
      $cn(
        'transition-all flex items-center gap-2 outline-none font-inter font-medium bg-zinc-400/15 hover:bg-zinc-400/25 dark:bg-zinc-600/20 dark:hover:bg-zinc-600/30 text-black dark:text-zinc-100',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <SelectValue :placeholder="placeholder" />
    <IconChevronDown :size="16" />
  </SelectTrigger>
</template>

<script lang="ts" setup>
import {
  SelectTrigger,
  type SelectTriggerProps,
  SelectValue,
  useForwardProps,
} from "radix-vue";

const props = defineProps<
  SelectTriggerProps & { class?: string; placeholder: string }
>();

const forwardedProps = useForwardProps(props);
</script>
