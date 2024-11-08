<template>
  <!-- Dialog -->
  <UiDialog v-model:open="isOpen">
    <!-- Section -->
    <UiDialogTrigger
      v-if="variant == 'entry'"
      :style="{ height, maxWidth: width }"
      :class="
        $cn(
          'w-full overflow-hidden relative group',
          props.rounded
            ? 'rounded-tr-[80px] rounded-tl-[100px] rounded-bl-[120px] rounded-br-[80px] -rotate-12'
            : 'rounded-lg',
          props.class,
          {
            'border border-solid border-zinc-200 dark:border-zinc-800':
              !previewURL,
          },
        )
      "
    >
      <NuxtImg
        v-if="previewURL"
        :src="previewURL"
        alt="File Upload"
        class="absolute inset-0 object-cover w-full h-full"
      />
      <div
        :class="
          $cn(
            'transition-all flex items-center justify-center w-full h-full cursor-pointer',
            {
              'absolute inset-0 opacity-0 hover:opacity-100 group-hover:bg-black/40 group-hover:bg-opacity-10 text-white':
                previewURL,
              'bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-900/80 text-black dark:text-white':
                !previewURL,
            },
          )
        "
      >
        <IconSquareArrowOutUpRight :size="30" class="transition-all" />
      </div>
    </UiDialogTrigger>

    <!-- Image -->
    <UiDialogContent
      class="w-full max-sm:h-full max-sm:max-h-screen sm:max-w-[300px] overflow-hidden sm:rounded-lg"
    >
      <UiScrollAreaRoot class="w-full h-full">
        <UiScrollAreaViewport class="w-full max-h-screen p-5">
          <div class="flex items-center justify-between w-full mb-2">
            <UiDialogTitle>
              {{ title }}
            </UiDialogTitle>
            <UiDialogClose />
          </div>
          <div class="flex max-sm:flex-col items-center gap-5 mb-5">
            <button
              type="button"
              class="flex flex-col items-center w-full p-5 rounded-xl gap-3 group bg-zinc-100 dark:bg-zinc-900"
              @click="open()"
            >
              <div
                :class="
                  $cn(
                    'transition-all flex items-center justify-center p-16 rounded-full cursor-pointer border-4 border-solid border-primary-950/20 dark:border-primary-950/60 bg-primary-500/80 text-white',
                  )
                "
              >
                <IconSquareArrowOutUpRight
                  :size="26"
                  class="transition-all drop-shadow-dark-lg"
                />
              </div>
              <h6
                class="transition-all flex items-center gap-2 font-inter font-medium text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
              >
                <IconFolderSymlink :size="16" />
                {{ $t("ui.file.fileUpload.dialog.items.upload") }}
              </h6>
            </button>
          </div>

          <UiDialogDescription>
            {{ description }}
          </UiDialogDescription>
        </UiScrollAreaViewport>
      </UiScrollAreaRoot>
    </UiDialogContent>
  </UiDialog>

  <!-- Card -->
  <UiCard v-if="variant == 'card'" class="h-[60px]">
    <template #start-area>
      <div class="flex items-center h-full gap-2">
        <NuxtImg
          v-if="previewURL && accept !== 'audio/*'"
          :src="previewURL"
          alt="File Upload"
          class="object-cover w-[40px] h-[40px] rounded-lg bg-zinc-200 dark:bg-zinc-800"
        />
        <IconMusic
          v-else-if="previewURL"
          class="w-[40px] h-[40px] rounded-lg p-2 bg-zinc-200 dark:bg-zinc-800"
        />
        <div
          v-else
          class="transition-all flex items-center justify-center w-[40px] h-[40px] rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white"
        >
          <IconImages :size="16" />
        </div>
        <h6 class="font-inter font-medium">
          {{ fileName ? fileName : title }}
        </h6>
      </div>
    </template>
    <template #end-area>
      <UiButton
        v-if="previewURL"
        variant="transparent"
        type="nds"
        @interaction="emits('update:modelValue', null)"
      >
        <IconCircleX :size="20" />
      </UiButton>
      <UiButton class="px-4 py-2" @interaction="isOpen = !isOpen">
        {{ $t("ui.file.fileUpload.buttons.select") }}
      </UiButton>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
import type { FileUploadProps, FileUploadEmits } from ".";

const config = useRuntimeConfig();
const toast = useToast();
const { t } = useI18n();
const { getPreviewURL } = useString();

const isOpen = ref(false);
const fileName = ref();

const emits = defineEmits<FileUploadEmits>();
const props = withDefaults(defineProps<FileUploadProps>(), {
  accept: "image/*",
  variant: "entry",
});

const image = ref(props.modelValue as string | File);

watch(image, (i) => {
  emits("update:modelValue", i);
});

const { open, onChange, reset } = useFileDialog({
  accept: props.accept,
});

const previewURL = computed(() => getPreviewURL(props.modelValue));

onChange((files) => {
  const file = files?.[0];

  if (file) {
    if (file.size >= config.app.root.maxFileSize) {
      toast.add({
        title: t("ui.file.fileUpload.toast.error.title"),
        description: t("ui.file.fileUpload.toast.error.description"),
      });
      reset();
    } else {
      toast.add({
        title: t("ui.file.fileUpload.toast.success.title"),
        description: t("ui.file.fileUpload.toast.success.description"),
      });

      isOpen.value = false;
      fileName.value = file.name;
      emits("update:modelValue", file);
    }
  } else {
    reset();
    isOpen.value = false;
    emits("update:modelValue", null);
  }
});
</script>
