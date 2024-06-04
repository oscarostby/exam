import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserPosts() {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserMessages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/messages/${username}`);
        setMessages(response.data.messages || []); // Use default empty array if messages are undefined
      } catch (error) {
        console.error('Error fetching user messages:', error);
      }
    };

    fetchUserMessages();
  }, [apiUrl, username]);

  return (
    <div>
      <h1>Messages for {username}</h1>
      <ul>
        {messages.map(message => (
          <li key={message._id}>
            <h3>{message.title}</h3>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPosts;
