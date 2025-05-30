import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import QuestDashboard from './components/QuestDashboard';
import './App.css';

function App() {
  const [emotion, setEmotion] = useState('calm');
  const [emotionHistory, setEmotionHistory] = useState(['calm']);
  const [quote, setQuote] = useState('');
  const [progress, setProgress] = useState(0);
  const [advice, setAdvice] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'stress':
        return '#ff6b6b';
      case 'calm':
        return '#48bb78';
      case 'happy':
        return '#f7d794';
      case 'sad':
        return '#63b3ed';
      case 'angry':
        return '#f56565';
      default:
        return '#e2e8f0';
    }
  };

  const getMoodAdvice = (emotion) => {
    switch (emotion) {
      case 'stress':
        return 'Try taking deep breaths or a short walk to clear your mind.';
      case 'calm':
        return 'Maintain this peace by practicing mindfulness or journaling.';
      case 'happy':
        return 'Share your positivity—call a friend or enjoy a favorite activity!';
      case 'sad':
        return 'It’s okay to feel this way. Listen to soothing music or talk to someone.';
      case 'angry':
        return 'Channel your energy into exercise or write down your thoughts to cool off.';
      default:
        return 'Reflect on your mood and set a small goal for the day.';
    }
  };

  const handleEmotionSubmit = (newEmotion) => {
    setEmotion(newEmotion);
    setEmotionHistory([...emotionHistory, newEmotion]);
    setAdvice(getMoodAdvice(newEmotion));
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const handleClear = () => {
    setEmotion('calm');
    setEmotionHistory(['calm']);
    setQuote('');
    setProgress(0);
    setAdvice('');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', { rating, feedbackText });
    alert(`Thank you for your feedback! Rating: ${rating}, Comment: ${feedbackText}`);
    setShowFeedback(false);
    setRating(0);
    setFeedbackText('');
  };

  useEffect(() => {
    const fetchQuote = async (attempt = 1) => {
      if (attempt > 3) {
        setQuote('Keep going, you’ve got this! — AetherMind');
        return;
      }
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) throw new Error('API unavailable');
        const data = await response.json();
        setQuote(`${data.content} — ${data.author}`);
      } catch (error) {
        console.log('Quote API error (Attempt ' + attempt + '):', error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Wait 1s, 2s, 3s
        fetchQuote(attempt + 1);
      }
    };
    fetchQuote();
  }, [emotion]);

  return (
    <div className="app-container">
      <h1 className="title">AetherMind Prototype</h1>
      <div className="grid-container">
        <div className="grid-item">
          <InputForm onSubmit={handleEmotionSubmit} />
          <button onClick={handleClear} className="clear-button">
            Clear Mood
          </button>
          <button onClick={() => setShowFeedback(true)} className="feedback-button">
            Provide Feedback
          </button>
        </div>
        <div className="grid-item">
          <h2
            className="emotion-display"
            style={{
              backgroundColor: getEmotionColor(emotion),
              padding: '10px',
              borderRadius: '5px',
              color: emotion === 'happy' ? '#d53f8c' : emotion === 'sad' ? '#2b6cb0' : '#333',
            }}
          >
            Feeling: {emotion}
          </h2>
          <div className="mood-tracker">
            <h3>Mood History</h3>
            <ul className="mood-list">
              {emotionHistory.map((mood, index) => (
                <li
                  key={index}
                  className="mood-item"
                  style={{ backgroundColor: getEmotionColor(mood) }}
                >
                  {mood}
                </li>
              ))}
            </ul>
          </div>
          <div className="advice-section">
            <h3>Advice</h3>
            <p>{advice || 'Enter a mood to get advice.'}</p>
          </div>
          <div className="quote-section">
            <h3>Daily Motivation</h3>
            <p>{quote || 'Loading a quote for you...'}</p>
          </div>
          <div className="progress-section">
            <h3>Quest Progress</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{progress}% Complete</p>
          </div>
        </div>
        <div className="grid-item">
          <QuestDashboard emotion={emotion} />
        </div>
      </div>
      {showFeedback && (
        <div className="feedback-modal">
          <div className="feedback-content">
            <h3>Provide Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <label>
                Rate the App (1-5):
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="rating-input"
                />
              </label>
              <label>
                Comments:
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="feedback-text"
                  placeholder="Share your thoughts..."
                />
              </label>
              <div className="feedback-buttons">
                <button type="submit" className="submit-feedback">
                  Submit
                </button>
                <button onClick={() => setShowFeedback(false)} className="cancel-feedback">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <footer className="footer">
        <p>© 2025 AetherMind. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com/alljaybly/AetherMind-Clean" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;