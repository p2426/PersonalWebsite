import { Component } from "../../component";

export class Scroller extends Component {

    static initDataAttribute = "scroller";

    fadeTime = 4000;

    constructor(node) {
        super(node);
        setTimeout(() => {
            this.element.classList.add("no--opacity");
        }, this.fadeTime);
    }
}