import { baseUrl, getWords, IGetData, IWord } from '../../api/textBookAPI/api';
import { insertElement, playAudio } from '../../services/services';
import { getLocalStorage } from '../../services/storage';

export class CardsContainer {
  public container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('cards-container');
  }

  draw(data: Array<IWord>): void {
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
    });
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  async render(): Promise<HTMLElement> {
    const page = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
    const group = getLocalStorage('group') ? Number(getLocalStorage('group')) : 0;
    const wordsData = <IWord[]>(
      await getWords([
        { key: 'group', value: group },
        { key: 'page', value: page },
      ])
    ).items;
    this.draw(wordsData);
    return this.container;
  }
}
