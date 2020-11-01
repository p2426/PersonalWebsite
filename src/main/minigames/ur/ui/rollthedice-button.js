import { MathFunctions } from "../../../mathfunctions";
import { Component } from "../../../ui/component";

export class RollTheDiceButton extends Component {
    constructor(settings) {
        super(settings.node);
        this.settings = settings;

        this.settings.classes.forEach(c => {
            this.element.classList.add(c);
        });
        this.element.textContent = this.settings.textContent;
    }

    click(e) {
        this.settings.click(MathFunctions.randomRange(0, 4), 0);
    }
}