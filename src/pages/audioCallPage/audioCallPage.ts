import "./audioCallPage.css";
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { getWords } from '../../api/getWords';


const renderFormLevel = (): string =>`
<div class="games-level">
  <div class="level-1">
    <input type="radio" id="A1" class="level-item__input" name="game" value="0" checked="">
    <label class="level-item__label" for="A1">
      <span class="label-level">A1 Elementary</span>
    </label>
  </div>
  <div class="level-2">
    <input type="radio" id="A2" class="level-item__input" name="game" value="1">
    <label class="level-item" for="A2">
      <span class="label-level">A2 Pre-Intermediate</span>
    </label>
  </div>
  <div class="level-3">
    <input type="radio" id="B1" class="level-item__input" name="game" value="2">
    <label class="level-item" for="B1">
      <span class="label-level">B1 Intermediate</span>
    </label>
  </div>
  <div class="level-4">
    <input type="radio" id="B2" class="level-item__input" name="game" value="3">
    <label class="level-item" for="B2">
      <span class="label-level">B2 Upper-Intermediate</span>
    </label>
  </div>
  <div class="level-5">
    <input type="radio" id="C1" class="level-item__input" name="game" value="4">
    <label class="level-item" for="C1">
      <span class="label-level">C1 Advanced</span>
    </label>
  </div>
  <div class="level-6">
    <input type="radio" id="C2" class="level-item__input" name="game" value="5">
    <label class="level-item" for="C2">
      <span class="label-level">C2 Proficiency</span>
    </label>
  </div>
  <button class="start-game">Начать</button>  
</div>`

const renderGame = (): string =>`
<div>
  <div></div>  
</div>
<div class="answers">
  <div class="level-1">
    <button class="answer-item">
      <span></span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span></span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span></span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span></span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span></span>
    </button>
  </div>
</div>
`

class AudioCallPage extends Page {
  constructor(id: string) {
    super(id);
    this.page.classList.add('page');
  }

    render() {

    const title = insertElement("h2", ["title"], "Аудиовызов", this.page);
    this.page?.insertAdjacentHTML('beforeend', renderFormLevel());
    const buttonStart = this.page.querySelector('.start-game');
    // buttonStart?.addEventListener('click', this.render);

    return this.page;
  }

  renderGameTitle(){
    console.log(this.page)
  }
}

export default AudioCallPage;
