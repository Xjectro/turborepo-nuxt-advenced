<template>
  <UiDropdownMenu v-model:open="open">
    <UiDropdownMenuTrigger>
      <NuxtImg
        :src="currentUser?.avatarURL"
        :class="
          $cn(
            'transition-all w-8 h-8 object-cover rounded-full ring-2',
            open ? 'ring-transparent' : 'ring-primary-500',
          )
        "
      />
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent
      class="space-y-2 w-[350px]"
      align="end"
      side="bottom"
    >
      <div class="relative flex flex-col items-center justify-end w-full mb-6">
        <NuxtImg
          :src="currentUser?.bannerURL"
          class="w-full object-cover h-24 rounded-lg"
        />
        <UiAvatar
          :image="currentUser?.avatarURL"
          border
          rounded
          size="3xl"
          class="absolute top-10"
        />
        <div class="flex flex-col items-center mt-11 font-chakra-petch">
          <h6 class="font-medium text-black dark:text-white text-lg">
            {{ currentUser?.firstName }} {{ currentUser?.lastName }}
          </h6>
          <p class="font-medium text-zinc-700 dark:text-zinc-400">
            {{ maskEmail(currentUser?.auth.email as string) }}
          </p>
        </div>
      </div>
      <UiDivider />
      <UiDropdownMenuItem
        @interaction="
          pageStore.dialog.settings.visible = !pageStore.dialog.settings.visible
        "
      >
        <IconSettings2 class="w-4 h-4" />
        {{ $t("components.shared.user.dropdown.buttons.settings") }}
      </UiDropdownMenuItem>
      <UiDivider />
      <UiDropdownMenuItem @interaction="onLogout">
        <IconLogOut class="w-4 h-4" />
        {{ $t("components.shared.user.dropdown.buttons.logout") }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script lang="ts" setup>
const { accountStore } = useUtils();
const { pageStore } = useUi();
const { maskEmail } = useString();

const open = ref(false);

function onLogout() {
  window.location.href = "/api/auth/logout";
}

const currentUser = computed(() => {
  return accountStore._getUser;
});
</script>
