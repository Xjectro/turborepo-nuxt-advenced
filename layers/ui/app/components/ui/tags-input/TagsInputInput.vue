<template>
  <TagsInputInput
    v-bind="forwardProps"
    class="transition-all text-base outline-none border-none resize-none flex items-center justify-start p-1 rounded bg-transparent font-inter font-medium placeholder:text-black dark:placeholder:text-white focus:placeholder:opacity-50 px-1"
  />
</template>

<script lang="ts" setup>
import {
  type TagsInputInputProps,
  useForwardProps,
  TagsInputInput,
} from "radix-vue";

const props = defineProps<TagsInputInputProps>();

const forwardProps = useForwardProps(props);
</script>
