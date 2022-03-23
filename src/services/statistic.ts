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
