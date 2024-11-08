<template>
  <TabsIndicator
    v-bind="forwardedProps"
    class="absolute px-2 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300"
  >
    <div class="w-full h-full bg-primary-500" />
  </TabsIndicator>
</template>

<script setup lang="ts">
import {
  useForwardProps,
  TabsIndicator,
  type TabsIndicatorProps,
} from "radix-vue";

const props = withDefaults(defineProps<TabsIndicatorProps>(), {});

const forwardedProps = useForwardProps(props);
</script>
