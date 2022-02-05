import "./textbookPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { CardsContainer } from "./cards";

class TextbookPage extends Page {
  private static cardsContainer: CardsContainer;
  
  constructor(id: string) {
    super(id);
    this.page = insertElement('div', ['page'], '','');
    TextbookPage.cardsContainer =  new CardsContainer();
  }

  async renderCardContainer() {
    const cardsContainerHTML = (await TextbookPage.cardsContainer.render());
    return cardsContainerHTML;

  }

   async render(): Promise<HTMLElement> {
       const title = insertElement('h2', ['title'], 'Учебник', this.page) ;
       this.page.append(await TextbookPage.cardsContainer.render());
    return this.page;
  }
}

export default TextbookPage;
