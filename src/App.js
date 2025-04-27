import React, { useState, useEffect } from "react";
import "./styles.css";
import quizData from "./data/quiz-data.json";

export default function QuizApp() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    console.log("Fetched categories:", quizData);
    if (quizData && typeof quizData === "object") {
      setCategories(Object.keys(quizData));
    } else {
      console.error("Invalid data format", quizData);
    }
  }, []);

  const transformData = (data) => {
    return data.map((item) => ({
      question: item["Question"],
      choices: {
        A: item["Choice 1"],
        B: item["Choice 2"],
        C: item["Choice 3"],
        D: item["Choice 4"],
      },
      correctAnswer: item["Right Answer"],
      explanation: item["Explanation"] || "No explanation provided.",
    }));
  };

  const startQuiz = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
    console.log("Fetched data for category:", quizData[category]);
    
    if (quizData && quizData[category] && Array.isArray(quizData[category]) && quizData[category].length > 0) {
      const transformedQuestions = transformData(quizData[category]);
      setQuestions(transformedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      console.error("Category not found or has no questions:", quizData[category]);
      setQuestions([]);
    }
  };

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
    <div className="app-container">
      {!selectedCategory ? (
        <div className="category-container">
          <h1>Select a Quiz Category</h1>
          <div className="category-list">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category} className="category-card" onClick={() => startQuiz(category)}>
                  {category}
                </div>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h2>{selectedCategory} Quiz</h2>
          {questions.length > 0 ? (
            <div className="question-section">
              <h3>{questions[currentQuestionIndex]?.question || "Question not available"}</h3>
              <div className="choices-container">
                {questions[currentQuestionIndex]?.choices && Object.entries(questions[currentQuestionIndex]?.choices).map(
                  ([key, choice]) => (
                    <button
                      key={key}
                      className={`choice-button ${selectedAnswer === key ? "selected" : ""}`}
                      onClick={() => handleAnswerSelect(key)}
                    >
                      {choice}
                    </button>
                  )
                )}
              </div>
              {showExplanation && (
                <p className="explanation">
                  {selectedAnswer === questions[currentQuestionIndex]?.correctAnswer
                    ? "✅ Correct! "
                    : "❌ Incorrect. "}
                  {questions[currentQuestionIndex]?.explanation}
                </p>
              )}
              <div className="navigation-buttons">
                <button className="next-button" onClick={nextQuestion}>Next</button>
              </div>
            </div>
          ) : (
            <p>No questions available for this category. Please check your data.</p>
          )}
        </div>
      )}
    </div>
  );
}

