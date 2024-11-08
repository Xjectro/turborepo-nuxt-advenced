import { InternalServerError, NotFoundError } from "@repo/utils/exceptions";
import { exceptionResponse, response } from "../../api";
import { type Request, type Response } from "express";
import Delivery from "@repo/services/delivery";
import Helpers from "./helpers.utils";
import fs from "fs/promises";

export default class Controller {
  helpers = new Helpers();
  delivery = new Delivery();

  upload = {
    file: async (req: Request, res: Response) => {
      try {
        const attachment = (req.files as { attachment?: Express.Multer.File[] })
          ?.attachment?.[0];
        if (!attachment) throw new InternalServerError("No file uploaded");

        const startTime = parseInt(req.query.startTime as string, 10);
        const duration = parseInt(req.query.duration as string, 10);
        const fileType =
          req.query.type || attachment.originalname.split(".").pop();
        const originalname = `${attachment.originalname.split(".")[0]}.${fileType}`;

        let buffer: Buffer;

        if (startTime && duration) {
          buffer = await this.helpers.trimFile({
            originalname,
            startTime,
            duration,
            path: attachment.path,
          });
        } else {
          buffer = await fs.readFile(attachment.path);
        }

        await fs.unlink(attachment.path);

        const uploadResponse = await this.delivery.upload.file({
          attachment: {
            buffer,
            originalname,
          },
          childrenDirs: this.helpers.getChildrenDirs(req),
        });

        if (!uploadResponse) return;

        response(res, {
          code: 201,
          success: true,
          message: "File uploaded successfully.",
          data: uploadResponse,
        });
      } catch (error) {
        exceptionResponse(res, error);
      }
    },
  };

  download = {
    file: async (req: Request, res: Response): Promise<void> => {
      const { path: filePath, fileName } = req.params;

      try {
        const fileData = await this.delivery.download.file(filePath, fileName);
        if (!fileData)
          throw new NotFoundError("File not found or unable to download");

        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`,
        );
        res.setHeader(
          "Content-Type",
          fileData.ContentType || "application/octet-stream",
        );

        if (fileData.Body && typeof fileData.Body.pipe === "function") {
          fileData.Body.pipe(res);
        } else {
          throw new InternalServerError("Error reading file data.");
        }
      } catch (error) {
        exceptionResponse(res, error);
      }
    },
  };
}
