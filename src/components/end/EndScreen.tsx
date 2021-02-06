import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GameContext } from '../../App';

const EndScreen: React.FC = () => {
  const game = useContext(GameContext);

  return (
    <div>

    </div>
  )
}

export default observer(EndScreen);