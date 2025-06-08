import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainSwipe from './profile.js';
import ProfileDetail from './aboutme.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainSwipe />} />
      <Route path="/profile/:id" element={<ProfileDetail />} />
    </Routes>
  </BrowserRouter>
);