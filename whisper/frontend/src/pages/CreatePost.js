import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./CreatePost.css";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/posts";

export default function CreatePost() {
  const { room: roomParam } = useParams();
  const [room, setRoom] = useState(roomParam || "Gratitude Room");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const username = localStorage.getItem("whisperwall_user") || "Anonymous";

  // Theme toggle
const toggleTheme = () => {
  setDarkMode((prev) => {
    const newMode = !prev;
    if (newMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    return newMode;
  });
};


  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}?room=${room}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Post",
          content: message,
          author: username,
          room,
        }),
      });
      setMessage("");
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const likePost = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      fetchPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className={`createpost-container ${darkMode ? "dark" : ""}`}>
        <h2>{room}</h2>

        <div className="room-select">
          
<select
  
  value={room}
  onChange={(e) => setRoom(e.target.value)}
>
<option>Regret Room</option>
  <option>Gratitude Room</option>
  <option>Anxiety Room</option>
  <option>Burnout Room</option>
  <option>Sadness Room</option>
  <option>Motivation Room</option>
  <option>Reflection Room</option>
  <option>Love Room</option>
  <option>Hope Room</option>
  <option>Rant Room</option>
  <option>Goals Room</option>
  <option>Healing Room</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="createpost-form">
          <textarea
            placeholder="Share your thoughts anonymously..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="post-btn">Post</button>
        </form>

        <div className="posts-list">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet. Be the first to share!</p>
          ) : (
            posts.map((p) => (
              <div key={p._id} className="post-card">
                <div className="post-info">
                  <span className="post-user">@{p.author}</span>
                  <span className="post-date">
                    {new Date(p.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="post-message">{p.content}</p>

                <div className="emoji-bar">
                  <button onClick={() => likePost(p._id)}>❤ {p.likes || 0}</button>
                  <button>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
