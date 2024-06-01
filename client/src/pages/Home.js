import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Username = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// Main Component
const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedIsLoggedIn === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setLoggedInUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setLoggedInUsername('');
  };

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Username>@{loggedInUsername}</Username>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Username>Guest</Username>
          <ButtonContainer>
            <Button onClick={() => { window.location.href = '/login'; }}>Login</Button>
            <Button onClick={() => { window.location.href = '/register'; }}>Register</Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default MainPage;