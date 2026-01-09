export default function PostCard({ post, onReact, onReply }) {
  const cardStyle = {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid #9c27b0",
    borderRadius: "15px",
    padding: "15px",
    margin: "15px auto",
    maxWidth: "600px",
    color: "#5a0bc0",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  };

  return (
    <div style={cardStyle}>
      <h3>{post.author}</h3>
      <p>{post.content}</p>
      <p style={{ fontStyle: "italic", fontSize: "12px" }}>{new Date(post.createdAt).toLocaleString()}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {["heart", "sad", "laugh"].map(emoji => (
          <button key={emoji} onClick={() => onReact(post._id, emoji)}>
            {emoji} {post.reactions[emoji]}
          </button>
        ))}
      </div>

      {post.replies && post.replies.map((r, i) => (
        <div key={i} style={{ marginTop: "10px", padding: "10px", borderTop: "1px solid #9c27b0" }}>
          <p><strong>{r.author}:</strong> {r.content}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => onReply(post._id, "like", i)}>👍 {r.likes}</button>
            <button onClick={() => onReply(post._id, "dislike", i)}>👎 {r.dislikes}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
