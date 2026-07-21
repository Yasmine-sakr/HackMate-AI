import { useState } from "react";
import { askGemini } from "../services/gemini";
import IdeaInput from "../components/IdeaInput";
function Landing() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBrainstorm() {
    if (!idea.trim()) return;

    setLoading(true);

    const result = await askGemini(
      `The user has this hackathon idea: "${idea}".
      
Act as an expert hackathon mentor.

Do NOT solve the idea immediately.

Instead:
1. Ask 5 smart questions to better understand the idea.
2. Mention one possible challenge.
3. Encourage the user to continue brainstorming.

Keep the tone friendly.`
    );

    setResponse(result);
    setLoading(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>HackMate AI </h1>

      <p>Your AI Co-Founder for Hackathons</p>

      <br />

      
<IdeaInput
  idea={idea}
  setIdea={setIdea}
  loading={loading}
  handleBrainstorm={handleBrainstorm}
/>
      <br />
      <br />

      <pre
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {response}
      </pre>
    </div>
  );
}

export default Landing;