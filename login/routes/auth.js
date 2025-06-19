const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

function isValidEmail(email) {
  const validFormat = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return validFormat.test(email);
}


// Register

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  if (!isValidEmail(email))
    return res.status(400).json({ message: 'Invalid or disallowed email domain' });

  const existingUser = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });

  if (existingUser)
    return res.status(400).json({ message: 'Username already exists' });

  if (existingEmail)
    return res.status(400).json({ message: 'Email already registered' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
