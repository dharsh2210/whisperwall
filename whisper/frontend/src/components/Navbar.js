import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ darkMode, toggleTheme }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const nickname = localStorage.getItem("nickname");
  const avatar = nickname ? nickname.charAt(0).toUpperCase() : "U";

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 25px",
      background: darkMode ? "#1e1e1e" : "#9c27b0",
      color: "white",
      boxShadow: darkMode
        ? "0 4px 15px rgba(255,255,255,0.05)"
        : "0 4px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    links: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      transition: "opacity 0.2s",
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: darkMode ? "#333" : "#f3e8ff",
      color: darkMode ? "#f0f0f0" : "#5a0bc0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      border: darkMode ? "1px solid #555" : "1px solid #d1b3ff",
    },
    button: {
      marginLeft: "10px",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      background: darkMode ? "#333" : "#f3e8ff",
      color: darkMode ? "#f0f0f0" : "#5a0bc0",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.navbar}>
      {/* Left navigation links */}
      <div style={styles.links}>
        <Link to="/home" style={styles.link}>
          Home
        </Link>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/about" style={styles.link}>
          About
        </Link>
        <Link to="/contact" style={styles.link}>
          Contact
        </Link>
      </div>

      {/* Right section: Avatar + Buttons */}
      <div style={styles.links}>
        <div style={styles.avatar}>{avatar}</div>
        <button
          style={styles.button}
          onClick={toggleTheme}
          title="Toggle light/dark theme"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button style={styles.button} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
