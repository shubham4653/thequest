import React, { useState, useEffect } from 'react';
import MockInterview from './components/MockInterview';
import './styles/App.css';

function App() {
  const [role, setRole] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (role) {
      fetch(`http://localhost:5000/api/questions?role=${role}`)
        .then(response => response.json())
        .then(data => setQuestions(data))
        .catch(error => console.error('Error fetching questions:', error));
    }
  }, [role]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="App">
      <h1>Interview Preparation Assistant</h1>
      <label>
        Select Role:
        <input type="text" value={role} onChange={handleRoleChange} placeholder="e.g., Software Engineer" />
      </label>
      <div>
        <h2>Questions for {role}</h2>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>{q.question}</li>
          ))}
        </ul>
      </div>
      <MockInterview questions={questions} />
    </div>
  );
}

export default App;
