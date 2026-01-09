const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create a new post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts by room
router.get("/", async (req, res) => {
  try {
    const room = req.query.room;
    const filter = room ? { room } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// React to a post (1 emoji per user)
router.post("/:id/react", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, username } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.reactions = post.reactions || { heart: 0, smile: 0, sad: 0, fire: 0 };
    post.reactedUsers = post.reactedUsers || {};

    const prevReaction = post.reactedUsers[username];

    if (prevReaction) {
      // Decrement previous reaction
      post.reactions[prevReaction] = Math.max(0, (post.reactions[prevReaction] || 1) - 1);
    }

    if (prevReaction !== type) {
      // Increment new reaction
      post.reactions[type] = (post.reactions[type] || 0) + 1;
      post.reactedUsers[username] = type;
    } else {
      // Remove reaction if clicked same emoji
      delete post.reactedUsers[username];
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment
router.post("/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ text, author });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like or dislike a comment (only one per user)
router.post("/:postId/comment/:commentId/like", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { action, username } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.likedBy = comment.likedBy || [];
    comment.dislikedBy = comment.dislikedBy || [];

    // Remove user from both first
    comment.likedBy = comment.likedBy.filter((u) => u !== username);
    comment.dislikedBy = comment.dislikedBy.filter((u) => u !== username);

    // Add user to selected action
    if (action === "like") comment.likedBy.push(username);
    else if (action === "dislike") comment.dislikedBy.push(username);

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
