function IdeaInput({
  idea,
  setIdea,
  loading,
  handleBrainstorm,
}) {
  return (
    <>
      <textarea
        rows="6"
        style={{
          width: "100%",
          padding: "10px",
        }}
        placeholder="Describe your hackathon idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleBrainstorm}>
        {loading ? "Thinking..." : "Start Brainstorm"}
      </button>
    </>
  );
}

export default IdeaInput;