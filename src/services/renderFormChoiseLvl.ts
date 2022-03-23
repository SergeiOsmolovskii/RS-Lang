export const renderFormLevel =`
<div class="games-level">
  <div class="games-container">
    <a href="#game/audio-call" class="button-start start-game-audio-call">Аудиовызов</a>
    <a href="#game/sprint" class="button-start start-game-sprint">Спринт</a>
  </div>
  <div class="buttons">
    
    <div class="buttons__block basic">
    <h2>Basic</h2>
      <div>
        <input class="item-input" name="game" type="radio" value="0" id="A1" checked="">
        <label for="A1">
          <div class="level-info__left">
            <span class="level-partial">A1</span>
            <span class="level-full">Elementary</span>
          </div>
        </label>
      </div>
      <div>
        <input class="item-input" name="game" type="radio" value="1" id="A2">
        <label for="A2">
          <div class="level-info__right">
            <span class="level-partial">A2</span>
            <span class="level-full">Pre-Intermediate</span>
          </div>
        </label>
      </div>
    </div>
    <div class="buttons__block intermediate">
    <h2>Intermediate</h2>
      <div>
        <input class="item-input" name="game" type="radio" value="2" id="B1">
        <label for="B1">
          <div class="level-info__left">
            <span class="level-partial">B1</span>
            <span class="level-full">Intermediate</span>
          </div>
        </label>
      </div>
      <div>
        <input class="item-input" name="game" type="radio" value="3" id="B2">
        <label for="B2">
          <div class="level-info__right">
            <span class="level-partial">B2</span>
            <span class="level-full">Upper-Intermediate</span>
          </div>
        </label>
      </div>
    </div>
    <div class="buttons__block advanced">
    <h2>Advanced</h2>
      <div>
        <input class="item-input" name="game" type="radio" value="4" id="C1">
        <label for="C1">
          <div class="level-info__left">
            <span class="level-partial">C1</span>
            <span class="level-full">Advanced</span>
          </div>
        </label>
      </div>
      <div>
        <input class="item-input" name="game" type="radio" value="5" id="C2">
        <label for="C2">
          <div class="level-info__right">
            <span class="level-partial">C2</span>
            <span class="level-full">Proficiency</span>
          </div>
        </label>
      </div>
    </div>
  </div>`;