import React, { useContext } from 'react';
import { ScreenContext } from '../../App';
import './TutorialScreen.css';
import tutorialA from '../../assets/tutorial-a.svg';
import tutorialB from '../../assets/tutorial-b.svg';

const TutorialScreen: React.FC = () => {
  const setScreen = useContext(ScreenContext);
  return (
    <div id="tutorial-screen">
      <div id="tutorial-container">
        <span className="tutorial-text">Three countries will be highlighted on a world map.</span>
        <img src={tutorialA} />

        <span className="tutorial-text">Select each country and guess its name.</span>
        <img src={tutorialB} />

        <span className="tutorial-text">Once you’ve guessed all three, check your answers.</span>
        <div id="tutorial-check-answers">Check answers</div>
      </div>
      <button className="start-game-button" onClick={() => setScreen('game')}>
        Let's go!
      </button>
    </div>
  )
}

export default TutorialScreen;