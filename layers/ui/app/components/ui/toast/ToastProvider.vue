<template>
  <ToastProvider>
    <slot />

    <div v-for="toast in pageStore.toasts" :key="toast.id">
      <Toast v-model:open="toast.visible" :duration="5000">
        <ToastTitle v-if="toast.title">
          {{ toast.title }}
        </ToastTitle>
        <ToastDescription v-if="toast.description">
          {{ toast.description }}
        </ToastDescription>
        <ToastAction alt-text="test" />
      </Toast>
    </div>

    <ToastViewport
      class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
    />
  </ToastProvider>
</template>

<script setup lang="ts">
import { usePageStore } from "../../../stores/pageStore";

import Toast from "./Toast.vue";
import ToastDescription from "./ToastDescription.vue";
import ToastTitle from "./ToastTitle.vue";
import ToastAction from "./ToastAction.vue";
import { ToastProvider, ToastViewport } from "radix-vue";

const pageStore = usePageStore();
</script>
