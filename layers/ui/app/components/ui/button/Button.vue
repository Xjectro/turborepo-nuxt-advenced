<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="$cn(buttonVariants({ variant, type }), props.class)"
    :disabled="disabled"
    @click="onInteraction"
  >
    <IconLoader v-if="props.loading" :size="20" class="animate-spin" />
    <slot v-else />
  </Primitive>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { type ButtonVariants, buttonVariants } from ".";
import { Primitive, type PrimitiveProps } from "radix-vue";

const emits = defineEmits(["interaction"]);

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  class?: HTMLAttributes["class"];
  disabled?: HTMLButtonElement["disabled"];
  to?: string | null;
  loading?: boolean;
  type?: ButtonVariants["type"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  class: "",
  variant: "primary",
  type: "default",
  disabled: false,
  to: null,
  loading: false,
});

const onInteraction = useThrottleFn(() => {
  if (props.to) {
    navigateTo(props.to);
  } else {
    emits("interaction");
  }
}, 200);
</script>
