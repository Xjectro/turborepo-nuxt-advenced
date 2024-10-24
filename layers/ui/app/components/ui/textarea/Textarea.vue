<template>
  <InputGroup
    :disabled="props.disabled"
    class="relative flex flex-col items-start gap-2 w-full"
  >
    <InputLabel :label="label" :required="required" class="text-sm" />
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
import { InputLabel, InputGroup } from "../input";
import { type TextareProps } from ".";

const props = withDefaults(defineProps<TextareProps>(), {
  maxHeight: "200px",
  minHeight: "200px",
  type: "text",
});

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

watch(value, () => {
  emit("update:modelValue", value.value);
});
</script>
