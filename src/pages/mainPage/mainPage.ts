import "./mainPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class MainPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
  }

  render(): HTMLElement {
    const title = insertElement('h2', ['title'], 'Главная страница', this.page) ;
    return this.page;
  }
}

export default MainPage;
