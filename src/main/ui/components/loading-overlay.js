import { Component } from "../component";

export class LoadingOverlay extends Component {

    static initDataAttribute = "loading-overlay";

    constructor(node) {
        super(node);
        this.setLoadingPercent(0);
    }

    get loadingBar() {
        return this.element.querySelector(".overlay__loading-bar");
    }

    get textArea() {
        return this.element.querySelector('p');
    }

    setActive(bool, text = "Loading..") {
        if (bool) {
            console.log(text);
            this.element.classList.remove('no--opacity', 'no--pointer-events');
            this.textArea.textContent = text;
        } else {
            this.element.classList.add('no--opacity', 'no--pointer-events');
            setTimeout(function() {
                this.setLoadingPercent(0);
            }.bind(this), 600);
        }
    }

    setLoadingPercent(v) {
        this.loadingBar.style.width = `${v}%`;
    }

    carouselLoaded(e) {
        this.setLoadingPercent(100);
        this.setActive(false);
    }

    minigameStarted(e) {
        this.setActive(true, "Loading Game..");
    }

    minigameReady(e) {
        this.setLoadingPercent(100);
        this.setActive(false);
    }
}