import { type VariantProps, cva } from "class-variance-authority";

export { default as Message } from "./Message.vue";

export const messageVariants = cva(
  "flex items-center w-full overflow-hidden px-2 py-1 rounded-xl border border-solid text-start font-medium font-inter animate-shake animate-once animate-duration-300 animate-ease-out animate-normal animate-fill-forwards",
  {
    variants: {
      type: {
        error:
          "bg-opacity-15 border-opacity-20 border-red-500 bg-red-500 text-red-500",
        success:
          "bg-opacity-15 border-opacity-20 border-green-500 bg-green-500 text-green-500",
      },
    },
    defaultVariants: {
      type: "error",
    },
  },
);

export type MessageVariants = VariantProps<typeof messageVariants>;
