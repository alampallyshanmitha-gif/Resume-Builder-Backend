exports.checkATS = (req, res) => {
    const { resume, job } = req.body;

    if (!resume || !job) {
        return res.json({ error: "Both fields required" });
    }

    const jobWords = job.toLowerCase().split(/\s+/);
    let match = 0;

    jobWords.forEach(word => {
        if (resume.toLowerCase().includes(word)) match++;
    });

    const score = Math.floor((match / jobWords.length) * 100);

    res.json({
        score,
        feedback: score > 70 ? "Good match 👍" : "Improve keywords ⚠️"
    });
};