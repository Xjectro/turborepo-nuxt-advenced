<template>
  <Primitive
    v-bind="forwardedProps"
    :class="$cn('flex items-center', props.class)"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { Primitive, type PrimitiveProps, useForwardProps } from "radix-vue";
import { type HTMLAttributes } from "vue";

const props = defineProps<
  PrimitiveProps & { class?: HTMLAttributes["class"] }
>();
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
const forwardedProps = useForwardProps(delegatedProps);
</script>
