import { Component } from "../../component";

export class Debugger extends Component {

    static initDataAttribute = "debugger";

    carousel;

    keypress(e) {
        if (this.element.checked) {
            if (this[e.key] instanceof Function) {
                this[e.key]();
            }
        }
    }

    carouselLoaded(e) {
        this.carousel = e.detail.carousel;
    }

    1(e) {
        this.carousel ? this.carousel.addPanel() : console.error('Debugger: No Carousel detected');
    }
}