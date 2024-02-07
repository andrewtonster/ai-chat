import express from "express";
import {
  signUp,
  login,
  getAllUsers,
  verifyUser,
  deleteAll,
  userLogout,
} from "../controllers/user_controllers.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";

// we are creating a router for specific user routes
const userRouter = express.Router();

// defining the METHOD, endpoint, validators, and controller function

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), signUp);
userRouter.post("/login", validate(loginValidator), login);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);
userRouter.delete("/delete-all", deleteAll);

export default userRouter;
