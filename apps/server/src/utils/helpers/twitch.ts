import { Client } from "tmi.js";

export default class Twitch {
  client: Client;

  constructor({ username }: { username: string }) {
    this.client = new Client({
      channels: [username],
    });

    this.client.connect();
  }
}
