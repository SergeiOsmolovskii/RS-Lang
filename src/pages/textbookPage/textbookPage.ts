import './textbookPage.css';
import { insertElement } from '../../services/services';
import Page from '../../templates/page';
import { CardsContainer } from './cards';
import { Pagination } from './pagination';
import { NavGroups } from './navGroups';
import { Regime } from '../../options/options';

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

  static async renderCardContainer(regime: Regime) {
    const cardsContainerHTML = await TextbookPage.cardsContainer.render(regime);
    return cardsContainerHTML;
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title'], 'Учебник', this.page);
    this.page.append(this.navGroups.render(), this.pagination.render(), await TextbookPage.cardsContainer.render(Regime.group));
    return this.page;
  }
}

export default TextbookPage;
