import React, { useState } from "react";


function MCQForm() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [round, setRound] = useState("");
  const [level, setLevel] = useState("");
  const [quizId, setQuizId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteQuestion = (questionId) => {
    // Make the API request to delete the question
    fetch(`http://localhost:8000/mcq/${questionId}/deleteMCQ`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete question");
        }
        // Remove the deleted question from the state or refetch the questions from the server
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the MCQ object to send to the API
    const newMCQ = {
      question,
      option1,
      option2,
      option3,
      option4,
      correct_ans: correctAnswer,
      round,
      level,
      quiz_id: quizId,
    };

    // Make the API request to create the MCQ
    fetch("http://localhost:8000/mcq/createMCQ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMCQ),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create MCQ");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("MCQ created successfully");
        // Reset the form
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCorrectAnswer("");
        setRound("");
        setLevel("");
        setQuizId("");
      })
      .catch((error) => {
        setErrorMessage("Failed to create MCQ");
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Create MCQ</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option 1:</label>
          <input
            type="text"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option 2:</label>
          <input
            type="text"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option 3:</label>
          <input
            type="text"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option 4:</label>
          <input
            type="text"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Round:</label>
          <input
            type="text"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Level:</label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quiz ID:</label>
          <input
            type="text"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create MCQ</button>
      </form>
    </div>
    
  );
}

export default MCQForm;
