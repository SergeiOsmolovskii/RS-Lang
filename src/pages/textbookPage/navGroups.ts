import { getAllAggregatedWords } from '../../api/aggregatedWords';
import { storage } from '../../api/api';
import { Regime } from '../../options/options';
import { insertElement, renderGroupsButtons } from '../../services/services';
import { TextbookNav } from '../../templates/textbookNav';
import TextbookPage from './textbookPage';

export class NavGroups extends TextbookNav {
  constructor() {
    super();
    this.container.classList.add('group-container');
  }

  render(): HTMLElement {
    this.container.append(renderGroupsButtons());
    this.selectNavItem(this.container, 'group');
    if (storage.isAuthorized) {
      const btnHard = insertElement('button', ['group-hard'], 'сложные слова', '');
      btnHard.addEventListener('click', async (event: Event) => {
        TextbookPage.renderCardContainer(Regime.hard);
      });
      this.container.append(btnHard)
    }
   
    return this.container;
  }
}
