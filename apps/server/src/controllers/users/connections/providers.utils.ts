import { type ObjectId } from "mongoose";
import { Connection } from "@repo/database";
import { UnauthorizedError } from "@repo/utils";
import {
  discord_getAccessToken,
  discord_getUserInfo,
  github_getAccessToken,
  github_getUserInfo,
  twitch_getAccessToken,
  twitch_getUserInfo,
} from "../../../services/api.services";

export default class ConnectionsHelpers {
  async discord(_id: ObjectId, code: string) {
    const response = await discord_getAccessToken(code);

    if (!response?.data?.access_token)
      throw new UnauthorizedError("Error connecting to Discord");

    const userInfo = await discord_getUserInfo(
      `Bearer ${response.data.access_token} `,
    );

    if (!userInfo.data)
      throw new UnauthorizedError("Error connecting to Discord 2");

    await Connection.save({
      type: "discord",
      user: _id,
      data: userInfo.data,
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    });

    return userInfo.data;
  }

  async twitch(_id: ObjectId, code: string) {
    const response = await twitch_getAccessToken(code);

    if (!response?.data?.access_token)
      throw new UnauthorizedError("Error connecting to Twitch");

    const userInfo = await twitch_getUserInfo(
      `Bearer ${response.data.access_token} `,
    );

    if (!userInfo.data)
      throw new UnauthorizedError("Error connecting to Twitch 2");

    await Connection.save({
      type: "twitch",
      user: _id,
      data: {
        id: userInfo.data.data[0].id,
        name: userInfo.data.data[0].login,
        username: userInfo.data.data[0].display_name,
      },
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    });

    return userInfo.data;
  }

  async github(_id: ObjectId, code: string) {
    const response = await github_getAccessToken(code);

    const access_token = response?.data
      ?.split("access_token=")?.[1]
      ?.split("&scope=")?.[0];

    if (!access_token)
      throw new UnauthorizedError("Error connecting to Github");

    const userInfo = await github_getUserInfo(`token ${access_token} `);

    if (!userInfo.data)
      throw new UnauthorizedError("Error connecting to Github 2");

    await Connection.save({
      type: "github",
      user: _id,
      data: {
        id: userInfo.data.id,
        name: userInfo.data.login,
        username: userInfo.data.name,
      },
      access_token,
    });

    return userInfo.data;
  }
}
