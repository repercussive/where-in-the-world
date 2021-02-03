import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import { makeAutoObservable, runInAction } from 'mobx';

type CountryDataItem = {
  id: number, 
  name: string
}

var firebaseConfig = {
  apiKey: "AIzaSyCTh2ihwqmq1-ebY3BQpT640qMd0bkiyds",
  authDomain: "where-in-the-world-1e249.firebaseapp.com",
  projectId: "where-in-the-world-1e249",
  storageBucket: "where-in-the-world-1e249.appspot.com",
  messagingSenderId: "54537784020",
  appId: "1:54537784020:web:39af78dc86fa8679ee4941",
  measurementId: "G-6HKPRWMTD3"
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();

class Game {
  public countryData: CountryDataItem[] = [];
  public completedCountries: string[] = [];
  public answerOptions: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCountryData();
  }

  private async fetchCountryData() {
    const docRef = await db.collection('validation').doc('answer-validation').get();
    if (!docRef.exists) {
      throw new Error("Country data not found!");
    }
    runInAction(() => {
      this.countryData = docRef.data()!.countryIds as CountryDataItem[];
    })
  }
}

export default Game;