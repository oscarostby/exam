// controllers/messageController.js

const Message = require('../models/messageModel');

const uploadMessage = async (req, res) => {
  const { username, title, message } = req.body;

  try {
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

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

const editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { title, message } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { title, message }, { new: true });
    
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message updated successfully', updatedMessage });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

module.exports = { uploadMessage, getUserMessages, deleteMessage, editMessage, getMessages };

