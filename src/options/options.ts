export enum PageIds {
  MainPage = "",
  AudioCallPage = "game/audio-call",
  StatisticPage = "statistic",
  SprintPage = "game/sprint",
  TextbookPage = "textbook",
  Games = "game",
  TeamPage = "team",
}

export enum Regime {
  group = "group",
  hard = "hard",
}

export const buttonsPage = [
    {
    id: PageIds.MainPage,
    label: "главная страница",
    class: ["nav-link"],
    forAuthorized: false,
  },
  {
    id: PageIds.TextbookPage,
    label: "учебник",
    class: ["nav-link"],
    forAuthorized: false,
  },
  {
    id: PageIds.Games,
    label: "игры",
    class: ["nav-link"],
    forAuthorized: false,
  },
  {
    id: PageIds.StatisticPage,
    label: "статистика",
    class: ["nav-link"],
    forAuthorized: true,
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

export const buttonsGroups1 = [
  {
    group: "0",
    label: "a1",
    class: ["group-item", "btn-color1"],
  },
  {
    group: "1",
    label: "a2",
    class: ["group-item", "btn-color2"],
  },
  {
    group: "2",
    label: "b1",
    class: ["group-item", "btn-color3"],
  },
  {
    group: "3",
    label: "b2",
    class: ["group-item", "btn-color4"],
  },
  {
    group: "4",
    label: "c1",
    class: ["group-item", "btn-color5"],
  },
  {
    group: "5",
    label: "c2",
    class: ["group-item", "btn-color6"],
  },
];

export const FOOTER_CONTENT_HTML = `
  <div class="footer-row">
    <div class="logo-container footer-logo-container">
      <div class="footer-logo"></div>
      <p class="footer-logo-title">lang</p>
    </div> 
    <a class="footer-logo__rss" href="https://rs.school/js/" target="_blank"></a>
  </div>
  <div class="footer-row footer-github-username">
    <a class="github-username" href="https://github.com/SergeiOsmolovskii" target="_blank">Anarxx</a>
    <a class="github-username" href="https://github.com/Vlad48-star" target="_blank">Vlad48-star</a>
    <a class="github-username" href="https://github.com/AnnaRabychina" target="_blank">Anna</a>
  </div>
  <div class="footer-row">
    <a class="github-username" href="/#team">о команде</a>
    <p class="copyright">© 2022</p>
  </div>
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

export const WORD_PER_GAME = 20;
export const TRUE_ANSWERS_STROKE = 283;

export const MAIN_PAGE_CONTENT_HTML = `
  <h3 class="main-page-title">учи английский <span class="main-page-title__orange">играя!</span></h3>
  <p class="main-page-info">Проходи интерактивные игры и пополняй свой словарный запас каждый день</p>
`;

