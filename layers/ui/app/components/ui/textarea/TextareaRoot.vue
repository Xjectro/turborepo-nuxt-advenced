<template>
  <div class="relative w-full h-fit">
    <textarea
      id="input"
      :value="value"
      :style="{ minHeight: props.minHeight, maxHeight: props.maxHeight }"
      :type="props.type"
      class="transition-all flex items-center justify-start w-full cursor-pointer focus:cursor-text outline-none p-3 rounded-xl font-inter border border-solid placeholder:text-zinc-400 border-zinc-200 dark:border-zinc-900 bg-zinc-50 hover:bg-zinc-100 focus:bg-zinc-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 dark:focus:bg-zinc-900/50 disabled:text-red-500 text-zinc-900 dark:text-white"
      @input="handleInput"
    />
    <div
      class="absolute bottom-0 right-0 m-4 pointer-events-none font-chakra-petch font-light text-black dark:text-white"
    >
      {{ modelValue?.length }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type TextareRootProps } from ".";

const props = withDefaults(defineProps<TextareRootProps>(), {
  maxHeight: "200px",
  minHeight: "200px",
  type: "text",
});

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  value.value = target.value;
}

watch(value, () => {
  emit("update:modelValue", value.value);
});
</script>
