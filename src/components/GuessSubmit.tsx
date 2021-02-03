import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GameContext } from '../App';
import '../styles/GuessSubmit.css';

const GuessSubmit: React.FC = () => {
  const game = useContext(GameContext);
  return (
    <div id="guess-submit">
      <div id="answer-options-list">
        <div id="find-text">Find:</div>
        {game.answerOptions.map((country, index) => (
          <div
            key={index}
            className={`
                answer-option 
                ${!!game.getUserGuessByCountryName(country) ?
                'answer-option-selected'
                : 'answer-option-unselected'}
              `}>
            {country}
          </div>
        ))}
      </div>
      <button id="submit-guess-button" disabled={!game.allGuessesMade()}>Check answers</button>
    </div>
  )
}

export default observer(GuessSubmit);