import { exceptionResponse, response } from "../../api";
import { type Request, type Response } from "express";
import { User } from "@repo/database";
import { NotFoundError } from "@repo/utils/exceptions";
import type { IUserConnectionSchema } from "@repo/types/models";

export default class Controller {
  index = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        $or: [{ user_id: req.params.source }, { username: req.params.source }],
      })
        .populate([
          "connections",
        ])
        .lean();

      if (!user) {
        throw new NotFoundError("User is not found");
      }

      if (user.connections.length !== 0) {
        user.connections = user.connections.map(
          (connection: IUserConnectionSchema) => ({
            id: connection.data.id,
            name: connection.data.name,
            username: connection.data.username,
            type: connection.type,
          }),
        );
      }

      response(res, {
        code: 200,
        success: true,
        message: "Successfully retrieved user",
        data: user,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
}
