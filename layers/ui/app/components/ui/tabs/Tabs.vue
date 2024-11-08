<template>
  <TabsRoot v-bind="forwarded" class="flex flex-col w-full">
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import {
  useForwardPropsEmits,
  TabsRoot,
  type TabsRootEmits,
  type TabsRootProps,
} from "radix-vue";

const props = withDefaults(defineProps<TabsRootProps>(), {});

const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
