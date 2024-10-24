<template>
  <h6
    class="transition-all text-lg font-chakra-petch font-bold text-black dark:text-white"
  >
    {{ label }}
  </h6>
</template>
<script lang="ts" setup>
defineProps({ label: { type: String, default: null } });
</script>
