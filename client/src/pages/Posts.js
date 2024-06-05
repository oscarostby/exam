import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header'; // Importing the Header component
import bg from '../images/fn2.jpg'; // Importing the background image

const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 100%; /* Set height to 100% to cover the entire viewport */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.6); /* Adjusted overlay opacity */
  color: #eee;
  padding: 20px;
  border-radius: 8px;
  margin: 150px auto 20px; /* Adjusted margin */
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PostContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8); /* Add an overlay to make text more readable */
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const MessageTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const MessageText = styled.p`
  font-size: 16px;
`;

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
    <>
      <Header /> {/* Including the Header component */}
      <Bg>
        <Container>
          <Title>Messages from {username}</Title>
          {messages.map(message => (
            <PostContainer key={message._id}>
              <MessageTitle>{message.title}</MessageTitle>
              <MessageText>{message.message}</MessageText>
            </PostContainer>
          ))}
        </Container>
      </Bg>
    </>
  );
}

export default UserPosts;
