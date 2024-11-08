import mongoose from "mongoose";

/** Payment */
export interface IUserPaymentSchema extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: any;
  default_charge: number;
}

export interface IUserPaymentModel extends mongoose.Model<IUserPaymentSchema> {}

/** Connection */
export interface IUserConnectionSchema extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: any;
  type: string;
  access_token: string;
  refresh_token: string;
  data: {
    id: string;
    name: string;
    username: string;
  };
}

export interface IUserConnectionModel
  extends mongoose.Model<IUserConnectionSchema> {
  connect({ ...state }: {}): Promise<boolean>;
  disconnect({
    user,
    type,
  }: {
    user: IUserConnectionSchema["_id"];
    type: string;
  }): Promise<boolean>;
}

/** Index */
export interface IUserSchema extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: string;
  username: string;
  description: string;
  firstName: string;
  lastName: string;
  avatarURL: string;
  bannerURL: string;
  createdAt: Date;
  updatedAt: Date;
  /** Refs */
  auth: any;
  payment: IUserPaymentSchema | null;
  connections: any[];
}

export interface IUserModel extends mongoose.Model<IUserSchema> {}
