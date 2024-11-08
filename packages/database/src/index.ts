import mongoose from "mongoose";

export default async () => {
  await mongoose.connect(process.env.MONGODB_URI as string, {
    retryWrites: true,
  });

  console.log("Connected to database");
};

mongoose.set("strictQuery", false);

export * from "./models/tfa.model";
export * from "./models/user.model";
export * from "./models/auth.model";
export * from "./models/user.connection";
export * from "./models/user.payment";

export const updateStates = (params: Record<string, unknown>) => {
  return Object.entries(params).reduce(
    (obj, [key, value]) => {
      obj[key] = value;
      return obj;
    },
    {} as Record<string, unknown>,
  );
};
