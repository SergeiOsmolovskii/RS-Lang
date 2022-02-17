import "./audioCallPage.css";
import { insertElement, getRandom, clicker, renderResult, shuffle } from "../../services/services";
import { getWords, IWords } from '../../api/getWords';
import { renderGame, renderNextButton, renderProgressGame, renderSvgExit } from "../../services/renderFormAudioCall";
import { renderSprintResultAnswer } from "../../services/renderFormSprint";
import MiniGamesPage from "../games/game";
import { IAggregatedWord, IGameParam, storage } from '../../api/api';
import { getLocalStorage, setLocalStorage } from "../../services/storage";
import { getAllAggregatedWords } from "../../api/aggregatedWords";
import { Difficulty } from "../../options/options";

class AudioCallPage extends MiniGamesPage {
  private answerOne: Element | null = null;
  private answerTwo: Element | null = null;
  private answerThree: Element | null = null;
  private answerFour: Element | null = null;
  private answerFife: Element | null = null;
  private audioCallGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
  private sprintGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
  private localTotalWordssRight: IWords[] = [];
  private localTotalWordssMistakes: IWords[] = [];
  private getFetch: IWords[] = [];
  private resultFetch: IWords[] = [];
  private listContainer: Element | null = null;
  private audioPlay: any = null;
  // private trueAnswer: number = 0;
  private progress: any = null;
  private currentGetSeries: number = 0;
  private localSeries: number = 0;
  private localTrueAnswer: number = 0;
  private freeResultAnswer!: (e: Event) => void;
  private freeAudioAnswer!: (e: Event) => void;
  private count: number = 0;

  constructor(id: string) {
    super(id);
    this.page = insertElement("main", ["audio-call-page"], "", "");
  }
  
  async render(): Promise<HTMLElement>{
    this.checkData();
    const page = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
    const group = getLocalStorage('group') ? Number(getLocalStorage('group')) : 0;
    const modes = getLocalStorage('mode') ? getLocalStorage('mode') : 0;
    if(!storage.isAuthorized){
      this.getFetch = await getWords(getRandom(0, 29), this.checkNumber);
    } else if(modes === 'filtrWords'){
      this.getFetch = await getAllAggregatedWords(`${group}`, `${page}`,'20', `{"$or": [{"userWord.difficulty":null}, {"userWord.difficulty":"easy"}]}`);

    } else if(modes === 'normal'){
      this.getFetch = await getAllAggregatedWords(`${this.checkNumber}`, `0`,'20', `{"page":${getRandom(0, 29)}}`);
    };
    const _ = require('lodash');
    this.resultFetch =  _.cloneDeep(this.getFetch);
    this.resultFetch.sort( () => Math.random() - 0.5);
    this.renderPage();
    return this.page;
  }

  renderPage() {
    if(!document.querySelector('.answer-point')){
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
      this.page.insertAdjacentHTML('beforeend', renderProgressGame);;
    }
    this.page.insertAdjacentHTML('beforeend', renderGame);
    this.answerOne = <Element>this.page.querySelector('.answer-item-1');
    this.answerTwo = <Element>this.page.querySelector('.answer-item-2');
    this.answerThree = <Element>this.page.querySelector('.answer-item-3');
    this.answerFour = <Element>this.page.querySelector('.answer-item-4');
    this.answerFife = <Element>this.page.querySelector('.answer-item-5');
    this.listContainer = <Element>this.page.querySelector('.answers');
    this.progress = this.page.querySelectorAll('.heart');
    const arrAnswer = [this.answerOne, this.answerTwo, this.answerThree, this.answerFour, this.answerFife];
    arrAnswer.sort(() => Math.random() - 0.5);
    const perm = this.count
    // const lengthSeria = arrAnswer.length + perm;
    for(let i = perm, pos = 0; i < (5 + perm); i++, pos++){

      arrAnswer[pos].textContent = `0`;
      
    }
    this.freeResultAnswer = (e: Event) => this.resultAnswer(e);
    this.freeAudioAnswer = () => clicker(this.audioPlay);
    console.log(this.page)
    this.listContainer.addEventListener('click', this.freeResultAnswer);

    const audioNew: HTMLAudioElement = new Audio(`https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].audio}`);
    this.audioPlay = this.page.querySelector('.svg-volume');
    this.audioPlay?.addEventListener('click', this.freeAudioAnswer);
    this.audioPlay?.addEventListener('click', () => audioNew.play());
    audioNew.muted;
    audioNew.play();
  }

  resultAnswer(e: Event) {
    this.audioPlay?.removeEventListener('click', this.freeAudioAnswer);
    // this.listContainer?.removeEventListener('click', this.freeResultAnswer);
    if(this.audioPlay !== null) {
      const target = e.target as HTMLElement; 
      if(target.innerText === this.resultFetch[this.count].wordTranslate) {
        target.style.backgroundColor = "#32cd32";
        target.classList.add('animate-color');
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #32cd32)";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].image}) center no-repeat`;
        this.listContainer?.insertAdjacentHTML('afterend', renderNextButton);
        this.localTotalWordssRight.push(this.resultFetch[this.count]);
        ++this.currentGetSeries;
        ++this.audioCallGameParam.trueAnswers;
        ++this.localTrueAnswer;
        ++this.count;
        if(this.localSeries < this.currentGetSeries){
          this.localSeries = this.currentGetSeries;
        }
      } else {
        this.localTotalWordssMistakes.push(this.resultFetch[this.count]);
        target.style.backgroundColor = "#da6f63";
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #fa8072)";
        target.classList.add('animate-color');
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].image}) center no-repeat`;
        this.audioPlay.classList.add('animate-img');
        this.listContainer?.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        if(this.localSeries < this.currentGetSeries){
          this.localSeries = this.currentGetSeries;
        }
        this.currentGetSeries = 0;
      }
    }
    const nextStep = <Element>this.page.querySelector('.next-word');
    const nextStepFunction = () => this.renderPage();
    nextStep.addEventListener('click', nextStepFunction);
    nextStep.addEventListener('click', () => this.clearNextPage());
    if(this.count === 15){
      this.localaudioCall();
      nextStep.innerHTML = 'Результат';
      nextStep.removeEventListener('click', nextStepFunction);
      nextStep.addEventListener('click', () => this.renderConclusion());
    }
  }

  localaudioCall(){
    ++this.audioCallGameParam.gamesPlayed;
    this.audioCallGameParam.bestSeries = this.localSeries;
    const finalArr: IWords[] = [...this.localTotalWordssMistakes, ...this.localTotalWordssRight];
    const getLocal: string | null = localStorage.getItem('audioCallGameParam');
    const getLocalAmountWords: string | null = localStorage.getItem('totalWord');
    const arrWord = finalArr.map(item => item.word);
    const exceptionalValues = [...new Set(arrWord)];
    
    if(getLocal === null || getLocalAmountWords === null){
      this.audioCallGameParam.newWords = arrWord.length
      setLocalStorage('audioCallGameParam', this.audioCallGameParam);
      setLocalStorage('totalWord', exceptionalValues);
      setLocalStorage('sprintGameParam',this.sprintGameParam);
    } else {
      const parseTotalWord: string[] = JSON.parse(getLocalAmountWords);
      const filtWord = exceptionalValues.filter(item => !parseTotalWord.includes(item));
      const resultExceptionalValues = [...parseTotalWord,...filtWord];
      setLocalStorage('totalWord', resultExceptionalValues);
      const parseAnswerWord: IGameParam = JSON.parse(getLocal);
      this.audioCallGameParam.newWords = parseAnswerWord.newWords + filtWord.length;
      const parseAnswers: IGameParam = JSON.parse(getLocal);
      const endGame = this.audioCallGameParam.gamesPlayed + parseAnswers.gamesPlayed;
      this.audioCallGameParam.gamesPlayed = endGame;
      this.audioCallGameParam.trueAnswers = this.localTrueAnswer + parseAnswers.trueAnswers;
      if(this.localSeries > parseAnswers.bestSeries){
        this.audioCallGameParam.bestSeries = this.localSeries;
        setLocalStorage('audioCallGameParam', this.audioCallGameParam);
      }else{
        this.audioCallGameParam.bestSeries = parseAnswers.bestSeries;
        setLocalStorage('audioCallGameParam', this.audioCallGameParam);
      }
    }
  }

  renderConclusion() {
    this.page.insertAdjacentHTML('beforeend', renderSprintResultAnswer);
    const amountPercent = <HTMLElement>document.querySelector('.percent-answers');
    const amountSprintTrueAnswer = <HTMLElement>document.querySelector('.game-true-answer');
    const amountSprintFalseAnswer = <HTMLElement>document.querySelector('.game-false-answer');
    const numberSprintTrueAnswer = <HTMLElement>document.querySelector('.number-amount-green');
    const numberSprintFalseAnswer = <HTMLElement>document.querySelector('.number-amount-red');
    const nextGame = <HTMLElement>document.querySelector('.next-game');
    numberSprintTrueAnswer.textContent = `${this.localTrueAnswer}`;
    numberSprintFalseAnswer.textContent = `${this.count - this.localTrueAnswer}`;
    renderResult(this.localTotalWordssMistakes, amountSprintFalseAnswer);
    renderResult(this.localTotalWordssRight, amountSprintTrueAnswer);

    const maxPercent = Math.round((this.localTrueAnswer/this.count) * 100);
    if(isNaN(maxPercent)){
      amountPercent.textContent = `${0}%`;
      amountPercent.style.background = `red`;
    }else{
      amountPercent.textContent = `${maxPercent}%`;
      amountPercent.style.background = `linear-gradient(to right, green ${maxPercent}%, red ${100 - maxPercent}%)`;
    }
    this.audioCallGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
    this.localSeries = 0;
    this.currentGetSeries = 0;
    this.localTrueAnswer = 0;
    this.count = 0;
    this.localTotalWordssRight = [];
    this.localTotalWordssMistakes = [];
    this.localTrueAnswer = 0;
    nextGame.addEventListener('click',() => this.render());
    nextGame.addEventListener('click',() => this.clearPage());
  }

  clearNextPage() {
    const clearVolumePosition: Element | null = <Element>this.page.querySelector('.img-volume-position');
    const clearAnswers: Element | null = <Element>this.page.querySelector('.answers');
    const clearNextStep: Element | null = <Element>this.page.querySelector('.next-word');
    clearNextStep.remove();
    clearVolumePosition.remove();
    clearAnswers.remove();
  }

}
export default AudioCallPage;
