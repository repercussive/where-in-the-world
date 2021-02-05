import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite';
import { GameContext } from '../App';
import '../styles/LivesDisplay.css';

const LivesDisplay: React.FC = () => {
  const game = useContext(GameContext);
  const lives = game.lives;
  return (
    <div id="lives-display">
      <div id="lives-container">
        <span id="lives-label">Lives</span>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="life">
            <FontAwesomeIcon
              icon={faHeart}
              className={lives > index ? 'life-active' : 'life-lost'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default observer(LivesDisplay);