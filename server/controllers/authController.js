const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
  async login(req, res) {
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

      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  }
};

module.exports = authController;
