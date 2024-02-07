// controllers/chat_controllers.js

import { configureOpenAI } from "../config/openai-config.js";
import User from "../models/User.js";
import { OpenAIApi } from "openai";

export const generateChatCompletion = async (req, res, next) => {
  // getting the message from the frontend through the request body
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registerd or token malfunctioned" });
    }
    // maps through each item in previous chat, and creates a new array with
    // all the role and content
    // each chat will have a role, user / and gpt
    const chats = user.chats.map(({ role, content }) => {
      return { role, content };
    });

    // push the new chat to the user to this local variable
    chats.push({ content: message, role: "user" });

    // and push the chats to the database, why not push to databse and the print those chats?
    user.chats.push({ content: message, role: "user" });

    console.log(chats);
    console.log(user.chats);
    // configuration to make api work
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // we await the chat completion of the chat. Returns the chat gpt send
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    console.log(chatResponse.data.choices[0].message);
    // pushes the NEW response chat from GPT to user
    user.chats.push(chatResponse.data.choices[0].message);

    console.log(user.chats);
    // save chanfges to user
    await user.save();

    // sending the whole chat cycle back to the user
    return res.status(200).json({ chats: user.chats });
    // get latest response
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// THIS FUNCTION IS CAYUSING AN ERRROR
export const deleteChats = async (req, res, next) => {
  console.log("in delete chats");

  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
