import "./audioCallPage.css";
import { insertElement, getRandom, shuffle } from "../../services/services";
import Page from "../../templates/page";
import { getWords, IWords } from '../../api/getWords';
import { renderFormLevel, renderGame, renderNextButton, renderProgressGame, renderSvgExit } from "../../services/renderForm";

class AudioCallPage extends Page {
  private checkNumber: number = 0;
  private answerOne: Element | null = null;
  private answerTwo: Element | null = null;
  private answerThree: Element | null = null;
  private answerFour: Element | null = null;
  private answerFife: Element | null = null;
  private exitGame: Element | null = null;
  private listContainer: Element | null = null;
  private checkInput: HTMLInputElement[] | null = null;
  private resultFetch: IWords[] = [];
  private audioPlay: HTMLElement | null = null;
  private trueAnswer: number = 0;
  private progress: any = null;
  private count: number = 0;
  private localSeries: number = 0;
  private localTotalWords: any = [];
  private free!: (e: Event) => void;

  constructor(id: string) {
    super(id);
    this.page = insertElement("div", ["page"], "", "");
  }
  
  async render(): Promise<HTMLElement> {
    const title = insertElement("h2", ["title"], "Аудиовызов", this.page);
    this.page?.insertAdjacentHTML('beforeend', renderFormLevel());
    const buttonStart = this.page.querySelector('.start-game');
    buttonStart?.addEventListener('click', this.clearPage);
    buttonStart?.addEventListener('click', () => this.renderGameTitle());
    this.checkInput = Array.from(this.page.querySelectorAll('.item-input'));
    this.checkInput?.forEach(el => el.addEventListener('change', () => this.checkLevel()));
    return this.page;
  }

  checkLevel() {
    this.checkInput?.forEach(el => {
      if(el?.checked){
        this.checkNumber = Number(el.value);
      }
    });
  }

  clearPage() {
    const currentPage: Element | null = <Element>document.querySelector('.page');
    while (currentPage.firstChild) {
      currentPage.firstChild.remove();
    }
    this.count = 0;
  }

  clearNextPage() {
    this.exitGame = <Element>document.querySelector('.img-exit-position');
    const clearVolumePosition: Element | null = <Element>document.querySelector('.img-volume-position');
    const clearAnswers: Element | null = <Element>document.querySelector('.answers');
    this.exitGame.remove();
    clearVolumePosition.remove();
    clearAnswers.remove();
  }

  
  async renderGameTitle() {
    this.resultFetch = await getWords(getRandom(0, 29), this.checkNumber);
    console.log(this.resultFetch)
    const currentPage: Element | null = <Element>document.querySelector('.page');
    currentPage.insertAdjacentHTML('beforeend', renderSvgExit());
    if(!document.querySelector('.answer-point')){
      currentPage.insertAdjacentHTML('beforeend', renderProgressGame());
    }
    currentPage.insertAdjacentHTML('beforeend', renderGame());
    this.answerOne = <Element>document.querySelector('.answer-1');
    this.answerTwo = <Element>document.querySelector('.answer-2');
    this.answerThree = <Element>document.querySelector('.answer-3');
    this.answerFour = <Element>document.querySelector('.answer-4');
    this.answerFife = <Element>document.querySelector('.answer-5');
    this.listContainer = <Element>document.querySelector('.answers');
    this.progress = document.querySelectorAll('.heart');

    let arrAnswer = [this.answerOne, this.answerTwo, this.answerThree, this.answerFour, this.answerFife]
    const allAnswer = Array.from(Array(20).keys());
    const randomAll = shuffle(allAnswer);
    randomAll.length = 5;
    this.trueAnswer = randomAll[getRandom(0, 4)];

    // let arrPermament = [];
    // if(localStorage.getItem('adioCallWordsTotal')){
    //   this.localTotalWords = localStorage.getItem('adioCallWordsTotal');
    // }

    for(let i = 0; i < 5; i++){
      this.localTotalWords.push(this.resultFetch[randomAll[i]].id);
      arrAnswer[i].innerHTML = this.resultFetch[randomAll[i]].wordTranslate;
      const giveLocal = localStorage.getItem('adioCallWordsTotal');
      if(giveLocal?.includes(this.resultFetch[randomAll[i]].id)) {
        console.log(giveLocal)
      }

    }

    localStorage.setItem(`adioCallWordsTotal`, JSON.stringify(this.localTotalWords));
    this.free = (e: Event) => this.resultAnswer(e);
    this.listContainer.addEventListener('click', this.free, false);



    const audioNew: HTMLAudioElement = new Audio(`https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].audio}`);
    this.audioPlay = document.querySelector('.svg-volume') as HTMLElement;
    audioNew.play();
    this.audioPlay.addEventListener('click', () => audioNew.play());

    this.exitGame = <Element>document.querySelector('.img-exit-position');
    this.exitGame?.addEventListener('click', () => this.clearPage());
    this.exitGame?.addEventListener('click', () => this.render());
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
        this.audioPlay.insertAdjacentHTML('afterend', renderNextButton());
        ++this.count;
        ++this.localSeries;
      } else {
        target.style.backgroundColor = "red";
        this.progress[this.count].style.backgroundColor = "red";
        this.audioPlay.style.background = `url(https://rs-lang-learn.herokuapp.com/${this.resultFetch[this.trueAnswer].image}) center no-repeat`;
        this.audioPlay.style.width = `390px`;
        this.audioPlay.style.height = `260px`;
        this.audioPlay.insertAdjacentHTML('afterend', renderNextButton());
        ++this.count;

        let clearSeries = this.localSeries;
        clearSeries = 0;
        if(this.localSeries > Number(localStorage.getItem('adioCallSeriesTotal'))){
          localStorage.setItem('adioCallSeriesTotal', `${this.localSeries}`);
          this.localSeries = 0;
        }
      }

    }
    const nextStep = <Element>document.querySelector('.nextWord');
    nextStep.addEventListener('click', () => this.renderGameTitle());
    nextStep.addEventListener('click', () => this.clearNextPage());
    if(this.count === 15){
      nextStep.innerHTML = 'Сыграем ещё?';
      setTimeout(() => nextStep.addEventListener('click', () =>{
        this.clearPage();
      }), 5000);
    }
  }
}

export default AudioCallPage;
