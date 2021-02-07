import React, { createContext, useState } from 'react';
import './App.css';
import EndScreen from './components/end/EndScreen';
import GameScreen from './components/gameplay/GameScreen';
import SignInSection from './components/SignInSection';
import TutorialScreen from './components/tutorial/TutorialScreen';
import Game from './logic/game';

type Screen = 'tutorial' | 'game' | 'end';
type ScreenContextSetter = React.Dispatch<React.SetStateAction<Screen>>;
export const ScreenContext = createContext<ScreenContextSetter>({} as ScreenContextSetter);

const game = new Game();
export const GameContext = createContext<Game>({} as Game);

function App() {
  const [screen, setScreen] = useState<Screen>('tutorial');

  return (
    <div>
      <SignInSection />
      <MainHeader />

      <ScreenContext.Provider value={setScreen}>
        {screen === 'tutorial' && <TutorialScreen />}
        <GameContext.Provider value={game}>
          {screen === 'game' && <GameScreen />}
          {screen === 'end' && <EndScreen />}
        </GameContext.Provider>
      </ScreenContext.Provider>
    </div>
  );
}

const MainHeader = () => {
  return (
    <h1 id="main-header">
      <span className="title-a">where</span>
      <span className="title-b">in</span>
      <span className="title-c">the</span>
      <span className="title-d">world</span>
    </h1>
  )
}

export default App;
