export interface IPageStore {
  dialog: {
    settings: {
      visible: boolean;
      path: string;
      layout: {
        title: string | null;
        scopes?: Array<"USER" | "ADMIN"> | null;
        message?: {
          label?: string;
          visible?: boolean;
          type?: "error" | "success";
        };
      };
    };
  };
  ui: {
    theme: string;
    color: string;
  };
}
