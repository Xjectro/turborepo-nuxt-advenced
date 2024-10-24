import { Router } from "express";
import { upload } from "../middleware/upload";
import { auth } from "../middleware/authenticate";
import Controller from "../controllers/cdn";

class Routes {
  public router = Router();
  private controller = new Controller();

  constructor() {
    this.router.post(
      "/upload-file",
      auth,
      upload.fields([
        {
          name: "attachment",
        },
      ]),
      this.controller.uploadFile,
    );
  }
}

export default new Routes().router;
