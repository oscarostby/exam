import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoImage from '../images/logow.png';

const apiUrl = process.env.REACT_APP_API_URL;


const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  color: #fff;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  color: #fff;
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
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
  position: relative; /* Add position relative */
  overflow: hidden; /* Add overflow hidden */

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transform: translateX(-100%); /* Initially move the underline off-screen */
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translateX(0); /* Move the underline into view on hover */
  }

  transition: border-radius 0.3s ease, color 0.3s ease; /* Remove text-decoration from transition */

  &:hover {
    border-radius: 2%;
  }


  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
  }
`;

const Header = ({ isLoggedIn, loggedInUsername, handleLogout }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
        <a href="/">
          <LogoImg src={LogoImage} alt="Logo" />
        </a>
        </Logo>
        <UsernameContainer>
          <Username>{isLoggedIn ? `!Honest user - ${loggedInUsername}` : '!Honest'}</Username>
        </UsernameContainer>
        <NavLinks>
          {isLoggedIn ? (
            <ButtonContainer>
            <a href={`/home/${loggedInUsername}`}><Button>Profile</Button></a>

              <Button onClick={handleLogout}>Logout</Button>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <Button onClick={() => { window.location.href = '/login'; }}>Login</Button>
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
          const response = await axios.get(`${apiUrl}/api/user/${userId}`);
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
    Cookies.remove('username');
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