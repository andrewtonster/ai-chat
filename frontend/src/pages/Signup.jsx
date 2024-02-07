import React from "react";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  /*
    PURPOSE: taking form data and signing up user in backend
  */
  const handleSubmit = async (e) => {
    // preventing default refresh behavior
    e.preventDefault();

    // creates Form Data object takes the whole form argument as object and collects form fields
    const formData = new FormData(e.currentTarget);

    // retrieves data based on name values
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    try {
      toast.loading("Signing up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed up Successfully", { id: "signup" });
    } catch (error) {
      toast.error("Signing up failed", { id: "signup" });
      console.log(error);
    }
  };

  /*
    PURPOSE: Everytime component is rendered, checks if user is logged in, if so navigate to chat
  */
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
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
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
                bgcolor: "#caf789",
                color: "black",
                ":hover": {
                  bgcolor: "#a0d05b",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
