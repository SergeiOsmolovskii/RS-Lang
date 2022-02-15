import { Regime } from '../options/options';
import TextbookPage from '../pages/textbookPage/textbookPage';
import { insertElement } from '../services/services';
import { getLocalStorage, setLocalStorage } from '../services/storage';

export class TextbookNav {
  public container: HTMLElement;

  constructor() {
    this.container = insertElement('nav');
  }

  selectNavItem(container: HTMLElement, field: string): void {
    container.addEventListener('click', async (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains(`${field}-item`)) {
        (document.querySelectorAll(`.${field}-item`) as NodeListOf<HTMLElement>).forEach((el) =>
          el.classList.remove('active')
        );
        const numItem = <string>target.dataset[field];
        target.classList.add('active');
        setLocalStorage(field, numItem);
        TextbookPage.renderCardContainer(Regime.group);
      }
    });
  }

  render(): HTMLElement {
    return this.container;
  }
}
