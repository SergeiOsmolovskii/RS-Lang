import TextbookPage from '../pages/textbookPage/textbookPage';
import { insertElement } from '../services/services';
import { getLocalStorage, setLocalStorage } from '../services/storage';

export class TextbookNav {
  public container: HTMLElement;

  constructor() {
    this.container = insertElement('nav');
  }

  renderNavButtons(
    styles: Array<string>,
    field: string,
    buttons: { length: number; class: Array<string>; text: string }
  ): HTMLElement {
    const value = getLocalStorage(field) ? Number(getLocalStorage(field)) : 0;
    const navButtons = insertElement('ul', [...styles], '', '');
    for (let i = 1; i <= buttons.length; i += 1) {
      const buttonHTML = insertElement('li', [...buttons.class], `${buttons.text}${i}`, navButtons);
      buttonHTML.dataset[field] = `${i - 1}`;
      if (i - 1 === value) {
        buttonHTML.classList.add('active');
      }
    }
    return navButtons;
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
        TextbookPage.renderCardContainer();
      }
    });
  }

  render(): HTMLElement {
    return this.container;
  }
}
