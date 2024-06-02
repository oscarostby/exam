import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import bgImage from '../images/R.jpg';
import loginImage from '../images/login.png';
import registerImage from '../images/register.png';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;
const Commode = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: white;
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
  background-image: url(${props => props.active ? registerImage : loginImage});
  background-size: cover;
  z-index: 1;
  transition: transform 0.5s, text-align 0.5s;
  transform: translateX(${props => props.active ? '0%' : '100%'});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => props.active ? 'flex-end' : 'flex-start'};
  padding: 0 20px;
  overflow: hidden;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-family: 'Arial', sans-serif;
  border-radius: ${props => props.active ? '20px 0 0 20px' : '0 20px 20px 0'};
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
  border-bottom: 1px solid white;
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
  background-color: #3851ec; /* Changed background color */
  color: white;
  border: 2px solid #3851ec;
  cursor: pointer;
  transition: padding 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease,  background-color 0.3s ease;

  &:hover {
    padding: 10px 80px;

    border: 2px solid #3851ec;
    color: #3851ec;
    background-color: rgba(255, 255, 255, 0);
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

const rainbow = keyframes`
  0% { background-color: #00008B; } /* DarkBlue */
  16% { background-color: #0000CD; } /* MediumBlue */
  33% { background-color: #4169E1; } /* RoyalBlue */
  50% { background-color: #4682B4; } /* SteelBlue */
  66% { background-color: #6495ED; } /* CornflowerBlue */
  83% { background-color: #87CEEB; } /* SkyBlue */
  100% { background-color: #ADD8E6; } /* LightBlue */
`;

const FeedbackModal = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #3851ec;
  color: white;
  padding: 25px 45px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  animation: ${feedbackFadeIn} 0.5s ease-in-out;
  overflow: hidden;
  border-radius: 10px;
  color: white;
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
  height: 2px; // Increased height
  border-radius: 10px;
  background: linear-gradient(90deg, #00008B, #0000CD, #4169E1, #4682B4, #6495ED, #87CEEB, #ADD8E6);
  animation: ${shrink} 5s linear, ${rainbow} 5s linear infinite;
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
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;
`;

const ToggleText = styled.span`
  font-size: 0.9rem;
`;

const OVtext = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
  font-size: 2.4rem;
  font-weight: bold;



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
    const isLoggedInFromStorage = localStorage.getItem('isLoggedIn');
    const usernameFromStorage = localStorage.getItem('username');
    const userIdFromCookie = Cookies.get('userId');

    if (isLoggedInFromStorage === 'true' && usernameFromStorage && userIdFromCookie) {
      setIsLoggedIn(true);
      setLoggedInUsername(usernameFromStorage);
      setCurrentView('homepage');
      console.log(`User: ${usernameFromStorage}, ID: ${userIdFromCookie}`);
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
      const response = await axios.post('http://localhost:5000/register', registerData);
      if (response && response.data && response.data.userId) {
        setFeedback(response.data.message);
        setShowFeedback(true);
        setIsLoggedIn(true);
        setLoggedInUsername(registerData.username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', registerData.username);
        Cookies.set('userId', response.data.userId);
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
      const response = await axios.post('http://localhost:5000/login', loginData);
      if (response && response.data && response.data.userId) {
        setFeedback(response.data.message);
        setShowFeedback(true);
        setIsLoggedIn(true);
        setLoggedInUsername(loginData.username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', loginData.username);
        Cookies.set('userId', response.data.userId);
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
