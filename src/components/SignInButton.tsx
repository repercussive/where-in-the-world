import { observer } from 'mobx-react-lite';
import React from 'react';
import Authenticator from '../logic/authentication';
const auth = new Authenticator();

const SignInButton: React.FC = () => {
  const userName = auth.userDisplayName;
  return (
    !!userName ?
      <div>Signed in as {userName}</div>
      : <button onClick={auth.googleSignIn}>Sign in</button>
  )
}

export default observer(SignInButton);