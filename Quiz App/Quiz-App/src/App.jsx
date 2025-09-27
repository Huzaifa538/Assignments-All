import { useState, useEffect } from "react";
import "./index.css";
import QuestionCard from "./components/Questions";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showResultBtn, setShowResultBtn] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  // New state for ID input and record storage
  const [roll, setRoll] = useState("");
  const [records, setRecords] = useState({});

  const passGif =
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDF1YjFnMng4eTR3NzAwMXdoYXVtcjY5ZnY2a3cza2l2c2FpcW05NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WXB88TeARFVvi/giphy.gif";
  const failGif =
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cWtpdnkxbGlpY3htZnF0d29xbHdydGxtODJ6YThlYmZ1NXFmOXRnMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vOR92XsXPTOj6/giphy.gif";

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        const data = await res.json();
        const formatted = data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(randomIndex, 0, q.correct_answer);

          return {
            question: q.question,
            options: options,
            correct: options.indexOf(q.correct_answer),
            points: 5,
            userAnswer: null,
          };
        });
        setQuizData(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setLoading(false);
      }
    }

    fetchQuiz();
  }, []);

  function handleNext() {
    if (!showAnswer) {
      if (selected === null) return alert("Please select an option");

      const updatedQuiz = [...quizData];
      updatedQuiz[current].userAnswer = selected;
      setQuizData(updatedQuiz);

      if (selected === quizData[current].correct) {
        setScore(score + quizData[current].points);
      }

      setShowAnswer(true);
      if (current === quizData.length - 1) setShowResultBtn(true);
    } else {
      setShowAnswer(false);
      setSelected(null);
      if (current + 1 < quizData.length) {
        setCurrent(current + 1);
      }
    }
  }

  function checkResult() {
    setFinished(true);
  }

  function handleSaveResult() {
    if (!/^\d+$/.test(roll)) {
      alert("❌ Roll Number must contain **numbers only**.");
      return;
    }

    const newRecord = {
      name: `Student ${roll}`,
      roll: roll,
      cls: "10th",
      score: score,
    };

    setRecords((prev) => ({ ...prev, [roll]: newRecord }));
    alert("✅ Result saved successfully!");

    // Reset for new quiz
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setShowAnswer(false);
    setShowResultBtn(false);
    setRoll("");
    setQuizData((prev) =>
      prev.map((q) => ({
        ...q,
        userAnswer: null,
      }))
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">Loading Quiz...</h1>
      </div>
    );
  }

  const totalPoints = quizData.length * 5;
  const percentage = Math.round((score / totalPoints) * 100);
  const pass = percentage >= 40;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Quiz App</h1>

        <div className="flex gap-1 mb-4">
          {quizData.map((q, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full ${
                idx < current
                  ? "bg-green-500"
                  : idx === current
                  ? "bg-blue-500"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {!finished ? (
          <>
            <QuestionCard
              question={quizData[current].question}
              options={quizData[current].options}
              selected={selected}
              onSelect={setSelected}
              onNext={handleNext}
              current={current}
              total={quizData.length}
              quizData={quizData}
              showAnswer={showAnswer}
            />
            {showResultBtn && (
              <button
                onClick={checkResult}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition"
              >
                Check Result
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">
              Your Score: {score} / {totalPoints}
            </h2>
            <h3 className="text-lg mb-4">Percentage: {percentage}%</h3>
            <h3
              className={`text-xl font-semibold ${
                pass ? "text-green-400" : "text-red-400"
              }`}
            >
              {pass ? "You Passed 🎉" : "You Failed 😢"}
            </h3>
            <img
              src={pass ? passGif : failGif}
              alt={pass ? "Passed" : "Failed"}
              className="mx-auto my-4 w-48 h-48 rounded-lg shadow-lg"
            />

            {/* ✅ Roll Number Input */}
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter Roll Number (numbers only)"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full mb-3 p-2 rounded text-black"
            />

            <button
              onClick={handleSaveResult}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
            >
              Save Result & Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
