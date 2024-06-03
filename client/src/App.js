import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { importAllImages } from './utils/preloadImages';

function App() {
  const hasLoadedOnceRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedOnceRef.current) {
      // Import all images from the images folder
      const images = importAllImages(require.context('./images', false, /\.(png|jpe?g|svg|gif|bmp|tiff)$/));

      // Function to preload an image and return a promise
      const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      };

      // Preload all images and update the loading state
      Promise.all(images.map(preloadImage)).then(() => {
        hasLoadedOnceRef.current = true;
      }).catch((error) => {
        console.error("Error preloading images:", error);
        hasLoadedOnceRef.current = true; // Proceed even if some images fail to load
      });

      // Create a script element for Crisp
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);

      // Initialize Crisp
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "b443669e-1e11-42e5-8368-9ee6469d3fb8";
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
