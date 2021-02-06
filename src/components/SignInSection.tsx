import { observer } from 'mobx-react-lite';
import React from 'react';
import Authenticator from '../logic/authentication';
import '../styles/SignInSection.css';
const auth = new Authenticator();

const SignInSection: React.FC = () => {
  const userName = auth.userDisplayName;
  return (
    <div id="sign-in-section">
      <div className="signed-in-text">
        {!!userName ? <span>Signed in as <strong>{userName}</strong></span> : 'Sign in to save your score'} 
      </div>
      <button
        className="sign-in-button"
        onClick={!!userName ? auth.signOut : auth.googleSignIn}>{!!userName ? 'Sign out' : 'Sign in'}
      </button>
    </div>

  )
}

export default observer(SignInSection);