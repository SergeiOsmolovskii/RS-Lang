import { storage } from '../api/api';
import { buttonsGroups1, buttonsPage, Difficulty, Regime } from '../options/options';
import { getLocalStorage } from './storage';
import { IWord } from '../api/api';
import TextbookPage from '../pages/textbookPage/textbookPage';
import { updateUserWord, setUserWord } from '../api/userWords';

export function insertElement(
  tagName: string,
  className?: string[],
  content?: string | undefined,
  parentNode?: HTMLElement | null | ''
): HTMLElement {
  const el = document.createElement(tagName);
  if (className) {
    el.classList.add(...className);
  }
  if (content) {
    el.innerHTML = content;
  }
  if (parentNode) {
    parentNode.append(el);
  }
  return el;
}

export const renderHeaderButtons = (): HTMLElement => {
  const headerButtons = insertElement('nav', ['nav'], '');
  buttonsPage.forEach((button) => {
    const buttonHTML = <HTMLAnchorElement>insertElement('a', [...button.class], button.label, '');
    buttonHTML.href = `#${button.id}`;
    headerButtons.append(buttonHTML);
   });
  return headerButtons;
};

export const renderGroupsButtons = (): HTMLElement => {
  const groupButtonsContainer = insertElement('ul', ['groups-btn']);
  const value = getLocalStorage('group') ? getLocalStorage('group') : '0';
  buttonsGroups1.forEach((button) => {
    const buttonHTML = insertElement('li', [...button.class], button.label);
    buttonHTML.dataset.group = button.group;
    if (button.group === value) {
      buttonHTML.classList.add('active');
    };
    groupButtonsContainer.append(buttonHTML);

  });
  return groupButtonsContainer;
};

export const playAudio = (playList: Array<string>): void => {
  let playNum = 0;
  const audio = document.createElement('audio');
  audio.src = playList[playNum];
  if (!storage.isPlayed) {
    audio.play();
    storage.isPlayed = true;
  }
  
  audio.onended = () => {
    if (playNum === playList.length - 1) {
      audio.pause();
      storage.isPlayed = false;
    } else {
      playNum = playNum + 1;
      audio.src = playList[playNum];
      audio.play();
    }
  };
};

export const getRandom = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clicker = (el: HTMLElement): void =>{
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = 195 + 'px';
    circle.style.top = 130 + 'px';
    el.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
}

let changeDegLeft = 0;
let changeDegright = 0;
export const changeQuoteNumber = (doc: any): void => {
  changeDegLeft = changeDegLeft + 720;
  changeDegright = changeDegright - 720;
  doc[0].style.transform = `rotate(${changeDegLeft-27}deg)`;
  doc[1].style.transform = `rotate(${changeDegright+164}deg)`;
  doc[0].style.transition = '1s';
  doc[1].style.transition = '1s';
}

export const renderResult = (arr: IWord[], parent: HTMLElement) => {
  arr.forEach(el => {
    let elementVolume = insertElement('div', ['audio-control'],'', parent);
    elementVolume.classList.add('mini-audio');
    insertElement('div', ['word'],`${el.word} - ${el.wordTranslate}`, parent);
    const audio = document.createElement('audio');
    audio.src = `https://rs-lang-learn.herokuapp.com/${el.audio}`;
    elementVolume.addEventListener('click', () => audio.play());
  });
}

export const selectCardType = (regime: Regime, idStyle: number, elementId: string, difficulty: string, cardItem: HTMLElement, cardInfo: HTMLElement): void =>{
  switch (difficulty) {
    case Difficulty.studiedWord:
      cardItem.classList.add('studied');
      cardInfo.append(renderCardsButtons(regime, idStyle, elementId, difficulty));
      break;
    case Difficulty.hardWords:
      if (regime === Regime.group) {
        cardItem.classList.add('hard');
      }
      if (regime === Regime.hard) {
        cardInfo.append(renderCardsButtons(regime, idStyle, elementId));
      }
      break;
    case Difficulty.normalWord:
      cardInfo.append(renderCardsButtons(regime, idStyle, elementId, difficulty));
      break;
    }
}

export const renderCardsButtons = (regime: Regime, idStyle: number, elementId: string, difficulty?: Difficulty): HTMLElement => {
  const cardsButtonsWrapper = insertElement('div', ['card-buttons']);
  if (regime === Regime.group) {
    if (difficulty === Difficulty.studiedWord) {
      const btnStudied = <HTMLButtonElement>(
        insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'убрать из изученных', cardsButtonsWrapper)
      );
      btnStudied.addEventListener('click', async (event: Event) => {
        await updateUserWord(elementId, { difficulty: Difficulty.normalWord });
        TextbookPage.renderCardContainer(regime);
      });
    } else {
      const btnHard = <HTMLButtonElement>(
        insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'сложное', cardsButtonsWrapper)
      );
      const btnStudied = <HTMLButtonElement>(
        insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'изученое', cardsButtonsWrapper)
      );
      if (difficulty === Difficulty.normalWord){
        btnHard.addEventListener('click', async (event: Event) => {
          await updateUserWord(elementId, { difficulty: Difficulty.hardWords });
          TextbookPage.renderCardContainer(regime);
        });

        btnStudied.addEventListener('click', async (event: Event) => {
          await updateUserWord(elementId, { difficulty: Difficulty.studiedWord });
          TextbookPage.renderCardContainer(regime);
        });
      } else {
        btnHard.addEventListener('click', async (event: Event) => {
          await setUserWord(elementId, {
            difficulty: Difficulty.hardWords,
            optional: { trueAnswersCount: 0, falseAnswersCount: 0, trueAnswersSeria: 0 },
          });
          TextbookPage.renderCardContainer(regime);
        });

        btnStudied.addEventListener('click', async (event: Event) => {
          await setUserWord(elementId, {
            difficulty: Difficulty.studiedWord,
            optional: { trueAnswersCount: 0, falseAnswersCount: 0, trueAnswersSeria: 0 },
          });
          TextbookPage.renderCardContainer(regime);
        });
      }
    }
  }
  if (regime === Regime.hard) {
    const btnHard = <HTMLButtonElement>(
      insertElement('button', ['card-btn', `btn-color7`], 'убрать из сложныx', cardsButtonsWrapper)
    );

    btnHard.addEventListener('click', async (event: Event) => {
      await updateUserWord(elementId, { difficulty: Difficulty.normalWord });
      TextbookPage.renderCardContainer(regime);
    });
  }
  return <HTMLElement>cardsButtonsWrapper;
}

export const putBackEndFalseAnswer = async (arr: any, truePos: number)=>{
  if (storage.isAuthorized) {
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
