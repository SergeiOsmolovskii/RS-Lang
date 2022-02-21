import "./audioCallPage.css";
import { insertElement, getRandom, clicker, renderResult } from "../../services/services";
import { getWords, IWords } from '../../api/getWords';
import { renderGame, renderNextButton, renderProgressGame, renderSvgExit } from "../../services/renderFormAudioCall";
import { renderSprintResultAnswer } from "../../services/renderFormSprint";
import MiniGamesPage from "../games/game";
import { IGameParam, storage } from '../../api/api';
import { getLocalStorage, setLocalStorage } from "../../services/storage";
import { getAllAggregatedWords } from "../../api/aggregatedWords";
import { getUserStatistic, setUserStatistic } from "../../api/statistic";
import { putBackEndFalseAnswer, putBackEndTrueAnswer } from "../../services/statistic";

class AudioCallPage extends MiniGamesPage {
  private answerOne: HTMLElement | null = null;
  private answerTwo: HTMLElement | null = null;
  private answerThree: HTMLElement | null = null;
  private answerFour: HTMLElement | null = null;
  private answerFife: HTMLElement | null = null;
  private audioCallGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
  private sprintGameParam: IGameParam = {newWords: 0, trueAnswers: 0, bestSeries: 0, gamesPlayed: 0};
  private localTotalWordssRight: IWords[] = [];
  private localTotalWordssMistakes: IWords[] = [];
  private resultFetch: any = [];
  private listContainer: HTMLElement[] | null = [];
  private audioPlay: any = null;
  private containButton: Element | null = null;
  private progress: any = null;
  private currentGetSeries: number = 0;
  private localSeries: number = 0;
  private localTrueAnswer: number = 0;
  private localWrongAnswer: number = 0;
  private freeResultAnswer!: (e: Event) => void;
  private freeAudioAnswer!: (e: Event) => void;
  private freeKeyBord!: (e: KeyboardEvent) => void;
  private userStatistic: import("../../api/api").IStatistic | undefined;
  private exceptionalValues: string[] = [];

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
      this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    } else if(modes === 'filtrWords' && storage.isAuthorized){
      this.resultFetch = await getAllAggregatedWords(`${group}`, `${page}`,'20', `{"$or": [{"userWord.difficulty":null}, {"userWord.difficulty":"easy"}]}`);
    } else if(modes === 'normal' && storage.isAuthorized){
      this.resultFetch = await getAllAggregatedWords(`${this.checkNumber}`, `0`,'20', `{"page":${getRandom(0, 29)}}`);
    }
    this.resultFetch.sort(() => Math.random() - 0.5);
    this.renderPage();
    return this.page;
  }

  renderPage() {
    if(!document.querySelector('.answer-point')){
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
      this.page.insertAdjacentHTML('beforeend', renderProgressGame);
    }
    this.page.insertAdjacentHTML('beforeend', renderGame);
    this.answerOne = <HTMLElement>this.page.querySelector('.answer-item-1');
    this.answerTwo = <HTMLElement>this.page.querySelector('.answer-item-2');
    this.answerThree = <HTMLElement>this.page.querySelector('.answer-item-3');
    this.answerFour = <HTMLElement>this.page.querySelector('.answer-item-4');
    this.answerFife = <HTMLElement>this.page.querySelector('.answer-item-5');
    this.listContainer = Array.from(this.page.querySelectorAll('.answer-item'));
    this.progress = this.page.querySelectorAll('.heart');
    const arrAnswer = [this.answerOne, this.answerTwo, this.answerThree, this.answerFour, this.answerFife];
    const arr = [];
    for(let i = 0, pos = 0; pos < 5; i++, pos++) {
      arr.push(this.resultFetch[i + this.count].wordTranslate);
    }
    arr.sort(() => Math.random() - 0.5);
    for(let i = 0; i < 5; i++ ) {
      arrAnswer[i].textContent = arr[i];
    }
    const exitPage = <HTMLLinkElement>this.page.querySelector('.svg-exit');

    const keyBordClick = (e: KeyboardEvent) => {
      switch(e.keyCode){
        case 49 :
          this.resultAnswerKeybord(<HTMLElement>this.answerOne);
          break
        case 50:
          this.resultAnswerKeybord(<HTMLElement>this.answerTwo);
          break
        case 51:
          this.resultAnswerKeybord(<HTMLElement>this.answerThree);
          break
        case 52 :
          this.resultAnswerKeybord(<HTMLElement>this.answerFour);
          break
        case 53 :
          this.resultAnswerKeybord(<HTMLElement>this.answerFife);
          break
        case 27 :
          if(getLocalStorage('mode') === 'normal'){
            location.href = `/#game`;
          }else{
            location.href = `/#textbook`;
          }
          break
      }
    }
    if(getLocalStorage('mode') === 'normal'){
      exitPage.href = '/#game';
    }else{
      exitPage.href = '/#textbook';
    }
    this.freeKeyBord = (e: KeyboardEvent) => keyBordClick(e);
    document.addEventListener('keyup', this.freeKeyBord);
    this.freeResultAnswer = (e: Event) => this.resultAnswer(e);
    this.freeAudioAnswer = () => clicker(this.audioPlay);
    this.listContainer.forEach(el => el.addEventListener('click', this.freeResultAnswer));
    const audioNew: HTMLAudioElement = new Audio(`https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].audio}`);
    this.audioPlay = this.page.querySelector('.svg-volume');
    this.audioPlay?.addEventListener('click', this.freeAudioAnswer);
    this.audioPlay?.addEventListener('click', () => audioNew.play());
    audioNew.muted;
    audioNew.play();
  }

  resultAnswer(e: Event) {
    this.audioPlay?.removeEventListener('click', this.freeAudioAnswer);
    this.listContainer?.forEach(el => el.removeEventListener('click', this.freeResultAnswer));
    document.removeEventListener('keyup', this.freeKeyBord);
    this.containButton = this.page.querySelector('.answers');
    if(this.audioPlay !== null) {
      const target = e.target as HTMLElement;
      if(target.innerText === this.resultFetch[this.count].wordTranslate) {
        putBackEndTrueAnswer(this.resultFetch, this.count);
        target.style.backgroundColor = "#32cd32";
        target.style.color = "#ffffff";
        target.classList.add('animate-color');
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #32cd32)";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].image}) center no-repeat`;
        const equation: Element = document.createElement('div');
        this.audioPlay.append(equation)
        this.containButton?.insertAdjacentHTML('afterend', renderNextButton);
        this.localTotalWordssRight.push(this.resultFetch[this.count]);
        ++this.currentGetSeries;
        ++this.audioCallGameParam.trueAnswers;
        ++this.localTrueAnswer;
        ++this.count;
        if(this.localSeries < this.currentGetSeries){
          this.localSeries = this.currentGetSeries;
        }
      } else {
        ++this.localWrongAnswer;
        putBackEndFalseAnswer(this.resultFetch, this.count);
        target.style.backgroundColor = "#da6f63";
        target.style.border = "2px";
        this.localTotalWordssMistakes.push(this.resultFetch[this.count]);
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #fa8072)";
        target.classList.add('animate-color');
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].image}) center no-repeat`;
        this.audioPlay.style.width = '300px'
        this.audioPlay.classList.add('animate-img');
        this.containButton?.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        if(this.localSeries < this.currentGetSeries){
          this.localSeries = this.currentGetSeries;
        }
        this.currentGetSeries = 0;
      }
    }
    const nextStep = <Element>this.page.querySelector('.next-word');
    const nextStepFunction = () => {
      this.clearNextPage();
      this.renderPage();
    }

    nextStep.addEventListener('click', nextStepFunction);
    if(this.count === 15){
      this.putDateBack();
      this.localaudioCall();
      nextStep.innerHTML = 'Результат';
      nextStep.removeEventListener('click', nextStepFunction);
      nextStep.addEventListener('click', () => {
      this.clearNextPage();
      this.renderConclusion();
      });
    }
  }

  localaudioCall() {
    ++this.audioCallGameParam.gamesPlayed;
    this.audioCallGameParam.bestSeries = this.localSeries;
    const finalArr = [...this.localTotalWordssMistakes, ...this.localTotalWordssRight];
    const getLocal: string | null = localStorage.getItem('audioCallGameParam');
    const getLocalAmountWords: string | null = localStorage.getItem('totalWord');
    const arrWord = finalArr.map(item => item.word);
    this.exceptionalValues = [...new Set(arrWord)];
    if(getLocal === null || getLocalAmountWords === null){
      this.audioCallGameParam.newWords = arrWord.length
      setLocalStorage('audioCallGameParam', this.audioCallGameParam);
      setLocalStorage('totalWord', this.exceptionalValues);
      setLocalStorage('sprintGameParam',this.sprintGameParam);
    } else {
      const parseTotalWord: string[] = JSON.parse(getLocalAmountWords);
      const filtWord = this.exceptionalValues.filter(item => !parseTotalWord.includes(item));
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

  async putDateBack () {
    if(storage.isAuthorized) {
      this.userStatistic = await getUserStatistic();
      const getJson = JSON.parse(this.userStatistic.optional.maxWords);
      const filterValuesWords = this.exceptionalValues.filter(item => !getJson.includes(item)); 
      const joinValuesWords = [...filterValuesWords,...getJson];
      const jsonWords = JSON.stringify(joinValuesWords);
      if(this.userStatistic.optional.maxWords === '[]'){
        this.userStatistic.optional.games.audioCall.newWords = 15;
      } else {
        this.userStatistic.optional.games.audioCall.newWords = this.userStatistic.optional.games.audioCall.newWords + filterValuesWords.length;
      }
      let wordsPerDateMap = new Map(Object.entries(this.userStatistic.optional.general));
      wordsPerDateMap.set(new Date().toLocaleDateString(), joinValuesWords.length);
      if(this.userStatistic.optional.games.audioCall.bestSeries < this.localSeries){
        this.currentGetSeries = this.localSeries;
      }else{
        this.currentGetSeries = this.userStatistic.optional.games.audioCall.bestSeries;
      }
      await setUserStatistic(storage.userId, {
        learnedWords: 0,
        optional: {
          general: Object.fromEntries(wordsPerDateMap),
          games: {
            sprint: {
              newWords: this.userStatistic.optional.games.sprint.newWords,
              trueAnswers: this.userStatistic.optional.games.sprint.trueAnswers,
              bestSeries: this.userStatistic.optional.games.sprint.bestSeries,
              gamesPlayed: this.userStatistic.optional.games.sprint.gamesPlayed,
              wrongAnswers: this.userStatistic.optional.games.sprint.wrongAnswers,
            },
            audioCall: {
              newWords:  this.userStatistic.optional.games.audioCall.newWords,
              trueAnswers: this.userStatistic.optional.games.audioCall.trueAnswers + this.localTrueAnswer,
              bestSeries: this.currentGetSeries,
              gamesPlayed: this.userStatistic.optional.games.audioCall.gamesPlayed + 1,
              wrongAnswers: this.userStatistic.optional.games.audioCall.wrongAnswers + this.localWrongAnswer,
            }
          },
          maxWords: jsonWords
        }
      });
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
    this.localWrongAnswer = 0;
    this.localSeries = 0;
    this.currentGetSeries = 0;
    this.count = 0;
    this.localTotalWordssRight = [];
    this.localTotalWordssMistakes = [];
    this.localTrueAnswer = 0;
    document.onkeyup = (e: KeyboardEvent) =>{
      if(e.keyCode === 13){
        this.render();
        this.clearPage();
      }
    }
    nextGame.addEventListener('click',() =>{
      this.render();
      this.clearPage();
    });
  }

  clearNextPage() {
    const clearVolumePosition: Element | null = <Element>this.page.querySelector('.img-volume-position');
    const clearAnswers: Element | null = <Element>this.page.querySelector('.answers');
    const clearNextStep: Element | null = <Element>this.page.querySelector('.next-word');
    console.log()
    clearNextStep.remove();
    clearVolumePosition.remove();
    clearAnswers.remove();
  }

  resultAnswerKeybord(el: HTMLElement) {
    this.audioPlay?.removeEventListener('click', this.freeAudioAnswer);
    document.removeEventListener('keyup', this.freeKeyBord);
    this.listContainer?.forEach(el => el.removeEventListener('click', this.freeResultAnswer));
    this.containButton = this.page.querySelector('.answers');
    if(this.audioPlay !== null) {
      if(el.innerText === this.resultFetch[this.count].wordTranslate) {
        putBackEndTrueAnswer(this.resultFetch, this.count);
        el.style.backgroundColor = "#32cd32";
        el.style.color = "#ffffff";
        el.classList.add('animate-color');
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #32cd32)";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].image}) center no-repeat`;
        const equation: Element = document.createElement('div');
        this.audioPlay.append(equation)
        this.containButton?.insertAdjacentHTML('afterend', renderNextButton);
        this.localTotalWordssRight.push(this.resultFetch[this.count]);
        ++this.currentGetSeries;
        ++this.audioCallGameParam.trueAnswers;
        ++this.localTrueAnswer;
        ++this.count;
        if(this.localSeries < this.currentGetSeries){
          this.localSeries = this.currentGetSeries;
        }
      } else {
        ++this.localWrongAnswer;
        putBackEndFalseAnswer(this.resultFetch, this.count);
        el.style.backgroundColor = "#da6f63";
        el.style.border = "2px";
        this.localTotalWordssMistakes.push(this.resultFetch[this.count]);
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #fa8072)";
        el.classList.add('animate-color');
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.count].image}) center no-repeat`;
        this.audioPlay.style.width = '300px'
        this.audioPlay.classList.add('animate-img');
        this.containButton?.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        if(this.localSeries < this.currentGetSeries){
          this.localSeries = this.currentGetSeries;
        }
        this.currentGetSeries = 0;
      }
    }
    const nextStep = <Element>this.page.querySelector('.next-word');
    const nextStepFunction = () => {
      this.clearNextPage();
      this.renderPage();
    }
    nextStep.addEventListener('click', nextStepFunction);
    if(this.count === 15){
      this.putDateBack();
      this.localaudioCall();
      nextStep.innerHTML = 'Результат';
      nextStep.removeEventListener('click', nextStepFunction);
      nextStep.addEventListener('click', () => {
      this.clearNextPage();
      this.renderConclusion();
      });
    }
  }
}
export default AudioCallPage;
