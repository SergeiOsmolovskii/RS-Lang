import "./audioCallPage.css";
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class AudioCallPage extends Page {
  constructor(id: string) {
    super(id);
    this.page.classList.add('page');
  }

  render(): HTMLElement {
    const title = insertElement("h2", ["title"], "Аудиовызов", this.page);
    return this.page;
  }
}

export default AudioCallPage;
