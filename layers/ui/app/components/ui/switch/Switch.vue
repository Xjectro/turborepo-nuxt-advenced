<template>
  <SwitchRoot v-bind="forwarded">
    <SwitchThumb />
  </SwitchRoot>
</template>

<script lang="ts" setup>
import SwitchRoot from "./SwitchRoot.vue";
import SwitchThumb from "./SwitchThumb.vue";

import { useForwardPropsEmits } from "radix-vue";
import type { SwitchRootEmits, SwitchRootProps } from "radix-vue";

const props = withDefaults(
  defineProps<SwitchRootProps & { class?: string }>(),
  {},
);

const emits = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
