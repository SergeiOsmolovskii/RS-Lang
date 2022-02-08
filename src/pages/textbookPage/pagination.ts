import { buttonsPagination } from '../../options/options';
import { TextbookNav } from '../../templates/textbookNav';

export class Pagination extends TextbookNav {
  constructor() {
    super();
  }

  render(): HTMLElement {
    this.container.append(this.renderNavButtons(['pagination'], 'page', buttonsPagination));
    const el: HTMLElement = this.container;
    this.selectNavItem(this.container, 'page');
    return this.container;
  }
}
