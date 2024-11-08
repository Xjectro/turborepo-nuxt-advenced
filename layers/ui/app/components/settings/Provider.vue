<template>
  <UiDialog v-model:open="settings.visible">
    <UiDialogTrigger>
      <slot />
    </UiDialogTrigger>
    <UiDialogContent class="w-full min-h-screen items-center">
      <UiScrollAreaRoot class="w-full h-full">
        <UiScrollAreaViewport class="w-full max-h-screen pb-10">
          <UiSplitterGroup direction="horizontal" class="w-full container">
            <UiSplitterPanel
              :min-size="25"
              class="hidden h-screen lg:block pt-10"
            >
              <UiSidebar>
                <LeftsideItems />
              </UiSidebar>
            </UiSplitterPanel>

            <UiSplitterPanel
              :min-size="75"
              class="flex flex-col items-start pt-8 lg:pl-5"
            >
              <div class="flex items-center justify-between w-full mb-6">
                <UiDialogTitle>
                  {{ settings.layout.title }}
                  <UiDrawer v-model:open="drawerOpen">
                    <UiDrawerTrigger class="lg:hidden">
                      <IconMenu :size="18" />
                    </UiDrawerTrigger>
                    <UiDrawerContent>
                      <LeftsideItems />
                    </UiDrawerContent>
                  </UiDrawer>
                </UiDialogTitle>
                <UiDialogClose />
              </div>
              <div class="flex flex-col items-start w-full gap-10">
                <UiMessage
                  v-if="settings.layout.message?.visible"
                  v-bind="settings.layout.message"
                />
                <component :is="currentComponent" />
              </div>
            </UiSplitterPanel>
          </UiSplitterGroup>
        </UiScrollAreaViewport>
      </UiScrollAreaRoot>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
import routes from "./configs/routes";
import LeftsideItems from "./configs/LeftsideItems.vue";

const { accountStore } = useUtils();

const drawerOpen = ref(false);

const {
  pageStore: {
    dialog: { settings },
  },
} = useUi();
const currentComponent = shallowRef<ReturnType<
  typeof defineAsyncComponent
> | null>(null);

async function initUser() {
  if (!accountStore._getUser) {
    await accountStore.initUser();
  }
}

async function initConnections() {
  if (accountStore.connections.length == 0) {
    await accountStore.initConnections();
  }
}

async function findComponent(path: string) {
  const route = routes.find((route) => path.startsWith(route.path));
  if (!route) return null;

  if (route.middleware?.includes("user-auth")) await initUser();
  if (route.middleware?.includes("user-connections")) await initConnections();

  if (
    settings.layout.scopes &&
    !useVerifyRole(settings.layout.scopes, accountStore._getUser?.auth?.roles)
  ) {
    settings.path = "/app/appearance";
  }

  if (route.children) {
    const childRoute = route.children.find((child) =>
      path.startsWith(`${route.path}/${child.path}`),
    );
    if (childRoute) {
      if (childRoute.middleware?.includes("user-auth")) await initUser();
      if (childRoute.middleware?.includes("user-connections"))
        await initConnections();
      return childRoute.component;
    }
  }

  return route.component;
}

async function updateComponent(path: string) {
  try {
    const componentLoader = await findComponent(path);
    if (componentLoader) {
      currentComponent.value = defineAsyncComponent(() => componentLoader());
    } else {
      throw new Error("Component not found");
    }
  } catch (error) {
    console.error(error);
    currentComponent.value = null;
  }
}

watch(
  () => settings.path,
  (newPath) => {
    updateComponent(newPath);
    drawerOpen.value = false;
  },
  { immediate: true },
);
</script>
