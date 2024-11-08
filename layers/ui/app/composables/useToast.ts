import { usePageStore } from "../stores/pageStore";
import type { IPageStore } from "@repo/types/client";

export const useToast = () => {
  const pageStore = usePageStore();

  const add = (value: { title?: string; description?: string }) => {
    pageStore.toasts.push({
      title: value.title,
      description: value.description,
      type: "success",
      visible: true,
    });
  };

  return {
    add,
  };
};
