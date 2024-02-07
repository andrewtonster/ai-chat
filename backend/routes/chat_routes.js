import express from "express";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat_controllers.js";
import { chatValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
const chatRouter = express.Router();

chatRouter.post(
  "/new",
  validate(chatValidator),
  verifyToken,
  generateChatCompletion
);

// route get all the chats from user in case of a refresh

chatRouter.get("/all-chats", verifyToken, sendChatsToUser);

chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
