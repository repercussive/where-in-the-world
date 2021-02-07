import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import Map from './Map';
import ReactTooltip from 'react-tooltip';
import AnswerSelector from './AnswerSelector';
import { GameContext, ScreenContext } from '../../App';
import GuessSubmit from './GuessSubmit';
import LivesDisplay from './LivesDisplay';
import AnswerResultPopup from './AnswerResultPopup';
import ScoreDisplay from './ScoreDisplay';
import './GameScreen.css';

const GameScreen: React.FC = () => {
  const setScreen = useContext(ScreenContext);
  const game = useContext(GameContext);
  const [answerSelectorPos, setAnswerSelectorPos] = useState([0, 0] as [number, number]);
  const [tooltipContent, setTooltipContent] = useState('');
  const waitingForData = game.countryData.length === 0;

  useEffect(() => {
    document.addEventListener('mousedown', () => setTooltipContent(''), true);
    return () => document.removeEventListener('mousedown', () => setTooltipContent(''), true);
  }, [])

  useEffect(() => {
    if (game.isGameOver) {
      setTimeout(() => {
        setScreen('end');
      }, 3000);
    }
  }, [game.isGameOver])

  return (
    <div id="game-screen-container" style={{opacity: game.isGameOver ? 0 : 1}}>
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
    </div>
  );
}

export default observer(GameScreen);