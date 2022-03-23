import './mainPage.css'
import { insertElement } from '../../services/services';
import Page from '../../templates/page';
import { MAIN_PAGE_CONTENT_HTML } from '../../options/options';
import { appendRegistrationForm } from '../../components/login-form/login-form';
const Parallax = require('parallax-js');

class MainPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
    this.page.classList.add('main-page');
  }

  renderImg(): HTMLElement {
    const imagesContainer = <HTMLAnchorElement>insertElement('a', ['images-container'])
    imagesContainer.href = "/#about-app"
    imagesContainer.id ="scene"
    const mainImg = <HTMLImageElement>insertElement('img', ['main-img'], '', this.page);
    mainImg.src = '../../assets/png/main-page-img.png';
    mainImg.alt = 'Main image'
    const dialog = insertElement('div', ['dialog'], '', imagesContainer);
    dialog.dataset.depth = '0.6';
    const dialogImg = <HTMLImageElement>insertElement('img', ['dialog-img'], '', dialog);
    dialogImg.src = '../../assets/png/dialog-1.png';
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(imagesContainer);
    parallaxInstance.friction(0.2, 0.2);
    return imagesContainer;
  }

  async render(): Promise<HTMLElement> {
    const pageContent = insertElement('div', ['main-page-content'], MAIN_PAGE_CONTENT_HTML, this.page);
    this.page.append(this.renderImg());
    const btnRegistration = <HTMLButtonElement>insertElement('button', ['btn-registration'], 'регистрация', pageContent);
    btnRegistration.addEventListener('click', appendRegistrationForm);
    return this.page;
  }
}

export default MainPage;
