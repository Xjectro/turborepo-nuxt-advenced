<template>
  <input
    :placeholder="placeholder"
    :value="value"
    :type="type"
    :class="
      $cn(
        'transition-all cursor-pointer focus:cursor-text resize-none outline-none rounded-xl font-inter border border-solid placeholder:text-zinc-400 border-zinc-200 dark:border-zinc-900 bg-zinc-50 hover:bg-zinc-100 focus:bg-zinc-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 dark:focus:bg-zinc-900/50 disabled:text-red-500 text-zinc-900 dark:text-white',
        props.class,
      )
    "
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  placeholder: String,
  modelValue: String,
  type: String as PropType<"text" | "email" | "password">,
  class: { type: String, default: "h-[56px]" },
});

const value = ref(props.modelValue);

const emits = defineEmits(["update:modelValue"]);

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  value.value = target.value;
}

watch(value, () => {
  emits("update:modelValue", value.value);
});
</script>
