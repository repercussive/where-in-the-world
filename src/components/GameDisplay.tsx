import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Game from '../logic/game';
import Map from './Map';
import '../styles/GameDisplay.css';
import ReactTooltip from 'react-tooltip';
import AnswerSelector from './AnswerSelector';

const GameDisplay: React.FC<{ game: Game }> = ({ game }) => {
  const [answerSelectorPos, setAnswerSelectorPos] = useState([0, 0] as [number, number]);
  const [tooltipContent, setTooltipContent] = useState('');
  const waitingForData = game.countryData.length === 0;
  
  useEffect(() => {
    document.addEventListener('mousedown', () => setTooltipContent(''), true);
    return () => document.removeEventListener('mousedown', () => setTooltipContent(''), true);
  }, [])

  return (
    <>
      {!waitingForData &&
        <div id="game-info">
          <div id="answer-options-list">
            {game.answerOptions.map((country, index) => (
              <div key={index}>{country}</div>
            ))}
          </div>

        </div>
      }
      <Map
        game={game}
        setTooltip={setTooltipContent}
        setAnswerSelectorPos={setAnswerSelectorPos}
      />
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <AnswerSelector game={game} show={game.activeCountryId >= 0} coords={answerSelectorPos} />
    </>
  );
}

export default observer(GameDisplay);