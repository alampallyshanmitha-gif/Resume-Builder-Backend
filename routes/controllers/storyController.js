exports.generateStory = (req, res) => {
    try {
        const { topic, type } = req.body;

        if (!topic) {
            return res.json({ error: "Topic is required" });
        }

        let story = "";

        if (type === "motivational") {
            story = `
🎬 TITLE: Rise Beyond ${topic}

In a small town, there lived a young dreamer whose life revolved around ${topic}. 
Every day brought new struggles, failures, and doubts. People around laughed, 
saying success was impossible.

But deep inside, a fire burned.

Years passed. Failures turned into lessons. Pain turned into strength. 
There were nights filled with tears, and mornings filled with hope.

One day, everything changed.

The same people who doubted began to admire. The same journey that broke them 
became the story that inspired thousands.

In the end, success wasn’t just about winning — it was about never giving up.

🔥 Moral: Your biggest struggle can become your greatest story.
`;
        } 
        else if (type === "funny") {
            story = `
🎬 TITLE: The Crazy Tale of ${topic}

It all started on a completely normal day… until ${topic} turned everything upside down!

One small mistake led to another, and before anyone realized, chaos took over. 
People were laughing, running, and trying to fix things — but only making it worse!

At one point, even the main character had no idea what was going on anymore.

In the end, nothing was fixed… but everyone had the best day of their lives 😂

🔥 Moral: Sometimes, the best moments come from pure chaos.
`;
        } 
        else if (type === "horror") {
            story = `
🎬 TITLE: The Curse of ${topic}

It was a silent night. Too silent.

Something about ${topic} felt… wrong.

Whispers echoed in the darkness. Shadows moved when no one was there. 
Every step felt heavier, every breath colder.

Then came the moment no one could explain.

A door creaked open slowly… but no one touched it.

The truth was terrifying — ${topic} was never just an idea. It was something alive.

And once it finds you… it never lets go.

👁️ Moral: Some things are better left unknown.
`;
        }

        res.json({ story });

    } catch (error) {
        console.error("Story Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};