import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("/user/login", { email, password }); // sending JSON data at this endpoint

  if (res.status !== 200) {
    throw new Error("Failed to login");
  }

  const data = await res.data; // contains data sent back by backend what does res.data actually return
  return data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post("/user/signup", { name, email, password }); // sending JSON data at this endpoint
  if (res.status !== 201) {
    throw new Error("Failed to login");
  }
  const data = await res.data; // contains data sent back by backend what does res.data actually return
  console.log(data);
  return data;
};

export const checkAuthStatus = async () => {
  console.log("auth status being called");
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Failed to Authenticate");
  }

  const data = await res.data; // contains data sent back by backend what does res.data actually return
  return data;
};

export const sendChatRequest = async (message) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  const data = await res.data; // contains data sent back by backend what does res.data actually return
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  const data = await res.data; // contains data sent back by backend what does res.data actually return
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
