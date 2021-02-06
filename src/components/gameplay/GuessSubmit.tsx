import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GameContext } from '../../App';
import '../../styles/GuessSubmit.css';

const GuessSubmit: React.FC = () => {
  const game = useContext(GameContext);
  return (
    <div id="guess-submit">
      <div id="answer-options-list">
        <span id="find-text">Find:</span>
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
      <button
        onClick={game.submitGuesses}
        id="submit-guess-button"
        disabled={!game.areAllGuessesMade()}>
        Check answers
      </button>
    </div>
  )
}

export default observer(GuessSubmit);