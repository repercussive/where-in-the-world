import { observer } from 'mobx-react-lite';
import React from 'react';
import auth from '../../logic/authenticator';
import './SignInSection.css';

const SignInSection: React.FC = () => {
  const username = auth.userDisplayName;
  return (
    <div id="sign-in-section">
      <div className="signed-in-text">
        {!!username ? <span>Signed in as <strong>{username}</strong></span> : 'Sign in to save your score'} 
      </div>
      <button
        className="sign-in-button"
        onClick={!!username ? auth.signOut : auth.googleSignIn}>{!!username ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}

export default observer(SignInSection);