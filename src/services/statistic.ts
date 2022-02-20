import { updateUserWord, setUserWord } from '../api/userWords';
import { storage } from '../api/api';
import { Difficulty } from '../options/options';

export const putBackEndFalseAnswer = async (arr: any, truePos: number)=>{
  if(storage.isAuthorized) {
    if (arr[truePos].userWord === undefined) {
      await setUserWord(arr[truePos]._id, {
        difficulty: Difficulty.normalWord,
        optional: {trueAnswersCount: 0, falseAnswersCount: 1, trueAnswersSeria: 0},
      });
    } else if (arr[truePos].userWord.difficulty === 'stydied') {
      await updateUserWord(arr[truePos]._id, {
        difficulty: Difficulty.normalWord,
        optional: {trueAnswersCount: arr[truePos].userWord.optional.trueAnswersCount, 
                  falseAnswersCount: arr[truePos].userWord.optional.falseAnswersCount+1, 
                  trueAnswersSeria: 0
                },
      });
    } else {
      await updateUserWord(arr[truePos]._id, {
        difficulty: arr[truePos].userWord.difficulty,
        optional: {trueAnswersCount: arr[truePos].userWord.optional.trueAnswersCount, 
                  falseAnswersCount: arr[truePos].userWord.optional.falseAnswersCount+1, 
                  trueAnswersSeria: 0
                },
      });
    }
  }
}

export const putBackEndTrueAnswer = async (arr: any, truePos: number)=>{
  if(storage.isAuthorized){
    if(arr[truePos].userWord === undefined){
      await setUserWord(arr[truePos]._id, {
        difficulty: Difficulty.normalWord,
        optional: {trueAnswersCount: 1, falseAnswersCount: 0, trueAnswersSeria: 1},
      });
    } else if (arr[truePos].userWord.difficulty === 'easy' && arr[truePos].userWord.optional.trueAnswersSeria === 3) {
      await updateUserWord(arr[truePos]._id, {
        difficulty: Difficulty.studiedWord,
        optional: {trueAnswersCount: arr[truePos].userWord.optional.trueAnswersCount, 
                  falseAnswersCount: arr[truePos].userWord.optional.falseAnswersCount, 
                  trueAnswersSeria: arr[truePos].userWord.optional.trueAnswersSeria,
                },
      });
    } else if (arr[truePos].userWord.difficulty === 'hard' && arr[truePos].userWord.optional.trueAnswersSeria === 5) {
      await updateUserWord(arr[truePos]._id, {
        difficulty: Difficulty.studiedWord,
        optional: {trueAnswersCount: arr[truePos].userWord.optional.trueAnswersCount, 
                  falseAnswersCount: arr[truePos].userWord.optional.falseAnswersCount,
                  trueAnswersSeria: arr[truePos].userWord.optional.trueAnswersSeria,
                }, 
      })            
    } else {
      await updateUserWord(arr[truePos]._id, {
        difficulty: arr[truePos].userWord.difficulty,
        optional: {trueAnswersCount: arr[truePos].userWord.optional.trueAnswersCount+1, 
                  falseAnswersCount: arr[truePos].userWord.optional.falseAnswersCount, 
                  trueAnswersSeria: arr[truePos].userWord.optional.trueAnswersSeria+1,
                }, 
      })
    }
  }
}

// async putDateBack () {
//   this.userStatistic = await getUserStatistic();
//   const getJson = JSON.parse(this.userStatistic.optional.maxWords);
//   const filterValuesWords = this.exceptionalValues.filter(item => !getJson.includes(item)); 
//   const joinValuesWords = [...filterValuesWords,...getJson];
//   const jsonWords = JSON.stringify(joinValuesWords);
//   if(this.userStatistic.optional.maxWords === '[]'){
//     this.userStatistic.optional.games.sprint.newWords = this.count;
//   } else {
//     this.userStatistic.optional.games.sprint.newWords = this.userStatistic.optional.games.sprint.newWords + filterValuesWords.length;
//   }
//   let wordsPerDateMap = new Map(Object.entries(this.userStatistic.optional.general));
//   wordsPerDateMap.set(new Date().toLocaleDateString(), joinValuesWords.length);
//   if(this.userStatistic.optional.games.sprint.bestSeries < this.localSeries){
//     this.currentGetSeries = this.localSeries;
//   }else{
//     this.currentGetSeries = this.userStatistic.optional.games.sprint.bestSeries;
//   }
//   await setUserStatistic(storage.userId, {
//     learnedWords: 0,
//     optional: {
//       general: Object.fromEntries(wordsPerDateMap),
//       games: {
//         sprint: {
//           newWords: this.userStatistic.optional.games.sprint.newWords,
//           trueAnswers: this.userStatistic.optional.games.sprint.trueAnswers + this.localTrueAnswer,
//           bestSeries: this.currentGetSeries,
//           gamesPlayed: this.userStatistic.optional.games.sprint.gamesPlayed + 1,
//           wrongAnswers: this.userStatistic.optional.games.sprint.wrongAnswers + this.localWrongAnswer,
//         },
//         audioCall: {
//           newWords:  this.userStatistic.optional.games.audioCall.newWords,
//           trueAnswers: this.userStatistic.optional.games.audioCall.trueAnswers,
//           bestSeries: this.userStatistic.optional.games.audioCall.bestSeries,
//           gamesPlayed: this.userStatistic.optional.games.audioCall.gamesPlayed,
//           wrongAnswers: this.userStatistic.optional.games.audioCall.wrongAnswers,
//         }
//       },
//       maxWords: jsonWords
//     }
//   });
// }