<template>
  <NuxtLayout name="app"> Test </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: "user-auth" });
</script>
