import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const UploadBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.75rem;
  width: 90%;
  max-width: 400px;
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  margin: 0.5rem 0;
  padding: 0.75rem;
  width: 90%;
  max-width: 400px;
  height: 120px;
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const CounterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  max-width: 400px;
  margin: 0.25rem 0;
`;

const Counter = styled.span`
  color: #aaa;
  font-size: 0.875rem;
`;

const Button = styled.button`
  margin: 1rem 0;
  padding: 0.75rem 1.5rem;
  background-color: #4facfe;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00f2fe;
  }
`;

const FeedbackModal = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #0092cd;
  color: white;
  padding: 25px 60px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const UploadBox = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [remainingMessageChars, setRemainingMessageChars] = useState(100);
  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    const input = e.target.value;
    setMessage(input);
    setRemainingMessageChars(100 - input.length);
  };

  useEffect(() => {
    let timer;
    if (modalMessage) {
      timer = setTimeout(() => {
        setModalMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [modalMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = Cookies.get('username');

    if (!username) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/messages`, { username, title, message });
      setModalMessage('Message uploaded successfully!');
      setTitle('');
      setMessage('');
      setRemainingMessageChars(100);
    } catch (error) {
      console.error('Error uploading message:', error);
      setModalMessage('Failed to upload message.');
    }
  };

  return (
    <UploadBoxWrapper>
      <Title>Upload a Message</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Message"
          value={message}
          onChange={handleMessageChange}
          maxLength={100}
          required
        />
        <CounterWrapper>
          <Counter>{remainingMessageChars} characters left</Counter>
        </CounterWrapper>
        <Button type="submit">Upload</Button>
      </form>
      {modalMessage && (
        <FeedbackModal>
          <p>{modalMessage}</p>
        </FeedbackModal>
      )}
    </UploadBoxWrapper>
  );
};

export default UploadBox;
