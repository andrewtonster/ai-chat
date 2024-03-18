import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
config();

// we are creating the express application to use
const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
// we are going to use this middleware to send and recieve data as json from the body
app.use(express.json());

// allows us to make our own cookie secret
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
