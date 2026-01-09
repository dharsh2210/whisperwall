import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then(res => {
      const userPosts = res.data.filter(p => p.author === nickname);
      setPosts(userPosts);
    });
  }, [nickname]);

  return (
    <div style={{ backgroundColor: "#f3e8ff", minHeight: "100vh", color: "#5a0bc0" }}>
      <Navbar />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>{nickname}'s Profile</h2>
        <div style={{ margin: "20px auto", width: "50%", display: "flex", flexDirection: "column", gap: "10px" }}>
          {posts.length === 0 ? <p>No posts yet</p> :
            posts.map(p => (
              <div key={p._id} style={{ border: "1px solid #9c27b0", padding: "10px", borderRadius: "10px", background: "#e0c6ff" }}>
                {p.content}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
