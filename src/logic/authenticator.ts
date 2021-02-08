import { makeAutoObservable, runInAction } from 'mobx';
import { auth } from './firebase';

const provider = new auth.GoogleAuthProvider();

class Authenticator {
  public userDisplayName = null as string | undefined | null;

  constructor() {
    makeAutoObservable(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.signOut = this.signOut.bind(this);

    auth().onAuthStateChanged((user) => {
      runInAction(() => this.userDisplayName = user?.displayName)
    })
  }

  public googleSignIn() {
    auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setUsername(user?.displayName);
        // ...
      }).catch((error) => {
        console.log(error.code);
      });
  }

  public signOut() {
    auth().signOut().then(() => runInAction(() => this.userDisplayName = ''));
  }

  private setUsername(name: string | null | undefined) {
    if (!name) throw new Error("Can't set a null or undefined username");
    this.userDisplayName = name;
  }
}

const authenticator = new Authenticator();

export default authenticator; 