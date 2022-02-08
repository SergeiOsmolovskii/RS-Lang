import { buttonsGroups } from '../../options/options';
import { TextbookNav } from '../../templates/textbookNav';

export class NavGroups extends TextbookNav {
  constructor() {
    super();
  }

  render(): HTMLElement {
    this.container.append(this.renderNavButtons(['groups-btn'], 'group', buttonsGroups));
    this.selectNavItem(this.container, 'group');
    return this.container;
  }
}
