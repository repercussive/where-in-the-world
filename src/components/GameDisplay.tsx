import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Game from '../logic/game';
import Map from './Map';
import '../styles/GameDisplay.css';
import ReactTooltip from 'react-tooltip';

const GameDisplay: React.FC<{ game: Game }> = ({ game }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const waitingForData = game.countryData.length === 0;

  return (
    <>
      {!waitingForData &&
        <div id="game">
          <div id="answer-options-list">
            {game.answerOptions.map((country, index) => (
              <div key={index}>{country}</div>
            ))}
          </div>

        </div>
      }
      <Map
        completed={game.completedCountries}
        answerOptions={game.answerOptions}
        setTooltip={setTooltipContent}
      />
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </>
  );
}

export default observer(GameDisplay);