import "./sprintPage.css"
import { insertElement, getRandom, shuffle, changeQuoteNumber, renderResult, playAudio } from "../../services/services";
import MiniGamesPage from "../games/game";
import { renderTimerForm, renderFormSprintGame, renderSvgExit, renderFormSprintProgress, renderFormSptintAnswerButton, renderSprintResultAnswer } from "../../services/renderFormSprint";
import { getWords, IWords } from '../../api/getWords';
import { IGameParam, storage } from '../../api/api';
import { setLocalStorage } from "../../services/storage";
import { getAllAggregatedWords } from '../../api/aggregatedWords';


class SprintPage extends MiniGamesPage {
  private choiseFalseAnswer: Element | null = null;
  private choiseTrueAnswer: Element | null = null;
  private renderPoint: Element | null = null;
  private pointSum: Element | null = null;
  private resultFetch: IWords[] = [];
  private trueAnswer: number = 0;
  private englishWord: Element | null = null;
  private russianWord: Element | null = null;
  private localSeries: number = 0;
  private currentGetSeries: number = 0;
  private sprintGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
  private audioCallGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
  private localTrueAnswer: number = 0;
  private point: number = 0;
  private progress: any = null;
  private localTotalWordssRight: IWords[] = [];
  private localTotalWordssMistakes: IWords[] = [];
  private seconds: number = 60;
  private linkRight!: (e: Event) => void;
  private linkLeft!: (e: Event) => void;


  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['sprint-page'], '','');
  }

  async render(): Promise<HTMLElement> {
    // if(!storage.isAuthorized){
      this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    // } else {
      // const page = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
      // const group = getLocalStorage('group') ? Number(getLocalStorage('group')) : 0;
      // await getAllAggregatedWords(`${group}`, '0', '20', `{"page":${page}},{"userWord.difficulty":"${stydied.hardWords}"}`);
    // }



    this.checkData();
    if(!this.page.querySelector('.point-progress')){
      this.timer();
      this.page.insertAdjacentHTML('beforeend', renderFormSprintProgress);
      this.page.insertAdjacentHTML('beforeend', renderTimerForm);
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
      this.page.insertAdjacentHTML('beforeend', renderFormSprintGame);
    }
    this.page.insertAdjacentHTML('beforeend', renderFormSptintAnswerButton);
    this.choiseFalseAnswer = <HTMLElement>this.page.querySelector('.arrow-position-left');
    this.choiseTrueAnswer = <HTMLElement>this.page.querySelector('.arrow-position-right');
    this.englishWord = <HTMLElement>this.page.querySelector('.english-word');
    this.russianWord = <Element>this.page.querySelector('.russian-word');
    const allAnswer = Array.from(Array(20).keys());
    const randomAll = shuffle(allAnswer);
    randomAll.length = 2;
    this.trueAnswer = randomAll[getRandom(0, 1)];
    this.englishWord.innerHTML = this.resultFetch[randomAll[1]].word;
    this.russianWord.innerHTML = this.resultFetch[this.trueAnswer].wordTranslate;
    this.linkLeft = () => this.choiseDirectionLeft();
    this.linkRight = () => this.choiseDirectionRight();
    this.choiseFalseAnswer.addEventListener('click', this.linkLeft);
    this.choiseTrueAnswer.addEventListener('click', this.linkRight);
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
    if(this.localSeries < this.currentGetSeries){
      this.localSeries = this.currentGetSeries;
    }
    this.currentGetSeries = 0;
    this.localTotalWordssMistakes.push(this.resultFetch[this.trueAnswer]);
  }

  choiseRight() {
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
    this.seconds = 10;
    const timer = setInterval(() => {
      const timerShow: Element | null = <Element>this.page.querySelector(".timer");
      timerShow.innerHTML = `${this.seconds}`;
      --this.seconds;
      const exitGame = this.page.querySelector(".svg-exit");
      exitGame?.addEventListener('click',() => clearInterval(timer));
      if(this.seconds === 0){
        this.page.insertAdjacentHTML('beforeend', renderSprintResultAnswer);
        this.localSprint();
        this.renderConclusion();
        this.renderPoint = <Element>this.page.querySelector('.point');
        this.pointSum = <Element>this.page.querySelector('.point-sum');
        this.renderPoint.textContent = `0`;
        this.pointSum.textContent = `+10`;
        clearInterval(timer);
      }
    }, 1000)
  }

  localSprint(){
    ++this.sprintGameParam.gamesPlayed;
    this.sprintGameParam.bestSeries = this.localSeries;
    const finalArr: IWords[] = [...this.localTotalWordssMistakes, ...this.localTotalWordssRight];
    const getLocal: string | null = localStorage.getItem('sprintGameParam');
    const getLocalAmountWords: string | null = localStorage.getItem('totalWord');
    const arrWord = finalArr.map(item => item.word);
    const exceptionalValues = [...new Set(arrWord)];
    if(getLocal === null || getLocalAmountWords === null){ 
      this.sprintGameParam.newWords = arrWord.length;
      localStorage.setItem('sprintGameParam', JSON.stringify(this.sprintGameParam));
      setLocalStorage('totalWord', exceptionalValues);
      setLocalStorage('audioCallGameParam' ,this.audioCallGameParam);
    } else {
      const parseTotalWord: string[] = JSON.parse(getLocalAmountWords);
      const filtWord = exceptionalValues.filter(item => !parseTotalWord.includes(item));
      const resultExceptionalValues = [...parseTotalWord,...filtWord];
      setLocalStorage('totalWord', resultExceptionalValues);
      const parseAnswerWord: IGameParam = JSON.parse(getLocal);
      this.sprintGameParam.newWords = parseAnswerWord.newWords + filtWord.length;
      const parseObg: IGameParam = JSON.parse(getLocal);
      const endGame = this.sprintGameParam.gamesPlayed + parseObg.gamesPlayed;
      this.sprintGameParam.gamesPlayed = endGame;
      this.sprintGameParam.trueAnswers = this.localTrueAnswer + parseObg.trueAnswers;
      if(this.localSeries > parseObg.bestSeries){
        this.sprintGameParam.bestSeries = this.localSeries;
        setLocalStorage('sprintGameParam', this.sprintGameParam);
      }else{
        this.sprintGameParam.bestSeries = parseObg.bestSeries;
        setLocalStorage('sprintGameParam', this.sprintGameParam);
      }
    }
    this.sprintGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
    this.localSeries = 0;
    this.currentGetSeries = 0;
  }

  renderConclusion() {
    this.choiseFalseAnswer?.removeEventListener('click', this.linkLeft);
    this.choiseTrueAnswer?.removeEventListener('click', this.linkRight);
    const amountPoints = <HTMLElement>document.querySelector('.quantity-true-points');
    const amountPercent = <HTMLElement>document.querySelector('.percent-answers');
    const amountSprintTrueAnswer = <HTMLElement>document.querySelector('.game-true-answer');
    const amountSprintFalseAnswer = <HTMLElement>document.querySelector('.game-false-answer');
    const numberSprintTrueAnswer = <HTMLElement>document.querySelector('.number-amount-green');
    const numberSprintFalseAnswer = <HTMLElement>document.querySelector('.number-amount-red');
    const nextGame = <HTMLElement>document.querySelector('.next-game');
    numberSprintFalseAnswer.textContent = `${this.count-this.localTrueAnswer}`;
    numberSprintTrueAnswer.textContent = `${this.localTrueAnswer}`;
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
      amountPercent.style.transition = `0.7s linear`
    }
    this.localTrueAnswer = 0;
    this.count = 0;
    this.localTotalWordssRight = [];
    this.localTotalWordssMistakes = [];
    this.point = 0;
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
