import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import bgImage from '../images/forrest.jpg';

const apiUrl = process.env.REACT_APP_API_URL;

const scroll = keyframes`
  0% { background-position: 50% 0%; }
  50% { background-position: 50% 100%; }
  100% { background-position: 50% 0%; }
`;

const zoom = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(2); }
  100% { transform: scale(1); }
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
  min-height: 100vh;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  padding: 20px;
  box-sizing: border-box;
`;

const PostList = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const PostBox = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const LoadMoreButton = styled.button`
  background: white;
  border: none;
  color: black;
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 5px;
  border: 2px solid white;
  cursor: pointer;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out, border-radius 0.2s ease-in-out, padding 0.2s ease-in-out;

  &:hover {
    color: white;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    padding: 10px 30px;
  }
`;


const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = Cookies.get('userId');
      if (userId) {
        try {
          const response = await axios.get(`${apiUrl}/user/${userId}`);
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/messages`);
        if (response.data && response.data.messages) {
          setPosts(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    setLoggedInUsername('');
  };

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  return (
    <div>
      <Header />
      <Background />
      <Container>
        <PostList>
          {posts.slice(0, visiblePosts).map((post, index) => (
            <PostBox key={index}>
              <h2>{post.title}</h2>
              <p>{post.message}</p>
              <p><strong>Posted by:</strong> {post.username}</p>
            </PostBox>
          ))}
        </PostList>
        {visiblePosts < posts.length && (
          <LoadMoreButton onClick={loadMorePosts}>
            Load more
          </LoadMoreButton>
        )}
        {visiblePosts >= posts.length && posts.length > 0 && (
          <p>No more posts available</p>
        )}
      </Container>
    </div>
  );
};

export default MainPage;
