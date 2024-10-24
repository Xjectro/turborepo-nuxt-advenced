<template>
  <section class="flex flex-col items-center w-full">
    <h6
      class="text-3xl text-center font-prompt font-bold text-black dark:text-white"
    >
      <slot name="title" />
    </h6>
    <p
      class="text-lg text-center font-chakra-petch font-medium text-zinc-600 dark:text-zinc-400"
    >
      <slot name="description" />
    </p>
  </section>
</template>
