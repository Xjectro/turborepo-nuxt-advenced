<script setup lang="ts">
const currentTrigger = ref("");
</script>

<template>
  <UiNavigationMenuRoot v-model="currentTrigger">
    <UiNavigationMenuItem>
      <UiNavigationMenuTrigger>Test</UiNavigationMenuTrigger>
      <UiNavigationMenuContent>
          <UiNavigationMenuListItem
            href="/"
            title="
             test title
            "
          >
test description
          </UiNavigationMenuListItem>
      </UiNavigationMenuContent>
    </UiNavigationMenuItem>
    <UiNavigationMenuIndicator />
  </UiNavigationMenuRoot>
</template>
