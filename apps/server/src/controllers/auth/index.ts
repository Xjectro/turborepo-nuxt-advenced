import AuthTfaController from "./tfa";
import { Tfa, User, Auth } from "@repo/database";
import { exceptionResponse, response } from "../../api";
import { type NextFunction, type Request, type Response } from "express";
import { createUser } from "../../services/db.services";
import AuthModificationController from "./modification";
import { createEmail } from "../../utils/helpers/email";
import { sendEmail } from "../../services/transport.services";
import { DuplicatedDataError, UnauthorizedError } from "@repo/utils";
import passport from "passport";

export default class Controller {
  tfa = new AuthTfaController();
  modification = new AuthModificationController();

  logout = async (req: Request, res: Response): Promise<void> => {
    req.logout((err) => {
      if (err) {
        return exceptionResponse(res, err);
      }
      res.redirect(process.env.CLIENT_URI as string);
    });
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return exceptionResponse(res, err);
      }

      if (
        info &&
        info?.message === "2FA required, check your email for the code."
      ) {
        return response(res, {
          code: 201,
          success: true,
          message: "2FA required, check your email for the code.",
        });
      }

      if (!user) {
        return response(res, {
          code: 401,
          success: false,
          message: info?.message || "Authentication failed.",
        });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return exceptionResponse(res, loginErr);
        }

        response(res, {
          code: 200,
          success: true,
          message: "Login successful!",
        });
      });
    })(req, res, next);
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, ...rest } = req.body;

      const user = await User.findOne({ username }).exec();
      if (user) {
        throw new DuplicatedDataError("User already exists!");
      }

      const userAuth = await Auth.findOne({ email }).exec();
      if (userAuth) {
        throw new DuplicatedDataError("User already exists!");
      }

      await createUser({ email, username, ...rest });

      response(res, {
        code: 201,
        success: true,
        message: "Successfully created user!",
      });
    } catch (error: any) {
      console.log(error);
      exceptionResponse(res, error);
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, redirect_uri } = req.body;

      const auth = await Auth.findOne({ email }).exec();
      if (!auth) {
        throw new UnauthorizedError("Email is incorrect!");
      }

      const { usage_code } = await Tfa.createTfa({
        user: auth.user._id,
        interaction: "forgot_password",
        format: "jwt",
      });

      const html = await createEmail({
        name: "auth-forgot_password",
        style: "html",
        params: {
          href: redirect_uri.replace("[code]", usage_code),
        },
      });

      await sendEmail({
        to: email,
        subject: "Password reset link",
        html,
      });

      response(res, {
        code: 201,
        success: true,
        message: "Password reset request completed!",
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  refreshPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { newPassword, usage_code } = req.body;

      const tfa = await Tfa.checkTfa({ usage_code });

      if (!tfa) {
        throw new UnauthorizedError("Usage code is incorrect");
      }
      if (tfa.interaction !== "forgot_password") {
        throw new UnauthorizedError("interaction is not the same");
      }

      const auth = await Auth.findOne({ user: tfa.user }).exec();

      if (!auth) {
        throw new UnauthorizedError("User not found!");
      }

      if (await auth.comparePassword(newPassword)) {
        throw new UnauthorizedError("Password is the same as before!");
      }

      auth.password = newPassword;
      await auth.save();

      response(res, {
        code: 201,
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
}
