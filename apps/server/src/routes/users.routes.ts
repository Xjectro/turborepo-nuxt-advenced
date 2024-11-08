import { Router } from "express";
import Controller from "../controllers/users";
import { auth } from "../middleware/authenticate";
import { validateBody } from "../middleware/validate";
import * as schema from "../utils/validation/users.schema";

class Routes {
  public router = Router();
  private controller = new Controller();

  constructor() {
    /**
     * Catching Routes
     */
    this.router.get("/catching/:source", this.controller.catching.index);

    /**
     * Me Routes
     */
    this.router.get("/@me", auth, this.controller.me.index);
    this.router.post(
      "/@me/update",
      validateBody(schema.me.update),
      auth,
      this.controller.me.update,
    );
    this.router.get("/@me/connections", auth, this.controller.me.connections);

    /**
     * Connections Routes
     */
    this.router.get(
      "/connections/discord",
      auth,
      this.controller.connections.discord,
    );
    this.router.get(
      "/connections/twitch",
      auth,
      this.controller.connections.twitch,
    );
    this.router.get(
      "/connections/github",
      auth,
      this.controller.connections.github,
    );
    this.router.get(
      "/connections/disconnect",
      auth,
      this.controller.connections.disconnect,
    );
  }
}

export default new Routes().router;
