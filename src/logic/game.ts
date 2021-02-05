import { db } from './firebase';
import { makeAutoObservable, runInAction, toJS } from 'mobx';

type CountryDataItem = {
  id: number,
  name: string,
  popRank: number
}

export type AnswerResultEvent = CustomEvent<{ result: 'correct' | 'incorrect' }>

class Game {
  public countryData: CountryDataItem[] = [];
  public uncompletedCountries: string[] = [];
  public completedCountries: string[] = [];
  public answerOptions: string[] = [];
  public userGuesses: Array<{ id: number, countryName: string }> = [];
  public activeCountryId: number = -1;
  public lives = 3;

  constructor() {
    makeAutoObservable(this);
    this.fetchCountryData();
    this.submitGuesses = this.submitGuesses.bind(this);
  }

  public submitGuesses() {
    const isCorrect = this.userGuesses.every(guess => (
      this.getCountryNameById(guess.id) === guess.countryName
    ))

    const resultEvent: AnswerResultEvent =
      new CustomEvent('answerResult', {
        detail: { result: isCorrect ? 'correct' : 'incorrect' }
      });

    if (isCorrect) {
      // TODO: Make sure game can be won.
      this.uncompletedCountries = this.uncompletedCountries.filter(name => !this.answerOptions.includes(name));
      this.answerOptions.forEach(name => this.completedCountries.push(name));
      this.setAnswerOptions();
    } else {
      this.lives--;
      this.resetUserGuesses();
    }

    document.dispatchEvent(resultEvent);
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
    return this.userGuesses.find(answer => answer.countryName === countryName);
  }

  public areAllGuessesMade() {
    return this.userGuesses.every(guess => guess.countryName !== '');
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
        order: i + orderOffset
      });
    }

    countries.sort((a, b) => a.order - b.order);
    countries.forEach(country => this.uncompletedCountries.push(country.name));
  }

  private setAnswerOptions() {
    this.answerOptions = []
    for (let i = 0; i < Math.min(3, this.uncompletedCountries.length); i++) {
      const nextCountry = this.uncompletedCountries[i];
      if (nextCountry) this.answerOptions.push(this.uncompletedCountries[i]);
    }
    this.resetUserGuesses();
  }

  resetUserGuesses() {
    this.userGuesses = [];
    this.answerOptions.forEach(answer => {
      this.userGuesses.push({
        id: this.countryData.find(data => data.name === answer)!.id,
        countryName: ''
      })
    })
  }
}

export default Game;