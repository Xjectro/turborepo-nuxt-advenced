<template>
  <h6
    :class="
      $cn(
        'transition-all flex items-center font-chakra-petch font-medium',
        props.class,
      )
    "
  >
    {{ label }}
    <span v-if="required" class="text-lg font-bold font-inter text-red-700"
      >*</span
    >
  </h6>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: { type: String, default: "" },
  class: { type: String, default: "" },
  required: Boolean,
});
</script>
