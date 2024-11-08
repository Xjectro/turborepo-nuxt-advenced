<template>
  <InputGroup
    :disabled="props.disabled"
    class="flex flex-col items-start gap-2 w-full"
  >
    <UiLabel :required="required" class="text-sm">{{ label }}</UiLabel>
    <TextareaRoot
      v-model="value"
      :maxHeight="props.maxHeight"
      :minHeight="props.minHeight"
      :type="type"
    />
  </InputGroup>
</template>

<script lang="ts" setup>
import TextareaRoot from "./TextareaRoot.vue";
import { InputGroup } from "../input";
import { type TextareProps } from ".";

const props = withDefaults(defineProps<TextareProps>(), {
  maxHeight: "200px",
  minHeight: "200px",
  type: "text",
});

const emits = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

watch(value, () => {
  emits("update:modelValue", value.value);
});
</script>
