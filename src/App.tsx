import React from 'react';
import './App.css';
import GameDisplay from './components/GameDisplay';
import Game from './logic/game';

const game = new Game();

function App() {
  return (
    <div>
      <GameDisplay game={game}/>
    </div>
  );
}

export default App;
