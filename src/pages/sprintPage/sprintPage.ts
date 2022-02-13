import "./sprintPage.css"
import { insertElement, getRandom, shuffle } from "../../services/services";
import MiniGamesPage from "../games/game";
import { renderTimerForm, renderFormSprintGame, renderSvgExit, renderFormSprintProgress } from "../../services/renderForm";
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
  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    localStorage.setItem('date', `${this.dateGame}`);
    if(!this.page.querySelector('.point-progress')){
      this.timer();
      this.page.insertAdjacentHTML('beforeend', renderFormSprintProgress);
      this.page.insertAdjacentHTML('beforeend', renderTimerForm);
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
    }
    this.page.insertAdjacentHTML('beforeend', renderFormSprintGame);
    this.choiseFalseAnswer = <Element>this.page.querySelector('.arrow-position-left');
    this.choiseTrueAnswer = <Element>this.page.querySelector('.arrow-position-right');
    this.englishWord = <Element>this.page.querySelector('.english-word');
    this.russianWord = <Element>this.page.querySelector('.russian-word');
    const allAnswer = Array.from(Array(20).keys());
    const randomAll = shuffle(allAnswer);
    randomAll.length = 2;
    this.trueAnswer = randomAll[getRandom(0, 1)];
    this.englishWord.innerHTML = this.resultFetch[randomAll[1]].word;
    console.log(this.resultFetch)
    this.russianWord.innerHTML = this.resultFetch[this.trueAnswer].wordTranslate;
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
    this.clearNextPage();
    this.render()
  }

  choiseDirectionRight(){
    if(this.englishWord?.innerHTML === this.resultFetch[this.trueAnswer].word){
      this.choiseRight();
    }else{
      this.choiseWrong();
    }
    this.clearNextPage();
    this.render();
  }

  clearNextPage() {
    const clearOptions: Element | null = <Element>this.page.querySelector('.answers-options');
    const clearAnswers: Element | null = <Element>this.page.querySelector('.contain-answer-button');
    clearOptions.remove();
    clearAnswers.remove();
  }

  choiseWrong() {
    let clearSeries = this.localSeries;
      if(this.localSeries > Number(localStorage.getItem('sprintSeriesTotal'))){
        localStorage.setItem('sprintSeriesTotal', `${clearSeries}`);
        this.localSeries = 0;
      }
      clearSeries = 0;
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
      console.log(localTotalWordss)
    } else if(!localTotalWordss?.includes(this.resultFetch[this.trueAnswer].id)) {
      console.log(localTotalWordss)
      const local = this.resultFetch[this.trueAnswer].id;
      localTotalWordss.push(local)
      console.log(localTotalWordss)
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
