import "./sprintPage.css"
import { insertElement, getRandom, shuffle, changeQuoteNumber } from "../../services/services";
import MiniGamesPage from "../games/game";
import { renderTimerForm, renderFormSprintGame, renderSvgExit, renderFormSprintProgress, renderFormSptintAnswerButton, renderSprintResultAnswer } from "../../services/renderForm";
import { getWords, IWords } from '../../api/getWords';

class SprintPage extends MiniGamesPage {
  private choiseFalseAnswer: Element | null = null;
  private choiseTrueAnswer: Element | null = null;
  private resultFetch: IWords[] = [];
  private trueAnswer: number = 0;
  private englishWord: Element | null = null;
  private russianWord: Element | null = null;
  private localSeries: number[] = [];
  private currentGetSeries: number = 0;
  private localTrueAnswer: number = 0;
  private point: number = 0;
  private progress: any = null;
  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['sprint-page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    console.log(this.resultFetch)
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
    this.englishWord.innerHTML = this.resultFetch[randomAll[1]].word;
    this.russianWord.innerHTML = this.resultFetch[this.trueAnswer].wordTranslate;
    this.choiseFalseAnswer.addEventListener('click', () => this.choiseDirectionLeft());
    this.choiseTrueAnswer.addEventListener('click', () => this.choiseDirectionRight());
    return this.page;
  }

  choiseDirectionLeft() {
    ++this.count;
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
    ++this.count;
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
    this.localSeries.push(this.currentGetSeries);
    this.currentGetSeries = 0;
  }

  choiseRight() {
    console.log('Правда')
    ++this.currentGetSeries;
    ++this.localTrueAnswer;
    if(this.currentGetSeries > 3 && this.currentGetSeries < 6){
      this.point = this.point + 25;
    } else if(this.currentGetSeries > 6){
      this.point = this.point + 50;
    } else{ 
      this.point = this.point + 10;
    }
  
    // let localTotalWordss: any = JSON.parse(`${localStorage.getItem('sprintWordsTotal')}`);
    // if(localTotalWordss === null) {
    //   let localTotalWordss = [this.resultFetch[this.trueAnswer].id];
    //   localStorage.setItem(`sprintWordsTotal`, JSON.stringify(localTotalWordss));
    // } else if(!localTotalWordss?.includes(this.resultFetch[this.trueAnswer].id)) {
    //   const local = this.resultFetch[this.trueAnswer].id;
    //   localTotalWordss.push(local)
    //   localStorage.setItem(`sprintWordsTotal`, JSON.stringify(localTotalWordss));
    // }
  }

  timer() {
    let seconds: number = 10;
    const timer = setInterval(() => {
      const timerShow: Element | null = <Element>this.page.querySelector(".timer");
        timerShow.innerHTML = `${seconds}`;
      --seconds;
      if(seconds === -1){
        this.page.insertAdjacentHTML('afterend', renderSprintResultAnswer);
        this.renderConclusion();
        this.metodLocalGamesPlayed();
        this.metodLocalSeriesTotal();
        this.metodLocalAmountTrueAnswer();
        clearInterval(timer);
      }
    }, 1000)
  }

  metodLocalGamesPlayed() {
    let get: any = localStorage.getItem('sprintGamesPlayed');
    ++get;
    localStorage.setItem('sprintGamesPlayed', `${get}`);
  }

  metodLocalSeriesTotal() {
    const maxNumber = Math.max.apply(null, this.localSeries);
    if(maxNumber > Number(localStorage.getItem('sprintCallSeriesTotal'))){
      localStorage.setItem('sprintCallSeriesTotal', `${maxNumber}`);
    }
    this.localSeries = [];
  }

  metodLocalAmountTrueAnswer(){
    const get: any = localStorage.getItem('sprintAmountTrueAnswer');
    const temporaryTrueAnswer =  this.localTrueAnswer + Number(get);
    localStorage.setItem('sprintAmountTrueAnswer', `${temporaryTrueAnswer}`);
    this.localTrueAnswer = 0;
  }

  renderConclusion() {
    const amountPoints = <Element>document.querySelector('.quantity-true-points');
    const amountPercent = <HTMLElement>document.querySelector('.percent-answers');
    const amountSprintTrueAnswer = <Element>document.querySelector('.sprint-true-answer');
    const amountSprintFalseAnswer = <Element>document.querySelector('.sprint-false-answer');
    const nextGame = <Element>document.querySelector('.next-game');

    const maxPercent = Math.round((this.localTrueAnswer/this.count) * 100);
    amountPoints.innerHTML = `${this.point} Очков`;
    if(isNaN(maxPercent)){
      amountPercent.innerHTML = `${0}%`;
      amountPercent.style.background = `red`;
    }else{
      amountPercent.innerHTML = `${maxPercent}%`;
      amountPercent.style.background = `linear-gradient(to right, green ${maxPercent}%, red ${100 - maxPercent}%)`;
    }
    this.count = 0;
    nextGame.addEventListener('click',() => this.render());
    nextGame.addEventListener('click',() => this.clearPage());
    nextGame.addEventListener('click',() => this.timer());
  }

  clearPage() {
    const clearTable: HTMLElement | null = <HTMLElement>document.querySelector('.result-answer');
    if(clearTable !== null){
      clearTable.remove();
    }
    const clearAnswers: HTMLElement | null = <HTMLElement>document.querySelector('.contain-answer-button');
    clearAnswers.remove();
  }

}
export default SprintPage;
