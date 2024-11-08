import { type ZodType } from "zod";
import { exceptionResponse } from "../api";
import { UnprocessableEntityError } from "@repo/utils/exceptions";
import { type Request, type Response, type NextFunction } from "express";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) return next();

      const extractedErrors = result.error.issues.map((issue) => ({
        [issue.path[0]]: issue.message.replace(/_/g, " "),
      }));

      if (extractedErrors.length > 0) {
        throw new UnprocessableEntityError(
          "Validation Failed",
          extractedErrors,
        );
      }

      return next();
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
};
