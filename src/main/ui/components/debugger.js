import { Component } from "../component";

export class Debugger extends Component {

    static initDataAttribute = "debugger";

    keypress(e) {
        if (this.element.checked) {
            if (this[e.key] instanceof Function) {
                this[e.key]();
            }
        }
    }

    1() {
        const carousel = Component.get("main_carousel");
        carousel.addPanel();
    }
}