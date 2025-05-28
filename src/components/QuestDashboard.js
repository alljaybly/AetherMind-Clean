import React from 'react';

function QuestDashboard() {
  const quests = ['Navigate Stress Nebula', 'Find Calm Core', 'Earn MindMaster Badge'];

  return (
    <div className="quest-dashboard">
      <h2 className="quest-title">Your Quests</h2>
      <ul className="quest-list">
        {quests.map((quest, index) => (
          <li key={index} className="quest-item">{quest}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestDashboard;