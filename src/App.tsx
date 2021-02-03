import React, { createContext } from 'react';
import './App.css';
import GameDisplay from './components/GameDisplay';
import Game from './logic/game';

const game = new Game();
export const GameContext = createContext<Game>({} as Game);

function App() {
  return (
    <div>
      <GameContext.Provider value={game}>
        <GameDisplay/>
      </GameContext.Provider>
    </div>
  );
}

export default App;
