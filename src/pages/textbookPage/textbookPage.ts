import './textbookPage.css';
import { insertElement } from '../../services/services';
import Page from '../../templates/page';
import { CardsContainer } from './cards';
import { Pagination } from './pagination';
import { NavGroups } from './navGroups';
import { Regime } from '../../options/options';
import { storage } from '../../api/api';
import { setLocalStorage } from '../../services/storage';

class TextbookPage extends Page {
  private static cardsContainer: CardsContainer;
  private pagination: Pagination;
  private navGroups: NavGroups;

  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '', '');
    TextbookPage.cardsContainer = new CardsContainer();
    this.pagination = new Pagination();
    this.navGroups = new NavGroups();
  }

  static async renderCardContainer(regime: Regime): Promise<HTMLElement> {
    const cardsContainerHTML = await TextbookPage.cardsContainer.render(regime);
    return cardsContainerHTML;
  }

  private renderHeaderPage(): HTMLElement {
    const headerPageContainer = insertElement('div', ['page-header']);
    const title = insertElement('h2', ['title'], 'электронный учебник', headerPageContainer);
    const headerButtonContainer = insertElement('div', ['page-header-buttons'], '', headerPageContainer);
    const btnGameAudioCall = <HTMLAnchorElement>insertElement('a', ['btn-game'], 'Аудиовызов', headerButtonContainer);
    btnGameAudioCall.href='#game/audio-call';
    btnGameAudioCall.addEventListener('click', () => setLocalStorage('mode', 'filtrWords'));
    const btnGameSprint = <HTMLAnchorElement>insertElement('a', ['btn-game'], 'Спринт', headerButtonContainer);
    btnGameSprint.href='#game/sprint';
    btnGameSprint.addEventListener('click', () => setLocalStorage('mode', 'filtrWords'));
    return headerPageContainer;
  }

  async render(): Promise<HTMLElement> {
    this.page.append(this.renderHeaderPage(), this.navGroups.render(), this.pagination.render(), await TextbookPage.cardsContainer.render(Regime.group));
    return this.page;
  }
}

export default TextbookPage;
