import { type VariantProps, cva } from "class-variance-authority";

export { default as Dialog } from "./Dialog.vue";
export { default as DialogClose } from "./DialogClose.vue";
export { default as DialogContent } from "./DialogContent.vue";
export { default as DialogDescription } from "./DialogDescription.vue";
export { default as DialogOverlay } from "./DialogOverlay.vue";
export { default as DialogTitle } from "./DialogTitle.vue";
export { default as DialogTrigger } from "./DialogTrigger.vue";

export const dialogTriggerVariants = cva(
  "transition-all text-black dark:text-white",
  {
    variants: {
      variant: {
        nds: "flex items-center justify-center outline-none mx-auto p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900",
      },
    },
  },
);

export type DialogTriggerVariants = VariantProps<typeof dialogTriggerVariants>;
