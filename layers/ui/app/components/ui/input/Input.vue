<template>
  <InputGroup
    :disabled="disabled"
    class="flex flex-col items-start gap-2 w-full"
  >
    <InputLabel :label="label" :required="required" class="text-sm" />
    <InputRoot
      placeholder="..."
      v-model="value"
      :type="type"
      :class="$cn('flex items-center justify-start w-full px-3', props.class)"
    />
  </InputGroup>
</template>

<script lang="ts" setup>
import InputRoot from "./InputRoot.vue";
import InputLabel from "./InputLabel.vue";
import InputGroup from "./InputGroup.vue";

const { $cn } = useNuxtApp();

const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  type: {
    type: String as PropType<"text" | "password" | "email">,
    default: "text",
  },
  class: {
    type: String,
    default: "h-[56px]",
  },
  disabled: Boolean,
  required: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(value, () => {
  emit("update:modelValue", value.value);
});
</script>
