<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  useForwardPropsEmits,
  type DialogRootProps,
  type DialogRootEmits,
} from "radix-vue";

const props = withDefaults(defineProps<DialogRootProps>(), {});

const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
