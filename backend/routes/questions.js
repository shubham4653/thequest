const express = require('express');
const router = express.Router();

// Sample questions - Replace or add more for different roles
const questions = [
  { id: 1, role: 'Software Engineer', question: 'What is a closure in JavaScript?' },
  { id: 2, role: 'Data Analyst', question: 'How do you handle missing data?' },
];

// GET endpoint to fetch questions by role
router.get('/', (req, res) => {
  const role = req.query.role;
  const filteredQuestions = role
    ? questions.filter(q => q.role.toLowerCase() === role.toLowerCase())
    : questions;
  res.json(filteredQuestions);
});

module.exports = router;
