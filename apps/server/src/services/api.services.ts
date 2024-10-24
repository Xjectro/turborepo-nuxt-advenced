import axios from "axios";

const {
  DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_REDIRECT_URI,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_REDIRECT_URI,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
} = process.env;

export async function github_getAccessToken(code: string) {
  return await axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_REDIRECT_URI,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export async function github_getUserInfo(token: string) {
  return await axios("https://api.github.com/user", {
    headers: { authorization: token },
  });
}

export async function twitch_getAccessToken(code: string) {
  return await axios({
    method: "post",
    url: "https://id.twitch.tv/oauth2/token",
    data: {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: TWITCH_REDIRECT_URI,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export async function twitch_refreshAccessToken(refreshToken: string) {
  return await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
    },
  });
}

export async function twitch_getUserInfo(token: string) {
  return await axios("https://api.twitch.tv/helix/users", {
    headers: { authorization: token, "Client-ID": TWITCH_CLIENT_ID },
  });
}

export async function discord_getAccessToken(code: string) {
  return await axios({
    method: "post",
    url: "https://discord.com/api/oauth2/token",
    data: {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export async function discord_getUserInfo(token: string) {
  return await axios("https://discord.com/api/users/@me", {
    headers: { authorization: token },
  });
}
