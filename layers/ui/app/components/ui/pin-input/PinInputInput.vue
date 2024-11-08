<template>
  <PinInputInput
    v-bind="forwardedProps"
    :class="
      $cn(
        'transition-all relative text-center flex items-center justify-center text-sm w-[56px] h-[56px] cursor-pointer focus:cursor-text resize-none outline-none px-3 rounded-xl shadow-xl shadow-transparent focus:shadow-zinc-100 dark:focus:shadow-zinc-800 border border-solid font-inter border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white bg-zinc-950 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-950 dark:focus:bg-zinc-950',
        props.class,
      )
    "
  />
</template>

<script lang="ts" setup>
import {
  PinInputInput,
  type PinInputInputProps,
  useForwardProps,
} from "radix-vue";
import { type HTMLAttributes } from "vue";

const props = defineProps<
  PinInputInputProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
