<template>
  <TagsInputItem
    v-bind="forwardProps"
    class="flex items-center justify-center p-1 rounded gap-2 font-inter font-medium bg-zinc-200 dark:bg-zinc-900 aria-[current=true]:bg-zinc-800 text-black dark:text-white"
  >
    <slot />
  </TagsInputItem>
</template>

<script lang="ts" setup>
import {
  type TagsInputItemProps,
  useForwardProps,
  TagsInputItem,
} from "radix-vue";

const props = defineProps<TagsInputItemProps & { class?: string }>();

const forwardProps = useForwardProps(props);
</script>
