<template>
  <UiCard
    v-for="(connection, index) in connections"
    :key="index"
    :label="connection.type.charAt(0).toUpperCase() + connection.type.slice(1)"
    :sublabel="connection.description"
    :border="connections.length - 1 !== index"
    hypertext
  >
    <template #start-area>
      <component :is="connection.icon" class="w-5 h-5" />
      <p class="font-inter font-medium text-sm sm:text-base">
        {{ connection.label }}
      </p>
    </template>
    <template #end-area>
      <UiButton
        class="px-5 py-1.5"
        :variant="connection.connected ? 'danger' : 'primary'"
        :loading="!connection.loaded"
        @interaction="
          connection.connected
            ? disconnect(connection.type)
            : connect(connection.type)
        "
      >
        {{
          t(
            `ui.settings.views.account.connections.buttons.${connection.connected ? "disconnect" : "connect"}`,
          )
        }}
      </UiButton>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
import { Twitch, Github, Bot } from "lucide-vue-next";

const { t } = useI18n();
const { pageStore } = useUi();
const { accountStore } = useUtils();
const runtimeConfig = useRuntimeConfig();

pageStore.dialog.settings.layout = {
  scopes: ["USER"],
  title: t("ui.settings.views.account.connections.title"),
};

const currentConnections = computed(() => accountStore._getConnections);

const connections = reactive([
  {
    type: "discord",
    label: t("ui.settings.views.account.connections.items.discord.label"),
    description: t(
      "ui.settings.views.account.connections.items.discord.description",
    ),
    connected: false,
    loaded: true,
    icon: Bot,
  },
  {
    type: "twitch",
    label: t("ui.settings.views.account.connections.items.twitch.label"),
    description: t(
      "ui.settings.views.account.connections.items.twitch.description",
    ),
    connected: false,
    loaded: true,
    icon: Twitch,
  },
  {
    type: "github",
    label: t("ui.settings.views.account.connections.items.github.label"),
    description: t(
      "ui.settings.views.account.connections.items.github.description",
    ),
    connected: false,
    loaded: true,
    icon: Github,
  },
]);

const connect = async (type: string) => {
  const redirect_uri = runtimeConfig.public[type as "discord"]?.oauthUri;
  window.location.href = redirect_uri;
};

const disconnect = async (type: string) => {
  const connection = connections.find((conn) => conn.type === type);
  if (!connection) return;

  connection.loaded = false;

  const data = await $fetch("/api/users/connections/disconnect", {
    method: "GET",
    params: { type },
  });

  if (data?.success) {
    connection.connected = false;
    connection.label = t(
      `ui.settings.views.account.connections.items.${type.toLowerCase()}.label`,
    );
  }

  connection.loaded = true;
};

onMounted(() => {
  for (const connec of currentConnections.value) {
    const connection = connections.find((conn) => conn.type === connec.type);
    if (connection) {
      connection.label = connec.username;
      connection.connected = true;
    }
  }
});
</script>
