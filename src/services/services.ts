import { buttonsPage } from "../options/options";

export function insertElement(
  tagName: string,
  className: string[],
  text: string | undefined,
  parentNode?: HTMLElement | null | ''
): HTMLElement {
  const el = document.createElement(tagName);
  el.classList.add(...className);
  if (text) {
    el.innerText = text;
  }
  if (parentNode) {
    parentNode.append(el);
  }
  return el;
}

export const renderHeaderButtons = (): HTMLElement => {
  const headerButtons = insertElement('nav', ['nav'], '', '');
  buttonsPage.forEach((button) => {
    const buttonHTML: HTMLAnchorElement = document.createElement('a');
    buttonHTML.href = `#${button.id}`;
    buttonHTML.classList.add(...button.class);
    buttonHTML.innerText = button.label;
    headerButtons.append(buttonHTML);
  });
  return headerButtons;
};
  


