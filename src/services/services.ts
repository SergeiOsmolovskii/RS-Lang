import { buttonsPage } from '../options/options';

export function insertElement(
  tagName: string,
  className?: string[],
  content?: string | undefined,
  parentNode?: HTMLElement | null | ''
): HTMLElement {
  const el = document.createElement(tagName);
  if (className) {
    el.classList.add(...className);
  }
  if (content) {
    el.innerHTML = content;
  }
  if (parentNode) {
    parentNode.append(el);
  }
  return el;
}

export const renderHeaderButtons = (): HTMLElement => {
  const headerButtons = insertElement('nav', ['nav'], '');
  buttonsPage.forEach((button) => {
    const buttonHTML = <HTMLAnchorElement>insertElement('a', [...button.class], button.label, '');
    buttonHTML.href = `#${button.id}`;
    headerButtons.append(buttonHTML);
  });
  return headerButtons;
};

export const getRandom = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffle = (arr: number[]) => {
  let j, x;
  for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
  return arr;
}

export const clicker = (el: HTMLElement) =>{
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = 195 + 'px';
    circle.style.top = 130 + 'px';
    el.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
}

let changeDegLeft = 0;
let changeDegright = 0;
export const changeQuoteNumber = (doc: any) => {
  changeDegLeft = changeDegLeft + 720;
  changeDegright = changeDegright - 720;
  doc[0].style.transform = `rotate(${changeDegLeft-27}deg)`;
  doc[1].style.transform = `rotate(${changeDegright+164}deg)`;
  doc[0].style.transition = '0.8s';
  doc[1].style.transition = '0.8s';
}