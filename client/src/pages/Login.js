import Header from '../components/Headerlogin';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import loginImage from '../images/log2.png';
import registerImage from '../images/reg2.png';
import bg2 from '../images/bgforrest2.jpg'

const apiUrl = process.env.REACT_APP_API_URL;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: url(${bg2}) center center/cover no-repeat;
    z-index: -2; /* Make sure the background is behind other content */
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the darken level as needed */
    z-index: -1; /* Ensure the dark overlay is behind other content but in front of the background image */
  }
`;

const Commode = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: rgba(255, 255, 255, 0.2); /* semi-transparent background */
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Adjusted shadow color */
  backdrop-filter: blur(10px); /* Applies the blur effect */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
`;

const Slide = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BlurredBackground = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const LeftSlide = styled(Slide)`
  left: 0;
`;

const RightSlide = styled(Slide)`
  right: 0;
`;

const CoverContainer = styled.div`
  width: calc(50% - 40px);
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  transition: transform 0.5s ease-in-out, background-image 0.5s ease-in-out; // Added transition for background-image
  transform: translateX(${props => props.active ? '0%' : '100%'});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => props.active ? 'flex-end' : 'flex-start'};
  padding: 0 20px;
  overflow: hidden;
  color: black; /* Changed text color to black */
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6); /* Adjusted text shadow color */
  font-family: 'Arial', sans-serif;
  border-radius: ${props => props.active ? '20px 0 0 20px' : '0 20px 20px 0'};
  background-image: url(${props => props.active ? registerImage : loginImage}); // Moved background-image here
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px; /* Increased padding */
  width: 200px;
  border: none;
  border-bottom: 1px solid black; /* Changed border color to black */
  background: #edf0f5; /* Added background color */
  color: black; /* Changed text color */
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px 30px;
  font-size: 1rem;
  background-color: white; /* Changed background color */
  color: black;
  border: 2px solid white;
  cursor: pointer;
  transition: padding 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease,  background-color 0.3s ease;

  &:hover {
    padding: 10px 80px;
    border: 2px solid white;
    border-radius: 40px;
  }
`;

const feedbackFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const whiteToLightBlue = keyframes`
  0% { background-color: #000000; } /* Black */
  100% { background-color: #E6F7FF; } /* Light Blue */
`;

const FeedbackModal = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #0092cd;
  color: white;
  padding: 25px 60px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); /* Adjusted shadow color */
  display: flex;
  align-items: center;
  animation: ${feedbackFadeIn} 0.5s ease-in-out;
  overflow: hidden;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: solid 2px white; // Reduced border size for better aesthetics
  color: white;
  font-size: 1.2rem;
  margin-left: 30px; // Reduced margin for better positioning
  cursor: pointer;
  border-radius: 50%;
  padding: 10px 18px; // Reduced padding for better aesthetics
  transition: border-radius 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-radius: 10px;
  }
`;

const shrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const TimerBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px; // Increased height
  border-radius: 10px;
  background: linear-gradient(90deg, #FFFFFF, #E6F7FF);
  animation: ${shrink} 5s linear, ${whiteToLightBlue} 5s linear infinite;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // Added subtle shadow
`;
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Bottomtext = styled.div`
  padding: 20px;
`;

const HomePage = ({ loggedInUsername }) => {
  return <div>{true && (window.location.href = '/')}</div>;
 };
 
 const ToggleButton = styled.button`
  margin-top: 50px;
  background: none;
  border: none;
  color: #f0f0f0;  // Light color for contrast on dark background
  cursor: pointer;
  font-size: 1rem;  // Slightly larger font size
  margin-left: 8px;
  padding: 6px 15px;  // More compact padding
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.4);  // Slightly darker background for better contrast
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);  // Subtle shadow for better visibility
 
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);  // Slightly darker on hover
  }
 `;
 
 const ToggleText = styled.span`
  font-size: 0.9rem;
  color: white; /* Changed text color to white */
 `;
 
 const OVtext = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin-bottom: 0; // Remove bottom margin
  position: relative;
  font-size: 2.4rem;
  font-weight: bold;
  color: white; /* Changed text color to white */
 `;
 
 const App = () => {
  const [activeSlide, setActiveSlide] = useState('register');
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    const isLoggedInFromCookie = Cookies.get('isLoggedIn');
    const usernameFromCookie = Cookies.get('username');
    const userIdFromCookie = Cookies.get('userId');

    if (isLoggedInFromCookie === 'true' && usernameFromCookie && userIdFromCookie) {
      setIsLoggedIn(true);
      setLoggedInUsername(usernameFromCookie);
      setCurrentView('homepage');
      console.log(`User: ${usernameFromCookie}, ID: ${userIdFromCookie}`);
    } else {
      console.log('User not logged in');
    }
  }, []);

  const toggleSlide = () => {
    setActiveSlide(activeSlide === 'register' ? 'login' : 'register');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/register`, registerData);

      if (response && response.data && response.data.userId) {
        setFeedback(response.data.message);
        setShowFeedback(true);
        setIsLoggedIn(true);
        Cookies.set('isLoggedIn', 'true', { expires: 7 }); // Set cookie to expire in 7 days
        Cookies.set('username', registerData.username.toLowerCase(), { expires: 7 }); // Endre linjen til å lagre verdien i lowercase
        Cookies.set('userId', response.data.userId, { expires: 7 }); // Set cookie to expire in 7 days
        setCurrentView('homepage');
      } else {
        setFeedback('Unexpected response from server');
        setShowFeedback(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setFeedback(error.response.data.error);
      } else {
        setFeedback('An error occurred while processing your request');
      }
      setShowFeedback(true);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/login`, loginData);
      if (response && response.data && response.data.userId) {
        setFeedback(response.data.message);
        setShowFeedback(true);
        setIsLoggedIn(true);
        Cookies.set('isLoggedIn', 'true', { expires: 7 }); // Set cookie to expire in 7 days
        Cookies.set('username', loginData.username.toLowerCase(), { expires: 7 }); // Endre linjen til å lagre verdien i lowercase
        Cookies.set('userId', response.data.userId, { expires: 7 }); // Set cookie to expire in 7 days
        setCurrentView('homepage');
      } else {
        setFeedback('Unexpected response from server');
        setShowFeedback(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setFeedback(error.response.data.error);
      } else {
        setFeedback('An error occurred while processing your request');
      }
      setShowFeedback(true);
    }
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Container>
            <Header />
            <Commode>
              <LeftSlide active={activeSlide === 'register'}>
                <BlurredBackground />
                <Content>
                  <OVtext>
                    Register
                  </OVtext>
                  <Form onSubmit={handleRegisterSubmit}>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={handleRegisterInputChange}
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={handleRegisterInputChange}
                    />
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterInputChange}
                    />
                    <Button type="submit">Register</Button>
                  </Form>
                  <Bottomtext>
                    <ToggleText>Already have an account? </ToggleText>
                    <ToggleButton onClick={toggleSlide}>Login here</ToggleButton>
                  </Bottomtext>
                </Content>
              </LeftSlide>
              <RightSlide active={activeSlide === 'login'}>
                <BlurredBackground />
                <Content>
                  <OVtext>
                    Login
                  </OVtext>
                  <Form onSubmit={handleLoginSubmit}>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={handleLoginInputChange}
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      />
                      <Button type="submit">Login</Button>
                      </Form>
                      <Bottomtext>
                      <ToggleText>Don't have an account? </ToggleText>
                      <ToggleButton onClick={toggleSlide}>Register here</ToggleButton>
                      </Bottomtext>
                      </Content>
                      </RightSlide>
                      <CoverContainer active={activeSlide === 'login'} />
                      </Commode>
          </Container>
        );
      case 'homepage':
        return <HomePage loggedInUsername={loggedInUsername} />;
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      {renderView()}
      {showFeedback && (
        <FeedbackModal>
          {feedback}
          <CloseButton onClick={() => setShowFeedback(false)}>x</CloseButton>
          <TimerBar />
        </FeedbackModal>
      )}
    </AppContainer>
  );
};

export default App;