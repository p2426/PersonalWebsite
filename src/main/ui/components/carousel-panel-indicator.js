import { Component } from "../component";

export class CarouselPanelIndicator extends Component {

    static initDataAttribute = "carousel-panel-indicator";

    get indicators() {
        return Array.from(this.element.querySelectorAll(".carousel__panel-indicator-item"));
    }

    get indicatorTemplate() {
        return `<div class="carousel__panel-indicator-item"></div>`;
    }

    addIndicator() {
        this.element.appendChild(this.createElementFrom(this.indicatorTemplate));
    }

    setActive(i) {
        const indicators = this.indicators;
        indicators.forEach(indicator => {
            indicator.classList.remove("carousel__panel-indicator-item--selected");
        });
        indicators[i].classList.add("carousel__panel-indicator-item--selected");
    }

    setAxis(axis) {
        if (axis === "Y") {
            this.element.classList.remove("carousel__panel-indicator--x");
            this.element.classList.add("carousel__panel-indicator--y");
        } else {
            this.element.classList.remove("carousel__panel-indicator--y");
            this.element.classList.add("carousel__panel-indicator--x");
        }
    }
}