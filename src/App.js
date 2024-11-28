import logo from './logo.png';
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          EconoSim Project Homepage
        </p>
        <a
          className="App-link"
          href="/demo"
        >
          EconoSim Demo
        </a>
        <p>
          Other Sites
        </p>
        <a
          className="App-link"
          href="https://discord.gg/Urk6BtzX"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
        <a
          className="App-link"
          href="https://github.com/EconoSim"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="App-link"
          href="https://x.com/EconoSim"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </header>
    </div>
  );
}

export default App;
