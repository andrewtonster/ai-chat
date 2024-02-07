import React, { useContext } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communicator";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  // Initalize state to keep in track of if user is logged in and if so who is it
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // however, when we move from home to chat will it cause rerender???
  // Whenever this component is rendered, use effect will run once
  React.useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }

    checkStatus();
  }, []);

  // PURPOSE:
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      setIsLoggedIn(true);
      setUser({ email: data.email, name: data.name });
    }
  };

  const signup = async (name, email, password) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setIsLoggedIn(true);
      setUser({ email: data.email, name: data.name });
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);

    // takes some time to remove cookies so we use this
    window.location.reload();
  };

  // creating a value that passes down these functions and states for others to use

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
