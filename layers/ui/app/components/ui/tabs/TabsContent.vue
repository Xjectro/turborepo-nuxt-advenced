<template>
  <TabsContent
    v-bind="forwardedProps"
    class="grow mt-5 rounded-b-md outline-none"
  >
    <slot />
  </TabsContent>
</template>

<script setup lang="ts">
import { useForwardProps, TabsContent, type TabsContentProps } from "radix-vue";

const props = withDefaults(defineProps<TabsContentProps>(), {});

const forwardedProps = useForwardProps(props);
</script>
