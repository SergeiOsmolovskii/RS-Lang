import './header.css';
import { insertElement, renderHeaderButtons } from '../../services/services';
import { renderLogInButton, renderProfileBlock } from '../login-form/login-form';
import Component from '../../templates/component';
import { PageIds } from '../../options/options';

class Header extends Component {
  constructor(tagName: string, className: string[]) {
    super(tagName, className);
  }

  render(): HTMLElement {
    const logoContainer = insertElement('div', ['logo-container']);
    const logoLink = <HTMLAnchorElement>insertElement('a', ['logo-link'], '', logoContainer);
    logoLink.href = `/#${PageIds.MainPage}`;
    const logo = insertElement('div', ['logo'], '', logoLink);
    const logoTitle = insertElement('h1', ['logo-title'], 'lang', logoLink);
 
    this.container.append(logoContainer, renderHeaderButtons());
    
    if (localStorage.getItem('currentUserID') === null && localStorage.getItem('currentUserToken') === null) {
      this.container.append(renderLogInButton());
    } else {
      this.container.insertAdjacentHTML('beforeend', renderProfileBlock());
    }
    return this.container;
  }
}

export default Header;