<template>
  <div
    class="transition-all flex max-sm:flex-col items-center justify-between min-w-[200px] w-full gap-2 sm:gap-5 text-zinc-700 dark:text-zinc-300 font-chakra-petch font-light"
  >
    <span class="w-full sm:w-[40%]"> <slot name="label" />: </span
    ><span class="w-full sm:w-[60%]">
      <slot name="content" />
    </span>
  </div>
</template>
