// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Connect MongoDB ----------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ---------- Schemas ----------

// User schema (login/signup)
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);

// Resume schema
const resumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    phone: String,
    education: String,
    skills: [String],
    experience: String,
    createdAt: { type: Date, default: Date.now }
});
const Resume = mongoose.model("Resume", resumeSchema);

// Story schema
const storySchema = new mongoose.Schema({
    topic: String,
    type: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});
const Story = mongoose.model("Story", storySchema);

// Portfolio schema
const portfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    role: String,
    skills: [String],
    projects: String,
    createdAt: { type: Date, default: Date.now }
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Job schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    type: String,
    applyLink: String,
    createdAt: { type: Date, default: Date.now }
});
const Job = mongoose.model("Job", jobSchema);

// Interview Questions schema
const questionSchema = new mongoose.Schema({
    role: String,
    question: String,
    answer: String
});
const Question = mongoose.model("Question", questionSchema);

// AI Tools schema
const aiToolSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String
});
const AITool = mongoose.model("AITool", aiToolSchema);

// ATS schema
const atsSchema = new mongoose.Schema({
    resumeText: String,
    jobDescription: String,
    score: Number,
    feedback: String
});
const ATS = mongoose.model("ATS", atsSchema);

// ---------- Routes ----------

// Health check
app.get("/", (req, res) => res.send("Backend running!"));

// ---------- User Signup ----------
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.json({ success: false, message: "All fields required" });
    try {
        const existing = await User.findOne({ email });
        if(existing) return res.json({ success: false, message: "Email already exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        res.json({ success: true, message: "Signup successful", user });
    } catch(err) { res.json({ success: false, message: err.message }); }
});

// ---------- User Login ----------
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.json({ success: false, message: "All fields required" });
    try {
        const user = await User.findOne({ email });
        if(!user) return res.json({ success: false, message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({ success: false, message: "Wrong password" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, message: "Login successful", user, token });
    } catch(err) { res.json({ success: false, message: err.message }); }
});

// ---------- Generate Story ----------
app.post("/api/story", async (req, res) => {
    const { topic, type } = req.body;
    if(!topic || !type) return res.status(400).json({ error: "Missing topic or type" });
    const content = `Generated ${type} story about ${topic}`;
    const story = await Story.create({ topic, type, content });
    res.json({ story: story.content });
});

// ---------- Create Resume ----------
app.post("/api/resume", async (req, res) => {
    const { name, email, phone, education, skills, experience } = req.body;
    const resume = await Resume.create({ name, email, phone, education, skills, experience });
    res.json({ resume });
});

// ---------- Create Portfolio ----------
app.post("/api/portfolio", async (req, res) => {
    const { name, role, skills, projects } = req.body;
    const portfolio = await Portfolio.create({ name, role, skills, projects });
    res.json({ portfolio });
});

// ---------- Add Job ----------
app.post("/api/job", async (req, res) => {
    const { title, company, location, type, applyLink } = req.body;
    const job = await Job.create({ title, company, location, type, applyLink });
    res.json({ job });
});

// ---------- Get Jobs ----------
app.get("/api/jobs", async (req, res) => {
    const jobs = await Job.find();
    res.json({ jobs });
});

// ---------- Add Interview Question ----------
app.post("/api/question", async (req, res) => {
    const { role, question, answer } = req.body;
    const q = await Question.create({ role, question, answer });
    res.json({ question: q });
});

// ---------- Get Interview Questions ----------
app.get("/api/questions/:role", async (req, res) => {
    const role = req.params.role;
    const questions = await Question.find({ role });
    res.json({ questions });
});

// ---------- Add AI Tool ----------
app.post("/api/aitool", async (req, res) => {
    const { name, description, url } = req.body;
    const tool = await AITool.create({ name, description, url });
    res.json({ tool });
});

// ---------- Get AI Tools ----------
app.get("/api/aitools", async (req, res) => {
    const tools = await AITool.find();
    res.json(tools);
});

// ---------- ATS Check ----------
app.post("/api/ats", async (req, res) => {
    const { resumeText, jobDescription } = req.body;
    // Simple logic: percentage match by keyword overlap
    const resumeWords = resumeText.toLowerCase().split(/\s+/);
    const jobWords = jobDescription.toLowerCase().split(/\s+/);
    const match = resumeWords.filter(w => jobWords.includes(w));
    const score = Math.round((match.length / jobWords.length) * 100);
    const feedback = `Matched ${match.length} keywords out of ${jobWords.length}`;
    const ats = await ATS.create({ resumeText, jobDescription, score, feedback });
    res.json({ score, feedback });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));