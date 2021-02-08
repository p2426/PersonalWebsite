import { Component } from "../component";

export class CarouselPanelFlipper extends Component {

    static initDataAttribute = "carousel-panel-flipper";

    carousel = Component.get("carousel");

    constructor(node) {
        super(node);
        this.rotate(this.axis);
    }

    get axis() {
        return this.carousel.panelAxis;
    }

    click(e) {
        this.carousel.setPanelAxis(this.axis == "Y" ? "X" : "Y");
        this.rotate();
    }

    rotate() {
        this.element.style.transform = `rotate(${this.axis === "Y" ? 0 : 90}deg)`;
    }
}