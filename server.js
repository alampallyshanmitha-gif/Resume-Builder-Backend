// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ✅ CORS (VERY IMPORTANT for Vercel)
app.use(cors({
  origin: "*",   // allow all (safe for now)
  methods: ["GET","POST","PUT","DELETE"],
}));
app.use(express.json());

// ---------- MongoDB ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
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
  experience: String,
  createdAt: { type: Date, default: Date.now }
}));

const Portfolio = mongoose.model("Portfolio", new mongoose.Schema({
  name: String,
  role: String,
  skills: [String],
  projects: String,
  createdAt: { type: Date, default: Date.now }
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
  description: String,
  url: String
}));

const Story = mongoose.model("Story", new mongoose.Schema({
  topic: String,
  type: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
}));

// ---------- ROUTES ----------

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("CareerForge AI Backend Running 🚀");
});

// ✅ HEALTH CHECK
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is alive ✅" });
});

// ---------- 1️⃣ AUTH ----------
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      return res.json({ success:false, message:"All fields required" });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.json({ success: false, message:"User exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.json({ success: true, user });
  } catch(err){
    res.json({ success:false, message:err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message:"User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message:"Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");

    res.json({ success: true, user, token });
  } catch(err){
    res.json({ success:false, message:err.message });
  }
});

// ---------- 2️⃣ RESUME ----------
app.post("/api/resume", async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.json({ resume });
  } catch(err){
    res.json({ error: err.message });
  }
});

// ---------- 3️⃣ ATS ----------
app.post("/api/ats", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if(!resumeText || !jobDescription){
    return res.json({ error:"Missing data" });
  }

  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jobWords = jobDescription.toLowerCase().split(/\s+/);

  const match = resumeWords.filter(w => jobWords.includes(w));
  const score = Math.round((match.length / jobWords.length) * 100);

  res.json({
    score,
    feedback: `Matched ${match.length} keywords`
  });
});

// ---------- 4️⃣ PORTFOLIO ----------
app.post("/api/portfolio", async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.json({ portfolio });
  } catch(err){
    res.json({ error: err.message });
  }
});

// ---------- 5️⃣ INTERVIEW (FIXED 🔥) ----------
app.get("/api/interview/:role", async (req, res) => {
  const role = req.params.role;

  const data = {
    frontend: [
      { question:"What is HTML?", answer:"Markup language" },
      { question:"What is CSS?", answer:"Styling" }
    ],
    backend: [
      { question:"What is Node.js?", answer:"Runtime" },
      { question:"What is API?", answer:"Communication" }
    ],
    ai: [
      { question:"What is AI?", answer:"Artificial Intelligence" }
    ],
    commerce: [
      { question:"What is accounting?", answer:"Recording transactions" }
    ],
    fullstack: [
      { question:"Frontend + Backend?", answer:"Fullstack dev" }
    ]
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
  res.json(tools);
});

// ---------- 8️⃣ STORY ----------
app.post("/api/story", async (req, res) => {
  const { topic, type } = req.body;

  const content = `Once upon a time, a ${type} story about ${topic} began...`;

  await Story.create({ topic, type, content });

  res.json({ story: content });
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));