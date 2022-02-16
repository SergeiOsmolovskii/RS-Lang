import { Chart, registerables } from 'chart.js';
import { getUserStatistic } from '../../api/statistic';
Chart.register(...registerables);

export const addGraphNewWordsPerDay = async (parent: HTMLCanvasElement) => {
  const storageStatistic = await getUserStatistic();
  const labels = Object.keys(storageStatistic.optional.general);
  const data = Object.values(storageStatistic.optional.general);

  console.log(labels);
  const myChart = new Chart(parent, {
    type: "line",
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "Новых слов",
          data: [...data],
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

export const addGraphNewWordsForAllDays = async (parent: HTMLCanvasElement) => {
  const storageStatistic = await getUserStatistic();
  const labels = Object.keys(storageStatistic.optional.general);
  const data = Object.values(storageStatistic.optional.general);
  let graphData: Array<Number> = [];
  data.reduce((accum, current) => {
    accum = accum + current;
    graphData.push(accum);
    return accum;
  }, 0); 

  console.log(labels);
  const myChart = new Chart(parent, {
    type: "line",
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "Изученных слов за все время",
          data: [...graphData],
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};