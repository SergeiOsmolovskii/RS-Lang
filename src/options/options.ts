export enum PageIds {
  MainPage = "",
  AudioCallPage = "game/audio-call",
  StatisticPage = "statistic",
  SprintPage = "game/sprint",
  TextbookPage = "textbook",
  Games = "game"
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
    id: PageIds.StatisticPage,
    label: "статистика",
    class: ["nav-link"],
  },
  {
    id: PageIds.Games,
    label: "игры",
    class: ["nav-link"],
  },

];

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

export const GAMES_TYPE = [
  {
    ru: "Спринт",
    eng: "sprint",
  },
  {
    ru: "Аудиовызов",
    eng: "audioCalls",
  },
];