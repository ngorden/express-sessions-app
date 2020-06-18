import { json, urlencoded } from "body-parser";

import router from "./routes";

import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";

const app = express();
const secret = process.env.SESSION_SECRET || "happy cat sleepy ket";

app.use(helmet());
app.use(morgan("dev"));

app.use(json({ limit: "1mb" }));
app.use(urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret, resave: false, saveUninitialized: false }));

app.use(router);

export default app;
