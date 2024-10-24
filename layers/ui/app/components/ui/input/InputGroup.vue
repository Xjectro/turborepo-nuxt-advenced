<template>
  <fieldset
    :disabled="disabled"
    role="group"
    :class="
      $cn(
        'pointer-events-auto opacity-100 disabled:pointer-events-none disabled:opacity-80 disabled:cursor-not-allowed text-zinc-900 dark:text-white',
        props.class,
      )
    "
  >
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
const props = defineProps({
  disabled: Boolean,
  class: { type: String, default: "" },
});
</script>
