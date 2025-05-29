import React, { useState } from 'react';

function InputForm({ onSubmit }) {
  const [emotionInput, setEmotionInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emotionInput.trim()) {
      onSubmit(emotionInput.toLowerCase());
      setEmotionInput('');
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenEmotion = event.results[0][0].transcript.toLowerCase();
      setEmotionInput(spokenEmotion);
      onSubmit(spokenEmotion);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Speech recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="input-form">
      <h2 className="form-title">Enter Your Mood</h2>
      <div className="input-group">
        <input
          type="text"
          value={emotionInput}
          onChange={(e) => setEmotionInput(e.target.value)}
          placeholder="e.g., happy, sad, angry"
          className="emotion-input"
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
        <button onClick={handleVoiceInput} className="voice-button" disabled={isListening}>
          {isListening ? 'Listening...' : 'Speak Mood'}
        </button>
      </div>
    </div>
  );
}

export default InputForm;