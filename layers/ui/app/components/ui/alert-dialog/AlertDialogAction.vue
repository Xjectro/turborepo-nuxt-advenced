<template>
  <AlertDialogAction
    :class="
      $cn(
        'inline-flex items-center rounded-xl font-inter font-medium pointer-events-auto cursor-pointer px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white',
        props.class,
      )
    "
    v-bind="forwarded"
    @click="onInteraction"
  >
    <IconLoader v-if="props.loading" :size="20" class="animate-spin" />
    <span v-else>{{ $t("ui.alertDialog.buttons.action") }}</span>
  </AlertDialogAction>
</template>

<script lang="ts" setup>
import {
  useForwardPropsEmits,
  AlertDialogAction,
  type AlertDialogActionProps,
} from "radix-vue";
import type { HTMLAttributes } from "vue";

interface Props extends AlertDialogActionProps {
  class?: HTMLAttributes["class"];
  loading: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["interaction"]);

const onInteraction = useThrottleFn(() => {
  emits("interaction");
}, 300);

const forwarded = useForwardPropsEmits(props, emits);
</script>
