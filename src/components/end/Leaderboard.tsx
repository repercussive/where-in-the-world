import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import './Leaderboard.css';
import { GameContext } from '../../App';
import LeaderboardHandler from '../../logic/leaderboard handler';
import { auth } from '../../logic/firebase';


const Leaderboard: React.FC = () => {
  const game = useContext(GameContext);
  const [handler, setHandler] = useState<LeaderboardHandler>();

  useEffect(() => {
    setHandler(new LeaderboardHandler(game.score));
  }, [])

  if (handler?.isWaitingForData) return null;

  return (
    <div id="leaderboard-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(handler?.previousBest && (handler.previousBest < game.score)) && <div id="new-best-text">New personal best!</div>}
        <div>Your global ranking:</div>
        <div id="user-ranking">{handler?.userRanking}</div>
        <div style={{ color: 'gray' }}>(out of {handler?.worstPossibleRanking})</div>
        <div id="leaderboard-header">Hall of Fame</div>
        <div id="leaderboard">
          {handler?.topScoresData.map((data, index) => (
            <div 
              className={"leaderboard-listing " + (data.uid === auth().currentUser?.uid ? 'user-leaderboard-listing' : '')} 
              key={index}>
              <div className="leaderboard-number">#{index + 1}</div>
              <div className="leaderboard-name">{data.name}</div>
              <div className="leaderboard-score">{data.score}</div>
            </div>
          ))}
        </div>
        {/* Implement */}
        {/* <button>Play again</button> */}
      </div>
    </div>
  )
}

export default observer(Leaderboard);