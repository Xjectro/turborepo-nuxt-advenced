<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      $cn(
        'transition-all flex w-6 h-6 appearance-none items-center justify-center rounded-lg outline-none',
        props.checked ? 'bg-primary-500' : 'bg-zinc-200 dark:bg-zinc-800',
      )
    "
  >
    <slot />
  </CheckboxRoot>
</template>

<script setup lang="ts">
import {
  CheckboxRoot,
  useForwardPropsEmits,
  type CheckboxRootEmits,
  type CheckboxRootProps,
} from "radix-vue";

const props = withDefaults(defineProps<CheckboxRootProps>(), {});

const emits = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
