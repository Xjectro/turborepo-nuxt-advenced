<template>
  <Primitive
    v-if="visible"
    :as="as"
    :as-child="asChild"
    :class="$cn(messageVariants({ type }), props.class)"
  >
    {{ label }}
  </Primitive>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { type MessageVariants, messageVariants } from ".";
import { Primitive, type PrimitiveProps } from "radix-vue";

interface Props extends PrimitiveProps {
  type?: MessageVariants["type"];
  class?: HTMLAttributes["class"];
  visible?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  class: "",
  type: "error",
  visible: false,
  label: "",
});
</script>
