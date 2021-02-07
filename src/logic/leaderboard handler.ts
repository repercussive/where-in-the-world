import { makeAutoObservable, runInAction } from "mobx";
import { db, auth } from './firebase';
import firebase from 'firebase/app';

type ScoreDataItem = { name: string, uid: string, score: number }

export default class LeaderboardHandler {
  public isWaitingForData = true;
  public userRanking: string | undefined;
  public worstPossibleRanking: number | undefined;
  public previousBest = -1;
  public topScoresData: ScoreDataItem[] = [];
  private newScore;

  constructor(score: number) {
    makeAutoObservable(this);
    this.newScore = score;
    this.getAggregatedScores()
      .then(() => this.uploadScore())
      .then(() => this.findUserRanking())
      .then(() => this.findTopScores())
      .then(() => runInAction(() => this.isWaitingForData = false));
  }

  private async uploadScore() {
    let existingRecord = await db.collection('scores').doc(auth().currentUser?.uid).get();
    let shouldUpload = true;
    if (existingRecord.exists) {
      this.previousBest = existingRecord.data()!.score;
      if (this.previousBest >= this.newScore) {
        shouldUpload = false;
      }
    }

    if (shouldUpload) {
      await db.collection('scores').doc(auth().currentUser?.uid).set({
        name: auth().currentUser?.displayName,
        score: this.newScore
      });
      await db.collection('scores').doc('aggregate').update({ scores: firebase.firestore.FieldValue.arrayUnion(this.newScore) });
    }
  }

  private async findUserRanking() {
    let aggregatedScores = await this.getAggregatedScores();
    aggregatedScores = aggregatedScores.sort((a, b) => b - a);

    let rank = 1;
    for (let i = 0; i < aggregatedScores.length; i++) {
      if (this.newScore < aggregatedScores[i]) {
        rank++;
      } else {
        break;
      }
    }

    runInAction(() => {
      this.userRanking = `${rank + getOrdinalSuffix(rank)}`;
      this.worstPossibleRanking = aggregatedScores.length;
    })
  }

  private async findTopScores() {
    let queryResult = await db.collection('scores').orderBy('score', 'desc').limit(10).get();
    let top: ScoreDataItem[] = [];
    queryResult.docs.forEach(doc => {
      const data = doc.data();
      const newDataItem: ScoreDataItem = { 
        name: data.name,
        uid: doc.id,
        score: data.score 
      }
      top.push(newDataItem);
    });
    runInAction(() => this.topScoresData = top);
  }

  private async getAggregatedScores() {
    const aggregateScoresRef = await db.collection('scores').doc('aggregate').get();
    if (!aggregateScoresRef.exists) {
      throw new Error("Aggregate score data not found!");
    }
    const aggregatedScores = aggregateScoresRef.data()!.scores as number[];
    return aggregatedScores;
  }
}

function getOrdinalSuffix(rank: number | string) {
  rank = rank.toString();
  if (rank.length >= 2) {
    if (['11', '12', '13'].includes(rank.slice(rank.length - 2))) {
      return 'th';
    }
  }
  const lastDigit = rank.charAt(rank.length - 1);
  let suffix = '';
  if (['0', '4', '5', '6', '7', '8', '9'].includes(lastDigit)) {
    suffix = 'th';
  } else if (lastDigit === '1') {
    suffix = 'st';
  } else if (lastDigit === '2') {
    suffix = 'nd';
  } else if (lastDigit === '3') {
    suffix = 'rd';
  }
  return suffix;
}