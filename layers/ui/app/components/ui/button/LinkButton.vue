<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="$cn(linkButtonVariants({ variant }), props.class)"
    :disabled="disabled"
    :href="href"
    :target="target"
  >
    <IconLoader v-if="props.loading" :size="20" class="animate-spin" />
    <slot v-else />
  </Primitive>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { type LinkButtonVariants, linkButtonVariants } from ".";
import { Primitive, type PrimitiveProps } from "radix-vue";

interface Props extends PrimitiveProps {
  variant?: LinkButtonVariants["variant"];
  class?: HTMLAttributes["class"];
  disabled?: HTMLButtonElement["disabled"];
  href: string | null;
  target?: "_blank";
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "a",
  class: "",
  variant: "primary",
  disabled: false,
  loading: false,
});
</script>
