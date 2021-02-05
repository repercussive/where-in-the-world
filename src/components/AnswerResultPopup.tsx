import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/AnswerResultPopup.css';

const AnswerResultPopup: React.FC = () => {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function showAnswerResult(event: any) {
      const result = event.detail.result as 'correct' | 'incorrect';
      popupRef.current?.classList.remove('answer-result-displayed');
      Promise.resolve().then(() => popupRef.current?.classList.add('answer-result-displayed'));
      setIsAnswerCorrect(result === 'correct' ? true : false);
    }

    document.addEventListener('answerResult', e => showAnswerResult(e));
    return () => document.removeEventListener('answerResult', e => showAnswerResult(e));
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
        <div id="answer-result-sub-text">
          {isAnswerCorrect ? '+10 points' : 'Try again.'}
        </div>
      </div>
    </div>
  )
}

export default observer(AnswerResultPopup);