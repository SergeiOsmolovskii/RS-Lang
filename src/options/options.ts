export enum PageIds {
  MainPage = "",
  AudioCallPage = "game/audio-call",
  StatisticPage = "statistic",
  SprintPage = "game/sprint",
  TextbookPage = "textbook",
  Games = "game",
  TeamPage = "team",
  AboutAppPage = "about-app",
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
    id: PageIds.Games,
    label: "игры",
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

export const buttonsGroups = [
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

export const GROUP_HARD = '6';
export const MEMBER_INFO = [
  {
    name: 'Asmalouski Siarhei',
    id: 'member-0',
    role: 'Frontend developer',
    githubLink: 'https://github.com/SergeiOsmolovskii',
    linkidInLink: 'https://www.linkedin.com/in/sergei-asmalouski-038a5820a/', 
    email: 'osmolovskii_sergei@mail.ru', 
    completedTasks: `Реализовал авторизацию и разавторизацию. Настроил получение данных с бекенда. Создал страницу
     статистики, страницу "О команде" и мини-игр.`
  },
  {
    name: 'Anna Rabychyna',
    id: 'member-1',
    role: 'Frontend developer',
    githubLink: 'https://github.com/annarabychina',
    linkidInLink: 'https://www.linkedin.com/in/анна-рябычина-4b8598216/', 
    email: 'annarabychina@mail.ru', 
    completedTasks: `Настроила роутинг. Создала главную страницу, страницу "О приложении" и раздел "Учебник".`
  },
  {
    name: 'Vlad Hitrikov',
    id: 'member-2',
    role: 'Frontend developer',
    githubLink: 'https://github.com/vlad48-star',
    linkidInLink: 'https://www.linkedin.com/in/vlad-hitrikov-1aa217212/', 
    email: 'vlad.hitrikov@yahoo.com', 
    completedTasks: `Настроил бекенд. Реализовал игры и "Аудиовызов" и "Спринт". Разработал дизайн проекта.`
  }
]

export const APP_REGIME_INFO = [
  {
    title: 'учебник',
    content: 'Слова в учебнике разделены на шесть разделов в зависимости от уровня сложности, от более простых и известных к более сложным. Каждый раздел состоит из 30 страниц по 20 слов. Для лучшего запоминания сложных слов отмечай их и изучай отдельно.',
    style: 'card-info-logo__book'
  },
  {
    title: 'игры',
    content: 'Для изучения слов и лучшего их запоминания в приложении есть 2 игры: Спринт и Аудио-вызов, которые помогут тебе "прокачать" свой словарный запас в игровой форме. Играй и делись результатами с другими.',
    style: 'card-info-logo__game'
  },
  {
    title: 'статистика',
    content: 'Весь ход обучения можно просмотреть в статистике, где представлены данные за текущий день, а также за весь период обучения. Информация представлена как в виде карточек, так и в виде графиков, что очень удобно.',
    style: 'card-info-logo__graf'
  }
]

export const APP_INFO = 'Главная цель нашего проекта - помочь в изучении английского языка людям с разным стартовым уровнем подготовки. С нашим приложением запоминание английских слов станет увлекательным занятием. Играй в игры, слушай правильное произношение, расширяй словарный запас английских слов, совершенствуй свои знания. Начни изучать английский прямо сегодня!'