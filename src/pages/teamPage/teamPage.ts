import "./teamPage.css"
import { insertElement } from "../../services/services";
import Page from "../../templates/page";
import { MEMBER_INFO } from "../../options/options";

class TeamPage extends Page {
  constructor(id: string) {
    super(id);
    this.page = insertElement("div", ["page"], "", "");
  }

  async render(): Promise<HTMLElement> {
    const title = insertElement("h2", ["title"], "О команде", this.page);
    const aboutTeam = insertElement("div", ["about-team"], "", this.page);
    aboutTeam.insertAdjacentHTML("beforeend", this.addinfo());
    return this.page;
  }

  addinfo() {
    let resultTeamInfo: string = "";

    for (let i = 0; i < MEMBER_INFO.length; i++) {
      resultTeamInfo += `
        <div class="member__card">
          <div class="member__info">
            <div class="member__photo" id="${MEMBER_INFO[i].id}"></div>
            <div class="member__links">
              <h3 class="member__name">${MEMBER_INFO[i].name}</h3>
              <p class="member__role">${MEMBER_INFO[i].role}</p>
              <a href="${MEMBER_INFO[i].githubLink}" class="member__git"></a>
              <a href="${MEMBER_INFO[i].linkidInLink}" class="member__linkidin"></a>
              <a href="mailto:${MEMBER_INFO[i].email}" class="member__email"></a>
            </div>
          </div>
            <p class="member__completed-tasks">${MEMBER_INFO[i].completedTasks}</p>
        </div>
      `;
    }
    return resultTeamInfo;
  }
}

export default TeamPage;
