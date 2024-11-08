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
      class="space-y-2 w-[300px]"
      align="end"
      side="bottom"
    >
      <UiDropdownMenuItem :to="`/users/${currentUser.username}`">
        <IconUser :size="16" />
        {{ $t("components.shared.profile.dropdown.buttons.profile") }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem
        @interaction="
          pageStore.dialog.settings.visible = !pageStore.dialog.settings.visible
        "
      >
        <IconSettings2 :size="16" />
        {{ $t("components.shared.profile.dropdown.buttons.settings") }}
      </UiDropdownMenuItem>
      <UiDivider />
      <UiDropdownMenuItem @interaction="onLogout">
        <IconLogOut :size="16" />
        {{ $t("components.shared.profile.dropdown.buttons.logout") }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script lang="ts" setup>
const { accountStore, pageStore } = useImports();

const open = ref(false);

function onLogout() {
  window.location.href = "/api/auth/logout";
}

const currentUser = computed(() => {
  return accountStore._getUser;
});
</script>
