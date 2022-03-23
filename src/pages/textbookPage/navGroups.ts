import { storage } from '../../api/api';
import { GROUP_HARD, Regime } from '../../options/options';
import { insertElement, renderGroupsButtons } from '../../services/services';
import { setLocalStorage } from '../../services/storage';
import { TextbookNav } from '../../templates/textbookNav';
import TextbookPage from './textbookPage';

export class NavGroups extends TextbookNav {
  constructor() {
    super();
    this.container.classList.add('group-container');
  }

  clear(): void {
    this.container.innerHTML = '';
  }

  render(): HTMLElement {
    this.clear();
    this.container.append(renderGroupsButtons());
    this.selectNavItem(this.container, 'group');
    if (storage.isAuthorized) {
      const btnHard = insertElement('button', ['group-hard'], 'сложные слова', '');
      btnHard.addEventListener('click', async () => {
        document.querySelector('.page-header-buttons')?.classList.add('hide');
        document.querySelector('.pagination-container')?.classList.add('hide');
        (document.querySelectorAll('.group-item') as NodeListOf<HTMLElement>).forEach((el) =>
          el.classList.remove('active')
        );
        btnHard.dataset.group = GROUP_HARD;
        setLocalStorage('group', GROUP_HARD);
        TextbookPage.cardsContainer.render(Regime.hard);
      });
      this.container.append(btnHard);
    }
    return this.container;
  }
}
