import React, { useState } from "react";

export default function QuizPage({ category, questions, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div>
      <h2>{category} Quiz</h2>
      <h3>{currentQuestion.question}</h3>
      {Object.entries(currentQuestion.choices).map(([key, choice]) => (
        <button key={key} onClick={() => handleAnswerSelect(key)}>
          {choice}
        </button>
      ))}
      {showExplanation && (
        <p>
          {selectedAnswer === currentQuestion.correctAnswer ? "Correct! " : "Incorrect. "}
          {currentQuestion.explanation}
        </p>
      )}
      <button onClick={nextQuestion}>Next</button>
      <button onClick={onBack}>Back to Categories</button>
    </div>
  );
}
