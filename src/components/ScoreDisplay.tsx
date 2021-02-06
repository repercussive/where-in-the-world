import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GameContext } from '../App';

const ScoreDisplay: React.FC = () => {
  const game = useContext(GameContext);
  const score = game.score;
  return (
    <div className="game-hud-container">
      <div className="game-hud-content">
        <span className="game-hud-label">Score</span>
        <span style={{fontWeight: 600}}>{score}</span>
      </div>
    </div>
  )
}

export default observer(ScoreDisplay);