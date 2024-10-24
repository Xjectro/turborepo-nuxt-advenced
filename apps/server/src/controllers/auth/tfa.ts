import { Auth, Tfa } from "@repo/database";
import { exceptionResponse, response } from "../../api";
import { type Request, type Response } from "express";
import { UnauthorizedError } from "@repo/utils";

export default class AuthTfaController {
  index = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user;
      const { enabled } = req.body;

      const auth = await Auth.findOne({ user: user._id });

      if (!auth) return;

      auth.tfa = enabled;

      await auth.save();

      response(res, {
        code: 201,
        success: true,
        message: "Successfully update two factor.",
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  verify = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usage_code } = req.body;

      const tfa = await Tfa.checkTfa({ usage_code });

      if (!tfa) {
        throw new UnauthorizedError("Usage code is incorrect");
      }

      const data: any = {
        expiration: tfa.expiration,
      };

      response(res, {
        code: 201,
        success: true,
        message: "Usage code is correct",
        data,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
}
