<template>
  <PinInputRoot
    v-bind="forwarded"
    :class="
      $cn(
        'flex flex-wrap items-center justify-between w-full gap-5',
        props.class,
      )
    "
  >
    <slot />
  </PinInputRoot>
</template>

<script lang="ts" setup>
import {
  PinInputRoot,
  type PinInputRootEmits,
  type PinInputRootProps,
  useForwardPropsEmits,
} from "radix-vue";
import { type HTMLAttributes, computed } from "vue";

const props = withDefaults(
  defineProps<PinInputRootProps & { class?: HTMLAttributes["class"] }>(),
  {
    modelValue: () => [],
  },
);
const emits = defineEmits<PinInputRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
