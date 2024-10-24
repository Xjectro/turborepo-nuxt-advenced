<template>
  <UiButton
    @interaction="onClick"
    type="nds"
    :variant="isClick ? 'primary' : 'secondary'"
  >
    <IconSaveAll v-if="isClick" class="w-4 h-4" />
    <IconCopy v-else class="w-4 h-4" />
  </UiButton>
</template>

<script lang="ts" setup>
const isClick = ref(false);

const props = defineProps({ copyText: { type: String, default: "" } });

function onClick() {
  navigator.clipboard
    .writeText(props.copyText)
    .then(() => {
      isClick.value = true;
      setTimeout(() => {
        isClick.value = false;
      }, 2000);
    })
    .catch(console.error);
}
</script>
