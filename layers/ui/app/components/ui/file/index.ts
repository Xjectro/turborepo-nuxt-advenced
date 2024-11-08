export { default as FileUpload } from "./FileUpload.vue";
export { default as FileEditor } from "./FileEditor.vue";

type AcceptType = "audio/*" | "image/*" | "audio/*,video/*";
type ModelValue = File | string | null;
type Variant = "entry" | "card";

export type FileUploadProps = {
  modelValue: ModelValue;
  width?: string;
  height?: string;
  rounded?: boolean;
  title?: string;
  description?: string;
  class?: string;
  accept?: AcceptType;
  variant?: Variant;
};

export type FileUploadEmits = {
  "update:modelValue": [ModelValue];
};

export type FileEditorProps = {
  file: ModelValue;
  maxSpacing?: number;
  minSpacing?: number;
  spacing?: number[];
};

export type FileEditorEmits = {
  "update:spacing": any[];
};
