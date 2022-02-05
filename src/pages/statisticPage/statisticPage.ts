import "./statisticPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";

class StatisticPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement("div", ["page"], "", "");
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement('h2', ['title'], 'Статистика', this.page) ;
    return this.page;
  }
}

export default StatisticPage;
