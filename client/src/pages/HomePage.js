// HomePage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import axios from 'axios';
import Uploadbox from '../components/Uploadbox'; // Corrected import path

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  background: linear-gradient(to right, #4facfe, #00f2fe); /* Light blue gradient */
  color: white;
`;

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const { username: routeUsername } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = Cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
      if (savedUsername !== routeUsername) {
        navigate('/login');
      }
      // Fetch posts for the logged-in user
      fetchPosts(savedUsername);
    } else {
      navigate('/login');
    }
  }, [routeUsername, navigate]);

  const fetchPosts = async (username) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/${username}`);
      setPosts(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEdit = (postId, title, message) => {
    setEditingPostId(postId);
    setEditedTitle(title);
    setEditedMessage(message);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/messages/${editingPostId}`, {
        title: editedTitle,
        message: editedMessage
      });
      // Reset editing state
      setEditingPostId(null);
      setEditedTitle('');
      setEditedMessage('');
      // Refetch posts to display the updated data
      fetchPosts(username);
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/messages/${postId}`);
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <WelcomeMessage>
      <h1>Welcome, {username}!</h1>
      <Uploadbox /> {/* Render the Uploadbox component */}
      <h2>Your Posts:</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {editingPostId === post._id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Publish Edit</button>
              </div>
            ) : (
              <div>
                <h3>{post.title}</h3>
                <p>{post.message}</p>
                <button onClick={() => handleEdit(post._id, post.title, post.message)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </WelcomeMessage>
  );
};

export default HomePage;