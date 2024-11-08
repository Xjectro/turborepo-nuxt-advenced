import { Server } from "socket.io";
import { type Server as HttpServer } from "http";

export default class Socket {
  io: Server;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.initializeSocket();
  }

  initializeSocket() {
    this.io.on("connection", (socket) => {
      console.log("New Connection", socket.id);

      socket.on("/test", async ({ ...args }) => console.log(args)
      );
    });
  }
}
