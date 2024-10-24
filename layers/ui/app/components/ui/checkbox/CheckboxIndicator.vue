<template>
  <CheckboxIndicator
    v-bind="props"
    class="w-3.5 h-3.5 bg-zinc-100 rounded-[5px] transition-all"
  >
  </CheckboxIndicator>
</template>

<script setup lang="ts">
import { CheckboxIndicator, type CheckboxIndicatorProps } from "radix-vue";

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {});
</script>
