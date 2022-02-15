import "./statisticPage.css"
import { insertElement } from "../../services/services";
import { GAMES_TYPE } from "../../options/options";
import Page from "../../templates/page";
import { WORD_PER_GAME, TRUE_ANSWERS_STROKE } from "../../options/options";
import { IGamesStatistic, storage } from "../../api/api";
import { getUserStatistic } from "../../api/statistic";

interface IGameParam {
  newWords: number,
  trueAnswers: number,
  bestSeries: number,
  gamesPlayed: number
}

class StatisticPage extends Page {
  constructor(id: string) {
    super(id);
    this.page.classList.add('page');
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title-statistic'], 'Статистика за сутки', this.page);
    const statisticBlock = insertElement('div', ['statistic-block'], '', this.page);

    if (!storage.isAuthorized) {
      const sprintGameParam: IGameParam = JSON.parse(localStorage.getItem('sprintGameParam') as string);
      const audioCallGameParam: IGameParam = JSON.parse(localStorage.getItem('audioCallGameParam') as string);
      const bestSeries = calcBestSeries(audioCallGameParam.bestSeries, sprintGameParam.bestSeries);
      const trueAnswers = Math.round(calcTruAnswersPercent(sprintGameParam.gamesPlayed, sprintGameParam.trueAnswers, audioCallGameParam.newWords, audioCallGameParam.trueAnswers));
      const storke = ((TRUE_ANSWERS_STROKE * trueAnswers) / 100);
      const gamesStatisticParam: IGameParam[] = [sprintGameParam, audioCallGameParam];
      statisticBlock.insertAdjacentHTML('beforeend', await statistic(trueAnswers, sprintGameParam.newWords + audioCallGameParam.newWords, bestSeries, storke));
      statisticBlock.insertAdjacentHTML('beforeend', gamesStatistic(gamesStatisticParam));
    } else {
      const storageStatistic = await getUserStatistic();

      const bestSeries = calcBestSeries(storageStatistic.optional.games.sprint.bestSeries, storageStatistic.optional.games.audioCall.bestSeries);
      const trueAnswers = Math.round(calcTruAnswersPercent(storageStatistic.optional.games.sprint.gamesPlay, storageStatistic.optional.games.sprint.trueAnswers, storageStatistic.optional.games.audioCall.newWords, storageStatistic.optional.games.audioCall.trueAnswers));
      
      const storke = ((TRUE_ANSWERS_STROKE * trueAnswers) / 100);
      const gamesStatisticParam: IGamesStatistic[] = [storageStatistic.optional.games.sprint, storageStatistic.optional.games.audioCall];
      statisticBlock.insertAdjacentHTML('beforeend', await statistic(trueAnswers, storageStatistic.optional.games.sprint.newWords + storageStatistic.optional.games.audioCall.newWords, bestSeries , storke));
      statisticBlock.insertAdjacentHTML('beforeend', gamesStatistic(gamesStatisticParam));
    }

    return this.page;
  }
}

const statistic = async ( answrsCount: number, newWords: number, longestSeria: number, storkParam: number) => `
    <div class="statistic-block__main">

      <div class="statistic-block__words">
        <p class="statistic-block__subtitle">Верные ответы</p>
        <svg class="true-answers__svg" height="120" width="120">
          <circle class="outer-circle" cx="60" cy="60" r="45" fill="#fff"> </circle>
          <circle style="stroke-dasharray: ${storkParam}, 283;" class="inner-circle" cx="60" cy="60" r="45"> </circle>
          <text class="true-answers__count" x="60" y="70">${answrsCount}%</text>
        </svg>
      </div>

      <div class="statistic-block__words">
        <p class="statistic-block__subtitle">Новых слов</p>
        <div class="statistic-block__new-words">
          <p class="new-words-count">${newWords}</p> 
        </div>
      </div>

      <div class="statistic-block__words">
        <p class="statistic-block__subtitle">Лучшая cерия</p>
        <div class="statistic-block__long-seria">
          <p class="new-words-count">${longestSeria}</p> 
        </div>
      </div>

    </div>
`;

const gamesStatistic = (gamesStatisticParam: any): string => {
  let resultGameStatistic: string = '';

  for (let i = 0; i < GAMES_TYPE.length; i++) {
    resultGameStatistic += `
      <div class="games ${GAMES_TYPE[i].eng}-game">
        <h3 class="game__title">${GAMES_TYPE[i].ru}</h3>
        <div class="${GAMES_TYPE[i].eng}-logo"></div>

        <div class="game-words__block"> 
          <p class="game-words ${GAMES_TYPE[i].eng}-game__words">Изучено новых слов</p>
          <div class="game-words__count" id="${GAMES_TYPE[i].eng}-game__total-words">${gamesStatisticParam[i].newWords}</div>
        </div>

        <div class="game-words__block"> 
          <p class="game-words ${GAMES_TYPE[i].eng}-game__answers">Правильных ответов</p>
          <div class="game-words__count" id="${GAMES_TYPE[i].eng}-game__total-words">${gamesStatisticParam[i].trueAnswers}</div>
        </div>

        <div class="game-words__block"> 
          <p class="game-words ${GAMES_TYPE[i].eng}-game__series">Серия верных ответов</p>
        <div class="game-words__count" id="${GAMES_TYPE[i].eng}-game__total-words">${gamesStatisticParam[i].bestSeries}</div>
      </div>
      </div>
    `
  }
  return resultGameStatistic;
}

const calcTruAnswersPercent = (sprintGames: number, sprintTrueAnswers: number, audioCallsWords: number, audioCallsTrueAnswers: number, ) => {
  if (!sprintGames && !sprintTrueAnswers && !audioCallsWords && !audioCallsTrueAnswers) return 0;
  return ((sprintTrueAnswers + audioCallsTrueAnswers) * 100) / ((WORD_PER_GAME * sprintGames) + audioCallsWords);  
}

const calcBestSeries = (sprintSeria: number, audioCallsSeria: number) => {
  return Math.max(sprintSeria, audioCallsSeria);
}


export default StatisticPage;