export const renderSvgExit = `
<a href="#game" class="svg-exit"></a>
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
  <button class="arrow-button arrow-position-left">
    <div class="svg-direction svg-direction-transform"></div>
    <span class="svg-arrow-left">Неверно</span>
  </button>
  <button class="arrow-button arrow-position-right">
    <span class="svg-arrow-right">Верно</span>
    <div class="svg-direction"></div>
  </button>
</div>
`
export const renderFormSprintProgress = `
<div class="point">0</div>
<div class="point-progress">
  <div class="heart"></div>
  <div class="heart"></div>
  <div class="heart"></div>
</div>
<div class="point-sum">+10</div>
`

export const renderSprintResultAnswer = `
<div class="window-open-answer">
  <span>Результаты</span>
  <span class="quantity-true-points"></span>
  <div class="percent-answers"></div>
  <div class="wrap-answer">
    <div class="wrap-result">
      <span>Верно</span>
      <div class="number-amount-green"></div>
    </div>
    <div class="wrap-game game-true-answer"></div>
    <div class="line"></div>
    <div class="wrap-result">
      <span>Неверно</span>
      <div class="number-amount-red"></div>
    </div>
    <div class="wrap-game game-false-answer"></div>
  </div>
  <button class="next-game">Играть</button>
</div>
`
