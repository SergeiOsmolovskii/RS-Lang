export const renderFormLevel = (): string =>`
<div class="games-level">
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
  <button class="start-game">Начать</button>  
</div>`

export const renderSvgExit = (): string =>`
<div class="img-exit-position">
  <button class="svg-exit"></button>
</div>
`
export const renderProgressGame = (): string =>`
<div class="answer-point">
  <div class="heart health-1"></div>
  <div class="heart health-2"></div>
  <div class="heart health-3"></div>
  <div class="heart health-4"></div>
  <div class="heart health-5"></div>
  <div class="heart health-6"></div>
  <div class="heart health-7"></div>
  <div class="heart health-8"></div>
  <div class="heart health-9"></div>
  <div class="heart health-10"></div>
  <div class="heart health-11"></div>
  <div class="heart health-12"></div>
  <div class="heart health-13"></div>
  <div class="heart health-14"></div>
  <div class="heart health-15"></div>
</div>
`
export const renderGame = (): string =>`
<div class="img-volume-position">
  <button class="svg-volume"></button>
</div> 
<div class="answers">
  <div class="level-1">
    <button class="answer-item">
      <span class="answer-1">1</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span class="answer-2">2</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span class="answer-3">3</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span class="answer-4">4</span>
    </button>
  </div>
  <div class="level-1">
    <button class="answer-item">
      <span class="answer-5">5</span>
    </button>
  </div>
</div>
`

export const renderNextButton = (): string =>`
<button class="nextWord">Следующий</button>
`