<template>
  <div
    class="transition-all fixed top-0 flex items-center justify-center w-full h-[66px] z-50 bg-zinc-100 dark:bg-zinc-950"
  >
    <nav class="flex items-center justify-between container">
      <ul>
        <li>
          <NuxtLink
            to="/"
            class="transition-all text-xl text-start font-chakra-petch font-bold text-zinc-900 dark:text-zinc-100"
          >
            {{ app.title }}
          </NuxtLink>
        </li>
      </ul>
      <CommonNavigationMenu class="hidden lg:flex w-full" />
      <ul>
        <UiDrawer>
          <UiDrawerTrigger class="lg:hidden">
            <IconMenu class="w-5 h-5" />
          </UiDrawerTrigger>
          <UiDrawerContent>
            <ParticlesLeftsideItems :required="!!currentUser" data="common" />
          </UiDrawerContent>
        </UiDrawer>
        <li v-if="currentUser">
          <SharedProfileDropdown />
        </li>
        <li v-else>
          <UiButton class="px-5 py-2 gap-2" to="/auth/login">
            {{ $t("components.common.header.end.login") }}
          </UiButton>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const { app } = useRuntimeConfig();
const { accountStore } = useUtils();

const currentUser = computed(() => accountStore._getUser);
</script>

<style scoped>
nav ul {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
