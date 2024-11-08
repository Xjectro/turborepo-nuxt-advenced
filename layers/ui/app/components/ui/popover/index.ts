import { type VariantProps, cva } from "class-variance-authority";

export { default as Popover } from "./Popover.vue";
export { default as PopoverContent } from "./PopoverContent.vue";
export { default as PopoverTrigger } from "./PopoverTrigger.vue";

export const popoverTriggerVariants = cva(
  "transition-all text-black dark:text-white",
  {
    variants: {
      variant: {
        nds: "flex items-center justify-center outline-none mx-auto p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900",
      },
    },
  },
);

export type PopoverTriggerVariants = VariantProps<
  typeof popoverTriggerVariants
>;
