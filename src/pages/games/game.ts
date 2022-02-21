import "./game.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { renderFormLevel } from "../../services/renderFormChoiseLvl";
import { setLocalStorage } from "../../services/storage";

class MiniGamesPage extends Page {
  public checkInput: HTMLInputElement[] | null = null;
  public checkNumber: number = 0;
  public count: number = 0;
  public dateGame: string = new Date().toLocaleDateString();

  constructor(id: string) {
    super(id);
    this.page = insertElement('main', ['page'], '','');
  }

  async render(): Promise<HTMLElement> {
    this.page.insertAdjacentHTML('beforeend', renderFormLevel);
    this.checkInput = Array.from(this.page.querySelectorAll('.item-input'));
    this.checkInput?.forEach(el => el.addEventListener('change', () => this.checkLevel()));
    setLocalStorage('mode', 'normal');
    return this.page;
  }

  checkLevel() {
    this.checkInput?.forEach(el => {
      if(el?.checked){
        this.checkNumber = Number(el.value);
      }
    });
  }

  checkData(){
    if(localStorage.getItem('date') !== this.dateGame){
      localStorage.removeItem('sprintGameParam');
      localStorage.removeItem('audioCallGameParam');
      localStorage.removeItem('totalWord');
    }
    localStorage.setItem('date', this.dateGame)
  }

  clearPage() {
    while (this.page.firstChild) {
      this.page.firstChild.remove();
    }
    this.count = 0;
  }
}

export default MiniGamesPage;
