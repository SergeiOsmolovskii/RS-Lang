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