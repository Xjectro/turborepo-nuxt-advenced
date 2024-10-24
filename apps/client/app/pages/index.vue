<template>
  <NuxtLayout name="app"> test </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["user-auth"] });
</script>
