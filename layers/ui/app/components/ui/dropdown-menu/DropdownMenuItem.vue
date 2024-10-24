<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      $cn(
        'transition-all cursor-pointer flex items-center justify-start overflow-hidden w-full px-4 py-2 rounded-lg gap-2 text-base font-chakra-petch font-medium whitespace-nowrap group hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100',
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
  useForwardProps,
} from "radix-vue";
import { type HTMLAttributes, computed } from "vue";

const props = defineProps<
  DropdownMenuItemProps & {
    class?: HTMLAttributes["class"];
    inset?: boolean;
    to?: string;
  }
>();

const emit = defineEmits(["interaction"]);
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);

function onClick() {
  if (props.to) {
    navigateTo(props.to);
  } else {
    emit("interaction");
  }
}
</script>
