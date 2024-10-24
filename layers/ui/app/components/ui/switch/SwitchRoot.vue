<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="
      $cn(
        'transition-all duration-100 w-12 h-7 bg-zinc-200 rounded-full dark:bg-zinc-800 data-[state=checked]:bg-primary-500',
        props.class,
      )
    "
  >
    <slot />
  </SwitchRoot>
</template>

<script setup lang="ts">
import {
  SwitchRoot,
  useForwardPropsEmits,
  type SwitchRootEmits,
  type SwitchRootProps,
} from "radix-vue";

const props = withDefaults(
  defineProps<SwitchRootProps & { class?: string }>(),
  {},
);

const emits = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
