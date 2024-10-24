export { default as Textarea } from "./Textarea.vue";
export { default as TextareaRoot } from "./TextareaRoot.vue";

export type TextareRootProps = {
  modelValue?: string;
  type?: "text" | "password" | "email";
  minHeight?: string;
  maxHeight?: string;
};

export type TextareProps = {
  label?: string;
  modelValue?: TextareRootProps["modelValue"];
  type?: TextareRootProps["type"];
  minHeight?: TextareRootProps["minHeight"];
  maxHeight?: TextareRootProps["maxHeight"];
  required?: boolean;
  disabled?: boolean;
};
