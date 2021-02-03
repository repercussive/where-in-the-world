import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import { makeAutoObservable, runInAction, toJS } from 'mobx';

type CountryDataItem = {
  id: number,
  name: string,
  popRank: number
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
  public uncompletedCountries: string[] = [];
  public completedCountries: string[] = [];
  public answerOptions: string[] = [];
  public userGuesses: Array<{ id: number, countryName: string }> = [];
  public activeCountryId: number = -1;

  constructor() {
    makeAutoObservable(this);
    this.fetchCountryData();
  }

  private async fetchCountryData() {
    const docRef = await db.collection('gameData').doc('countryData').get();
    if (!docRef.exists) {
      throw new Error("Country data not found!");
    }
    runInAction(() => {
      this.countryData = docRef.data()!.data as CountryDataItem[];
    })
    this.setQuestionOrder();
    this.setAnswerOptions();
  }

  private setQuestionOrder() {
    // Maximum distance an item index can move when the order is shuffled.
    const randomnessAmount = 50;

    const sortedByPopulation = [...toJS(this.countryData)].sort((a, b) => a.popRank - b.popRank);
    let countries: Array<{ id: number, name: string, order: number }> = [];
    for (let i = 0; i < sortedByPopulation.length; i++) {
      const orderOffset = Math.random() * randomnessAmount * 2 - randomnessAmount;
      countries.push({ 
        id: sortedByPopulation[i].id,
        name: sortedByPopulation[i].name,
        order: i + orderOffset });
    }

    countries.sort((a, b) => a.order - b.order);
    countries.forEach(country => this.uncompletedCountries.push(country.name));
  }

  private setAnswerOptions() {
    this.answerOptions = [this.uncompletedCountries[0], this.uncompletedCountries[1], this.uncompletedCountries[2]];
    this.userGuesses = [];
    this.answerOptions.forEach(answer => {
      this.userGuesses.push({
        id: this.countryData.find(data => data.name === answer)!.id,
        countryName: ''
      })
    })
  }

  public getCountryNameById(id: number) {
    const country = this.countryData.find(data => data.id === id);
    return country?.name ?? '';
  }

  public setActiveCountryId(newValue: number) {
    runInAction(() => this.activeCountryId = newValue);
  } 

  public selectAnswer(countryName: string) {
    const existingAnswer = this.getUserGuessByCountryName(countryName);
    if (existingAnswer) {
      existingAnswer.countryName = '';
    }
    const answer = this.userGuesses.find(ans => ans.id === this.activeCountryId);
    if (answer) {
      answer.countryName = countryName;
    } else {
      throw new Error(`Can't select answer ${countryName} as id ${this.activeCountryId} was not found in list.`)
    }
    this.activeCountryId = -1;
  }

  public getUserGuessByCountryName(countryName: string) {
    return this.userGuesses.find(answer => answer.countryName === countryName)
  }

  public getUserGuessByCountryId(id: number) {
    return this.userGuesses.find(ans => ans.id === id)?.countryName;
  }

  public allGuessesMade() {
    return this.userGuesses.every(guess => guess.countryName !== '');
  }
}

export default Game;