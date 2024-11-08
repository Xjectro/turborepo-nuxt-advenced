import type { IConnection, IUser } from "./types.account";

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
  toasts: {
    title?: string;
    description?: string;
    type: "error" | "success";
    visible: boolean;
  }[];
  user: IUser | null;
}

export interface IAccountStore {
  user: IUser | null;
  connections: IConnection[] | [];
}
