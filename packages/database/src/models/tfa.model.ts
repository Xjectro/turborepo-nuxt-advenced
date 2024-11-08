import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import type { ITfaModel, ITfaSchema } from "@repo/types/models";

const Schema = mongoose.Schema;

const tfaSchema = new Schema<ITfaSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    interaction: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: false,
      default: false,
    },
    usage_code: {
      type: String,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

tfaSchema.statics.checkTfa = async function checkTfa({
  usage_code,
}: {
  usage_code: ITfaSchema["usage_code"];
}) {
  const tfa = await Tfa.findOne({ usage_code });

  if (!tfa || tfa.expiration <= new Date()) return false;

  tfa.used = true;
  await tfa.save();

  return tfa;
};

tfaSchema.statics.createTfa = async function createTfa({
  user,
  format,
  interaction,
}: {
  user: ITfaSchema["user"];
  format: "jwt";
  interaction: ITfaSchema["interaction"];
}) {
  let usage_code = "";
  const expiration = new Date(Date.now() + 180 * 1000);

  switch (format) {
    case "jwt":
      usage_code = jwt.sign(
        { user, interaction },
        process.env.SESSION_SECRET as string,
        {
          expiresIn: 180,
        },
      );
      break;
    case undefined:
      usage_code = crypto
        .randomBytes(64)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 5);
      break;
  }

  const tfa = await Tfa.create({
    user,
    interaction,
    usage_code,
    expiration,
  });

  return { usage_code, expiration, tfa };
};

export const Tfa = mongoose.model<ITfaSchema, ITfaModel>("tfa", tfaSchema);
