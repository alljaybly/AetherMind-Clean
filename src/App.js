import React, { useState } from 'react';
import InputForm from './components/InputForm';
import QuestDashboard from './components/QuestDashboard';
import './App.css';

function App() {
  const [emotion, setEmotion] = useState('calm');

  return (
    <div className="app-container">
      <h1 className="title">AetherMind Prototype</h1>
      <div className="grid-container">
        <div className="grid-item">
          <InputForm onSubmit={(newEmotion) => setEmotion(newEmotion)} />
        </div>
        <div className="grid-item">
          <h2 className="emotion-display">Feeling: {emotion}</h2>
        </div>
        <div className="grid-item">
          <QuestDashboard emotion={emotion} />
        </div>
      </div>
    </div>
  );
}

export default App;