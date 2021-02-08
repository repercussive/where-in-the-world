import React, { createContext, useState } from 'react';
import './App.css';
import EndScreen from './components/end/EndScreen';
import GameScreen from './components/gameplay/GameScreen';
import GithubFooter from './components/_global/GithubFooter';
import MainHeader from './components/_global/MainHeader';
import SignInSection from './components/_global/SignInSection';
import TutorialScreen from './components/tutorial/TutorialScreen';
import Game from './logic/game';

type Screen = 'tutorial' | 'game' | 'end';
type ScreenSetter = React.Dispatch<React.SetStateAction<Screen>>;
export const SetScreenContext = createContext<ScreenSetter>({} as ScreenSetter);

const game = new Game();
export const GameContext = createContext<Game>({} as Game);

function App() {
  const [screen, setScreen] = useState<Screen>('tutorial');

  return (
    <div id="app-container">
      <SignInSection />
      <MainHeader />

      <SetScreenContext.Provider value={setScreen}>
        {screen === 'tutorial' && <TutorialScreen />}
        <GameContext.Provider value={game}>
          {screen === 'game' && <GameScreen />}
          {screen === 'end' && <EndScreen />}
        </GameContext.Provider>
      </SetScreenContext.Provider>

      <GithubFooter />
    </div>
  );
}

export default App;
