import { buttonsPage } from "../options/options";

export function insertElement(
  tagName: string,
  className: string[],
  content: string | undefined,
  parentNode?: HTMLElement | null | ''
): HTMLElement {
  const el = document.createElement(tagName);
  el.classList.add(...className);
  if (content) {
    el.innerHTML = content;
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

export const playAudio = (playList: Array<string>): void => {
  let playNum = 0;
  const audio = document.createElement('audio');
  audio.src = playList[playNum];
  audio.play();
  audio.onended = () => {
    if (playNum === playList.length - 1) {
      audio.pause()
    } else {
      playNum = playNum + 1;
      audio.src = playList[playNum];
      audio.play();
    }
  }
}


