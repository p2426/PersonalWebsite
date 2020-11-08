import { RollTheDiceButton } from "./rollthedice-button";

export class TheRoyalGameOfUrUI {
    constructor(node, game) {
        this.element = node;
        this.game = game;
        this.createElements();
    }

    createElements() {
        const elements = [];
        this.rollTheDiceButton = new RollTheDiceButton({
            node: document.createElement('button'),
            textContent: "Roll the dice",
            classes: [],
            click: this.game.rollTheDice.bind(this.game),
        });

        elements.push(this.rollTheDiceButton.element);
        elements.forEach(element => {
            this.element.append(element);
        });
    }
}