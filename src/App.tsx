import React, { createContext } from 'react';
import './App.css';
import GameDisplay from './components/gameplay/GameDisplay';
import SignInSection from './components/SignInSection';
import Game from './logic/game';

const game = new Game();
export const GameContext = createContext<Game>({} as Game);

function App() {
  return (
    <div>
      <SignInSection />
      <h1 id="main-header">
        <span className="title-a">where</span>
        <span className="title-b">in</span>
        <span className="title-c">the</span>
        <span className="title-d">world</span>
      </h1>
      <GameContext.Provider value={game}>
        <GameDisplay/>
      </GameContext.Provider>
    </div>
  );
}

export default App;
