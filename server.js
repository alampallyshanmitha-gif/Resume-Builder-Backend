// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ✅ FIXED CORS (important)
app.use(cors());
app.use(express.json());

// ---------- Connect MongoDB ----------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ---------- Schemas ----------
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);

const resumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    education: String,
    skills: [String],
    experience: String,
    createdAt: { type: Date, default: Date.now }
});
const Resume = mongoose.model("Resume", resumeSchema);

// ---------- Routes ----------

// ✅ ROOT
app.get("/", (req, res) => {
    res.send("CareerForge AI Backend Running 🚀");
});

// ✅ IMPORTANT: GET route for frontend connection
app.get("/api/resume", (req, res) => {
    res.json({ message: "Backend connected successfully ✅" });
});

// ---------- AUTH ----------
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User exists ❌" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        res.json({ success: true, user });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ success: false });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, user, token });
    } catch (err) {
        res.json({ success: false });
    }
});

// ---------- RESUME ----------
app.post("/api/resume", async (req, res) => {
    try {
        const resume = await Resume.create(req.body);
        res.json({ resume });
    } catch (err) {
        res.json({ error: err.message });
    }
});

// ---------- TEST ROUTES ----------
app.get("/api/ping", (req, res) => {
    res.json({ message: "Backend is alive!" });
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});