import { readFile } from "fs/promises";
import path from "path";

export async function createEmail({
  name,
  params,
  style,
}: {
  name: string;
  params: Record<string, string>;
  style: "css" | "html";
}) {
  const asset = await readFile(
    path.join(
      __dirname,
      "../../../public/assets/",
      "email",
      `/${name.replaceAll("-", "/")}.` + style,
    ),
    "utf-8",
  );

  const html = Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{${key}}`, "g"), value),
    asset,
  );

  return html;
}
