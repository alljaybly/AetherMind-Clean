import React, { useState } from 'react';

function InputForm({ onSubmit }) {
  const [emotion, setEmotion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emotion.trim()) {
      onSubmit(emotion.toLowerCase());
      setEmotion('');
    }
  };

  return (
    <div className="input-form">
      <h2 className="input-title">How Do You Feel?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="Enter emotion (e.g., stress, calm)"
          className="input-field"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;