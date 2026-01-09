import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();

    const totalLikesResult = await Post.aggregate([
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]);
    const totalLikes = totalLikesResult[0]?.total || 0;

    const totalCommentsResult = await Post.aggregate([
      { $project: { commentCount: { $size: "$comments" } } },
      { $group: { _id: null, total: { $sum: "$commentCount" } } },
    ]);
    const totalComments = totalCommentsResult[0]?.total || 0;

    const postsByRoom = await Post.aggregate([
      { $group: { _id: "$room", count: { $sum: 1 }, likes: { $sum: "$likes" } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      totalPosts,
      totalLikes,
      totalComments,
      postsByRoom,
    });
  } catch (error) {
    console.error("Dashboard route error:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

export default router;
