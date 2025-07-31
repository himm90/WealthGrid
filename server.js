const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [];

// Sign up
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const exists = users.find(user => user.username === username);
  if (exists) {
    return res.status(400).json({ message: 'Username already taken' });
  }
  users.push({ username, email, password });
  res.json({ message: 'Signup successful' });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  res.json({ message: 'Login successful', user: { username, email: user.email } });
});

// Dashboard placeholder
app.get('/api/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
