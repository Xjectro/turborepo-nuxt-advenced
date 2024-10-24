<template>
  <div class="flex items-start justify-between max-h-screen w-full">
    <div
      class="transition-all flex items-start justify-between min-h-screen w-full sm:w-4/5 md:w-3/5 lg:w-2/5"
    >
      <UiScrollAreaRoot class="w-full h-full">
        <UiScrollAreaViewport class="w-full h-full max-h-screen p-5">
          <div
            class="flex flex-col items-center justify-between min-h-screen mx-auto max-w-lg"
          >
            <nav class="flex items-center justify-between w-full">
              <UiButton type="nds" to="/" variant="transparent">
                <img
                  src="/assets/images/app.png"
                  alt="App logo"
                  class="w-6 h-6 object-cover"
                />
              </UiButton>
              <div class="flex flex-wrap items-center justify-end gap-4">
                <p
                  class="transition-all whitespace-normal md:whitespace-nowrap text-end font-medium text-zinc-800 dark:text-zinc-400"
                >
                  {{ props.header.paragraph }}
                </p>
                <UiButton
                  :to="props.header.button.to"
                  class="whitespace-nowrap py-3 px-5"
                  variant="secondary"
                >
                  {{ props.header.button.text }}
                </UiButton>
              </div>
            </nav>

            <div
              class="transition-all flex flex-col items-start w-full h-full gap-7 font-chakra-petch text-black dark:text-stone-100"
            >
              <header
                class="flex flex-col items-start justify-start w-full gap-2 text-center"
              >
                <h1
                  class="text-start font-bold text-xl drop-shadow-dark-lg dark:drop-shadow-light-lg"
                >
                  {{ label }}
                </h1>
                <p
                  class="transition-all text-start text-base font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {{ sublabel }}
                </p>
              </header>

              <UiTimeline
                v-if="props.timeline"
                :values="
                  props.timeline.map((v) => ({
                    name: v as string,
                    icon: Footprints,
                  }))
                "
              />
              <UiMessage v-bind="props.message" />

              <section
                class="flex flex-col items-start justify-center w-full gap-5"
              >
                <template v-if="loaded">
                  <slot name="context-area" />
                  <UiButton
                    v-if="$slots['button-area']"
                    :loading="!props.button.loaded"
                    class="px-3 py-2.5"
                    @interaction="emit('interaction')"
                  >
                    <slot name="button-area" />
                  </UiButton>
                </template>
                <template v-else>
                  <UiPreloadInput v-for="i in 2" :key="i" />
                </template>
              </section>
            </div>

            <span />
          </div>
        </UiScrollAreaViewport>
      </UiScrollAreaRoot>
    </div>
    <img
      src="/assets/backgrounds/form.png"
      class="transition-all w-0 sm:w-1/5 md:w-2/5 lg:w-3/5 min-h-screen object-cover opacity-30 dark:opacity-90"
    />
  </div>
</template>

<script lang="ts" setup>
import { Footprints } from "lucide-vue-next";

const { t } = useI18n();

const emit = defineEmits(["interaction"]);
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  sublabel: {
    type: String,
    required: true,
  },
  header: {
    type: {} as PropType<{
      paragraph: string;
      button: { to: string; text: string };
    }>,
    default: {},
  },
  timeline: {
    type: Array,
    default: undefined,
  },
  message: {
    type: {} as PropType<{
      visible: boolean;
      label: string;
      type: "error" | "success";
    }>,
    default: {},
  },
  loaded: {
    type: Boolean,
    default: false,
  },
  button: {
    type: {} as PropType<{ loaded: boolean }>,
    default: {},
  },
});

useHead({
  title: t("pages.index.head.auth.title"),
  meta: [
    {
      property: "og:title",
      content: t("pages.index.head.auth.title"),
    },
    {
      property: "og:description",
      content: t("pages.index.head.auth.description"),
    },
  ],
  htmlAttrs: {
    class: "max-h-screen overflow-hidden",
  },
});
</script>
