import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';

//import Profile from "./pages/Profile";
//import Login from "./pages/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
