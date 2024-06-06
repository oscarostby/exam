import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomePage from "./pages/HomePage";
import UserPosts from "./pages/Posts"; // Import the new component
import Support from "./pages/Support"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<Support />} />
        <Route path="/home/:username" element={<HomePage />} />
        <Route path="/:username" element={<UserPosts />} /> {/* New route */}
      </Routes>
      {/* Blue button for support */}
      <Link to="/support" style={buttonStyle}>Need help?</Link>
    </BrowserRouter>
  );
}

// CSS style for the blue button
const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
};

export default App;
