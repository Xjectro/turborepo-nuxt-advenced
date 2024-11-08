import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";
export { default as LinkButton } from "./LinkButton.vue";

export const buttonVariants = cva(
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

export const linkButtonVariants = cva(
  "text-sm font-inter font-medium hover:underline",
  {
    variants: {
      variant: {
        primary: "text-zinc-600 dark:text-zinc-500 hover:text-primary-500",
        default: "text-black dark:text-zinc-100 hover:text-primary-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type LinkButtonVariants = VariantProps<typeof linkButtonVariants>;
