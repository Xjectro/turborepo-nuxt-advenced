import mongoose from "mongoose";
import { User } from "./user.model";

import type {
  IUserConnectionSchema,
  IUserConnectionModel,
} from "@repo/types/models";

const Schema = mongoose.Schema;

const userConnectionSchema = new Schema<IUserConnectionSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: {
        id: String,
        name: String,
        username: String,
      },
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userConnectionSchema.statics.connect = async function save({
  ...state
}: IUserConnectionSchema) {
  const connection = await UserConnection.findOneAndUpdate(
    { user: state.user, type: state.type },
    { $set: state },
    { upsert: true, new: true },
  );

  const user = await User.findById(connection.user);

  if (user) {
    user.connections.push(connection._id);

    await user.save();
  }

  return connection;
};

userConnectionSchema.statics.disconnect = async function disconnect({
  user,
  type,
}: {
  user: IUserConnectionSchema["_id"];
  type: string;
}) {
  const connection = await UserConnection.findOne({ user, type });

  if (!connection) return false;

  const userModel = await User.findById(connection.user).populate(
    "connections",
  );

  if (userModel) {
    userModel.connections = userModel.connections.filter(
      (value) => value.type !== type,
    );

    await userModel.save();
  }

  await connection.deleteOne();

  return connection;
};

export const UserConnection = mongoose.model<
  IUserConnectionSchema,
  IUserConnectionModel
>("userConnection", userConnectionSchema);
