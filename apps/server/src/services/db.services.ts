import { v4 as uuidV4 } from "uuid";
import { createAvatarURL } from "@repo/utils";
import { User, Auth, type UserType, type AuthType } from "@repo/database";

export async function createUser(
  data: Partial<
    Pick<UserType, "firstName" | "lastName" | "username"> &
      Pick<AuthType, "email" | "password">
  >,
) {
  const id = uuidV4();
  const avatarURL = createAvatarURL([
    data.firstName,
    data.lastName,
  ] as string[]);

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

  await auth.save();

  user.auth = auth._id;

  await user.save();

  return user._id;
}
