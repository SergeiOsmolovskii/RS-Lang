import './aboutAppPage.css';
import { insertElement } from '../../services/services';
import Page from '../../templates/page';
import { APP_INFO, APP_REGIME_INFO } from '../../options/options';


class AboutAppPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
  }

  renderAppInfoCard(): HTMLElement {
    const appInfo = insertElement('div', ['app-info'], APP_INFO, this.page);
    const appCardContainer = insertElement('ul', ['card-info-container'], '');
    APP_REGIME_INFO.forEach((card) => {
      const cardItemHTML = <HTMLLIElement>insertElement('li', ['card-info-item'], '', appCardContainer);
      const cardLogoHTML = insertElement('div', ['card-info-logo', card.style], '', cardItemHTML);
      const cardTitleHTML = insertElement('h3', ['card-info-title'], card.title, cardItemHTML);
      const cardContentHTML = insertElement('p', ['card-info-content'], card.content, cardItemHTML);
    });
    return appCardContainer;
  };

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title'], 'О приложении', this.page) ;
    this.page.append(this.renderAppInfoCard());
    return this.page;
  }
}

export default AboutAppPage;
