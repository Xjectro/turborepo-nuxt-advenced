import mongoose from "mongoose";

import { createAvatarURL, createBannerURL } from "@repo/utils/helpers";
import type { IUserSchema, IUserModel } from "@repo/types/models";

const Schema = mongoose.Schema;

const userSchema: mongoose.Schema<IUserSchema> = new Schema<IUserSchema>(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "test",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    bannerURL: {
      type: String,
      required: false,
      default: null,
    },
    auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: false,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userPayment",
      required: false,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre<IUserSchema>("save", function (next) {
  if (!this.avatarURL) {
    this.avatarURL = createAvatarURL();
  }
  if (!this.bannerURL) {
    this.bannerURL = createBannerURL();
  }
  next();
});

export const User = mongoose.model<IUserSchema, IUserModel>("user", userSchema);
