<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :class="
      $cn(
        'cursor-pointer flex items-center justify-start overflow-hidden w-full px-4 py-2 rounded-xl gap-2 text-base font-inter font-medium whitespace-nowrap group hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100',
        inset && 'pl-8',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot />
  </DropdownMenuItem>
</template>

<script lang="ts" setup>
import {
  DropdownMenuItem,
  type DropdownMenuItemProps,
  useForwardPropsEmits,
} from "radix-vue";
import { type HTMLAttributes } from "vue";

const props = defineProps<
  DropdownMenuItemProps & {
    class?: HTMLAttributes["class"];
    inset?: boolean;
    to?: string;
  }
>();
const emits = defineEmits(["interaction"]);

const forwarded = useForwardPropsEmits(props, emits);

const onClick = useThrottleFn(() => {
  if (props.to) {
    navigateTo(props.to);
  } else {
    emits("interaction");
  }
}, 200);
</script>
