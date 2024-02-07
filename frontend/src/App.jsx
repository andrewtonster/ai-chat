import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Signup } from "./pages/Signup";
import { Header } from "./components/Header";
import { useAuth } from "./context/AuthContext";

/*
 whenever React recognizes a change in location, it will go through the
 routes list and find a matching route
*/
function App() {
  const auth = useAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
