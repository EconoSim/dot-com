import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import IconButton from './components/IconButton/IconButton';
import NavButton from './components/NavButton/NavButton';
import './App.css';
import Home from './pages/home/Home';
import Devlogs from './pages/devlogs/Devlogs';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-body">
        <aside className="App-sidebar">
          <header className="App-header">
            <p className="App-title">econosim</p>
          </header>
          <div className="App-nav">
            <NavButton url="/devlogs">dev logs</NavButton>
            <NavButton url="/demo">demo</NavButton>
          </div>
          <div className="App-iconContainer">
            <IconButton icon={FaDiscord} href="https://discord.gg/Urk6BtzX" size={40} />
            <IconButton icon={FaGithub} href="https://github.com/EconoSim" size={40} />
            <IconButton icon={FaXTwitter} href="https://twitter.com/EconoSim" size={40} />
          </div>
        </aside>
        <main className="App-main">
          {/* Define Routes for navigation */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devlogs" element={<Devlogs />} />
            <Route path="/demo" element={<div>dev</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;