import "./teamPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class TeamPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title'], 'О команде', this.page) ;
    return this.page;
  }
}

export default TeamPage;
