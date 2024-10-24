export { default as FileUpload } from "./FileUpload.vue";
export { default as FileUploadRoot } from "./FileUploadRoot.vue";

export type FileUploadProps = {
  modelValue: File | string | null;
  width?: string;
  height?: string;
  rounded?: boolean;
  title?: string;
  description?: string;
  class?: string;
  accept?: string;
  variant?: "default" | "card";
};

export type FileUploadEmits = {
  "update:modelValue": [FileUploadProps["modelValue"]];
};
