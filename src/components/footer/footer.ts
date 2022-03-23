import "./footer.css";
import { FOOTER_CONTENT_HTML } from "../../options/options";
import Component from "../../templates/component";

class Footer extends Component {
  constructor(tagName: string, className: string[]) {
    super(tagName, className);
  }

  render(): HTMLElement {
    this.container.innerHTML = FOOTER_CONTENT_HTML;
    return this.container;
  }
}

export default Footer;
