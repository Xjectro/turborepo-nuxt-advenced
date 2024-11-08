import { exceptionResponse, response } from "../../api";
import { type Request, type Response } from "express";
import { InternalServerError } from "@repo/utils/exceptions";
import { UserPayment } from "@repo/database";

export default class PaymentSetController {
  defaultCharge = async (req: Request, res: Response): Promise<void> => {
    try {
      const charge = parseInt(req.params.charge) || 10;

      if (isNaN(charge)) {
        throw new InternalServerError("Charge is wrong");
      }

      await UserPayment.updateOne(
        { user: req.user?._id },
        { $set: { default_charge: charge } },
      );

      response(res, {
        code: 200,
        success: true,
        message: "Successfully update default charge",
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
}
