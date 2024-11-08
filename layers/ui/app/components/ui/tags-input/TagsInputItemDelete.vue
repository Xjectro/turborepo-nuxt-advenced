<template>
  <TagsInputItemDelete
    v-bind="forwardProps"
    class="transition-all p-1 rounded-full bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-black dark:text-white"
  >
    <IconX :size="16" />
  </TagsInputItemDelete>
</template>

<script lang="ts" setup>
import {
  type TagsInputItemDeleteProps,
  useForwardProps,
  TagsInputItemDelete,
} from "radix-vue";

const props = defineProps<TagsInputItemDeleteProps>();

const forwardProps = useForwardProps(props);
</script>
