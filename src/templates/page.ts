abstract class Page {
  protected page: HTMLElement;

  constructor(id: string) {
    this.page = document.createElement("div");
    this.page.id = id;
  }

  render(): HTMLElement {
    return this.page;
  }
}

export default Page;
