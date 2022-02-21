import './textbookPage.css';
import { insertElement } from '../../services/services';
import Page from '../../templates/page';
import { CardsContainer } from './cards';
import { Pagination } from './pagination';
import { NavGroups } from './navGroups';
import { GROUP_HARD, PageIds, Regime } from '../../options/options';
import { getLocalStorage } from '../../services/storage';

class TextbookPage extends Page {
  static cardsContainer: CardsContainer;
  private pagination: Pagination;
  private navGroups: NavGroups;

  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page', 'page-textbook'], '', '');
    TextbookPage.cardsContainer = new CardsContainer();
    this.pagination = new Pagination();
    this.navGroups = new NavGroups();
  }

  static async renderCardContainer(regime: Regime): Promise<HTMLElement> {
    const cardsContainerHTML = await TextbookPage.cardsContainer.render(regime);
    return cardsContainerHTML;
  }

  private renderTitlePage(group: string): HTMLElement {
    const headerPageContainer = insertElement('div', ['page-header']);
    const title = insertElement('h2', ['title'], 'электронный учебник', headerPageContainer);
    if  (group !== GROUP_HARD) {
      const headerButtonContainer = insertElement('div', ['page-header-buttons'], '', headerPageContainer);
      const btnGameAudioCall = <HTMLAnchorElement>insertElement('a', ['btn-game'], 'Аудиовызов', headerButtonContainer);
      btnGameAudioCall.href=`#${PageIds.AudioCallPage}`;
      const btnGameSprint = <HTMLAnchorElement>insertElement('a', ['btn-game'], 'Спринт', headerButtonContainer);
      btnGameSprint.href=`#${PageIds.SprintPage}`;
    }
    return headerPageContainer;
  }

  async render(): Promise<HTMLElement> {
    setLocalStorage('mode', 'filtrWords');
    const group = <string>getLocalStorage('group');
    if  (group !== GROUP_HARD) {
      this.page.append(this.renderTitlePage(group), this.navGroups.render(), this.pagination.render(), await TextbookPage.cardsContainer.render(Regime.group));
    } else {
      this.page.append(this.renderTitlePage(group), this.navGroups.render(), await TextbookPage.cardsContainer.render(Regime.hard));
    }
    return this.page;
  }
}

export default TextbookPage;
