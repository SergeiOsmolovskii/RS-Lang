import { insertElement } from "../services/services";

abstract class Component {
  protected container: HTMLElement;

  constructor(tagName:string, className: string[]) {
    this.container = document.createElement(tagName);
    this.container.classList.add(...className);
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Component;
