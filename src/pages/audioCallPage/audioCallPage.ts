import "./audioCallPage.css";
import { insertElement, getRandom, shuffle } from "../../services/services";
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
  private audioPlay: HTMLElement | null = null;
  private trueAnswer: number = 0;
  private progress: any = null;
  private localSeries: number = 0;
  private localTotalWords: any = [];
  private localTrueAnswer: any = localStorage.getItem('audioCallAmountTrueAnswer');
  private free!: (e: Event) => void;

  constructor(id: string) {
    super(id);
    this.page = insertElement("main", ["page"], "", "");
  }
  
  async render(): Promise<HTMLElement> {
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    localStorage.setItem('date', `${this.dateGame}`);
    if(!document.querySelector('.answer-point')){
      this.page.insertAdjacentHTML('beforeend', renderProgressGame);
      this.page.insertAdjacentHTML('beforeend', renderSvgExit);
    }
    this.page.insertAdjacentHTML('beforeend', renderGame);
    this.answerOne = <Element>this.page.querySelector('.answer-1');
    this.answerTwo = <Element>this.page.querySelector('.answer-2');
    this.answerThree = <Element>this.page.querySelector('.answer-3');
    this.answerFour = <Element>this.page.querySelector('.answer-4');
    this.answerFife = <Element>this.page.querySelector('.answer-5');
    this.listContainer = <Element>this.page.querySelector('.answers');
    this.progress = this.page.querySelectorAll('.heart');
    const arrAnswer = [this.answerOne, this.answerTwo, this.answerThree, this.answerFour, this.answerFife]
    const allAnswer = Array.from(Array(20).keys());
    const randomAll = shuffle(allAnswer);
    randomAll.length = 5;
    this.trueAnswer = randomAll[getRandom(0, 4)];
    for(let i = 0; i < 5; i++){
      arrAnswer[i].innerHTML = this.resultFetch[randomAll[i]].wordTranslate;
    }
    this.free = (e: Event) => this.resultAnswer(e);
    this.listContainer.addEventListener('click', this.free, false);
    const audioNew: HTMLAudioElement = new Audio(`https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].audio}`);
    this.audioPlay = this.page.querySelector('.svg-volume') as HTMLElement;
    audioNew.play();
    this.audioPlay.addEventListener('click', () => audioNew.play());
    return this.page;
  }

  clearNextPage() {
    const clearVolumePosition: Element | null = <Element>this.page.querySelector('.img-volume-position');
    const clearAnswers: Element | null = <Element>this.page.querySelector('.answers');
    clearVolumePosition.remove();
    clearAnswers.remove();
  }

  resultAnswer(e: Event) {
    this.listContainer?.removeEventListener('click', this.free, false);
    if(this.audioPlay !== null) {
      const target = e.target as HTMLElement; 
      if(target.innerText === this.resultFetch[this.trueAnswer].wordTranslate) {
        target.style.backgroundColor = "green";
        this.progress[this.count].style.backgroundColor = "green";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].image}) center no-repeat`;
        this.audioPlay.style.width = `390px`;
        this.audioPlay.style.height = `260px`;
        this.audioPlay.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        ++this.localSeries;
        ++this.localTrueAnswer;
        localStorage.setItem('audioCallAmountTrueAnswer', `${this.localTrueAnswer}`);
        let localTotalWordss: any = JSON.parse(`${localStorage.getItem('audioCallWordsTotal')}`);
          if(localTotalWordss === null) {
            localTotalWordss = [this.resultFetch[this.trueAnswer].id];
            localStorage.setItem(`audioCallWordsTotal`, JSON.stringify(localTotalWordss));
          } else if(!localTotalWordss?.includes(this.resultFetch[this.trueAnswer].id)) {
            localTotalWordss.push(this.resultFetch[this.trueAnswer].id)
            localStorage.setItem(`audioCallWordsTotal`, JSON.stringify(localTotalWordss));
          }
      } else {
        target.style.backgroundColor = "red";
        this.progress[this.count].style.backgroundColor = "red";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].image}) center no-repeat`;
        this.audioPlay.style.width = `390px`;
        this.audioPlay.style.height = `260px`;
        this.audioPlay.insertAdjacentHTML('afterend', renderNextButton);
        ++this.count;
        let clearSeries = this.localSeries;
        if(this.localSeries > Number(localStorage.getItem('audioCallSeriesTotal'))){
          localStorage.setItem('audioCallSeriesTotal', `${clearSeries}`);
          this.localSeries = 0;
        }
        clearSeries = 0;
      }
    }
    const nextStep = <Element>document.querySelector('.nextWord');
    const nextStepFunction = () => this.render();
    nextStep.addEventListener('click', nextStepFunction);
    nextStep.addEventListener('click', () => this.clearNextPage());
    if(this.count === 15){
      nextStep.removeEventListener('click', nextStepFunction);
      nextStep.addEventListener('click', () => this.clearPage());
      nextStep.innerHTML = 'Сыграем ещё?';
      nextStep.addEventListener('click', () => this.render());
    }
  }
}
export default AudioCallPage;
