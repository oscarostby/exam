import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import Uploadbox from '../components/Uploadbox'

const WelcomeMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  background: linear-gradient(to right, #4facfe, #00f2fe); /* Light blue gradient */
  color: white;
`;

const HomePage = () => {
  const [username, setUsername] = useState('');
  const { username: routeUsername } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = Cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
      if (savedUsername !== routeUsername) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [routeUsername, navigate]);

  return (
    <WelcomeMessage>
        < Uploadbox />
      {username === routeUsername ? `Welcome, ${username}!` : 'Unauthorized access'}
    </WelcomeMessage>
  );
};

export default HomePage;
