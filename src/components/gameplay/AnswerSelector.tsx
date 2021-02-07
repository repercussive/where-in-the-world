import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react';
import { GameContext } from '../../App';
import './AnswerSelector.css';

interface Props {
  show: boolean,
  coords: [number, number]
}

const AnswerSelector: React.FC<Props> = ({ show, coords }) => {
  const game = useContext(GameContext);
  const selectorElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectorElement.current) {
      selectorElement.current.style.visibility = show ? 'visible' : 'hidden';
      if (!show) return;
      let xOffset = 0;
      const selectorWidth = selectorElement.current.offsetWidth;
      if (coords[0] > window.innerWidth - selectorWidth) {
        xOffset = selectorWidth - 50;
      }

      selectorElement.current.style.left = (coords[0] - xOffset) + 'px';
      selectorElement.current.style.top = coords[1] + 'px';
    }
  }, [coords, show])

  return (
    <div>
      <div ref={selectorElement} id="answer-selector">
        <div id="answer-selector-prompt-text">Where is this?</div>
        {game.answerOptions.map((name, index) => (
          <button
            onClick={() => game.selectAnswer(name)}
            key={index}
            className="answer-button">
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default observer(AnswerSelector);