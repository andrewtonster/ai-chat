import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import "../App.css";
import TypingAnimation from "../components/typer/TypingAnimation";
import Footer from "../components/footer/Footer";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
export const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        height: "100vh", // 100% of viewport height
      }}
    >
      <Typography
        variant="h1"
        className={`transition-in ${loaded ? "visible" : ""}`}
        style={{
          textAlign: "left",
          padding: 2,
          fontWeight: 400,
          marginBottom: 35,
          maxWidth: "70rem",
        }}
      >
        Reliable and secure ChatBOT to help answer your questions.
      </Typography>
      <TypingAnimation />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xs: "column", sm: "column" },
          gap: 5,
          my: 10,
        }}
      >
        {/* Your other content goes here */}
      </Box>

      <Box sx={{ display: "flex", mx: "auto" }}>
        {/* Your other content goes here */}
      </Box>

      <Footer />
    </Box>
  );
};
