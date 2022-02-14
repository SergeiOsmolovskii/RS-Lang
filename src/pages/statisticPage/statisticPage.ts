import "./statisticPage.css"
import { insertElement } from "../../services/services";
import { GAMES_TYPE } from "../../options/options";
import Page from "../../templates/page";

class StatisticPage extends Page {
  constructor(id: string) {
    super(id);
    this.page.classList.add('page');
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title-statistic'], 'Статистика за сутки', this.page);
    const statisticBlock = insertElement('div', ['statistic-block'], '', this.page);
    statisticBlock.insertAdjacentHTML('beforeend', await statistic('69', '50', '220'));
    statisticBlock.insertAdjacentHTML('beforeend', gamesStatistic());
    return this.page;
  }
}

const statistic = async (newWords: string, answrsCount: string, storkParam: string) => `
    <div class="statistic-block__main">

      <div class="statistic-block__words">
        <p class="statistic-block__subtitle"> Изучено слов </p>
        <svg class="true-answers__svg" height="160" width="160">
          <circle class="outer-circle" cx="80" cy="80" r="70" fill="#fff"> </circle>
          <circle style="stroke-dasharray: ${storkParam}, 440;" class="inner-circle" cx="80" cy="80" r="70"> </circle>
          <text class="true-answers__count" x="80" y="95">${answrsCount}%</text>
        </svg>
      </div>

      <div class="statistic-block__words">
        <p class="statistic-block__subtitle">Верные ответы</p>
        <div class="statistic-block__new-words">
          <p class="new-words-count">${newWords}</p> 
        </div>
      </div>

    </div>
`;

const gamesStatistic = (): string => {
  let resultGameStatistic: string = '';

  for (let i = 0; i < GAMES_TYPE.length; i++) {
    resultGameStatistic += `
      <div class="games ${GAMES_TYPE[i].eng}-game">
        <h3 class="game__title">${GAMES_TYPE[i].ru}</h3>
        <div class="${GAMES_TYPE[i].eng}-logo"></div>

        <div class="game-words__block"> 
          <p class="game-words ${GAMES_TYPE[i].eng}-game__words">Изучено новых слов</p>
          <div class="game-words__count" id="${GAMES_TYPE[i].eng}-game__total-words">10</div>
        </div>

        <div class="game-words__block"> 
          <p class="game-words ${GAMES_TYPE[i].eng}-game__answers">Правильных ответов</p>
          <div class="game-words__count" id="${GAMES_TYPE[i].eng}-game__total-words">10</div>
        </div>

        <div class="game-words__block"> 
          <p class="game-words ${GAMES_TYPE[i].eng}-game__series">Серия верных ответов</p>
        <div class="game-words__count" id="${GAMES_TYPE[i].eng}-game__total-words">10</div>
    </div>

      </div>
    `
  }
  return resultGameStatistic;
}


export default StatisticPage;


/* 

  <p class="game-answers ${GAMES_TYPE[i].eng}-game__answers"> Правильных ответов: <span id="${GAMES_TYPE[i].eng}-game__true-answers">0</span>%.</p>
        <p class="game-series ${GAMES_TYPE[i].eng}-game__series"> Самая длинная серия правильных ответов: <span id="${GAMES_TYPE[i].eng}-game__total-words">0</span>.</p>

*/

/* 

    <div class="words-studied">
      <p class="words-studied__count">${newWords}</p>
      <p>Слов изучено</p>
    </div>
    <div class="true-answers">
      <svg class="true-answers__svg" height="160" width="160">
        <circle class="outer-circle" cx="80" cy="80" r="70"> </circle>
        <circle style="stroke-dasharray: ${storkParam}, 440;" class="inner-circle" cx="80" cy="80" r="70"> </circle>
        <text class="true-answers__count" x="80" y="100">${answrsCount}%</text>
      </svg>
      <p>Правильных ответов</p>
    </div>

*/

/*       <div class="statistic-block__words"> </div>
      <p class="statistic-block__subtitle">Верные ответы</p>
        
      <div class="statistic-block__new-words">
        <p class="new-words-count">${newWords}</p> 
        </div>
      </div> */