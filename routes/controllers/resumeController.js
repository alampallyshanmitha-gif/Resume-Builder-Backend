// backend/controllers/resumeController.js

exports.generateResume = (req, res) => {
    const { name, email, phone, education, skills, experience } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required" });
    }

    // Create the resume object
    const resume = {
        name,
        email,
        phone: phone || "",
        education: education || "Not Provided",
        skills: skills || [],
        experience: experience || "Not Provided",
        generatedAt: new Date().toLocaleString()
    };

    res.json({ success: true, resume });
};