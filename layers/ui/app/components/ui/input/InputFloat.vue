<template>
  <InputGroup
    :disabled="disabled"
    class="relative flex flex-col items-start justify-center overflow-hidden w-full rounded-xl font-chakra-petch font-medium"
  >
    <InputLabel
      :label="props.label"
      :required="required"
      :class="
        $cn(
          'absolute pointer-events-none',
          isFocused || modelValue.length !== 0
            ? 'translate-x-3 -translate-y-3 opacity-80 text-xs'
            : 'translate-x-5 translate-y-0 opacity-100',
        )
      "
    />
    <InputRoot
      v-model="value"
      :type="type"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="
        $cn('flex items-center justify-start w-full px-3 pt-4', props.class)
      "
    />
  </InputGroup>
</template>

<script setup lang="ts">
import InputRoot from "./InputRoot.vue";
import InputLabel from "./InputLabel.vue";
import InputGroup from "./InputGroup.vue";

const { $cn } = useNuxtApp();

const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: String, required: true },
  type: {
    type: String as PropType<"text" | "password" | "email">,
    default: "text",
  },
  class: {
    type: String,
    default: "h-[56px]",
  },
  disabled: { type: Boolean, default: false },
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const value = ref(props.modelValue);

watch(value, () => {
  emit("update:modelValue", value.value);
});
</script>
