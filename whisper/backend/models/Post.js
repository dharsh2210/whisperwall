const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  likedBy: { type: [String], default: [] },
  dislikedBy: { type: [String], default: [] },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  room: { type: String, required: true },

  // Emoji reactions counts
  reactions: {
    heart: { type: Number, default: 0 },
    smile: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
  },

  // Tracks user reactions: plain object
  reactedUsers: { type: Object, default: {} },

  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
