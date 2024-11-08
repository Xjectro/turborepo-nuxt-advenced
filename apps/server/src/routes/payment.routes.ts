import { Router } from "express";
import Controller from "../controllers/payment";
import { auth } from "../middleware/authenticate";

class Routes {
  public router = Router();
  private controller = new Controller();

  constructor() {
    /**
     * Set Routes
     */
    this.router.get(
      "/set/default-charge/:charge",
      auth,
      this.controller.set.defaultCharge,
    );
  }
}

export default new Routes().router;
