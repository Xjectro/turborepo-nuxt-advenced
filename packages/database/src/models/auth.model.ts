import mongoose from "mongoose";
import bcrypt from "bcrypt";

import {
  type IAuthModel,
  type IAuthSchema,
  IAuthRole,
} from "@repo/types/models";

const Schema = mongoose.Schema;

const authSchema: mongoose.Schema<IAuthSchema> = new Schema<IAuthSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+@.+\..+/,
    },
    roles: {
      type: [String],
      enum: Object.values(IAuthRole),
      default: IAuthRole.USER,
    },
    password: {
      type: String,
      required: true,
    },
    tfa: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

authSchema.pre<IAuthSchema>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

authSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    return false;
  }
};

authSchema.statics.checkEmail = async function (email: string) {
  return !!(await Auth.findOne({ email }));
};

export const Auth = mongoose.model<IAuthSchema, IAuthModel>("auth", authSchema);
