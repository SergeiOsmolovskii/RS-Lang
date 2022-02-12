import "./textbookPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class TextbookPage extends Page {
  constructor(id: string) {
    super(id);
    this.page.classList.add('page');
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title'], 'Учебник', this.page) ;
    return this.page;
  }
}

export default TextbookPage;
