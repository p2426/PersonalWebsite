import { Component } from "../../component";

export class CarouselPanelFlipper extends Component {

    static initDataAttribute = "carousel-panel-flipper";

    carousel = Component.get("carousel");
    rotationLock = false;

    constructor(node) {
        super(node);
        this.rotate(this.axis);
    }

    get axis() {
        return this.carousel.panelAxis;
    }

    click(e) {
        if (!this.rotationLock) {
            this.carousel.setPanelAxis(this.axis == "Y" ? "X" : "Y");
            this.rotate();
            this.rotationLock = true;
            setTimeout(function() {
                this.rotationLock = false;
            }.bind(this), 1000);
        }
    }

    rotate() {
        this.element.style.transform = `rotate(${this.axis === "Y" ? 45 : 135}deg)`;
    }
}