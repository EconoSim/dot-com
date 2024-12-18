import React from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import IconButton from './components/IconButton/IconButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content">
          <p className="App-title">econosim</p>
          <p className="App-subtitle">Your gateway to economic simulations</p>
          <a className="App-button" href="/demo">Run Demo</a>
        </div>
        <div className="App-iconContainer">
          <IconButton icon={FaDiscord} href="https://discord.gg/Urk6BtzX" size={40} />
          <IconButton icon={FaGithub} href="https://github.com/EconoSim" size={40} />
          <IconButton icon={FaXTwitter} href="https://twitter.com/EconoSim" size={40} />
        </div>
      </header>
    </div>
  );
}

export default App;