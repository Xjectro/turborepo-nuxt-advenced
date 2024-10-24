import CdnRoutes from "./cdn.routes";
import AuthRoutes from "./auth.routes";
import UsersRoutes from "./users.routes";
import type { Application } from "express";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/cdn", CdnRoutes);
    app.use("/api/auth", AuthRoutes);
    app.use("/api/users", UsersRoutes);
  }
}