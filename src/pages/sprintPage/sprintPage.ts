import "./sprintPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { timerForm, renderFormSprintGame, renderSvgExit } from "../../services/renderForm";

class SprintPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.page.insertAdjacentHTML('beforeend', timerForm);
    this.page.insertAdjacentHTML('beforeend', renderSvgExit);
    this.page.insertAdjacentHTML('beforeend', renderFormSprintGame);

    return this.page;
  }
}

export default SprintPage;
