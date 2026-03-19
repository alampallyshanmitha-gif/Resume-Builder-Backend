exports.generatePortfolio = (req, res) => {
    try {
        const { name, role, skills, projects } = req.body;

        // ✅ validation
        if (!name || !role) {
            return res.json({ error: "Name and role are required" });
        }

        // ✅ clean skills (important for your frontend)
        let cleanSkills = [];
        if (Array.isArray(skills)) {
            cleanSkills = skills.map(s => s.trim()).filter(s => s);
        }

        // ✅ response EXACTLY as frontend expects
        res.json({
            portfolio: {
                name,
                role,
                skills: cleanSkills,
                projects: projects || "No projects added"
            }
        });

    } catch (error) {
        console.error("Portfolio Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};