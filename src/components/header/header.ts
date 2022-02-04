import './header.css';
import { renderHeaderButtons } from '../../services/services';
import { renderLogInButton } from '../login-form/login-form';
import Component from '../../templates/component';

class Header extends Component {
  constructor(tagName: string, className: string[]) {
    super(tagName, className);
  }

  render(): HTMLElement {
    this.container.append(renderHeaderButtons());
    this.container.append(renderLogInButton());
    return this.container;
  }
}

export default Header;