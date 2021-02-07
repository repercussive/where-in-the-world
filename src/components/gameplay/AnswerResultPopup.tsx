import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../../App';
import './AnswerResultPopup.css';

const AnswerResultPopup: React.FC = () => {
  const game = useContext(GameContext);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const speedBonusTextRef = useRef<HTMLDivElement>(null);
  const pointsTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function showAnswerResult(event: any) {
      const { result, speedBonus } = event.detail as { result: 'correct' | 'incorrect', speedBonus: boolean };
      speedBonusTextRef.current!.style.display = speedBonus ? 'block' : 'none';
        if (result === 'correct') {
          pointsTextRef.current!.textContent = (speedBonus ? '+30' : '+10') + ' points';
        } else {
          pointsTextRef.current!.textContent = game.lives > 0 ? 'Try again.' : 'Out of lives!';
        }
        popupRef.current?.classList.remove('answer-result-displayed');
        void popupRef.current?.offsetHeight;
        popupRef.current?.classList.add('answer-result-displayed');
        setIsAnswerCorrect(result === 'correct' ? true : false);
    }

    document.addEventListener('answerResult', showAnswerResult);
    return () => document.removeEventListener('answerResult', showAnswerResult);
  }, [])

  return (
    <div ref={popupRef} id="answer-result-popup-container">
      <div id="answer-result-popup-card">
        <FontAwesomeIcon
          id="answer-result-icon"
          icon={isAnswerCorrect ? faCheckCircle : faTimesCircle}
          color={isAnswerCorrect ? "rgb(49, 173, 69)" : "rgb(191, 48, 46)"} />
        <div id="answer-result-main-text">
          {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
        </div>
        <div ref={pointsTextRef} id="answer-result-sub-text" />
        <div ref={speedBonusTextRef} style={{color: "rgb(49, 173, 69)"}}>Speed bonus!</div>
      </div>
      
    </div>
  )
}

export default observer(AnswerResultPopup);