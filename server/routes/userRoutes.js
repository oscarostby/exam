const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById } = require('../controllers/userController'); // Updated controller function

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:userId', getUserById); // Updated route

module.exports = router;
