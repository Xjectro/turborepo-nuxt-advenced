import { exceptionResponse } from "../api";
import { type Request, type Response, type NextFunction } from "express";
import {
  UnauthorizedError,
  ForbiddenAccessError,
} from "@repo/utils/exceptions";

interface CustomRequest extends Request {
  user?: any;
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw new UnauthorizedError("Token does not match credentials");
    }
  } catch (error) {
    exceptionResponse(res, error);
  }
};

export const verifyRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (user && roles.includes(user.auth.roles)) {
        return next();
      }

      throw new ForbiddenAccessError(
        "You are not allowed to access this resource!",
      );
    } catch (error: any) {
      return exceptionResponse(res, error);
    }
  };
};
