const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes'); // Import the message routes
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000; // Use PORT environment variable or default to 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectionString = process.env.MONGO_URI; // Use MONGO_URI environment variable for MongoDB connection

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', userRoutes);
app.use('/api', messageRoutes); // Use the message routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
