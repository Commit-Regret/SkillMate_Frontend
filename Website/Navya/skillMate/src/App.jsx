import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainSwipe from './profile.jsx';
import ProfileDetail from './aboutme.jsx';
import UserProfileForm from './user_info.jsx';
import ChatPortal from './chat.jsx';
import FlowchartPage from './aichatbox.jsx';
import LandingPage from './LandingPage.jsx';
import Home from './Home.jsx';
import TeamsPage from './TeamsPage.jsx';
import ChatBox from './AiChat.jsx' ;


import './index.css';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/swipe" element={<MainSwipe />} />
      <Route path="/profile/:id" element={<ProfileDetail />} />
      <Route path='/form' element={<UserProfileForm />} />
      <Route path='/chat' element={<ChatPortal/>}/>
      <Route path='/flowchart' element={<FlowchartPage/>}/>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/team' element={<TeamsPage/>}/>
      <Route path='/AIchat' element={<ChatBox/>}/>
      <Route path="/team/:name" element={<ProfileDetail/>} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
