const express = require('express');
const router = express.Router();
const { uploadMessage, getUserMessages } = require('../controllers/messageController');

router.post('/messages', uploadMessage);
router.get('/messages/:username', getUserMessages);

module.exports = router;
