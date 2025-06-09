import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainSwipe from './profile.jsx';
import ProfileDetail from './aboutme.jsx';
import UserProfileForm from './user_info.jsx';
import './index.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainSwipe />} />
      <Route path="/profile/:id" element={<ProfileDetail />} />
      <Route path="/form" element={<UserProfileForm />} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
