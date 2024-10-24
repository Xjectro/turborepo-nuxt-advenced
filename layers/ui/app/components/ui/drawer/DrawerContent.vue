<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        $cn(
          'fixed inset-x-0 bottom-0 z-[150] flex flex-col rounded-t-[10px] border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden',
          props.class,
        )
      "
    >
      <div class="flex items-center justify-center mx-auto my-4 h-4 w-full">
        <div
          class="mx-auto h-1.5 w-[100px] rounded-full bg-zinc-300 dark:bg-zinc-800"
        />
      </div>
      <UiScrollAreaRoot class="w-full h-full">
        <UiScrollAreaViewport class="w-full max-h-[80vh] container">
          <slot />
        </UiScrollAreaViewport>
      </UiScrollAreaRoot>
    </DrawerContent>
  </DrawerPortal>
</template>

<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import { useForwardPropsEmits } from "radix-vue";
import DrawerOverlay from "./DrawerOverlay.vue";
import { DrawerContent, DrawerPortal } from "vaul-vue";
import type { DialogContentProps, DialogContentEmits } from "radix-vue";

const props = defineProps<
  DialogContentProps & { class?: HtmlHTMLAttributes["class"] }
>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
