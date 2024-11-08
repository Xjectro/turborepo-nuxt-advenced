import {
  DeleteObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { IAWSMediaUploadParams } from "@repo/types/services";
import mime from "mime-types";

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;

export default class Service {
  public clients = {
    s3: new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
      },
    }),
  };

  constructor() {}

  public check = {
    this: this,
    file: async (Key: string): Promise<boolean> => {
      try {
        await this.clients.s3.send(
          new GetObjectCommand({ Bucket: AWS_BUCKET_NAME!, Key }),
        );
        return true;
      } catch (error: any) {
        if (error?.name === "NoSuchKey") {
          return false;
        }

        return false;
      }
    },
  };

  public delete = {
    this: this,
    file: async (key: string): Promise<boolean> => {
      try {
        await this.clients.s3.send(
          new DeleteObjectCommand({ Bucket: AWS_BUCKET_NAME!, Key: key }),
        );
        return true;
      } catch {
        return false;
      }
    },
  };

  public upload = {
    this: this,
    file: async ({
      attachment,
      childrenDirs = [],
    }: IAWSMediaUploadParams): Promise<string | false> => {
      const mimeType =
        mime.lookup(attachment.originalname) || "application/octet-stream";
      const uniqueFilename = `${childrenDirs.join("/")}/${Date.now()}-${attachment.originalname}`;

      const url = await this.func.upload.s3(attachment.buffer, {
        Key: uniqueFilename,
        mimeType,
      });

      if (!url) return false;

      return url;
    },
  };

  public download = {
    this: this,
    file: async (filePath: string, fileName: string) => {
      try {
        const command = new GetObjectCommand({
          Bucket: AWS_BUCKET_NAME!,
          Key: `${filePath}/${fileName}`,
        });
        const response = await this.clients.s3.send(command);
        return {
          Body: response.Body,
          ContentType: mime.lookup(fileName) || "application/octet-stream",
          ContentDisposition: "inline",
        };
      } catch (error) {
        return false;
      }
    },
  };

  private func = {
    this: this,
    upload: {
      this: this,
      s3: async (
        buffer: Buffer,
        { Key, mimeType }: { Key: string; mimeType: string },
      ): Promise<string | false> => {
        try {
          const upload = new Upload({
            client: this.clients.s3,
            params: {
              Bucket: process.env.AWS_BUCKET_NAME!,
              Key,
              Body: buffer,
              ContentType: mimeType,
              ContentDisposition: "inline",
            },
          });
          await upload.done();
          return `https://${process.env.AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${Key}`;
        } catch {
          return false;
        }
      },
    },
  };
}
