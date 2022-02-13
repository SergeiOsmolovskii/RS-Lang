import "./audioCallPage.css";
import { insertElement, getRandom, shuffle, clicker } from "../../services/services";
import { getWords, IWords } from '../../api/getWords';
import { renderGame, renderNextButton, renderProgressGame, renderSvgExit } from "../../services/renderForm";
import MiniGamesPage from "../games/game";

class AudioCallPage extends MiniGamesPage {
  private answerOne: Element | null = null;
  private answerTwo: Element | null = null;
  private answerThree: Element | null = null;
  private answerFour: Element | null = null;
  private answerFife: Element | null = null;
  private listContainer: Element | null = null;
  private resultFetch: IWords[] = [];
  private audioPlay: any = null;
  private trueAnswer: number = 0;
  private progress: any = null;
  private currentGetSeries: number = 0;
  private localSeries: number[] = [];
  private localTrueAnswer: number = 0;
  private freeResultAnswer!: (e: Event) => void;
  private freeAudioAnswer!: (e: Event) => void;

  constructor(id: string) {
    super(id);
    this.page = insertElement("main", ["audio-call-page"], "", "");
  }
  
  async render(): Promise<HTMLElement>{
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
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
    const allAnswer = Array.from(Array(20).keys());
    const randomAll = shuffle(allAnswer);
    randomAll.length = 5;
    this.trueAnswer = randomAll[getRandom(0, 4)];
    for(let i = 0; i < 5; i++){
      arrAnswer[i].innerHTML = this.resultFetch[randomAll[i]].wordTranslate;
    }
    this.freeResultAnswer = (e: Event) => this.resultAnswer(e);
    this.freeAudioAnswer = () => clicker(this.audioPlay);
    this.listContainer.addEventListener('click', this.freeResultAnswer, false);
    const audioNew: HTMLAudioElement = new Audio(`https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].audio}`);
    this.audioPlay = this.page.querySelector('.svg-volume');
    this.audioPlay?.addEventListener('click', this.freeAudioAnswer);
    this.audioPlay?.addEventListener('click', () => audioNew.play());
    audioNew.play();
    return this.page;
  }

  resultAnswer(e: Event) {
    this.audioPlay?.removeEventListener('click', this.freeAudioAnswer);
    this.listContainer?.removeEventListener('click', this.freeResultAnswer, false);
    if(this.audioPlay !== null) {
      const target = e.target as HTMLElement; 
      if(target.innerText === this.resultFetch[this.trueAnswer].wordTranslate) {
        target.style.backgroundColor = "#32cd32";
        target.classList.add('animate-color');
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #32cd32)";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].image}) center no-repeat`;
        this.listContainer?.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        ++this.currentGetSeries;
        ++this.localTrueAnswer;


        // let localTotalWords: any = JSON.parse(`${localStorage.getItem('audioCallWordsTotal')}`);
        //   if(localTotalWords === null) {
        //     localTotalWords = [this.resultFetch[this.trueAnswer].id];
        //     localStorage.setItem(`audioCallWordsTotal`, JSON.stringify(localTotalWords));
        //   } else if(!localTotalWords?.includes(this.resultFetch[this.trueAnswer].id)) {
        //     localTotalWords.push(this.resultFetch[this.trueAnswer].id);
        //     localStorage.setItem(`audioCallWordsTotal`, JSON.stringify(localTotalWords));
        //   }
      } else {
        target.style.backgroundColor = "#da6f63";
        this.progress[this.count].style.background = "linear-gradient(300deg, black, 5%, #fa8072)";
        target.classList.add('animate-color');
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].image}) center no-repeat`;
        this.audioPlay.classList.add('animate-img');
        this.listContainer?.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        this.localSeries.push(this.currentGetSeries);
        this.currentGetSeries = 0;
      }
    }
    const nextStep = <Element>this.page.querySelector('.nextWord');
    const nextStepFunction = () => this.render();
    nextStep.addEventListener('click', nextStepFunction);
    nextStep.addEventListener('click', () => this.clearNextPage());
    if(this.count === 15){
      localStorage.setItem('date', `${this.dateGame}`);
      this.metodLocalAmountTrueAnswer();
      this.metodLocalSeriesTotal();
      nextStep.removeEventListener('click', nextStepFunction);
      nextStep.addEventListener('click', () => this.clearPage());
      nextStep.innerHTML = 'Сыграем ещё?';
      nextStep.addEventListener('click', () => this.render());
    }
  }

  metodLocalGamesPlayed() {
    let get: any = localStorage.getItem('audioCallGamesPlayed');
    ++get;
    localStorage.setItem('audioCallGamesPlayed', `${get}`);
  }

  metodLocalSeriesTotal() {
    const maxNumber = Math.max.apply(null, this.localSeries);
    if(maxNumber > Number(localStorage.getItem('audioCallSeriesTotal'))){
      localStorage.setItem('audioCallSeriesTotal', `${maxNumber}`);
    }
    this.localSeries = [];
  }
  
  metodLocalAmountTrueAnswer(){
    const gets: any = localStorage.getItem('audioCallAmountTrueAnswer');
    const temporaryTrueAnswer =  this.localTrueAnswer + Number(gets);
    localStorage.setItem('audioCallAmountTrueAnswer', `${temporaryTrueAnswer}`);
    this.localTrueAnswer = 0;
  }

  clearNextPage() {
    const clearVolumePosition: Element | null = <Element>this.page.querySelector('.img-volume-position');
    const clearAnswers: Element | null = <Element>this.page.querySelector('.answers');
    const clearNextStep: Element | null = <Element>this.page.querySelector('.nextWord');
    clearNextStep.remove();
    clearVolumePosition.remove();
    clearAnswers.remove();
  }

}
export default AudioCallPage;
