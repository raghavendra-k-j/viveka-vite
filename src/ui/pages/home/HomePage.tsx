import React, { useState } from "react";

type Question = {
  id: number;
  type: "objective" | "subjective";
  questionText: string;
  options?: string[];
};

const questions: Question[] = Array.from({ length: 10 }, (_, i) => {
  return {
    id: i + 1,
    type: i % 2 === 0 ? "objective" : "subjective",
    questionText: `Question ${i + 1}: What is the answer to question ${i + 1}?`,
    options: i % 2 === 0 ? ["Option A", "Option B", "Option C", "Option D"] : undefined,
  };
});

const HomePage: React.FC = () => {
  const [singleQuestionMode, setSingleQuestionMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const renderQuestion = (q: Question) => {
    return (
      <div
        key={q.id}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
          minHeight: "200px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>{q.questionText}</h3>
        {q.type === "objective" ? (
          <ul>
            {q.options!.map((opt, idx) => (
              <li key={idx}>
                <label>
                  <input type="radio" name={`question-${q.id}`} /> {opt}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <textarea
            placeholder="Write your answer here..."
            style={{ width: "100%", height: "100px" }}
          />
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Quiz Application</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          <input
            type="checkbox"
            checked={singleQuestionMode}
            onChange={() => {
              setSingleQuestionMode(!singleQuestionMode);
              setCurrentIndex(0); // reset on toggle
            }}
          />{" "}
          Single Question Mode
        </label>
      </div>

      {singleQuestionMode ? (
        <div>
          {renderQuestion(questions[currentIndex])}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              Previous
            </button>
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {questions.map((q) => renderQuestion(q))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
