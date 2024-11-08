import mongoose from "mongoose";

import type { IUserPaymentSchema, IUserPaymentModel } from "@repo/types/models";

const Schema = mongoose.Schema;

const userPaymentSchema = new Schema<IUserPaymentSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    default_charge: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UserPayment = mongoose.model<
  IUserPaymentSchema,
  IUserPaymentModel
>("userPayment", userPaymentSchema);
