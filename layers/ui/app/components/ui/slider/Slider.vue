<template>
  <SliderRoot
    v-bind="forwarded"
    :class="
      $cn(
        'relative flex items-center select-none touch-none w-full h-5',
        props.class,
      )
    "
  >
    <slot />
  </SliderRoot>
</template>

<script lang="ts" setup>
import { useForwardPropsEmits, SliderRoot } from "radix-vue";
import type { SliderRootProps, SliderRootEmits } from "radix-vue";

const props = withDefaults(
  defineProps<SliderRootProps & { class?: HTMLButtonElement["className"] }>(),
  {},
);

const emits = defineEmits<SliderRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
