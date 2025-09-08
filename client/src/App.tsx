import { useState } from "react";
import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    const res = await fetch("http://localhost:3001/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText }),
    });
    const data = await res.json();
    setSuggestions(data.suggestions);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>📄 Resume Genius</h1>
      <textarea
        rows={10}
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={e => setResumeText(e.target.value)}
      />
      <button onClick={analyzeResume} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {suggestions && (
        <div className="output">
          <h2>🧠 Suggestions</h2>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
}

export default App;
