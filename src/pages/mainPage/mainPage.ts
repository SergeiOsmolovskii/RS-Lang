import "./mainPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { MAIN_PAGE_CONTENT_HTML } from "../../options/options";
import { appendRegistrationForm } from "../../components/login-form/login-form";

class MainPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
    this.page.classList.add('main-page');
  }

  async render(): Promise<HTMLElement> {
    const pageContent = insertElement('div', ['main-page-content'], MAIN_PAGE_CONTENT_HTML, this.page)
    const mainImg = <HTMLImageElement>insertElement('img', ['main-img'], '', this.page);
    mainImg.src = '../../assets/png/main-page-img.png';
    mainImg.alt = 'Main image'
    const btnRegistration = <HTMLButtonElement>insertElement('button', ['btn-registration'], 'регистрация', pageContent);
    btnRegistration.addEventListener('click', appendRegistrationForm);
    return this.page;
  }
}

export default MainPage;
