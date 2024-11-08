import { UserConnection } from "@repo/database";
import ConnectionsProviders from "./providers.utils";
import { type Request, type Response } from "express";
import { exceptionResponse, response } from "../../../api";

export default class UsersConnectionsController {
  private providers: ConnectionsProviders = new ConnectionsProviders();

  discord = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.query.code as string;

      const data = await this.providers.discord(req.user?._id, code);

      response(res, {
        code: 201,
        success: true,
        message: "Successfully connected to Discord",
        data,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  twitch = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.query.code as string;

      const data = await this.providers.twitch(req.user._id, code);

      response(res, {
        code: 201,
        success: true,
        message: "Successfully connected to Twitch",
        data,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  github = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.query.code as string;

      const data = await this.providers.github(req.user?._id, code);

      response(res, {
        code: 201,
        success: true,
        message: "Successfully connected to Github",
        data,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  disconnect = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.query;

      await UserConnection.disconnect({ user: req.user?._id, type });

      response(res, {
        code: 201,
        success: true,
        message: "Disconnected successfully.",
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
}
