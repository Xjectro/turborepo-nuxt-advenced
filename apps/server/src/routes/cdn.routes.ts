import { Router } from "express";
import { upload } from "../middleware/upload";
import { auth } from "../middleware/authenticate";
import Controller from "../controllers/cdn";

class Routes {
  public router = Router();
  private controller = new Controller();

  constructor() {
    this.router.post(
      "/upload/file",
      upload.fields([
        {
          name: "attachment",
        },
      ]),
      this.controller.upload.file,
    );
    this.router.get(
      "/download/file/:path/:fileName",
      auth,
      this.controller.download.file,
    );
  }
}

export default new Routes().router;
