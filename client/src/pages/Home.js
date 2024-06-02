import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import bgImage from '../images/forrest.jpg';

const scroll = keyframes`
  0% { background-position: 50% 0%; }
  50% { background-position: 50% 100%; }
  100% { background-position: 50% 0%; }
`;

const zoom = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(2); }
  100% { transform: scale(3); }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  animation: ${scroll} 1400s linear infinite, ${zoom} 1400s linear infinite;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
`;

const Username = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;



const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = Cookies.get('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/user/${userId}`);
          if (response.data && response.data.username) {
            setLoggedInUsername(response.data.username);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    setLoggedInUsername('');
  };

  return (
    <div>
      <Header />
      <Background />
      <Container>
      <Username>Waiting for exam from the 4th to the 6th</Username>

      </Container>
    </div>
  );
};

export default MainPage;
