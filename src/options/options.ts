export enum PageIds {
  MainPage = "",
  AudioCallPage = "game/audio-call",
  StatisticPage = "statistic",
  SprintPage = "game/sprint",
  TextbookPage = "textbook",
  Games = "game"
}

export enum Difficulty {
  studiedWord = "studied",
  normalWord = "easy",
  hardWords = "hard",
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
    <div class="footer-info">
      <p class="copyright">©</p>
      <time>2022</time>
      <a class="github-username" href="https://github.com/SergeiOsmolovskii" target="_blank">SergeiOsmolovskii</a>
      <a class="github-username" href="https://github.com/Vlad48-star" target="_blank">Vlad48-star</a>
      <a class="github-username" href="https://github.com/AnnaRabychina" target="_blank">AnnaRabychina</a>
    </div>
    <a class="footer-logo" href="https://rs.school/js/" target="_blank"></a>
`;
