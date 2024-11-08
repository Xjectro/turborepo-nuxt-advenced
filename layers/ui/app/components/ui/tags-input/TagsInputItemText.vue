<template>
  <TagsInputItemText v-bind="forwardProps" class="text-sm pl-1" />
</template>

<script lang="ts" setup>
import {
  type TagsInputItemTextProps,
  useForwardProps,
  TagsInputItemText,
} from "radix-vue";

const props = defineProps<TagsInputItemTextProps>();

const forwardProps = useForwardProps(props);
</script>
