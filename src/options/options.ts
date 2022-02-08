export enum PageIds {
  MainPage = "",
  AudioCallPage = "audio-call",
  StatisticPage = "statistic",
  SprintPage = "sprint",
  TextbookPage = "textbook",
}

export const buttonsPage = [
  {
    id: PageIds.MainPage,
    label: "главная страница",
    class: ["nav-link"],
  },
  {
    id: PageIds.TextbookPage,
    label: "учебник",
    class: ["nav-link"],
  },
  {
    id: PageIds.AudioCallPage,
    label: "аудиовызов",
    class: ["nav-link"],
  },
  {
    id: PageIds.SprintPage,
    label: "спринт",
    class: ["nav-link"],
  },
  {
    id: PageIds.StatisticPage,
    label: "статистика",
    class: ["nav-link"],
  },
];

export const buttonsPagination = {
  length: 30,
  class: ['page-item'],
  text: '',
  };

export const buttonsGroups = {
  length: 6,
  class: ['group-item'],
  text: 'уровень ',
};

export const FOOTER_CONTENT_HTML = `
    <div class="footer-info">
      <p class="copyright">©</p>
      <time>2022</time>
      <a class="github-username" href="https://github.com/SergeiOsmolovskii" target="_blank">SergeiOsmolovskii</a>
      <a class="github-username" href="https://github.com/Vlad48-star" target="_blank">Vlad48-star</a>
      <a class="github-username" href="https://github.com/AnnaRabychina" target="_blank">AnnaRabychina</a>
    </div>
    <a class="footer-logo" href="https://rs.school/js/" target="_blank"></a>
`;
