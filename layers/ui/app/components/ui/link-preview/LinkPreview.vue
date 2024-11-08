<template>
  <div>
    <div v-if="isMounted" class="hidden">
      <NuxtImg
        :src="src"
        :width="width"
        :height="height"
        :quality="quality"
        alt="hidden image"
      />
    </div>

    <div
      @mouseover="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
      class="relative inline-block"
    >
      <UiLinkButton :href="url" traget="_blank">
        <slot></slot>
      </UiLinkButton>

      <div
        :style="{ transform: `translateX(${translateX}px)` }"
        :class="
          $cn(
            'transition-all rounded-xl absolute z-50 border border-transparent dark:bg-gray-800',
            isVisible
              ? 'opacity-100 pointer-events-auto'
              : 'scale-0 opacity-0 pointer-events-none',
          )
        "
      >
        <NuxtLink :to="url">
          <img
            :src="src"
            :width="width"
            :height="height"
            :quality="quality"
            class="rounded-lg"
            alt="preview image"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { encode } from "qss";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 125,
  },
  quality: {
    type: Number,
    default: 50,
  },
  isStatic: {
    type: Boolean,
    default: false,
  },
  imageSrc: {
    type: String,
    default: "",
  },
});

const isMounted = ref(false);
const isVisible = ref(false);
const x = ref(0);

const translateX = computed(() => x.value);

const src = computed(() => {
  if (!props.isStatic) {
    const params = encode({
      url: props.url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": props.width * 3,
      "viewport.height": props.height * 3,
    });
    return `https://api.microlink.io/?${params}`;
  } else {
    return props.imageSrc;
  }
});

onMounted(() => {
  isMounted.value = true;
});

const handleMouseEnter = () => (isVisible.value = true);
const handleMouseLeave = () => (isVisible.value = false);
const handleMouseMove = (event) => {
  const targetRect = event.currentTarget.getBoundingClientRect();
  const eventOffsetX = event.clientX - targetRect.left;
  const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
  x.value = offsetFromCenter;
};
</script>
