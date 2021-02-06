import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import Map from './Map';
import ReactTooltip from 'react-tooltip';
import AnswerSelector from './AnswerSelector';
import { GameContext } from '../App';
import GuessSubmit from './GuessSubmit';
import LivesDisplay from './LivesDisplay';
import AnswerResultPopup from './AnswerResultPopup';
import ScoreDisplay from './ScoreDisplay';
import '../styles/GameDisplay.css';

const GameDisplay: React.FC = () => {
  const game = useContext(GameContext);
  const [answerSelectorPos, setAnswerSelectorPos] = useState([0, 0] as [number, number]);
  const [tooltipContent, setTooltipContent] = useState('');
  const waitingForData = game.countryData.length === 0;

  useEffect(() => {
    document.addEventListener('mousedown', () => setTooltipContent(''), true);
    return () => document.removeEventListener('mousedown', () => setTooltipContent(''), true);
  }, [])

  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <AnswerSelector show={game.activeCountryId >= 0} coords={answerSelectorPos} />
      <div style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
        <LivesDisplay />
        <ScoreDisplay />
      </div>
      <AnswerResultPopup />
      <Map
        setTooltip={setTooltipContent}
        setAnswerSelectorPos={setAnswerSelectorPos}
      />
      {!waitingForData &&
        <GuessSubmit />
      }
    </>
  );
}

export default observer(GameDisplay);