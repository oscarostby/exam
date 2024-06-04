const express = require('express');
const router = express.Router();
const { uploadMessage, getUserMessages, deleteMessage, editMessage, getMessages } = require('../controllers/messageController');

router.post('/messages', uploadMessage);
router.get('/messages/:username', getUserMessages);
router.delete('/messages/:messageId', deleteMessage);
router.put('/messages/:messageId', editMessage);

// Route to fetch all messages
router.get('/messages', getMessages);

module.exports = router;
