<template>
  <div
    class="transition-all flex flex-col items-center justify-center min-h-screen gap-10 bg-gradient-to-tr from-primary-500 from-10% via-transparent via-50% to-transparent to-90%"
  >
    <div class="flex items-center justify-between gap-5">
      <img src="/assets/images/app.png" class="w-16 h-16 object-cover" />
      <IconPlus class="w-10 h-10 text-zinc-900 dark:text-stone-100" />
      <IconTwitch
        v-if="props.type == 'twitch'"
        class="w-16 h-16 text-zinc-900 dark:text-stone-100"
      />
      <IconGithub
        v-if="props.type == 'github'"
        class="w-16 h-16 text-zinc-900 dark:text-stone-100"
      />
      <IconBot
        v-if="props.type == 'discord'"
        class="w-16 h-16 text-zinc-900 dark:text-stone-100"
      />
    </div>

    <template v-if="loading">
      <section
        class="flex flex-col items-center justify-center text-center gap-2 p-5"
      >
        <p
          class="text-base font-medium font-inter text-zinc-900 dark:text-stone-100"
        >
          {{
            $t("layouts.callback.messages.loading", {
              type: type.toUpperCase(),
              title: app.title,
            })
          }}
        </p>
        <IconLoader
          class="text-zinc-600 dark:text-zinc-400 animate-spin w-10 h-10"
        />
      </section>
    </template>

    <template v-else-if="connected">
      <section
        class="flex flex-col items-center justify-center text-center gap-2 p-5"
      >
        <p
          class="text-base font-medium font-inter text-zinc-900 dark:text-stone-100"
        >
          {{
            $t("layouts.callback.messages.connected", {
              type: type.toUpperCase(),
              title: app.title,
            })
          }}
        </p>
        <p
          class="text-base font-medium font-chakra-petch text-zinc-500 dark:text-zinc-400"
        >
          {{
            $t("layouts.callback.submessages.connected", { title: app.title })
          }}
        </p>
      </section>
    </template>

    <template v-else>
      <section
        class="flex flex-col items-center justify-center text-center gap-2 p-5"
      >
        <p class="text-base font-medium font-inter text-red-500">
          {{
            $t("layouts.callback.messages.error.connected", {
              type: type.toUpperCase(),
              title: app.title,
            })
          }}
        </p>
        <p
          class="text-base font-medium font-chakra-petch text-zinc-500 dark:text-zinc-400"
        >
          {{ $t("layouts.callback.submessages.error.connected") }}
        </p>
      </section>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { app } = useRuntimeConfig();

const props = defineProps({
  type: { type: String, default: "x" },
  connected: Boolean,
  loading: Boolean,
});

useHead({
  title: `Callback ・ ${props.type.toUpperCase()}`,
  meta: [
    {
      name: "og:description",
      content: `Cllback status page for ${app.title}`,
    },
  ],
});
</script>
