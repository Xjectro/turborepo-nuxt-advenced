<script setup lang="ts">
const currentTrigger = ref("");
</script>

<template>
  <UiNavigationMenuRoot v-model="currentTrigger">
    <UiNavigationMenuItem>
      <UiNavigationMenuTrigger>Widgets</UiNavigationMenuTrigger>
      <UiNavigationMenuContent>
        <UiNavigationMenuListItem href="/auth/login" title="test">
          test description
        </UiNavigationMenuListItem>
      </UiNavigationMenuContent>
    </UiNavigationMenuItem>

    <UiNavigationMenuIndicator />
  </UiNavigationMenuRoot>
</template>
