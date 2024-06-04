import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomePage from "./pages/HomePage";
import UserPosts from "./pages/Posts"; // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/:username" element={<HomePage />} />
        <Route path="/:username" element={<UserPosts />} /> {/* New route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
