import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoImage from '../images/loginlogo.png';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: transparent; /* Removed background color */
  color: #000; /* Changed text color to black */
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const Logo = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 80px;
  margin-right: 1rem;
`;

const NavLinks = styled.nav`
  display: flex;
`;

const UsernameContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Username = styled.span`
  color: #000; /* Changed text color to black */
  font-weight: bold;
  font-size: 1.5rem;
  display: block;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  font-weight: bold;
  background-color: transparent;
  color: #000; /* Changed button text color to black */
  border: 2px solid #000; /* Changed button border color to black */
  padding: 0.8rem 2rem;
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #000; /* Changed background color on hover */
    color: #fff; /* Changed text color on hover */
  }
`;

const Header = ({ isLoggedIn, loggedInUsername, handleLogout }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoImg src={LogoImage} alt="Logo" />
        </Logo>
        <UsernameContainer>
          <Username>{isLoggedIn ? `${loggedInUsername}` : 'Guest'}</Username>
        </UsernameContainer>
        <NavLinks>
          {isLoggedIn ? (
            <ButtonContainer>
              <Button href="/profile">Profile</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <Button onClick={() => { window.location.href = '/login'; }}>Login</Button>
              <Button onClick={() => { window.location.href = '/register'; }}>Register</Button>
            </ButtonContainer>
          )}
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

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
      <Header isLoggedIn={isLoggedIn} loggedInUsername={loggedInUsername} handleLogout={handleLogout} />
      {/* Your main content goes here */}
    </div>
  );
};

export default MainPage;