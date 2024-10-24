<template>
  <SplitterGroup v-bind="forwarded">
    <slot />
  </SplitterGroup>
</template>

<script setup lang="ts">
import {
  useForwardPropsEmits,
  SplitterGroup,
  type SplitterGroupEmits,
  type SplitterGroupProps,
} from "radix-vue";

const props = withDefaults(defineProps<SplitterGroupProps>(), {});

const emits = defineEmits<SplitterGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
