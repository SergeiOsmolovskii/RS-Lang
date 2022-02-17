import { Chart, registerables } from 'chart.js';
import { getUserStatistic } from '../../api/statistic';
Chart.register(...registerables);

export const addGraphNewWordsPerDay = async (parent: HTMLCanvasElement) => {
  const storageStatistic = await getUserStatistic();
  const labels = Object.keys(storageStatistic.optional.general);
  const data = Object.values(storageStatistic.optional.general);
  const myChart = new Chart(parent, {
    type: "line",
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "Новых слов за день",
          data: [...data],
          borderWidth: 5,
          borderColor: '#fcaa23',
          hoverBorderColor: 'red',
          hoverBorderWidth: 10,
          fill: true,
          backgroundColor: 'rgb(170 150 221 / 50%)'
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
  const myChart = new Chart(parent, {
    type: "line",
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "Новых слов за все время",
          data: [...graphData],
          borderWidth: 5,
          borderColor: '#a395da',
          hoverBorderColor: 'red',
          hoverBorderWidth: 10
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