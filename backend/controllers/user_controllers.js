import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

/*
    METHOD: GET
    PRUPOSE: Get all the users
    ENDPOINT: "/"
*/
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Found Users",
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
};

/*
    METHOD: POST
    PRUPOSE: Sign up, create user on database and give cookies along with JWT to user
    ENDPOINT: "/signup"
*/

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: ["Email already exists"] });
    }
    // creates a random string of length 10 to add to password
    const salt = await bcrypt.genSalt(10);

    // transforms password into a random string
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // deletes the cookie with same cookie name
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user.email, user._id.toString(), "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // identify the name, payload, specifications for cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      expires,
      signed: true,
    });

    return res.status(201).json({
      message: "Successfully created a new user",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

/*
    METHOD: POST
    PRUPOSE: Login User, verify email/password, create cookies and token for user
    ENDPOINT: "/login"
*/
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email Address",
      });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid Password",
      });
    }

    // pass the name of the cookie for deletion
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    const token = createToken(user.email, user._id.toString(), "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // identify the name, payload, specifications for cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      expires,
      signed: true,
    });

    // Successful login
    return res.status(200).json({
      message: "Successfully logged in",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);

    // Handle other errors (e.g., database errors)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteAll = async (req, res, next) => {
  try {
    const user = await User.deleteMany({});
    res.status(200).json({
      message: "successfully deleted all users",
    });
  } catch (err) {}
};

export const userLogout = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
