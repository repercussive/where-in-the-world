import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GameContext } from '../../App';
import authenticator from '../../logic/authenticator';
import './EndScreen.css';
import Leaderboard from './Leaderboard';

const EndScreen: React.FC = () => {
  let game = useContext(GameContext);
  const username = authenticator.userDisplayName;

  return (
    <div id="end-screen">
      <h2 id="game-over-text">
        {game.uncompletedCountries.length === 0 ? 'Every country found!' : 'Game over!'}
      </h2>
      <div>Your score:</div>
      <div id="end-score">{game.score} points</div>
      <div style={{ minHeight: '30px' }} />
      {!!authenticator.userDisplayName ?
        <Leaderboard />
        : <>
          <div className="signed-in-text">Sign in to see how you compare to other players!</div>
          <div style={{ minHeight: '10px' }} />
          <button
            className="sign-in-button"
            onClick={!!username ? authenticator.signOut : authenticator.googleSignIn}>
            Sign in
          </button>
        </>
      }
    </div>
  )
}

export default observer(EndScreen);