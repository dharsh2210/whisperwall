import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ViewPost.css";

export default function ViewPost() {
  const { room } = useParams();
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const username = localStorage.getItem("whisperwall_user") || "Anonymous";

  useEffect(() => {
    fetchPosts();
  }, [room]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts?room=${room}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // React to a post (single emoji per user)
  const reactToPost = (postId, type) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id === postId) {
          const userPrev = post.reactedUsers?.[username];
          const newReactions = { ...post.reactions };

          // Remove previous reaction count
          if (userPrev)
            newReactions[userPrev] = Math.max(
              0,
              (newReactions[userPrev] || 1) - 1
            );

          // Add or remove reaction
          if (userPrev !== type) {
            newReactions[type] = (newReactions[type] || 0) + 1;
            post.reactedUsers = { ...post.reactedUsers, [username]: type };
          } else {
            const tmp = { ...post.reactedUsers };
            delete tmp[username];
            post.reactedUsers = tmp;
          }

          post.reactions = newReactions;
        }
        return post;
      })
    );

    axios
      .post(`http://localhost:5000/posts/${postId}/react`, { type, username })
      .catch(console.error);
  };

  // Add a new comment (optimistic, no duplicates)
  const addComment = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    setCommentText({ ...commentText, [postId]: "" });

    // Optimistic UI update
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [
                ...(post.comments || []),
                {
                  _id: Date.now().toString(),
                  text,
                  author: username,
                  likedBy: [],
                  dislikedBy: [],
                },
              ],
            }
          : post
      )
    );

    try {
      await axios.post(`http://localhost:5000/posts/${postId}/comment`, {
        text,
        author: username,
      });
      // No fetchPosts() — prevents duplicate comment display
    } catch (err) {
      console.error(err);
    }
  };

  // Like or dislike a comment
  const likeComment = (postId, commentId, action) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.comments.map((c) => {
            if (c._id === commentId) {
              let likedBy = c.likedBy || [];
              let dislikedBy = c.dislikedBy || [];

              // Remove current user from both lists
              likedBy = likedBy.filter((u) => u !== username);
              dislikedBy = dislikedBy.filter((u) => u !== username);

              // Add to one list depending on action
              if (action === "like") likedBy.push(username);
              else if (action === "dislike") dislikedBy.push(username);

              return { ...c, likedBy, dislikedBy };
            }
            return c;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );

    axios
      .post(
        `http://localhost:5000/posts/${postId}/comment/${commentId}/like`,
        { action, username }
      )
      .catch(console.error);
  };

  return (
    <>
      <Navbar />
      <div className="viewpost-container">
        <h1 className="viewpost-title">{room}</h1>

        {posts.length === 0 ? (
          <p className="no-posts">No posts yet — be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By {post.author?.toString()}</small>

              {/* Emoji reactions */}
              <div className="emoji-bar">
                {["heart", "smile", "sad", "fire"].map((type) => {
                  const reacted = post.reactedUsers?.[username] === type;
                  return (
                    <button
                      key={type}
                      onClick={() => reactToPost(post._id, type)}
                      style={{
                        fontWeight: reacted ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                    >
                      {type === "heart"
                        ? "❤️"
                        : type === "smile"
                        ? "😊"
                        : type === "sad"
                        ? "😢"
                        : "🔥"}{" "}
                      {post.reactions?.[type] || 0}
                    </button>
                  );
                })}
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                {post.comments?.map((c) => (
                  <div key={c._id} className="comment-card">
                    <span>
                      <b>{c.author?.toString()}:</b> {c.text}
                    </span>
                    <span>
                      ❤️ {c.likedBy?.length || 0}{" "}
                      <button
                        onClick={() => likeComment(post._id, c._id, "like")}
                      >
                        Like
                      </button>{" "}
                      👎 {c.dislikedBy?.length || 0}{" "}
                      <button
                        onClick={() => likeComment(post._id, c._id, "dislike")}
                      >
                        Dislike
                      </button>
                    </span>
                  </div>
                ))}

                {/* Add Comment Input */}
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText({
                        ...commentText,
                        [post._id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => addComment(post._id)}>Comment</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
