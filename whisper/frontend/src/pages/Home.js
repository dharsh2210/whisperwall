import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

 const rooms = [
  {
    icon: "💔",
    title: "Regret Room",
    desc: "Share things you wish you had or hadn’t done.",
    color: "#e57373",
  },
  {
    icon: "😊",
    title: "Gratitude Room",
    desc: "Express thankfulness for people or moments.",
    color: "#ba68c8",
  },
  {
    icon: "🧠",
    title: "Anxiety Room",
    desc: "Talk about your worries and fears.",
    color: "#64b5f6",
  },
  {
    icon: "🔥",
    title: "Burnout Room",
    desc: "Let out your mental and emotional exhaustion.",
    color: "#ff8a65",
  },
  {
    icon: "😢",
    title: "Sadness Room",
    desc: "A safe space to express your sorrow and be heard.",
    color: "#7986cb",
  },
  {
    icon: "💪",
    title: "Motivation Room",
    desc: "Get inspired or help others push through challenges.",
    color: "#81c784",
  },
  {
    icon: "💭",
    title: "Reflection Room",
    desc: "Think aloud and share your lessons and realizations.",
    color: "#4db6ac",
  },
  {
    icon: "❤️",
    title: "Love Room",
    desc: "Talk about relationships, affection, or heartbreak.",
    color: "#f06292",
  },
  {
    icon: "🌈",
    title: "Hope Room",
    desc: "Find light in dark times — or help someone else find theirs.",
    color: "#9575cd",
  },
  {
    icon: "😡",
    title: "Rant Room",
    desc: "Let out your frustrations freely and without judgment.",
    color: "#f44336",
  },
  {
    icon: "🎯",
    title: "Goals Room",
    desc: "Set personal goals, track progress, and stay accountable.",
    color: "#ffb74d",
  },
  {
    icon: "🌿",
    title: "Healing Room",
    desc: "Focus on self-care, mindfulness, and emotional recovery.",
    color: "#aed581",
  },
];


  return (
    <>
    <Navbar />
    <div className="home-container">
      
      <header className="home-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/8090/8090402.png"
          alt="WhisperWall logo"
          className="home-logo"
        />
        <div className="home-text">
          <h1>Welcome to <span className="brand">WhisperWall</span></h1>
          <p>
            A safe, anonymous space to share your feelings and receive genuine
            support from others who understand.
          </p>
        </div>
      </header>

      <section className="rooms-section">
        <h2>Emotional Spaces</h2>
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <div key={index} className="room-card">
              <div className="room-header">
                <span className="room-icon">{room.icon}</span>
                <h3 style={{ color: room.color }}>{room.title}</h3>
              </div>
              <p>{room.desc}</p>
              <div className="room-buttons">
                <button
                  className="create-btn"
                  onClick={() => navigate(`/createpost/${room.title}`)}
                >
                  ✍️ Create Own Post
                </button>
              <button
                className="view-btn"
                onClick={() => navigate(`/viewpost/${room.title}`)}
              >
                💬 View Posts
              </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
