// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ✅ CORS (important)
app.use(cors());
app.use(express.json());

// ---------- MongoDB ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ---------- SCHEMAS ----------
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}));

const Resume = mongoose.model("Resume", new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  skills: [String],
  experience: String
}));

const Portfolio = mongoose.model("Portfolio", new mongoose.Schema({
  name: String,
  role: String,
  skills: [String],
  projects: String
}));

const Job = mongoose.model("Job", new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  type: String,
  applyLink: String
}));

const Question = mongoose.model("Question", new mongoose.Schema({
  role: String,
  question: String,
  answer: String
}));

const AITool = mongoose.model("AITool", new mongoose.Schema({
  name: String,
  description: String
}));

const Story = mongoose.model("Story", new mongoose.Schema({
  topic: String,
  type: String,
  content: String
}));

// ---------- ROUTES ----------

// ROOT
app.get("/", (req, res) => {
  res.send("CareerForge AI Backend Running 🚀");
});

// ✅ TEST (important)
app.get("/api/resume", (req, res) => {
  res.json({ message: "Backend connected ✅" });
});

// ---------- 1️⃣ AUTH ----------
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.json({ success: false });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.json({ success: true, user });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ success: true, user, token });
});

// ---------- 2️⃣ RESUME ----------
app.post("/api/resume", async (req, res) => {
  const resume = await Resume.create(req.body);
  res.json({ resume });
});

// ---------- 3️⃣ ATS ----------
app.post("/api/ats", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jobWords = jobDescription.toLowerCase().split(/\s+/);

  const match = resumeWords.filter(w => jobWords.includes(w));
  const score = Math.round((match.length / jobWords.length) * 100);

  res.json({ score, feedback: "Improve keywords" });
});

// ---------- 4️⃣ PORTFOLIO ----------
app.post("/api/portfolio", async (req, res) => {
  const portfolio = await Portfolio.create(req.body);
  res.json({ portfolio });
});

// ---------- 5️⃣ INTERVIEW ----------
app.get("/api/interview", (req, res) => {
  const role = req.query.role;

  const data = {
    frontend: ["HTML?", "CSS?", "JS?"],
    backend: ["Node?", "API?", "DB?"],
    ai: ["ML?", "AI?", "DL?"]
  };

  res.json({ questions: data[role] || [] });
});

// ---------- 6️⃣ JOBS ----------
app.post("/api/job", async (req, res) => {
  const job = await Job.create(req.body);
  res.json({ job });
});

app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json({ jobs });
});

// ---------- 7️⃣ AI TOOLS ----------
app.post("/api/aitool", async (req, res) => {
  const tool = await AITool.create(req.body);
  res.json({ tool });
});

app.get("/api/aitools", async (req, res) => {
  const tools = await AITool.find();
  res.json({ tools });
});

// ---------- 8️⃣ STORY ----------
app.post("/api/story", async (req, res) => {
  const { topic, type } = req.body;

  const content = `Once upon a time... ${topic}`;
  const story = await Story.create({ topic, type, content });

  res.json({ story });
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));