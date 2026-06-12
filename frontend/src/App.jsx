import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import StoryLoader from "./components/StoryLoader";
import StoryGenerator from "./components/StoryGenerator";
import Galaxy from "./effects/Galaxy";

function Home() {
  const navigate = useNavigate();

  return (
    <header className="hero-section">
      <div className="hero-glow"></div>

      <div className="hero-content">
        <h1 className="hero-title">GenStory</h1>

        <h2 className="hero-heading">Craft Your Own Adventure</h2>

        <p className="hero-subtitle">
          Step into worlds filled with mystery, magic, danger,
          and discovery. Every choice unlocks a new path,
          creating a story that is uniquely yours.
        </p>

        <button className="generate-btn" onClick={() => navigate("/generate")}>Let’s Go!</button>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
      />


      <Router>
        <div className="app-container">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<StoryGenerator />} />
              <Route path="/story/:id" element={<StoryLoader />} />
            </Routes>
          </main>
        </div>
      </Router>

    </div>
  );
}

export default App;