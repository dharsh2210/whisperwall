const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "whisperwall_secret";

// Signup
router.post("/signup", async (req, res) => {
  const { nickname, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ nickname, password: hashed });
    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ error: "Nickname already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  try {
    const user = await User.findOne({ nickname });
    if (!user) return res.status(400).json({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });
    const token = jwt.sign({ nickname }, SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
