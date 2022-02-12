import "./game.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { renderFormLevel } from "../../services/renderForm";
import audioCallPage from "../audioCallPage/audioCallPage";

class MiniGamesPage extends Page {
  public checkInput: HTMLInputElement[] | null = null;
  public checkNumber: number = 0;
  public count: number = 0;

  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['page'], '','');
  }

  async render(): Promise<HTMLElement> {
    console.log(this.page)
    this.page.insertAdjacentHTML('beforeend', renderFormLevel);
    this.checkInput = Array.from(this.page.querySelectorAll('.item-input'));
    this.checkInput?.forEach(el => el.addEventListener('change', () => this.checkLevel()));
    return this.page;
  }

  checkLevel() {
    this.checkInput?.forEach(el => {
      if(el?.checked){
        this.checkNumber = Number(el.value);
      }
    });
  }

  clearPage() {
    const currentPage: Element | null = <Element>document.querySelector('.page');
    while (currentPage.firstChild) {
      currentPage.firstChild.remove();
    }
    this.count = 0;
  }
}

export default MiniGamesPage;
