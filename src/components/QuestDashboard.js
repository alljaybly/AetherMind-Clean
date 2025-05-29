import React from 'react';

function QuestDashboard({ emotion }) {
  const baseQuests = ['Navigate Stress Nebula', 'Find Calm Core', 'Earn MindMaster Badge'];
  let dynamicQuest = '';

  if (emotion === 'stress') {
    dynamicQuest = 'Take a Break Quest';
  } else if (emotion === 'calm') {
    dynamicQuest = 'Meditate Deeply Quest';
  } else if (emotion === 'happy') {
    dynamicQuest = 'Celebrate Joy Quest';
  } else if (emotion === 'sad') {
    dynamicQuest = 'Seek Comfort Quest';
  } else if (emotion === 'angry') {
    dynamicQuest = 'Cool Down Quest';
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