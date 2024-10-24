import fs from "fs";
import axios from "axios";

const { BUNNY_ACCESS_KEY, BUNNY_STORAGE_NAME, BUNNY_HOST_NAME } = process.env;

export const uploadFile = async ({
  attachment,
  user_id,
}: {
  attachment: any;
  user_id?: string;
}) => {
  const fileStream = fs.createReadStream(attachment.path);
  const uniqueFilename = `attachments/${user_id ? `${user_id}/` : ""}${attachment.originalname}`;

  const response = await axios.put(
    `https://${BUNNY_HOST_NAME}/${BUNNY_STORAGE_NAME}/${uniqueFilename}`,
    fileStream,
    {
      headers: {
        AccessKey: BUNNY_ACCESS_KEY,
      },
    },
  );

  if (response.data) {
    return `https://${BUNNY_STORAGE_NAME}.b-cdn.net/${uniqueFilename}`;
  } else {
    return false;
  }
};
