import React, { useState } from 'react';
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
`;

const Input = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  width: 300px;
`;

const TextArea = styled.textarea`
  margin: 0.5rem;
  padding: 0.5rem;
  width: 300px;
  height: 100px;
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

const UploadBox = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = Cookies.get('username');
    
    if (!username) {
      navigate('/login');
      return;
    }

    try {
        await axios.post(`${apiUrl}/api/messages`, { username, title, message });
        alert('Message uploaded successfully!');
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error uploading message:', error);
      alert('Failed to upload message.');
    }
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
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit">Upload</Button>
      </form>
    </UploadBoxWrapper>
  );
};

export default UploadBox;
