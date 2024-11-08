<template>
  <TagsInputRoot
    v-bind="forward"
    :class="
      $cn(
        'transition-all flex flex-wrap items-start justify-start w-full p-2 gap-2 resize-none outline-none rounded-xl font-inter border border-solid placeholder:text-zinc-400 border-zinc-200 dark:border-zinc-900 bg-zinc-50 hover:bg-zinc-100 focus:bg-zinc-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 dark:focus:bg-zinc-900/50 text-zinc-900 dark:text-white',
        props.class,
      )
    "
  >
    <TagsInputItem
      v-for="(item, index) in props.modelValue"
      :key="index"
      :value="item"
    >
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput :placeholder="forward.placeholder" />
  </TagsInputRoot>
</template>

<script lang="ts" setup>
import TagsInputInput from "./TagsInputInput.vue";
import TagsInputItem from "./TagsInputItem.vue";
import TagsInputItemDelete from "./TagsInputItemDelete.vue";
import TagsInputItemText from "./TagsInputItemText.vue";

import {
  type TagsInputRootEmits,
  type TagsInputRootProps,
  useForwardPropsEmits,
  TagsInputRoot,
} from "radix-vue";

const props = withDefaults(
  defineProps<TagsInputRootProps & { class?: string; placeholder?: string }>(),
  { placeholder: "..." },
);
const emits = defineEmits<TagsInputRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>
