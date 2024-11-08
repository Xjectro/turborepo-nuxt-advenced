<template>
  <PinInputRoot
    v-model="values"
    @complete="handleComplate"
    placeholder="○"
    id="pin-input"
  >
    <PinInputInput v-for="(id, index) in repeat" :key="id" :index="index" />
  </PinInputRoot>
</template>

<script lang="ts" setup>
import PinInputRoot from "./PinInputRoot.vue";
import PinInputInput from "./PinInputInput.vue";

const props = defineProps({
  repeat: { type: Number, default: 5 },
  modelValue: { type: String, default: "" },
});

const values = ref(props.modelValue.split(""));

const emits = defineEmits(["complate"]);

function handleComplate(e: string[]) {
  emits("complate", e.join(""));
}
</script>
