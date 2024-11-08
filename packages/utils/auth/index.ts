import crypto from "crypto";

export function generateHash(
  digest: "base64" | "base64url" | "hex",
  payload: Record<any, string>,
) {
  const timestamp = Date.now();

  const payloadString = Object.entries(payload)
    .map(([key, value]) => `${key}-${value}`)
    .join("-");

  const baseString = `${timestamp}-${payloadString}`;
  const hash = crypto.createHash("md5").update(baseString).digest(digest);

  return hash;
}
