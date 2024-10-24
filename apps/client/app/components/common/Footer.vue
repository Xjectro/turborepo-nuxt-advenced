<template>
  <footer class="flex flex-col items-start w-full gap-10 my-10 container">
    <ul>
      <li class="flex flex-col items-start gap-2">
        <div class="flex items-center gap-4">
          <img
            src="/assets/images/app.png"
            class="transition-all w-8 h-8 rounded-full drop-shadow-dark-lg dark:drop-shadow-light-lg"
          />
          <h4
            class="transition-all whitespace-nowrap font-chakra-petch font-bold text-black dark:text-white"
          >
            {{ runtimeConfig.app.title }}
          </h4>
        </div>
        <p
          class="transition-all font-chakra-petch font-medium text-zinc-600 dark:text-zinc-400"
        >
          {{ $t("components.common.footer.logo.description") }}
        </p>
      </li>
    </ul>
    <UiDivider />
    <nav class="flex flex-wrap items-start justify-between gap-10 w-full">
      <ul>
        <li>
          <section class="flex flex-col items-start gap-4">
            <h5
              class="transition-all flex items-center gap-2 text-sm font-chakra-petch font-bold text-black dark:text-white"
            >
              <IconGlobeLock class="w-4 h-4" />
              {{ $t("components.common.footer.user.index") }}
            </h5>
            <NuxtLink
              to="/auth/login"
              class="transition-all hover:underline font-chakra-petch font-medium text-zinc-600 dark:text-zinc-400"
            >
              {{ $t("components.common.footer.user.login") }}</NuxtLink
            >
            <NuxtLink
              to="/auth/register"
              class="transition-all hover:underline font-chakra-petch font-medium text-zinc-600 dark:text-zinc-400"
            >
              {{ $t("components.common.footer.user.register") }}</NuxtLink
            >
          </section>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
</script>

<style scoped>
footer nav ul {
  min-width: 200px;
}
</style>
