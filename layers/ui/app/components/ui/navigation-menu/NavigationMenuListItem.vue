<script setup lang="ts">
import { NavigationMenuLink } from "radix-vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
        v-bind="$attrs"
        class="block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-zinc-400/15 dark:hover:bg-zinc-600/20"
      >
        <div
          class="mb-[5px] leading-[1.2] font-chakra-petch font-medium text-white dark:text-white"
        >
          {{ props.title }}
        </div>
        <p
          class="my-0 leading-[1.4] font-inter font-medium text-zinc-600 dark:text-zinc-400"
        >
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
