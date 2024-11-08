import { type VariantProps, cva } from "class-variance-authority";

export { default as AlertDialog } from "./AlertDialog.vue";
export { default as AlertDialogCancel } from "./AlertDialogCancel.vue";
export { default as AlertDialogContent } from "./AlertDialogContent.vue";
export { default as AlertDialogDescription } from "./AlertDialogDescription.vue";
export { default as AlertDialogOverlay } from "./AlertDialogOverlay.vue";
export { default as AlertDialogTitle } from "./AlertDialogTitle.vue";
export { default as AlertDialogTrigger } from "./AlertDialogTrigger.vue";
export { default as AlertDialogAction } from "./AlertDialogAction.vue";

export const alertDialogTriggerVariants = cva(
  "inline-flex items-center font-inter font-medium pointer-events-auto cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        secondary:
          "bg-zinc-100 hover:bg-zinc-200 focus:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-600/30 dark:focus:bg-zinc-900 text-zinc-900 dark:text-white",
        primary: "bg-primary-500 hover:bg-primary-600 text-white",
        danger: "bg-red-500 bg-opacity-10 hover:bg-opacity-20 text-red-500",
        transparent: "hover:bg-zinc-100 dark:hover:bg-zinc-900",
      },
      type: {
        default: "rounded-lg",
        nds: "rounded-full p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      type: "default",
    },
  },
);

export type AlertDialogTriggerVariants = VariantProps<
  typeof alertDialogTriggerVariants
>;
