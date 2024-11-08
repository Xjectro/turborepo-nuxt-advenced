<template>
  <SelectItem
    v-bind="forwarded"
    class="transition-all cursor-pointer flex items-center justify-start overflow-hidden w-full px-2 py-2 border-none outline-none rounded-lg gap-2 text-base font-inter font-medium whitespace-nowrap group hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100"
    :value="value"
  >
    <SelectItemText>
      {{ value }}
    </SelectItemText>
    <SelectItemIndicator
      class="absolute right-3 w-[25px] inline-flex items-center justify-center"
    >
      <IconMousePointerClick :size="16" />
    </SelectItemIndicator>
  </SelectItem>
</template>

<script lang="ts" setup>
import {
  SelectItem,
  type SelectItemProps,
  useForwardPropsEmits,
  SelectItemText,
  SelectItemIndicator,
} from "radix-vue";
import { type HTMLAttributes } from "vue";

const props = defineProps<
  SelectItemProps & {
    class?: HTMLAttributes["class"];
  }
>();
const emits = defineEmits(["interaction"]);

const forwarded = useForwardPropsEmits(props, emits);
</script>
