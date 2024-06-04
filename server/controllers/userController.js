const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.cookie('userId', newUser._id.toString(), { httpOnly: true });
    res.cookie('isLoggedIn', 'true', { httpOnly: true });

    res.status(200).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.cookie('userId', user._id.toString(), { httpOnly: true });
    res.cookie('isLoggedIn', 'true', { httpOnly: true });

    res.status(200).json({ message: 'User logged in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user data' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById, // Renamed from getUserByUsername
};



