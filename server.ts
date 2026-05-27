import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API client successfully initialized on backend server.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined or is placeholder. Falling back to local heuristics for AI Assistant.");
}

// Ensure the server can provide health checks
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API endpoint: Smart Daily Planning
app.post("/api/gemini/plan", async (req, res) => {
  const { currentTasks, habits, routines, goals, userProfile } = req.body;

  if (!ai) {
    // Elegant local fallback heuristic
    const simulatedResponse = {
      prioritizedTasks: (currentTasks || []).map((t: any, i: number) => ({
        id: t.id,
        reason: i === 0 ? "Highest impact goal of the day." : "Secures your core work momentum.",
        suggestedPriority: i === 0 ? "high" : "medium"
      })),
      suggestedRoutines: [
        {
          name: "Deep Code Routine",
          time: "09:00 AM",
          steps: ["Review Inbox (10m)", "Deep Work block (90m)", "Refactor & Commit (20m)"],
          reason: "Aligns with your engineering workflow guidelines."
        },
        {
          name: "Evening Rebalance",
          time: "06:00 PM",
          steps: ["Journal reflection (10m)", "Clean project workspace (10m)", "Tomorrow planning (10m)"],
          reason: "To reset your cognitive load."
        }
      ],
      timeBlocks: [
        { block: "08:00 AM - 10:00 AM", focus: "Morning Routine & High Priority Execution" },
        { block: "01:00 PM - 03:00 PM", focus: "Medium-priority follow-ups & Collaborative notes" },
        { block: "08:00 PM - 10:00 PM", focus: "Deep focus writing, scripting, and creator work" }
      ],
      coachingQuote: "Small adjustments made sequentially form legendary routines. Optimize step-by-step."
    };
    return res.json({ success: true, isDemo: true, data: simulatedResponse });
  }

  try {
    const prompt = `
You are the RoutineOS AI Productivity Coach.
Analyze this user profile and workspace state to generate a hyper-customized Daily Plan.

Workspace State:
- Tasks: ${JSON.stringify(currentTasks || [])}
- Habits tracked: ${JSON.stringify(habits || [])}
- Current Routines: ${JSON.stringify(routines || [])}
- Goals: ${JSON.stringify(goals || "")}
- User Profile info: ${JSON.stringify(userProfile || {})}

Return a structured plan matching this exact schema:
{
  "prioritizedTasks": [{"id": "string", "reason": "string", "suggestedPriority": "high|medium|low"}],
  "suggestedRoutines": [{"name": "string", "time": "string", "steps": ["string"], "reason": "string"}],
  "timeBlocks": [{"block": "string", "focus": "string"}],
  "coachingQuote": "string"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["prioritizedTasks", "suggestedRoutines", "timeBlocks", "coachingQuote"],
          properties: {
            prioritizedTasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["id", "reason", "suggestedPriority"],
                properties: {
                  id: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  suggestedPriority: { type: Type.STRING }
                }
              }
            },
            suggestedRoutines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "time", "steps", "reason"],
                properties: {
                  name: { type: Type.STRING },
                  time: { type: Type.STRING },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  reason: { type: Type.STRING }
                }
              }
            },
            timeBlocks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["block", "focus"],
                properties: {
                  block: { type: Type.STRING },
                  focus: { type: Type.STRING }
                }
              }
            },
            coachingQuote: { type: Type.STRING }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, isDemo: false, data });
  } catch (error: any) {
    console.error("Gemini Plan Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// API Endpoint: Coach Dialogue Prompt
app.post("/api/gemini/coach", async (req, res) => {
  const { currentScore, messageHistory, metrics } = req.body;

  if (!ai) {
    const backupResponses = [
      "Consistent progress beats an occasional sprint. Let's tackle your top priority routine right now.",
      "I notice you thrive when executing tasks early in the day. Let's secure a morning routine block.",
      "Your concentration score is exceptional today! Use standard break triggers to sustain it.",
      "Unlocking XP is simple: complete any small micro-task to break the friction barrier."
    ];
    const item = backupResponses[Math.floor(Math.random() * backupResponses.length)];
    return res.json({ success: true, isDemo: true, text: item });
  }

  try {
    const prompt = `
You are the RoutineOS AI Productivity Companion, a supportive, elite executive coach inspired by Linear, Raycast, and Notion philosophies. Speak directly, dynamically, and with an elegant tone. Maintain high brevity (max 3 sentences).

Context:
- User Productivity Score / Level XP: ${JSON.stringify(currentScore || {})}
- Metrics: ${JSON.stringify(metrics || {})}
- Conversation History: ${JSON.stringify(messageHistory || [])}

Provide your response in raw text that is engaging, empowering, and gives specific actionable next steps.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ success: true, isDemo: false, text: response.text || "Let's focus on building remarkable routines today!" });
  } catch (error: any) {
    console.error("Gemini Coach Error:", error);
    res.status(500).json({ error: error.message || "Failed to contact Gemini coach." });
  }
});

// Setup Vite Dev server or Serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware attached in server.ts");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static files from dist directory");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RoutineOS fullstack server successfully active on http://localhost:${PORT}`);
  });
}

startServer();
