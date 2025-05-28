import React from 'react';

function QuestDashboard({ emotion }) {
  const baseQuests = ['Navigate Stress Nebula', 'Find Calm Core', 'Earn MindMaster Badge'];
  let dynamicQuest = '';

  if (emotion === 'stress') {
    dynamicQuest = 'Take a Break Quest';
  } else if (emotion === 'calm') {
    dynamicQuest = 'Meditate Deeply Quest';
  }

  const quests = dynamicQuest ? [...baseQuests, dynamicQuest] : baseQuests;

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