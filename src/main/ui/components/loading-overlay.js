import { Component } from "../component";

export class LoadingOverlay extends Component {

    static initDataAttribute = "loading-overlay";

    loadingBar;

    constructor(node) {
        super(node);
        this.loadingBar = this.element.querySelector(".overlay__loading-bar");
        this.loadingBar.style.width = "50%";
    }

    carouselLoaded(e) {
        this.loadingBar.style.transition = "width, .5s";
        this.loadingBar.style.width = "100%";
        this.element.style.opacity = 0;
        setTimeout(function() {
            this.element.remove();
        }.bind(this), 1000);
    }
}