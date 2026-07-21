import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const model = "gemini-flash-latest";

const systemPrompt = `
You are HackMate AI.

You help users build hackathon projects.

If the user is chatting normally, answer naturally.

If the user asks for:

- MVP
- Startup Idea
- Project Idea
- Hackathon Idea
- Tech Stack
- Business Model
- Team Roles
- Pitch Deck
- Roadmap

Return ONLY valid JSON using exactly this schema:

{
  "ideaSummary":"string",
  "mvp":["string"],
  "techStack":["string"],
  "teamRoles":["string"],
  "plan48Hours":["string"],
  "monetization":["string"],
  "winningTips":["string"]
}

Do NOT wrap JSON inside markdown.

Always answer in the user's language.
`;

const canvasKeys = [
  "ideaSummary",
  "mvp",
  "techStack",
  "teamRoles",
  "plan48Hours",
  "monetization",
  "winningTips",
];

function latestUserMessage(history) {
  return (
    [...history]
      .reverse()
      .find((m) => m.role === "user")?.content ||
    "Hackathon Project"
  );
}

function fallbackCanvas(idea) {
  return {
    ideaSummary: `A focused hackathon solution for ${idea}`,
    mvp: [
      "Build one complete workflow",
      "Integrate Gemini AI",
      "Create a polished demo",
    ],
    techStack: [
      "React",
      "Vite",
      "Gemini API",
    ],
    teamRoles: [
      "Frontend",
      "Backend / AI",
      "Presentation",
    ],
    plan48Hours: [
      "Define the problem",
      "Build MVP",
      "Polish & Pitch",
    ],
    monetization: [
      "Freemium",
      "Subscription",
      "Enterprise",
    ],
    winningTips: [
      "Keep MVP simple",
      "Tell a strong story",
      "Show impact",
    ],
  };
}

function normalizeCanvas(data, idea) {
  const fallback = fallbackCanvas(idea);

  const result = {};

  canvasKeys.forEach((key) => {
    if (key === "ideaSummary") {
      result[key] =
        typeof data[key] === "string"
          ? data[key]
          : fallback[key];
    } else {
      result[key] =
        Array.isArray(data[key]) && data[key].length
          ? data[key]
          : fallback[key];
    }
  });

  return result;
}

function parseCanvas(text, idea) {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    if (
      canvasKeys.every((key) => key in parsed)
    ) {
      return normalizeCanvas(parsed, idea);
    }

    return null;
  } catch {
    return null;
  }
}

export async function askGemini(conversationHistory) {
  if (!ai) {
    throw new Error("Missing Gemini API Key");
  }

  const idea = latestUserMessage(conversationHistory);

  const conversation = conversationHistory
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n\n");

  try {
    let response;

for (let i = 0; i < 3; i++) {
  try {
    response = await ai.models.generateContent({
      model,
      contents: conversation,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "text/plain",
      },
    });

    break;

  } catch (err) {

    if (err.status !== 503) throw err;

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
  }
}

    const text = response.text.trim();

    console.log("Gemini:", text);

    const canvas = parseCanvas(text, idea);

    if (canvas) {
      return {
        type: "canvas",
        canvas,
      };
    }

    return {
      type: "chat",
      content: text,
    };
  } catch (error) {
    console.error(error);

    return {
      type: "chat",
      content:
        "Sorry, something went wrong. Please try again.",
    };
  }
}