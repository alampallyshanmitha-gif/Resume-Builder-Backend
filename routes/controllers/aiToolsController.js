// controllers/aiToolsController.js
const aiTools = [
  {
    name: "ChatGPT",
    description: "AI chatbot for coding, writing, and learning",
    url: "https://chat.openai.com"
  },
  {
    name: "Google Gemini",
    description: "Google AI for research and content generation",
    url: "https://gemini.google.com"
  },
  {
    name: "Claude AI",
    description: "Advanced AI assistant for reasoning tasks",
    url: "https://claude.ai"
  },
  {
    name: "Perplexity AI",
    description: "AI search engine with real-time answers",
    url: "https://www.perplexity.ai"
  },
  {
    name: "Canva AI",
    description: "Create designs, resumes, and graphics",
    url: "https://www.canva.com"
  },
  {
    name: "Notion AI",
    description: "AI for notes, productivity, and writing",
    url: "https://www.notion.so"
  },
  {
    name: "Grammarly",
    description: "Improve grammar and writing instantly",
    url: "https://www.grammarly.com"
  },
  {
    name: "Remove.bg",
    description: "Remove background from images using AI",
    url: "https://www.remove.bg"
  },
  {
    name: "Runway ML",
    description: "AI video editing and generation tool",
    url: "https://runwayml.com"
  },
  {
    name: "ElevenLabs",
    description: "AI voice generation and text-to-speech",
    url: "https://www.elevenlabs.io"
  }
];

exports.getAITools = (req, res) => {
  res.json(aiTools);
};