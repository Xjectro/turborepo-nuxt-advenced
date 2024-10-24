<template>
  <div
    v-for="(category, index) in filteredCategories"
    :key="category.name"
    :class="$cn('w-full', index < filteredCategories.length - 1 ? 'mb-5' : '')"
  >
    <h2
      class="transition-all mb-4 whitespace-nowrap text-sm font-medium font-chakra-petch text-zinc-500 dark:text-zinc-400"
    >
      {{ category.name }}
    </h2>
    <div
      :class="
        $cn(
          'flex flex-col items-start gap-2 w-full',
          categories.length !== index + 1 ? 'mb-5' : '',
        )
      "
    >
      <UiDrawerItem
        v-for="subCategory in category.subCategories"
        :key="subCategory.name"
        :here="subCategory.here"
        :to="subCategory.to"
      >
        {{ subCategory.name }}
      </UiDrawerItem>
    </div>
    <UiDivider v-if="index < filteredCategories.length - 1" />
  </div>
</template>

<script lang="ts" setup>
const { route } = useImports();
const { t } = useI18n();

const props = defineProps({
  required: Boolean,
  data: {
    type: String as PropType<"common">,
    default: "common",
  },
});

const categories = ref(
  [] as Array<{
    name: string;
    required?: boolean;
    subCategories: Array<{
      name: string;
      to: string;
      here: boolean;
    }>;
  }>,
);

const filteredCategories = computed(() => {
  return categories.value.filter((cat) => props.required || cat.required);
});

onMounted(() => {
  if (props.data == "common") {
    categories.value = [
      {
        name: "Test",
        required: false,
        subCategories: [
          {
            name: "test",
            to: "/auth/login",
            here: false,
          },
        ],
      },
    ];
  }

  const path = route.path;
  categories.value.forEach((cat) => {
    cat.subCategories.forEach((subCat) => {
      subCat.here = path.includes(subCat.to);
    });
  });
});
</script>
