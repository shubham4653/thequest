import React, { useState } from 'react';

function MockInterview({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="mock-interview">
      <h2>Mock Interview</h2>
      {questions.length > 0 ? (
        <div>
          <p>{questions[currentQuestion].question}</p>
          <button onClick={nextQuestion}>Next Question</button>
        </div>
      ) : (
        <p>Please select a role to get started.</p>
      )}
    </div>
  );
}

export default MockInterview;
