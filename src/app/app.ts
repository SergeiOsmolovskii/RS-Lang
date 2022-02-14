import { storage } from "../api/api";
import { getCurrentUser } from "../api/users";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import { PageIds } from "../options/options";
import AudioCallPage from "../pages/audioCallPage/audioCallPage";
import MainPage from "../pages/mainPage/mainPage";
import SprintPage from "../pages/sprintPage/sprintPage";
import StatisticPage from "../pages/statisticPage/statisticPage";
import TextbookPage from "../pages/textbookPage/textbookPage";
import Page from "../templates/page";

export class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId = "current-page";
  static header: Header;
  static footer: Footer;

  static async renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
      document.body.innerHTML = "";
    }

    let page: Page | null = null;

    switch (idPage) {
      case PageIds.MainPage:
        page = new MainPage(idPage);
        break;
      case PageIds.StatisticPage:
        page = new StatisticPage(idPage);
        break;
      case PageIds.AudioCallPage:
        page = new AudioCallPage(idPage);
        break;
      case PageIds.SprintPage:
        page = new SprintPage(idPage);
        break;
      case PageIds.TextbookPage:
        page = new TextbookPage(idPage);
        break;
    }

    if (page) {
      const userId = localStorage.getItem('currentUserID');
      const userToken = localStorage.getItem('currentUserToken');

      if (userId !== null && userToken !== null) {
        const currentUser = await getCurrentUser(userId, userToken);
        storage.userName = currentUser.name as string;
        storage.userEmail = currentUser.email;
        storage.userId = userId;
        storage.isAuthorized = true;
      }
      const headerHTML = new Header("header", ["header"]);
      const pageHTML = page.render();
      (await pageHTML).id = this.defaultPageId;
      const footerHTML = new Footer("footer", ["footer"]);
      App.container.append(headerHTML.render(), await pageHTML, footerHTML.render());
    }
  }

  private enableRouteChange(): void {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  start(): void {
    const currentId = window.location.hash.slice(1)
    App.renderNewPage(currentId);
    this.enableRouteChange();
  }
}
