// export const renderFormLevel = `
// <div class="games-level">
//   <div>
//     <a href="#game/audio-call" class="start-game-audio-call">Аудиовызов</a>
//     <a href="#game/sprint" class="start-game-sprint">Спринт</a>
//   </div>
//   <div class="level-1">
//     <input type="radio" id="A1" class="item-input" name="game" value="0" checked="">
//     <label class="level-item" for="A1">
//       <span class="label-level">A1 Elementary</span>
//     </label>
//   </div>
//   <div class="level-2">
//     <input type="radio" id="A2" class="item-input" name="game" value="1">
//     <label class="level-item" for="A2">
//       <span class="label-level">A2 Pre-Intermediate</span>
//     </label>
//   </div>
//   <div class="level-3">
//     <input type="radio" id="B1" class="item-input" name="game" value="2">
//     <label class="level-item" for="B1">
//       <span class="label-level">B1 Intermediate</span>
//     </label>
//   </div>
//   <div class="level-4">
//     <input type="radio" id="B2" class="item-input" name="game" value="3">
//     <label class="level-item" for="B2">
//       <span class="label-level">B2 Upper-Intermediate</span>
//     </label>
//   </div>
//   <div class="level-5">
//     <input type="radio" id="C1" class="item-input" name="game" value="4">
//     <label class="level-item" for="C1">
//       <span class="label-level">C1 Advanced</span>
//     </label>
//   </div>
//   <div class="level-6">
//     <input type="radio" id="C2" class="item-input" name="game" value="5">
//     <label class="level-item" for="C2">
//       <span class="label-level">C2 Proficiency</span>
//     </label>
//   </div>
// </div>
// `
export const renderFormLevel = `
<div class="games-level">
    <div class="games-container">
      <a href="#game/audio-call" class="button-start start-game-audio-call">Аудиовызов</a>
      <a href="#game/sprint" class="button-start start-game-sprint">Спринт</a>
    </div>
    <div class="buttons">
      <div class="buttons__block basic">
        <div>
          <input class="item-input" name="game" type="radio" value="0" id="A1" checked="">
          <label for="A1">
            <h2>Basic</h2>
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
        <div>
          <input class="item-input" name="game" type="radio" value="2" id="B1">
          <label for="B1">
            <h2>Intermediate</h2>
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
        <div>
          <input class="item-input" name="game" type="radio" value="4" id="C1">
          <label for="B1">
            <h2>Advanced</h2>
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
    </div>`