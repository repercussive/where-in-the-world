import React, { useContext } from 'react';
import { ScreenContext } from '../../App';

const TutorialScreen: React.FC = () => {
  const setScreen = useContext(ScreenContext);
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <button onClick={() => setScreen('game')}>
        Let's go!
      </button>
    </div>
  )
}

export default TutorialScreen;