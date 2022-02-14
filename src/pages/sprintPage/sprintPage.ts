import "./sprintPage.css"
import { insertElement, getRandom, shuffle, changeQuoteNumber } from "../../services/services";
import MiniGamesPage from "../games/game";
import { renderTimerForm, renderFormSprintGame, renderSvgExit, renderFormSprintProgress, renderFormSptintAnswerButton } from "../../services/renderForm";
import { getWords, IWords } from '../../api/getWords';

class SprintPage extends MiniGamesPage {
  private choiseFalseAnswer: Element | null = null;
  private choiseTrueAnswer: Element | null = null;
  private resultFetch: IWords[] = [];
  private trueAnswer: number = 0;
  private allTrueAnswer: number = 0;
  private englishWord: Element | null = null;
  private russianWord: Element | null = null;
  private localSeries: number = 0;
  private localTrueAnswer: any = localStorage.getItem('sprintAmountTrueAnswer');
  private progress: any = null;
  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['sprint-page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    localStorage.setItem('date', `${this.dateGame}`);
    if(!this.page.querySelector('.point-progress')){
      this.timer();
      this.page.insertAdjacentHTML('beforeend', renderFormSprintProgress);
      this.page.insertAdjacentHTML('beforeend', renderTimerForm);
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
      this.page.insertAdjacentHTML('beforeend', renderFormSprintGame);
    }
    this.page.insertAdjacentHTML('beforeend', renderFormSptintAnswerButton);
    this.choiseFalseAnswer = <Element>this.page.querySelector('.arrow-position-left');
    this.choiseTrueAnswer = <Element>this.page.querySelector('.arrow-position-right');
    this.englishWord = <Element>this.page.querySelector('.english-word');
    this.russianWord = <Element>this.page.querySelector('.russian-word');
    const allAnswer = Array.from(Array(20).keys());
    const randomAll = shuffle(allAnswer);
    randomAll.length = 2;
    this.trueAnswer = randomAll[getRandom(0, 1)];
    let rusStr = this.resultFetch[randomAll[1]].word;
    let englishStr = this.resultFetch[this.trueAnswer].wordTranslate;
    rusStr = rusStr[0].toUpperCase() + rusStr.substring(1);
    englishStr = englishStr[0].toUpperCase() + englishStr.substring(1);
    this.englishWord.innerHTML = rusStr;
    this.russianWord.innerHTML = englishStr;
    this.choiseFalseAnswer.addEventListener('click', () => this.choiseDirectionLeft());
    this.choiseTrueAnswer.addEventListener('click', () => this.choiseDirectionRight());
    return this.page;
  }

  choiseDirectionLeft() {
    if(this.englishWord?.innerHTML !== this.resultFetch[this.trueAnswer].word){
      this.choiseRight();
    }else{
      this.choiseWrong();
    }
    this.progress = this.page.querySelectorAll('.arrow');
    changeQuoteNumber(this.progress);
    this.clearPage();
    this.render();
  }

  choiseDirectionRight(){
    if(this.englishWord?.innerHTML === this.resultFetch[this.trueAnswer].word){
      this.choiseRight();
    }else{
      this.choiseWrong();
    }
    this.progress = this.page.querySelectorAll('.arrow');
    changeQuoteNumber(this.progress);
    this.render();
    this.clearPage();
  }

  choiseWrong() {
    let clearSeries = this.localSeries;
      if(this.localSeries > Number(localStorage.getItem('sprintSeriesTotal'))){
        localStorage.setItem('sprintSeriesTotal', `${clearSeries}`);
        this.localSeries = 0;
      }
      clearSeries = 0;
  }

  clearPage() {
    const clearAnswers: HTMLElement | null = <HTMLElement>document.querySelector('.contain-answer-button');
    clearAnswers.remove();
  }

  choiseRight() {
    ++this.localSeries;
    ++this.localTrueAnswer;
    ++this.allTrueAnswer
    localStorage.setItem(`sprintAmountTrueAnswer`, this.localTrueAnswer);

    let localTotalWordss: any = JSON.parse(`${localStorage.getItem('sprintWordsTotal')}`);
    if(localTotalWordss === null) {
      let localTotalWordss = [this.resultFetch[this.trueAnswer].id];
      localStorage.setItem(`sprintWordsTotal`, JSON.stringify(localTotalWordss));
    } else if(!localTotalWordss?.includes(this.resultFetch[this.trueAnswer].id)) {
      const local = this.resultFetch[this.trueAnswer].id;
      localTotalWordss.push(local)
      localStorage.setItem(`sprintWordsTotal`, JSON.stringify(localTotalWordss));
    }
  }

  timer() {
    let seconds: number = 60;
    const timer = setInterval(() => {
      const timerShow: Element | null = <Element>this.page.querySelector(".timer");
        timerShow.innerHTML = `${seconds}`;
      --seconds;
      if(seconds === -1){
        clearInterval(timer);
      }
    }, 1000)
  }
}
export default SprintPage;
