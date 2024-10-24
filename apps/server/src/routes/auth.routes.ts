import { Router } from "express";
import Controller from "../controllers/auth";
import { auth } from "../middleware/authenticate";
import { validateBody } from "../middleware/validate";
import * as schema from "../utils/validation/auth.schema";

class Routes {
  public router = Router();
  private controller = new Controller();

  constructor() {
    this.router.get("/logout", auth, this.controller.logout);

    this.router.post("/login", this.controller.login);
    this.router.post(
      "/register",
      validateBody(schema.register),
      this.controller.register,
    );
    this.router.post(
      "/forgot-password",
      validateBody(schema.forgot_password),
      this.controller.forgotPassword,
    );
    this.router.post(
      "/refresh-password",
      validateBody(schema.refresh_password),
      this.controller.refreshPassword,
    );

    /**
     * Modification
     */
    this.router.post(
      "/modification/email",
      validateBody(schema.modification.email),
      auth,
      this.controller.modification.email,
    );
    this.router.post(
      "/modification/password",
      validateBody(schema.modification.password),
      auth,
      this.controller.modification.password,
    );

    /**
     * Two Factor
     */
    this.router.post(
      "/tfa",
      validateBody(schema.tfa.index),
      auth,
      this.controller.tfa.index,
    );
    this.router.post(
      "/tfa/verify",
      validateBody(schema.tfa.verify),
      this.controller.tfa.verify,
    );
  }
}

export default new Routes().router;
