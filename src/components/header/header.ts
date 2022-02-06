import './header.css';
import { renderHeaderButtons } from '../../services/services';
import { renderLogInButton, renderProfileBlock } from '../login-form/login-form';
import Component from '../../templates/component';

class Header extends Component {
  constructor(tagName: string, className: string[]) {
    super(tagName, className);
  }

  render(): HTMLElement {
    this.container.append(renderHeaderButtons());
    
    if (localStorage.getItem('currentUserID') === null && localStorage.getItem('currentUserToken') === null) {
      this.container.append(renderLogInButton());
    } else {
      this.container.insertAdjacentHTML('beforeend', renderProfileBlock());
    }
    return this.container;
  }
}

export default Header;