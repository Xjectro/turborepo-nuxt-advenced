import "@repo/logger";
import "dotenv/config";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import * as http from "http";
import express from "express";
import Socket from "./socket";
import dbConnection from "@repo/database";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./utils/stratagies/local.strategy";
import Routes from "./routes";

const app = express();
const server = http.createServer(app);

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

/**app.use(
  rateLimit({
    max: 10,
    windowMs: 5000,
  }),
);*/

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "123456789",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Socket(server);
new Routes(app);

app.set("socketio", io);
app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));
app.set("views", path.join(__dirname, "../public/views"));

server.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server listening on port ${process.env.PORT}`);
});
