import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import TeamsPage from './pages/TeamsPage';
import ChatBox from './pages/ChatBox';
import Flowchart from './pages/Flowchart';
import YouAreAMatch from './pages/YouAreAMatch';
import ChatPage from './pages/ChatPage';
import UserProfileForm from './pages/user_info.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/flowchart" element={<Flowchart />} />
        <Route path="/match" element={<YouAreAMatch />} />
         <Route path="/messages" element={<ChatPage />} />
          <Route path='/form' element={<UserProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App;
