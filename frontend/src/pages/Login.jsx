import React from "react";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  /*
    PURPOSE: when submit button clicked, handle the submit
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // creates Form Data object takes the whole form argument as object and collects form fields
    // based on names and values it recieves from input
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    try {
      toast.loading("Signing in", { id: "login" });
      await auth?.login(email, password); // checks if auth is not null before logging in
      toast.success("Signed in Successfully", { id: "login" });
    } catch (error) {
      toast.error("Signing in failed", { id: "login" });
      console.log(error);
    }
  };

  // PURPOSE: On every render of this component, if user user exist/ logged in, navigate to the chat window
  React.useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  });

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "2px solid #631250",
            background: "rgba(20, 20, 20, 0.4)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                color: "black",
                bgcolor: "#b4a4fb",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
