<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger
      v-if="variant == 'default'"
      :style="{ height, maxWidth: width }"
      :class="
        $cn(
          'w-full overflow-hidden relative group',
          props.rounded ? 'rounded-full' : 'rounded-lg',
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
              'bg-zinc-100 dark:bg-zinc-950 text-black dark:text-white':
                !previewURL,
            },
          )
        "
      >
        <IconScan class="min-w-8 min-h-8 transition-all" />
      </div>
    </UiDialogTrigger>
    <UiDialogContent class="px-5 py-4 rounded-lg">
      <div class="flex items-center justify-between w-full mb-6">
        <UiDialogTitle>
          {{ title }}
        </UiDialogTitle>
        <UiDialogClose />
      </div>
      <div class="flex items-center py-5 gap-5">
        <button
          type="button"
          class="flex flex-col items-center p-5 rounded-xl gap-3 group bg-zinc-100 dark:bg-zinc-900"
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
              class="min-w-8 min-h-8 transition-all drop-shadow-dark-lg"
            />
          </div>
          <h6
            class="transition-all flex items-center gap-2 font-inter font-medium text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
          >
            <IconImages class="w-4 h-4" />
            {{ $t("ui.file.fileUpload.dialog.items.uploadImage") }}
          </h6>
        </button>
      </div>

      <UiDialogDescription v-if="description" class="max-w-[202px]">
        {{ description }}
      </UiDialogDescription>
    </UiDialogContent>
  </UiDialog>
  <UiCard v-if="variant == 'card'" class="h-[60px]">
    <template #start-area>
      <div class="flex items-center h-full gap-2">
        <NuxtImg
          v-if="previewURL"
          :src="previewURL"
          alt="File Upload"
          class="object-cover w-[40px] h-[40px] rounded-lg"
        />
        <div
          v-else
          class="transition-all flex items-center justify-center w-[40px] h-[40px] rounded-lg bg-zinc-200 dark:bg-zinc-900 text-black dark:text-white"
        >
          <IconImages class="min-w-4 min-h-4 transition-all" />
        </div>
        <h6 class="font-chakra-petch font-medium">{{ title }}</h6>
      </div>
    </template>
    <template #end-area>
      <UiButton class="px-4 py-2" @interaction="isOpen = !isOpen">
        {{ $t("ui.file.fileUpload.buttons.select") }}
      </UiButton>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
import type { FileUploadProps, FileUploadEmits } from ".";

const isOpen = ref(false);

const emit = defineEmits<FileUploadEmits>();
const props = withDefaults(defineProps<FileUploadProps>(), {
  accept: "image/*",
  variant: "default",
});

const image = ref(props.modelValue as string | File);

watch(image, (i) => {
  emit("update:modelValue", i);
});

const { open, onChange } = useFileDialog({
  accept: props.accept,
});

const previewURL = computed(() => {
  if (typeof props.modelValue === "string") {
    return props.modelValue;
  }
  return props.modelValue instanceof File
    ? URL.createObjectURL(props.modelValue)
    : null;
});

onChange((files) => {
  const file = files?.[0];
  if (file) {
    isOpen.value = false;
    emit("update:modelValue", file);
  }
});
</script>
