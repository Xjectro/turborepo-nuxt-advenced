<template>
  <SelectPortal>
    <SelectContent
      v-bind="forwarded"
      :class="
        $cn(
          'min-w-[160px] z-[100] rounded-lg border border-solid border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950',
          props.class,
        )
      "
    >
      <SelectScrollUpButton
        class="transition-all flex items-center justify-center py-2 bg-zinc-100/60 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-950/60 text-black dark:text-white cursor-pointer"
      >
        <IconChevronUp :size="18" class="text-white" />
      </SelectScrollUpButton>

      <SelectViewport class="p-2">
        <slot />
      </SelectViewport>

      <SelectScrollDownButton
        class="transition-all flex items-center justify-center py-2 bg-zinc-100/60 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-950/60 text-black dark:text-white cursor-pointer"
      >
        <IconChevronDown :size="18" class="text-white" />
      </SelectScrollDownButton>
    </SelectContent>
  </SelectPortal>
</template>

<script lang="ts" setup>
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  useForwardPropsEmits,
  SelectViewport,
  SelectScrollDownButton,
  SelectScrollUpButton,
} from "radix-vue";
import { type HTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    sideOffset: 4,
  },
);
const emits = defineEmits<SelectContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
