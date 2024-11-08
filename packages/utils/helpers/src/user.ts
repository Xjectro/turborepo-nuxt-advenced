export function createAvatarURL(): string {
  const randomNumber =
    Math.floor(Math.random() * 4) + (1).toString().padStart(2, "0");
  return `${process.env.SERVER_URI}/assets/avatars/${randomNumber}.svg`;
}

export function createBannerURL(): string {
  const randomNumber =
    Math.floor(Math.random() * 4) + (1).toString().padStart(2, "0");
  return `${process.env.SERVER_URI}/assets/banners/${randomNumber}.svg`;
}
