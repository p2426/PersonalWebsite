import { TheRoyalGameOfUr } from "../../minigames/ur/ur";
import { Component } from "../component";

export class GameInitialiser extends Component {

    static initDataAttribute = "game-initialiser";

    get value() {
        return this.element.getAttribute('data-game-initialiser');
    }

    click(e) {
        switch(this.value) {
            case "ur":
                new TheRoyalGameOfUr();
                break;
            default:
                break;
        }
    }
}