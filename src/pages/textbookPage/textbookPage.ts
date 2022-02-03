import "./textbookPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class TextbookPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
  }

  render(): HTMLElement {
    const title = insertElement('h2', ['title'], 'Учебник', this.page) ;
    return this.page;
  }
}

export default TextbookPage;
