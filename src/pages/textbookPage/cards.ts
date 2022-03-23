import { getAllAggregatedWords } from '../../api/aggregatedWords';
import { baseUrl, IAggregatedWord, storage } from '../../api/api';
import { getWords } from '../../api/getWords';
import { Difficulty, Regime } from '../../options/options';
import { insertElement, playAudio, renderCardsButtons, selectCardType } from '../../services/services';
import { getLocalStorage } from '../../services/storage';

export class CardsContainer {
  public container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('cards-container');
  }

  draw(regime: Regime, data: Array<IAggregatedWord>, idStyle: string): void {
    this.clear();
    data.forEach((element) => {
      const cardItem = insertElement('div', ['card-item'], '', this.container);
      const cardImg = insertElement('img', ['card-img'], '', cardItem) as HTMLImageElement;
      cardImg.src = `${baseUrl}/${element.image}`;
      cardImg.alt = element.word;
      const cardInfo = insertElement('div', ['card-info'], '', cardItem);
      const cardHeader = insertElement('div', ['card-header'], '', cardInfo);
      const cardTitle = insertElement('div', ['card-title-container'], '', cardHeader);
      const word = insertElement('h3', ['card-title',`text-color${+idStyle + 1}`], element.word, cardTitle);
      const transcription = insertElement('p', ['card-title',`text-color${+idStyle + 1}`], element.transcription, cardTitle);
      const translate = insertElement('p', ['card-title',`text-color${+idStyle + 1}`], element.wordTranslate, cardTitle);
      const titleContainer = insertElement('div', ['card-header-container'], '', cardHeader);
      if (storage.isAuthorized) {
        const answersContainer = insertElement('div', ['card-answers-container'], '', titleContainer);
        const trueAnswers = insertElement('div', ['card-answer',  `btn-color${+idStyle + 1}`], element.userWord ? `${element.userWord.optional?.trueAnswersCount}` : '0', answersContainer);
        const falseAnswers = insertElement('div', ['card-answer', 'card-answer__false'], element.userWord ? `${element.userWord.optional?.falseAnswersCount}` : '0', answersContainer);
      }
      const audioControl = insertElement('div', ['audio-control'], '', titleContainer);
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
        if (element.userWord) {
          selectCardType(regime, idStyle, element._id, element.userWord.difficulty, cardItem, cardInfo);
        } else {
          cardInfo.append(renderCardsButtons(regime, idStyle, element._id));
        }
      }
    });
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  async render(regime: Regime): Promise<HTMLElement> {
    const page = getLocalStorage('page') ? <string>getLocalStorage('page') : '0';
    const group = getLocalStorage('group') ? <string>getLocalStorage('group') : '0';
    this.clear();
    
    if (regime === Regime.group) {
      const wordsData = storage.isAuthorized
        ? await getAllAggregatedWords(`${group}`, '0', '20', `{"page":${page}}`)
        : await getWords(+`${page}`, +`${group}`);
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
