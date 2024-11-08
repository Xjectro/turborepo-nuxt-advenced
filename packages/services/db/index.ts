import { v4 as uuidV4 } from "uuid";
import { createAvatarURL } from "@repo/utils/helpers";
import {
  User,
  Auth,
  UserPayment,
} from "@repo/database";
import type { IUserSchema, IAuthSchema } from "@repo/types/models";
import { generateHash } from "@repo/utils/auth";

export async function createUser(
  data: Partial<
    Pick<IUserSchema, "firstName" | "lastName" | "username"> &
      Pick<IAuthSchema, "email" | "password">
  >,
) {
  const id = uuidV4();
  const avatarURL = createAvatarURL();
  const widgetId = generateHash("base64", {
    id,
  });

  const user = new User({
    user_id: id,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarURL,
  });

  await user.save();

  const auth = new Auth({
    user: user._id,
    email: data.email,
    password: data.password,
  });

  const payment = new UserPayment({
    user: user._id,
    default_charge: 50,
  });

  await Promise.all([
    auth.save(),
    payment.save(),
  ]);

  user.auth = auth._id;
  user.payment = payment._id;

  await user.save();

  return user._id;
}
