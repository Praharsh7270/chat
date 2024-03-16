import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);
    const response = await axios({
      // eslint-disable-next-line no-undef
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={Your api key}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });
    const generatedText = response.data.candidates[0].content.parts[0].text;
    const words = generatedText.split(" ");
    const limitedText = words.slice(0, 30).join(" ");
    setAnswer(limitedText);
    setLoading(false);
    setQuestion(""); // Reset input text
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      generateAnswer();
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-3xl font-bold text-white mb-8">
        Chat bot Using Gemini
      </h1>
      <div className="chat-container w-full sm:w-96 h-96 overflow-y-auto bg-white rounded-lg p-4 mb-4">
        <div className="chat-bubble flex flex-col mb-2">
          <p className="text-gray-800 mb-1">{question}</p>
          {loading && <p className="text-blue-500">Generating...</p>}
        </div>
        {answer && (
          <div className="chat-bubble flex flex-col mb-2">
            <p className="text-gray-800 mb-1">{answer}</p>
          </div>
        )}
      </div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full sm:w-96 h-16 rounded-lg p-4 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 mb-4"
        placeholder="Ask your question..."
      ></textarea>
      <button
        onClick={generateAnswer}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Answer"}
      </button>
    </div>
  );
}

export default App;
