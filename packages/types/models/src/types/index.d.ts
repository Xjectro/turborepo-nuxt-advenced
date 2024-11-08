import mongoose from "mongoose";

export enum IAuthRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  USER = "USER",
}

export * from "./user.d";

/** Auth */
export interface IAuthSchema extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: any;
  email: string;
  password: string;
  roles: Role[];
  tfa: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IAuthModel extends mongoose.Model<IAuthSchema> {
  checkEmail(email: string): Promise<boolean>;
}

/** Tfa */
export interface ITfaSchema extends mongoose.Document {
  user: IUserSchema | mongoose.Schema.Types.ObjectId;
  interaction: string;
  used: boolean;
  usage_code: string;
  expiration: Date;
}

export interface ITfaModel extends mongoose.Model<ITfaSchema> {
  checkTfa({
    usage_code,
  }: {
    usage_code: ITfaSchema["usage_code"];
  }): Promise<ITfaSchema>;
  createTfa({
    user,
    format,
    interaction,
  }: {
    user: ITfaSchema["user"];
    format?: "jwt";
    interaction: ITfaSchema["interaction"];
  }): Promise<{ usage_code: string; expiration: Date; tfa: ITfaSchema }>;
}
