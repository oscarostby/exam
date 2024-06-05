import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const UploadBoxWrapper = styled.div`
  position: relative; /* Added */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const Input = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  width: 90%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  margin: 0.5rem;
  padding: 0.5rem;
  width: 90%;
  max-width: 400px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Counter = styled.span`
  position: absolute; /* Added */
  top: 5px; /* Added */
  right: 5px; /* Added */
  color: red;
  border: 2px solid red;
  padding: 20px;

  @media (max-width: 900px) {
    border: transparent;
    color: transparent;
  }

`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00f2fe;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  color: black;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00f2fe;
  }
`;

const UploadBox = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [remainingMessageChars, setRemainingMessageChars] = useState(100);
  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    const input = e.target.value;
    setMessage(input);
    setRemainingMessageChars(100 - input.length);
  };

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
      setModalVisible(true);
      setTitle('');
      setMessage('');
      setRemainingMessageChars(100);
    } catch (error) {
      console.error('Error uploading message:', error);
      setModalMessage('Failed to upload message.');
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage('');
  };

  return (
    <UploadBoxWrapper>
      <h2>Upload a Message</h2>
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
        <Counter remaining={remainingMessageChars}>
          {remainingMessageChars} characters left
        </Counter>
        <Button type="submit">Upload</Button>
      </form>
      {modalVisible && (
        <ModalBackground>
          <ModalContent>
            <p>{modalMessage}</p>
            <ModalButton onClick={closeModal}>Close</ModalButton>
          </ModalContent>
        </ModalBackground>
      )}
    </UploadBoxWrapper>
  );
};

export default UploadBox;
