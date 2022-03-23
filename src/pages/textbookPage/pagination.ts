import { buttonsPagination } from '../../options/options';
import { insertElement } from '../../services/services';
import { getLocalStorage } from '../../services/storage';
import { TextbookNav } from '../../templates/textbookNav';

export class Pagination extends TextbookNav {
  constructor() {
    super();
    this.container.classList.add('pagination-container');
  }

  renderNavButtons(): HTMLElement {
    const value = getLocalStorage('page') ? Number(getLocalStorage('page')) : 0;
    const navButtons = insertElement('ul', ['pagination'], '', '');
    for (let i = 1; i <= buttonsPagination.length; i += 1) {
      const buttonHTML = insertElement('li', [...buttonsPagination.class], `${buttonsPagination.text}${i}`, navButtons);
      buttonHTML.dataset.page = `${i - 1}`;
      if (i - 1 === value) {
        buttonHTML.classList.add('active');
      }
    }
    return navButtons;
  }

  render(): HTMLElement {
    this.container.append(this.renderNavButtons());
    const el: HTMLElement = this.container;
    this.selectNavItem(this.container, 'page');
    return this.container;
  }
}
