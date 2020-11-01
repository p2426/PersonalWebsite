import { RollTheDiceButton } from "./rollthedice-button";

export class TheRoyalGameOfUrUI {
    constructor(node, game) {
        this.element = node;
        this.game = game;
        this.createElements();
    }

    createElements() {
        const elements = [];
        const buttonSettings = {
            node: document.createElement('button'),
            textContent: "Roll the dice",
            classes: [],
            click: this.game.rollTheDice.bind(this.game),
        }
        this.rollTheDiceButton = new RollTheDiceButton(buttonSettings);

        elements.push(this.rollTheDiceButton.element);
        elements.forEach(element => {
            this.element.append(element);
        });
    }
}