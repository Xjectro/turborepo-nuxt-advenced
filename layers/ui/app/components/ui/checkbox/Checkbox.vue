<template>
  <CheckboxRoot v-bind="forwarded">
    <CheckboxIndicator />
  </CheckboxRoot>
</template>

<script setup lang="ts">
import CheckboxRoot from "./CheckboxRoot.vue";
import CheckboxIndicator from "./CheckboxIndicator.vue";

import { useForwardPropsEmits } from "radix-vue";
import type { CheckboxRootProps, CheckboxRootEmits } from "radix-vue";

const props = withDefaults(
  defineProps<CheckboxRootProps & { class?: string }>(),
  {},
);

const emits = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
