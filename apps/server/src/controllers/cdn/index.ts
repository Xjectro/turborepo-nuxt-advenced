import { InternalServerError } from "@repo/utils";
import { exceptionResponse, response } from "../../api";
import { type Request, type Response } from "express";
import { uploadFile } from "../../services/cdn.services";

export default class Controller {
  uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const attachment = (req.files as any)?.attachment[0];

      if (!attachment) {
        throw new InternalServerError("No file uploaded");
      }

      const uploadResponse = await uploadFile({
        attachment,
        user_id: req.user?.user_id,
      });

      response(res, {
        code: 201,
        success: true,
        message: "File uploaded.",
        data: uploadResponse,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
}
