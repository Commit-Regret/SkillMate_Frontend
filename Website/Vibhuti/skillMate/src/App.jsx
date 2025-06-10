import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import TeamsPage from './pages/TeamsPage';
import ChatBox from './pages/ChatBox';
import Flowchart from './pages/Flowchart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/flowchart" element={<Flowchart />} />
      </Routes>
    </Router>
  );
}

export default App;
