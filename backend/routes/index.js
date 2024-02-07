import express from "express";
import chatRouter from "./chat_routes.js";
import userRouter from "./user_routes.js";
const appRouter = express.Router();

appRouter.use("/chat", chatRouter);

appRouter.use("/user", userRouter);

export default appRouter;
