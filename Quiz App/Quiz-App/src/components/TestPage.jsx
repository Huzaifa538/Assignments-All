import React, { useState, useEffect } from "react";

export default function TestPage({ onSubmit }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(randomIndex, 0, q.correct_answer); // insert correct ans randomly
          return {
            question: q.question,
            options,
            ans: q.correct_answer,
          };
        });
        setQuestions(formatted);
        setLoading(false);
      });
  }, []);

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleFinish = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.ans) score++;
    });
    onSubmit(score);
  };

  if (loading) return <p className="text-center">Loading Questions...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">MCQs Test</h2>
      {questions.map((q, i) => (
        <div key={i} className="mb-4 p-3 border rounded-lg">
          <p className="font-medium" dangerouslySetInnerHTML={{ __html: q.question }} />
          <div className="space-x-3 mt-2">
            {q.options.map((opt, j) => (
              <button
                key={j}
                onClick={() => handleSelect(i, opt)}
                className={`px-3 py-1 rounded-lg border ${
                  answers[i] === opt
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                dangerouslySetInnerHTML={{ __html: opt }}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleFinish}
        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
      >
        Submit Test
      </button>
    </div>
  );
}
