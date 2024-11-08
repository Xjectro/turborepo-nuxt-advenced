<template>
  <SelectLabel
    v-bind="forwardedProps"
    :class="
      $cn(
        'transition-all px-2 font-inter text-smm font-medium underline text-zinc-600 dark:text-zinc-500',
        props.class,
      )
    "
  >
    <slot />
  </SelectLabel>
</template>

<script lang="ts" setup>
import { SelectLabel, type SelectLabelProps, useForwardProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";

const props = defineProps<
  SelectLabelProps & {
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
