const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ROOT
========================= */
app.get("/", (req, res) => {
    res.send("CareerForge AI Backend Running 🚀");
});

/* =========================
   1️⃣ AUTH (LOGIN / SIGNUP)
========================= */
let users = [];

app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;

    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.json({ success: false, message: "User already exists ❌" });
    }

    users.push({ name, email, password });

    res.json({ success: true, message: "Signup successful 🎉" });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.json({ success: false, message: "Invalid credentials ❌" });
    }

    res.json({
        success: true,
        message: "Login successful ✅",
        user: { name: user.name, email: user.email }
    });
});

/* =========================
   2️⃣ RESUME
========================= */
app.post("/api/resume", (req, res) => {
    const { name, skills } = req.body;

    const resume = `
Name: ${name}
Skills: ${skills}

Summary:
A motivated individual skilled in ${skills}.
    `;

    res.json({ resume });
});

/* =========================
   3️⃣ ATS
========================= */
app.post("/api/ats", (req, res) => {
    const score = Math.floor(Math.random() * 40) + 60;

    res.json({
        score,
        feedback: "Improve keywords and formatting."
    });
});

/* =========================
   4️⃣ PORTFOLIO
========================= */
app.post("/api/portfolio", (req, res) => {
    const { name, skills } = req.body;

    const portfolio = `
Welcome to ${name}'s Portfolio

Skills:
${skills}

Projects:
- Project 1
- Project 2
    `;

    res.json({ portfolio });
});

/* =========================
   5️⃣ INTERVIEW (ROLE BASED)
========================= */
app.get("/api/interview", (req, res) => {
    const role = req.query.role;

    const data = {
        frontend: Array.from({ length: 20 }, (_, i) => ({
            question: `Frontend Question ${i + 1}`,
            answer: "Sample frontend answer"
        })),
        commerce: Array.from({ length: 20 }, (_, i) => ({
            question: `Commerce Question ${i + 1}`,
            answer: "Sample commerce answer"
        })),
        ai: Array.from({ length: 20 }, (_, i) => ({
            question: `AI Question ${i + 1}`,
            answer: "Sample AI answer"
        }))
    };

    res.json({ questions: data[role] || [] });
});

/* =========================
   6️⃣ JOBS
========================= */
app.get("/api/jobs", (req, res) => {
    res.json({
        jobs: [
            {
                title: "Frontend Intern",
                company: "TechCorp",
                location: "Remote",
                type: "Internship",
                applyLink: "https://internshala.com"
            },
            {
                title: "Data Analyst",
                company: "DataMind",
                location: "Mumbai",
                type: "Job",
                applyLink: "https://linkedin.com/jobs"
            }
        ]
    });
});

/* =========================
   7️⃣ AI TOOLS
========================= */
app.get("/api/ai-tools", (req, res) => {
    res.json({
        tools: [
            "Resume AI",
            "ATS AI",
            "Interview AI",
            "Story AI"
        ]
    });
});

/* =========================
   8️⃣ STORY GENERATOR
========================= */
app.post("/api/stories", (req, res) => {
    const { topic, type } = req.body;

    const story = `Once upon a time, a ${type} story about ${topic} began...`;

    res.json({ story });
});

/* =========================
   SERVER
========================= */
app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});