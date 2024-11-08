<template>
  <PopoverRoot v-bind="forwarded">
    <slot />
  </PopoverRoot>
</template>

<script setup lang="ts">
import {
  PopoverRoot,
  useForwardPropsEmits,
  type PopoverRootProps,
  type PopoverRootEmits,
} from "radix-vue";

const props = withDefaults(defineProps<PopoverRootProps>(), {});

const emits = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
