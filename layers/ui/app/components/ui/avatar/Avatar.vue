<template>
  <NuxtImg
    :src="image"
    :class="$cn(avatarVariants({ size, border, rounded, hover }), props.class)"
  />
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { type AvatarVariants, avatarVariants } from ".";

interface Props {
  image?: string;
  class?: HTMLAttributes["class"];
  border?: boolean;
  rounded?: boolean;
  hover?: boolean;
  size: AvatarVariants["size"];
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  image: "https://",
});
</script>
