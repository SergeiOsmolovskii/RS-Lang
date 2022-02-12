import { getAggregatedWord, getAllAggregatedWords } from '../../api/aggregatedWords';
import { IAggregatedWord, IWord, storage } from '../../api/api';
import { baseUrl, getWords } from '../../api/textBookAPI/api';
import { getAllUserWords, setUserWord, updateUserWord } from '../../api/userWords';
import { insertElement, playAudio } from '../../services/services';
import { getLocalStorage } from '../../services/storage';
import TextbookPage from './textbookPage';

export class CardsContainer {
  public container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('cards-container');
  }

  draw(data: Array<IAggregatedWord> , idStyle: number): void {
    this.clear();
    data.forEach((element) => {
      const cardItem = insertElement('div', ['card-item'], '', this.container);
      const cardImg = insertElement('img', ['card-img'], '', cardItem) as HTMLImageElement;
      cardImg.src = `${baseUrl}/${element.image}`;
      cardImg.alt = element.word;
      const cardInfo = insertElement('div', ['card-info'], '', cardItem);
      const cardHeader = insertElement('div', ['card-header'], '', cardInfo);
      const cardTitle = insertElement('h3', ['card-title'], element.word, cardHeader);
      const transcription = insertElement('p', ['card-title'], element.transcription, cardHeader);
      const translate = insertElement('p', ['card-title'], element.wordTranslate, cardHeader);
      const audioControl = insertElement('div', ['audio-control'], '', cardItem);
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
      if (storage.isAuthorized == true) {
        const cardsButtonsHTML = this.renderCardsButtons(idStyle, element._id);
        cardInfo.append(cardsButtonsHTML);
        if (element.userWord) {
          if (element.userWord.difficulty == 'hard') {
            cardItem.classList.add('hard')
          }
          if (element.userWord.difficulty == 'easy') {
            cardItem.classList.add('easy')
          }
        }
      }
    });
  }

  private renderCardsButtons (idStyle: number, elementId: string): HTMLElement {
    const cardsButtonsWrapper = insertElement('div', ['card-buttons']);
    const btnHard = insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'сложное', cardsButtonsWrapper);
    const btnEasy = insertElement('button', ['card-btn', `btn-color${idStyle + 1}`], 'изученое', cardsButtonsWrapper);
    btnHard.addEventListener('click', async (event: Event) => {
      //event.preventDefault();
      await setUserWord(elementId, {difficulty: 'hard'});
      TextbookPage.renderCardContainer();

    });
    btnEasy.addEventListener('click', async (event: Event) => {
     // event.preventDefault();
      await setUserWord(elementId, {difficulty: 'easy'});
      TextbookPage.renderCardContainer();
    });
    return cardsButtonsWrapper;
  };

  clear(): void {
    this.container.innerHTML = '';
  }

  async render(): Promise<HTMLElement> {
    const page = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
    const group = getLocalStorage('group') ? Number(getLocalStorage('group')) : 0;
    const wordsData = storage.isAuthorized == true 
    ? (await getAllAggregatedWords(`${group}`, `${page}`, '20', ''))
    : (await getWords([{ key: 'group', value: group }, { key: 'page', value: page }])).items;
    this.draw(wordsData, group);
    return this.container;
  }
}
