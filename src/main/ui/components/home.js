import { Component } from "../component";

export class Home extends Component {

    static initDataAttribute = "home";

    click(e) {
        window.location.reload();
    }

    minigameStarted(e) {
        this.setActive(true);
    }

    setActive(bool) {
        if (bool) {
            this.element.classList.remove("no--opacity", "no--pointer-events");
        } else {
            this.element.classList.add("no--opacity", "no--pointer-events");
        }
    }
}