const Message = require('../models/messageModel');
const User = require('../models/userModel');

const uploadMessage = async (req, res) => {
  const { username, title, message } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newMessage = new Message({ username, title, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message uploaded successfully' });
  } catch (error) {
    console.error('Error uploading message:', error);
    res.status(500).json({ error: 'Failed to upload message' });
  }
};

const getUserMessages = async (req, res) => {
  const { username } = req.params;

  try {
    const messages = await Message.find({ username });

    if (!messages.length) {
      return res.status(404).json({ error: 'No messages found for this user' });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

module.exports = { uploadMessage, getUserMessages };
