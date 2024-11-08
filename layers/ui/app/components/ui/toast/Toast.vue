<template>
  <ToastRoot
    v-bind="forwarded"
    class="rounded-xl grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slide-in data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipe-out bg-zinc-100 dark:bg-zinc-900"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import {
  useForwardPropsEmits,
  ToastRoot,
  type ToastRootEmits,
  type ToastRootProps,
} from "radix-vue";

const props = withDefaults(defineProps<ToastRootProps>(), {});

const emits = defineEmits<ToastRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
