import { getAllAggregatedWords } from '../../api/aggregatedWords';
import { baseUrl, IAggregatedWord, storage } from '../../api/api';
import { getWords } from '../../api/getWords';
import { setUserWord, updateUserWord } from '../../api/userWords';
import { Difficulty, Regime } from '../../options/options';
import { insertElement, playAudio } from '../../services/services';
import { getLocalStorage } from '../../services/storage';
import TextbookPage from './textbookPage';

export class CardsContainer {
  public container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('cards-container');
  }

  draw(regime: Regime, data: Array<IAggregatedWord>, idStyle: number): void {
    this.clear();
    data.forEach((element) => {
      const cardItem = insertElement('div', ['card-item'], '', this.container);
      const cardImg = insertElement('img', ['card-img'], '', cardItem) as HTMLImageElement;
      cardImg.src = `${baseUrl}/${element.image}`;
      cardImg.alt = element.word;
      const cardInfo = insertElement('div', ['card-info'], '', cardItem);
      const cardHeader = insertElement('div', ['card-header'], '', cardInfo);
      const cardTitle = insertElement('div', ['card-title-container'], '', cardHeader);
      const word = insertElement('h3', ['card-title'], element.word, cardTitle);
      const transcription = insertElement('p', ['card-title'], element.transcription, cardTitle);
      const translate = insertElement('p', ['card-title'], element.wordTranslate, cardTitle);
      const audioControl = insertElement('div', ['audio-control'], '', cardHeader);
      audioControl.onclick = () => {
        playAudio([
          `${baseUrl}/${element.audio}`,
          `${baseUrl}/${element.audioMeaning}`,
          `${baseUrl}/${element.audioExample}`,
        ]);
      };
      const textMeaning = insertElement('p', ['card-text'], element.textMeaning, cardInfo);
      const textMeaningTranslate = insertElement('p', ['card-text'], element.textMeaningTranslate, cardInfo);
      const textExample = insertElement('p', ['card-text'], element.textExample, cardInfo);
      const textExampleTranslate = insertElement('p', ['card-text'], element.textExampleTranslate, cardInfo);
      if (storage.isAuthorized) {
        const cardsButtonsHTML = this.renderCardsButtons(regime, idStyle, element._id);
        cardInfo.append(cardsButtonsHTML);
        if (element.userWord) {
          if (element.userWord.difficulty === Difficulty.hardWords) {
            cardItem.classList.add('hard');
          }
          if (element.userWord.difficulty == Difficulty.studiedWord) {
            cardItem.classList.add('studied');
          }
        }
      }
    });
  }

  private renderCardsButtons(regime: Regime, idStyle: number, elementId: string): HTMLElement {
    const cardsButtonsWrapper = insertElement('div', ['card-buttons']);
    if (regime === Regime.group) {
      const btnHard = <HTMLButtonElement>(
        insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'сложное', cardsButtonsWrapper)
      );
      const btnStudied = <HTMLButtonElement>(
        insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'изученое', cardsButtonsWrapper)
      );

      btnHard.addEventListener('click', async (event: Event) => {
        await setUserWord(elementId, {
          difficulty: Difficulty.hardWords,
          optional: { trueAnswersCount: 0, falseAnswersCount: 0, trueAnswersSeria: 0, falseAnswersSeria: 0 },
        });
        TextbookPage.renderCardContainer(Regime.group);
      });

      btnStudied.addEventListener('click', async (event: Event) => {
        await setUserWord(elementId, {
          difficulty: Difficulty.studiedWord,
          optional: { trueAnswersCount: 0, falseAnswersCount: 0, trueAnswersSeria: 0, falseAnswersSeria: 0 },
        });
        TextbookPage.renderCardContainer(Regime.group);
      });
    }
    
    if (regime === Regime.hard) {
      const btnHard = <HTMLButtonElement>(
        insertElement('button', ['card-btn', `btn-color7`], 'убрать из сложныx', cardsButtonsWrapper)
      );

      btnHard.addEventListener('click', async (event: Event) => {
        await updateUserWord(elementId, {difficulty: Difficulty.normalWord});
        TextbookPage.renderCardContainer(Regime.hard);
      });
    }
    return cardsButtonsWrapper;
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  async render(regime: Regime): Promise<HTMLElement> {
    const page = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
    const group = getLocalStorage('group') ? Number(getLocalStorage('group')) : 0;

    if (regime === Regime.group) {
      const wordsData = storage.isAuthorized
        ? await getAllAggregatedWords(`${group}`, '0', '20', `{"page":${page}}`)
        : ( await getWords(+`${page}`, +`${group}`));
      this.draw(regime, wordsData, group);
    }

    if (regime === Regime.hard) {
      const wordsData = await getAllAggregatedWords('', '0', '600', `{"userWord.difficulty":"${Difficulty.hardWords}"}`);
      if (wordsData.length === 0) {
        this.clear();
        const message = insertElement('div', ['message-box'], 'Здесь пока ничего нет', this.container);
      } else {
        this.draw(regime, wordsData, group);
      }
    }

    return this.container;
  }
}
