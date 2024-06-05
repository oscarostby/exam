import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import axios from 'axios';
import Uploadbox from '../components/Uploadbox';
import bannerImage from '../images/upmountain.jpg';
import Header from '../components/Header';

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #141515, #0e0e10);
  color: white;
  min-height: 100vh;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0.7) 90%, rgba(0, 0, 0, 0) 100%);
  mask-size: 100%;
`;

const BlurredBackground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: inherit;
  filter: blur(1px);
`;

const BannerText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 70%);
  color: white;
  font-size: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  width: 80%;
  margin-top: 20px;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const PostItem = styled.li`
  background: #1f1f1f;
  color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const PostContent = styled.div`
  padding: 20px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const EditButton = styled(Button)`
  background: #4caf50;
  color: white;
`;

const DeleteButton = styled(Button)`
  background: #f44336;
  color: white;
`;

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const { username: routeUsername } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = Cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
      if (savedUsername !== routeUsername) {
        navigate('/login');
      }
      // Fetch posts for the logged-in user
      fetchPosts(savedUsername);
    } else {
      navigate('/login');
    }
  }, [routeUsername, navigate]);

  const fetchPosts = async (username) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/${username}`);
      setPosts(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEdit = (postId, title, message) => {
    setEditingPostId(postId);
    setEditedTitle(title);
    setEditedMessage(message);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/messages/${editingPostId}`, {
        title: editedTitle,
        message: editedMessage
      });
      // Reset editing state
      setEditingPostId(null);
      setEditedTitle('');
      setEditedMessage('');
      // Refetch posts to display the updated data
      fetchPosts(username);
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/messages/${postId}`);
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <Header />
      <WelcomeMessage>
        <Banner>
          <Image src={bannerImage} alt="Banner" />
          <BlurredBackground />
          <BannerText>
            Welcome, {username}!
          </BannerText>
        </Banner>
        <Content>
          <Uploadbox />
          <h2>Your Posts:</h2>
          <PostList>
            {posts.map(post => (
              <PostItem key={post._id}>
                {editingPostId === post._id ? (
                  <EditContainer>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                    />
                    <EditButton onClick={handleSaveEdit}>Publish Edit</EditButton>
                  </EditContainer>
                ) : (
                  <PostContent>
                    <h3>{post.title}</h3>
                    <p>{post.message}</p>
                    <EditButton onClick={() => handleEdit(post._id, post.title, post.message)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
                  </PostContent>
                )}
              </PostItem>
            ))}
          </PostList>
        </Content>
      </WelcomeMessage>
    </>
  );
};

export default HomePage;
