import './header.css';
import { renderHeaderButtons } from '../../services/services';
import Component from '../../templates/component';

class Header extends Component {
  constructor(tagName: string, className: string[]) {
    super(tagName, className);
  }

  render(): HTMLElement {
    this.container.append(renderHeaderButtons());
    return this.container;
  }
}

export default Header;
