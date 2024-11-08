<template>
  <SwitchThumb
    v-bind="forwarded"
    :class="
      $cn(
        'transition-transform duration-100 block w-5 h-5 my-auto bg-zinc-400 dark:bg-zinc-400 data-[state=checked]:bg-zinc-100 rounded-full translate-x-1 will-change-transform data-[state=checked]:translate-x-6',
        props.class,
      )
    "
  >
    <slot />
  </SwitchThumb>
</template>

<script setup lang="ts">
import {
  SwitchThumb,
  useForwardPropsEmits,
  type SwitchThumbProps,
} from "radix-vue";
import type { HTMLAttributes } from "vue";

const props = defineProps<
  SwitchThumbProps & {
    class?: HTMLAttributes["class"];
    inset?: boolean;
    value?: string;
  }
>();
const emits = defineEmits(["interaction"]);

const forwarded = useForwardPropsEmits(props, emits);
</script>
