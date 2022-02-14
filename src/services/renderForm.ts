export const renderFormLevel = `
<div class="games-level">
  <div>
    <a href="#game/audio-call" class="start-game-audio-call">Аудиовызов</a>
    <a href="#game/sprint" class="start-game-sprint">Спринт</a>
  </div>
  <div class="level-1">
    <input type="radio" id="A1" class="item-input" name="game" value="0" checked="">
    <label class="level-item" for="A1">
      <span class="label-level">A1 Elementary</span>
    </label>
  </div>
  <div class="level-2">
    <input type="radio" id="A2" class="item-input" name="game" value="1">
    <label class="level-item" for="A2">
      <span class="label-level">A2 Pre-Intermediate</span>
    </label>
  </div>
  <div class="level-3">
    <input type="radio" id="B1" class="item-input" name="game" value="2">
    <label class="level-item" for="B1">
      <span class="label-level">B1 Intermediate</span>
    </label>
  </div>
  <div class="level-4">
    <input type="radio" id="B2" class="item-input" name="game" value="3">
    <label class="level-item" for="B2">
      <span class="label-level">B2 Upper-Intermediate</span>
    </label>
  </div>
  <div class="level-5">
    <input type="radio" id="C1" class="item-input" name="game" value="4">
    <label class="level-item" for="C1">
      <span class="label-level">C1 Advanced</span>
    </label>
  </div>
  <div class="level-6">
    <input type="radio" id="C2" class="item-input" name="game" value="5">
    <label class="level-item" for="C2">
      <span class="label-level">C2 Proficiency</span>
    </label>
  </div>
</div>
`
export const renderSvgExit = `
<a href="#game" class="svg-exit"></a>
`
export const renderProgressGame = `
<div class="answer-point">
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
</div>
`
export const renderGame = `
<div class="img-volume-position">
  <button class="svg-volume"></button>
</div> 
<div class="answers">
  <div class="level-1">
    <button class="answer-item answer-item-1">
      <span class="answer-1">1</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item answer-item-2">
      <span class="answer-2">2</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item answer-item-3">
      <span class="answer-3">3</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item answer-item-4">
      <span class="answer-4">4</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item answer-item-5">
      <span class="answer-5">5</span>
    </button>
  </div>
</div>
`
export const renderNextButton = `
<button class="nextWord">Следующий</button>
`
export const renderTimerForm = `
<div class="border-line">
  <h3 class="timer">60</h3>
</div>
`
export const renderFormSprintGame = `
<div class="answers-options">
  <span class="english-word">Hello</span>
  <div class="arrow-position">
    <div class="arrow"></div>
    <div class="arrow arrow-transform"></div>
  </div>
  <span class="russian-word">Привет</span>
</div>
`
export const renderFormSptintAnswerButton = `
<div class="contain-answer-button">
  <button class="arrow-position-left">
    <div class="svg-direction svg-direction-transform"></div>
    <span class="svg-arrow-left">Неверно</span>
  </button>
  <button class="arrow-position-right">
    <span class="svg-arrow-right">Верно</span>
    <div class="svg-direction"></div>
  </button>
</div>
`
export const renderFormSprintProgress = `
<div class="point-progress">
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
</div>
`

export const renderSprintResultAnswer = `
<div class="result-answer">
  <span>Результаты</span>
  <span class="quantity-true-points"></span>
  <div class="percent-answers"></div>
  <div class="wrap-answer">
    <div class="sprint-true-answer"></div>
    <div class="sprint-false-answer"></div>
  </div>
  <button class="next-game">Играть</button>
</div>
`
