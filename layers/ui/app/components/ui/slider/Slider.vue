<template>
  <SliderRoot
    v-bind="forward"
    :class="
      $cn(
        'relative flex items-center select-none touch-none w-full h-5',
        props.class,
      )
    "
  >
    <SliderTrack>
      <SliderRange />
    </SliderTrack>

    <SliderThumb v-for="(_, i) in props.modelValue" :key="i" />
  </SliderRoot>
</template>

<script lang="ts" setup>
import SliderRange from "./SliderRange.vue";
import SliderTrack from "./SliderTrack.vue";
import SliderThumb from "./SliderThumb.vue";
import {
  type SliderRootEmits,
  type SliderRootProps,
  useForwardPropsEmits,
  SliderRoot,
} from "radix-vue";

const props = defineProps<SliderRootProps & { class?: string }>();
const emits = defineEmits<SliderRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>
