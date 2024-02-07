import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/Chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

export const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const auth = useAuth();

  // Getting initials for icon
  const name = auth?.user.name;
  const name_arr = name.split(" ");

  const first_i = name_arr[0][0];
  const last_i = "";

  if (name_arr.length == 2) {
    name_arr[1][0];
  }

  // holds the chat messages
  const [chatMessages, setChatMessages] = useState([]);

  /*
    PURPOSE: Takes user input from chat, stores chat in state, and send the chats to database
  */

  const handleSubmit = async () => {
    try {
      toast.loading("AI Response Loading", { id: "sendchats" });
      const content = inputRef.current?.value;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
      toast.success("AI Response Success", { id: "sendchats" });
    } catch (error) {
      toast.error("AI Response Failed", { id: "sendchats" });
    }
  };

  /*
    PURPOSE: Delete all chats from database
  */
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  /*
    PURPOSE: Load previous chats if user is logged in
  */
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  /*
    PURPOSE: if user access endpoint without being logged in, log them out
  */
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {first_i}
            {last_i}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            Welcome to my ChatBOT!
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            Feel free to ask about topics such as Knowledge, Business, Advice,
            Education, and more. However, refrain from disclosing personal
            information when asking questions.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "black",
              fontWeight: 700,
              borderRadius: 3,
              mx: "auto",
              bgcolor: "white", // Use quotes for string values
              ":hover": {
                bgcolor: red[300],
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            backgroundColor: "#111d27",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "#111d27",
            display: "flex",
            margin: "auto",
            border: "solid 1px #CCCCCC",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
