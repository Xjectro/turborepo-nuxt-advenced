<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="
      $cn(
        'inline-flex items-center font-inter font-medium pointer-events-auto cursor-pointer rounded-xl px-3 py-3 bg-red-500 bg-opacity-10 hover:bg-opacity-20 text-red-500',
        props.class,
      )
    "
  >
    {{ $t("ui.alertDialog.buttons.cancel") }}
  </AlertDialogCancel>
</template>

<script setup lang="ts">
import { AlertDialogCancel } from "radix-vue";
import type { AlertDialogCancelProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogCancelProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
