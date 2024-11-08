import { exceptionResponse, response } from "../../api";
import { type Request, type Response } from "express";
import { DuplicatedDataError } from "@repo/utils/exceptions";
import { User, UserConnection, updateStates } from "@repo/database";
import type { IUserConnectionSchema } from "@repo/types/models";

export default class UsersMeController {
  index = (req: Request, res: Response): void => {
    try {
      const data = req.user;
      response(res, {
        code: 200,
        success: true,
        message: "Successfully get user",
        data,
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user;

      const { user_id, createdAt, updatedAt, email, ...rest } = req.body;

      if (rest.username) {
        const existingUser = await User.findOne({
          username: rest.username,
        }).exec();
        if (existingUser) {
          throw new DuplicatedDataError("Username already exists!");
        }
      }

      const state = updateStates(rest);

      await User.updateOne(
        { _id: user?._id },
        { $set: state },
        { upsert: true },
      ).exec();

      response(res, {
        code: 200,
        success: true,
        message: "Successfully updated user",
      });
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };

  connections = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user;

      const connections = await UserConnection.find({ user })
        .select("data type")
        .exec();

      if (connections.length === 0) {
        response(res, {
          code: 200,
          success: true,
          message: "Connections were pulled successfully",
          data: [],
        });
      }

      const data = connections.map((connection: IUserConnectionSchema) => ({
        id: connection.data.id,
        name: connection.data.name,
        username: connection.data.username,
        type: connection.type,
      }));

      response(res, {
        code: 200,
        success: true,
        message: "Connections were pulled successfully",
        data,
      });
    } catch (error) {
      exceptionResponse(res, error);
    }
  };
}
