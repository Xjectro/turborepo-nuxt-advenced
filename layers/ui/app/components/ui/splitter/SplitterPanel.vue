<template>
  <SplitterPanel v-bind="forwarded">
    <slot />
  </SplitterPanel>
</template>

<script setup lang="ts">
import {
  useForwardPropsEmits,
  SplitterPanel,
  type SplitterPanelEmits,
  type SplitterPanelProps,
} from "radix-vue";

const props = withDefaults(defineProps<SplitterPanelProps>(), {});

const emits = defineEmits<SplitterPanelEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
