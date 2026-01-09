import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import Profile from "./pages/Profile";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("whisperwall_theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("whisperwall_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home darkMode={darkMode} />} />
        <Route path="/dashboard" element={<Dashboard/>} />

        <Route path="/createpost/:room" element={<CreatePost />} />

        <Route path="/viewpost/:room"  element={<ViewPost darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/profile" element={<Profile darkMode={darkMode} />} />
        <Route path="/about" element={<AboutPage darkMode={darkMode} />} />
        <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
