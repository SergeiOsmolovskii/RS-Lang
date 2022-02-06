abstract class Page {
  protected page: HTMLElement;

  constructor(id: string) {
    this.page = document.createElement('main');
    this.page.id = id;
  }

  render(): HTMLElement {
    return this.page;
  }
}

export default Page;
