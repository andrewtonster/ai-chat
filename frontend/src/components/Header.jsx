import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Logo } from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import { NavigationLink } from "./shared/NavigationLink";

/*
 app bar defines what component we are using
 toolbar defines the specific type of appbar we are using
*/
export const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />

        <div>
          {auth.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#b4a4fb"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="white"
                textColor="black"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#ffffff"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#caf789"
                textColor="black"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
