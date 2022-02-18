import "./sprintPage.css"
import { insertElement, getRandom, changeQuoteNumber, renderResult, putBackEndTrueAnswer, putBackEndFalseAnswer } from "../../services/services";
import MiniGamesPage from "../games/gamePage";
import { renderTimerForm, renderFormSprintGame, renderSvgExit, renderFormSprintProgress, renderFormSptintAnswerButton, renderSprintResultAnswer } from "../../services/renderFormSprint";
import { getWords, IWords } from '../../api/getWords';
import { IGameParam, storage } from '../../api/api';
import { getLocalStorage, setLocalStorage } from "../../services/storage";
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
  private count: number = 0;
  private getFetch: IWords[] = [];
  private pageStr: number = 0;

  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['sprint-page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.checkData();
    this.pageStr = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
    const group = getLocalStorage('group') ? Number(getLocalStorage('group')) : 0;
    const modes = getLocalStorage('mode') ? getLocalStorage('mode') : 0;
    for(let i = 0; i < 6; i++){
      if(!storage.isAuthorized){
        this.getFetch = await getWords(getRandom(0, 29), this.checkNumber);
      } else if(modes === 'filtrWords' && storage.isAuthorized){
        if(this.pageStr === 0){
          this.getFetch = await getAllAggregatedWords(`${group}`, `${this.pageStr}`,'20', `{"$or": [{"userWord.difficulty":null}, {"userWord.difficulty":"easy"}]}`);
          ++this.pageStr
        }else if(this.pageStr === 29){
          this.getFetch = await getAllAggregatedWords(`${group}`, `${this.pageStr}`,'20', `{"$or": [{"userWord.difficulty":null}, {"userWord.difficulty":"easy"}]}`);
          --this.pageStr
        }else{
          this.getFetch = await getAllAggregatedWords(`${group}`, `${this.pageStr}`,'20', `{"$or": [{"userWord.difficulty":null}, {"userWord.difficulty":"easy"}]}`);
          ++this.pageStr
        }
      } else if(modes === 'normal' && storage.isAuthorized){
        this.getFetch = await getAllAggregatedWords(`${this.checkNumber}`, `0`,'20', `{"page":${getRandom(0, 29)}}`);
      } 
      this.resultFetch = [...this.resultFetch,...this.getFetch];
    }
    this.resultFetch.sort(() => Math.random() - 0.5);
    console.log(this.resultFetch)
    this.renderPage();
    return this.page;
  }


  renderPage(){
    if(!this.page.querySelector('.point-progress')){
      this.timer();
      this.page.insertAdjacentHTML('beforeend', renderFormSprintProgress);
      this.page.insertAdjacentHTML('beforeend', renderTimerForm);
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
      this.page.insertAdjacentHTML('beforeend', renderFormSprintGame);
      this.page.insertAdjacentHTML('beforeend', renderFormSptintAnswerButton);
    }
    this.choiseFalseAnswer = <HTMLElement>this.page.querySelector('.arrow-position-left');
    this.choiseTrueAnswer = <HTMLElement>this.page.querySelector('.arrow-position-right');
    this.englishWord = <HTMLElement>this.page.querySelector('.english-word');
    this.russianWord = <HTMLElement>this.page.querySelector('.russian-word');

    this.trueAnswer = getRandom(this.count, 1 + this.count);
    this.englishWord.textContent = `${this.resultFetch[this.count].word}`;
    this.russianWord.textContent = `${this.resultFetch[this.trueAnswer].wordTranslate}`;
    // console.log(this.count)
    console.log(this.resultFetch[this.trueAnswer])

    this.linkLeft = () => this.choiseDirectionLeft();
    this.linkRight = () => this.choiseDirectionRight();
    // this.page.contain-answer-button
    this.choiseFalseAnswer.addEventListener('click', this.linkLeft);
    this.choiseTrueAnswer.addEventListener('click', this.linkRight);
    return this.page;
  }

  choiseDirectionLeft () {
    this.englishWord = <HTMLElement>this.page.querySelector('.english-word');
    this.russianWord = <HTMLElement>this.page.querySelector('.russian-word');
    this.trueAnswer = getRandom(this.count, 1 + this.count);
    this.englishWord.textContent = `${this.resultFetch[this.count].word}`;
    this.russianWord.textContent = `${this.resultFetch[this.trueAnswer].wordTranslate}`;
    ++this.count;
    if(this.englishWord?.innerHTML !== this.resultFetch[this.trueAnswer].word){
      this.choiseRight();
    }else{
      this.choiseWrong();
    }
    this.progress = this.page.querySelectorAll('.arrow');
    changeQuoteNumber(this.progress);
    this.clearPage ();
  }

  choiseDirectionRight () {
    this.englishWord = <HTMLElement>this.page.querySelector('.english-word');
    this.russianWord = <HTMLElement>this.page.querySelector('.russian-word');
    this.trueAnswer = getRandom(this.count, 1 + this.count);
    this.englishWord.textContent = `${this.resultFetch[this.count].word}`;
    this.russianWord.textContent = `${this.resultFetch[this.trueAnswer].wordTranslate}`;
    ++this.count;
    if (this.englishWord?.innerHTML === this.resultFetch[this.trueAnswer].word){
      this.choiseRight();
    } else {
      this.choiseWrong();
    }
    this.progress = this.page.querySelectorAll('.arrow');
    changeQuoteNumber(this.progress);
    this.clearPage ();
  }

  async choiseWrong () {
    await putBackEndFalseAnswer(this.resultFetch, this.trueAnswer);
    if (this.localSeries < this.currentGetSeries){
      this.localSeries = this.currentGetSeries;
    }
    this.currentGetSeries = 0;
    this.localTotalWordssMistakes.push(this.resultFetch[this.trueAnswer]);
  }

  async choiseRight () {
    // console.log('угадал')
    await putBackEndTrueAnswer(this.resultFetch, this.trueAnswer);
    ++this.currentGetSeries;
    ++this.sprintGameParam.trueAnswers;
    ++this.localTrueAnswer;
    if (this.localSeries < this.currentGetSeries){
      this.localSeries = this.currentGetSeries;
    }
    this.localTotalWordssRight.push(this.resultFetch[this.trueAnswer]);
    this.renderPoint = <Element>this.page.querySelector('.point');
    this.pointSum = <Element>this.page.querySelector('.point-sum');
    if (this.currentGetSeries > 3 && this.currentGetSeries < 6){
      this.pointSum.innerHTML = `+25`
      this.point = this.point + 25;
    } else if (this.currentGetSeries > 6){
      this.pointSum.innerHTML = `+50`
      this.point = this.point + 50;
    } else { 
      this.point = this.point + 10;
    }
    this.renderPoint.innerHTML = `${this.point}`
  }

  timer () {
    this.seconds = 30;
    const timer = setInterval(async () => {
      const timerShow: Element | null = <Element>this.page.querySelector(".timer");
      timerShow.innerHTML = `${this.seconds}`;
      --this.seconds;
      const exitGame = this.page.querySelector(".svg-exit");
      exitGame?.addEventListener('click',() => clearInterval(timer));
      if (this.seconds === 0){
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

  localSprint (){
    ++this.sprintGameParam.gamesPlayed;
    this.sprintGameParam.bestSeries = this.localSeries;
    const finalArr: IWords[] = [...this.localTotalWordssMistakes, ...this.localTotalWordssRight];
    const getLocal: string | null = localStorage.getItem('sprintGameParam');
    const getLocalAmountWords: string | null = localStorage.getItem('totalWord');
    const arrWord = finalArr.map(item => item.word);
    const exceptionalValues = [...new Set(arrWord)];
    if (getLocal === null || getLocalAmountWords === null) { 
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
      if (this.localSeries > parseObg.bestSeries) {
        this.sprintGameParam.bestSeries = this.localSeries;
        setLocalStorage('sprintGameParam', this.sprintGameParam);
      } else {
        this.sprintGameParam.bestSeries = parseObg.bestSeries;
        setLocalStorage('sprintGameParam', this.sprintGameParam);
      }
    }
    this.sprintGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
    this.localSeries = 0;
    this.currentGetSeries = 0;
  }

  renderConclusion () {
    // this.choiseFalseAnswer?.removeEventListener('click', this.linkLeft);
    // this.choiseTrueAnswer?.removeEventListener('click', this.linkRight);
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

    if (isNaN(maxPercent)) {
      amountPercent.textContent = `${0}%`;
      amountPercent.style.background = `red`;
    } else {
      amountPercent.textContent = `${maxPercent}%`;
      amountPercent.style.background = `linear-gradient(to right, green ${maxPercent}%, red ${100 - maxPercent}%)`;
      amountPercent.style.transition = `0.7s linear`
    }
    this.localTrueAnswer = 0;
    this.count = 0;
    this.localTotalWordssRight = [];
    this.localTotalWordssMistakes = [];
    this.point = 0;
    this.resultFetch = [];
    nextGame.addEventListener('click', () =>{
      this.choiseFalseAnswer?.removeEventListener('click', this.linkLeft);
      this.choiseTrueAnswer?.removeEventListener('click', this.linkRight);
      this.render();
      this.clearPage();
      this.timer();
    });
  }

  clearPage () {
    const clearTable: HTMLElement | null = <HTMLElement>document.querySelector('.window-open-answer');
    if(clearTable !== null){
      clearTable.remove();
    }
    // const clearAnswers: HTMLElement | null = <HTMLElement>document.querySelector('.contain-answer-button');
    // clearAnswers.remove();
  }

}
export default SprintPage;
