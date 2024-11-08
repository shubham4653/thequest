const express = require('express');
const cors = require('cors');
const app = express();
const questionsRoute = require('./routes/questions');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionsRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Interview Preparation Assistant API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
