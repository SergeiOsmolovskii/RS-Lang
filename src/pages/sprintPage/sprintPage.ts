import "./sprintPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class SprintPage extends Page {
  constructor(id: string) {
    super(id);
    this.page.classList.add('page');
  }

  render(): HTMLElement {
    const title = insertElement('h2', ['title'], 'Спринт', this.page) ;
    return this.page;
  }
}

export default SprintPage;
