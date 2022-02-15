import "./sprintPage.css"
import { insertElement, getRandom, shuffle, changeQuoteNumber, renderResult } from "../../services/services";
import MiniGamesPage from "../games/game";
import { renderTimerForm, renderFormSprintGame, renderSvgExit, renderFormSprintProgress, renderFormSptintAnswerButton, renderSprintResultAnswer } from "../../services/renderForm";
import { getWords, IWords } from '../../api/getWords';
import { IGameParam } from '../../api/api';
import { setLocalStorage } from "../../services/storage";


class SprintPage extends MiniGamesPage {
  private choiseFalseAnswer: Element | null = null;
  private choiseTrueAnswer: Element | null = null;
  private renderPoint: Element | null = null;
  private pointSum: Element | null = null;
  private resultFetch: IWords[] = [];
  private trueAnswer: number = 0;
  private pointTrue: number = 0;
  private pointFalse: number = 0;
  private englishWord: Element | null = null;
  private russianWord: Element | null = null;
  private localSeries: number = 0;
  private currentGetSeries: number = 0;
  private sprintGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0}
  private localTrueAnswer: number = 0;
  private point: number = 0;
  private progress: any = null;
  private localTotalWordssRight: IWords[] = [];
  private localTotalWordssMistakes: IWords[] = [];
  private seconds: number = 60;
  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['sprint-page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.checkData();
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
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
    console.log('ошибка')
    ++this.pointFalse
    if(this.localSeries < this.currentGetSeries){
      this.localSeries = this.currentGetSeries;
    }
    this.currentGetSeries = 0;
    this.localTotalWordssMistakes.push(this.resultFetch[this.trueAnswer]);
  }

  choiseRight() {
    ++this.pointTrue
    ++this.currentGetSeries;
    ++this.sprintGameParam.trueAnswers;
    ++this.localTrueAnswer;
    if(this.localSeries < this.currentGetSeries){
      this.localSeries = this.currentGetSeries;
    }
    this.localTotalWordssRight.push(this.resultFetch[this.trueAnswer]);
    this.renderPoint = <Element>this.page.querySelector('.point');
    this.pointSum = <Element>this.page.querySelector('.point-sum');
    if(this.currentGetSeries > 3 && this.currentGetSeries < 6){
      this.pointSum.innerHTML = `+25`
      this.point = this.point + 25;
    } else if(this.currentGetSeries > 6){
      this.pointSum.innerHTML = `+50`
      this.point = this.point + 50;
    } else{ 
      this.point = this.point + 10;
    }
    this.renderPoint.innerHTML = `${this.point}`
  }

  timer() {
    this.seconds = 60;
    const timer = setInterval(() => {
      const timerShow: Element | null = <Element>this.page.querySelector(".timer");
      timerShow.innerHTML = `${this.seconds}`;
      --this.seconds;
      const exitGame = this.page.querySelector(".svg-exit");
      exitGame?.addEventListener('click',() => clearInterval(timer));
      console.log(timer)
      if(this.seconds === 0){
        this.page.insertAdjacentHTML('beforeend', renderSprintResultAnswer);
        this.localAudio();
        this.renderConclusion();
        this.renderPoint = <Element>this.page.querySelector('.point');
        this.pointSum = <Element>this.page.querySelector('.point-sum');
        this.renderPoint.textContent = `0`;
        this.pointSum.textContent = `+10`;
        clearInterval(timer);
      }
    }, 1000)
  }

  localAudio(){
    ++this.sprintGameParam.gamesPlayed;
    this.sprintGameParam.bestSeries = this.localSeries;
    const getLocal: string | null = localStorage.getItem('sprintGameParam');
    if(getLocal === null){ 
      localStorage.setItem('sprintGameParam', JSON.stringify(this.sprintGameParam));
    } else {
      const parseObg: IGameParam = JSON.parse(getLocal);
      const endGame = this.sprintGameParam.gamesPlayed + parseObg.gamesPlayed;
      this.sprintGameParam.gamesPlayed = endGame ;
      this.sprintGameParam.trueAnswers = this.localTrueAnswer + parseObg.trueAnswers;
      if(this.localSeries > parseObg.bestSeries){
        this.sprintGameParam.bestSeries = this.localSeries;
        setLocalStorage('sprintGameParam', this.sprintGameParam);
      }else{
        this.sprintGameParam.bestSeries = parseObg.bestSeries;
        setLocalStorage('sprintGameParam', this.sprintGameParam);
      }
    }
    this.localTrueAnswer = 0;
    this.sprintGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
    this.localSeries = 0;
    this.currentGetSeries = 0;
    this.point = 0;
  }

  renderConclusion() {
    const amountPoints = <Element>document.querySelector('.quantity-true-points');
    const amountPercent = <HTMLElement>document.querySelector('.percent-answers');
    const amountSprintTrueAnswer = <HTMLElement>document.querySelector('.game-true-answer');
    const amountSprintFalseAnswer = <HTMLElement>document.querySelector('.game-false-answer');
    const numberSprintTrueAnswer = <HTMLElement>document.querySelector('.number-amount-green');
    const numberSprintFalseAnswer = <HTMLElement>document.querySelector('.number-amount-red');
    const nextGame = <HTMLElement>document.querySelector('.next-game');
    numberSprintTrueAnswer.textContent = `${this.pointTrue}`;
    numberSprintFalseAnswer.textContent = `${this.pointFalse}`;
    renderResult(this.localTotalWordssMistakes, amountSprintFalseAnswer);
    renderResult(this.localTotalWordssRight, amountSprintTrueAnswer);
    const maxPercent = Math.round((this.localTrueAnswer/this.count) * 100);
    amountPoints.textContent= `${this.point} Очков`;
    if(isNaN(maxPercent)){
      amountPercent.textContent = `${0}%`;
      amountPercent.style.background = `red`;
    }else{
      amountPercent.textContent = `${maxPercent}%`;
      amountPercent.style.background = `linear-gradient(to right, green ${maxPercent}%, red ${100 - maxPercent}%)`;
    }
    this.count = 0;
    this.localTotalWordssRight = [];
    this.localTotalWordssMistakes = [];
    this.pointTrue = 0;
    this.pointFalse = 0;
    nextGame.addEventListener('click',() => this.render());
    nextGame.addEventListener('click',() => this.clearPage());
    nextGame.addEventListener('click',() => this.timer());
  }

  clearPage() {
    const clearTable: HTMLElement | null = <HTMLElement>document.querySelector('.window-open-answer');
    if(clearTable !== null){
      clearTable.remove();
    }
    const clearAnswers: HTMLElement | null = <HTMLElement>document.querySelector('.contain-answer-button');
    clearAnswers.remove();
  }

}
export default SprintPage;
