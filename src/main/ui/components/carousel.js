import { MathFunctions } from "../../mathfunctions";
import { Component } from "../component";

export class Carousel extends Component {

    static initDataAttribute = "carousel";

    panelIndex = 0;
    panelOrientationIndex = 0;
    panelAxis = "Y";
    panelIndicator = Component.get("carousel_panel_indicator");

    carouselOptions = {
        perspective: {
            amount: 1000,
            unit: "px"
        },
    }

    panelContainerOptions = {
        heightOffset: {
            amount: 0
        }
    };

    panelOptions = {
        width: {
            amount: window.innerWidth - 400,
            unit: "px"
        },
        height: {
            amount: window.innerHeight - 400,
            unit: "px"
        },
        spacing: {
            enabled: true,
            amount: 20,
        },
    };

    constructor(node) {
        super(node);
        this.setPerspective();
        this.updatePanels();
        this.setupPanelIndicator();
    }

    resize(e) {
        this.panelOptions.width.amount = window.innerWidth - 400;
        this.panelOptions.height.amount = window.innerHeight - 400;
        this.updatePanels();
    }

    wheel(e) {
        // don't rotate the Carousel when we are over a scrollable DIV on the surface of a panel
        const scrollableDiv = e.path.find(el => el.nodeName.toLowerCase() === "div");
        if (scrollableDiv.offsetHeight < scrollableDiv.scrollHeight && !Array.from(scrollableDiv.classList).includes("carousel__container")) {
            return;
        }

        e.deltaY < 0 ? this.nextPanel() : this.previousPanel();
    }

    keydown(e) {
        switch(e.key) {
            case "ArrowLeft":
                this.previousPanel();
                break;
            case "ArrowRight":
                this.nextPanel();
                break;
            default:
                break;
        }
    }

    get panelContainer() {
        return this.element.querySelector('.carousel');
    }

    get panels() {
        return Array.from(this.element.querySelectorAll('.carousel__panel'));
    }

    get panelTemplate() {
        return `<div class="carousel__panel">
            <div class="carousel__panel-placeholder">${this.panels.length + 1}</div>
        </div>`;
    }

    setPerspective(amount = this.carouselOptions.perspective.amount, unit = this.carouselOptions.perspective.unit) {
        this.element.style.perspective = amount + unit;
    }

    setPanelAxis(axis) {
        this.panelAxis = axis;
        this.updatePanels();
    }

    setupPanelIndicator() {
        this.panels.forEach((panel, index) => {
            this.panelIndicator.addIndicator();
            if (index === this.panelIndex) {
                this.panelIndicator.setActive(index);
            }
        });
    }

    calcPanelIndex(i) {
        const panelsLength = this.panels.length;
        this.panelIndex = i;
        if (this.panelIndex < 0) {
            this.panelIndex = panelsLength + this.panelIndex;
            this.calcPanelIndex(this.panelIndex);
        }
        if (this.panelIndex > (panelsLength - 1)) {
            this.panelIndex = this.panelIndex - panelsLength;
            this.calcPanelIndex(this.panelIndex);
        }
        return;
    }

    nextPanel() {
        this.panelOrientationIndex += 1;
        this.calcPanelIndex(this.panelOrientationIndex);
        this.panelIndicator.setActive(this.panelIndex);
        this.updatePanels();
    }

    previousPanel() {
        this.panelOrientationIndex -= 1;
        this.calcPanelIndex(this.panelOrientationIndex);
        this.panelIndicator.setActive(this.panelIndex);
        this.updatePanels();
    }

    addPanel() {
        this.panelContainer.appendChild(this.createElementFrom(this.panelTemplate));
        this.updatePanels();
        this.panelIndicator.addIndicator();
    }

    updatePanels() {
        this.adjustPanelContainer();
        this.applyPanelOptions();
        this.applyPanelTransforms();
    }

    adjustPanelContainer() {
        const panelContainer = this.panelContainer;
        panelContainer.style.width = this.panelOptions.width.amount + this.panelOptions.width.unit;
        panelContainer.style.height = (this.panelOptions.height.amount + this.panelContainerOptions.heightOffset.amount) + this.panelOptions.height.unit;
    }

    applyPanelOptions() {
        const panels = this.panels;
        panels.forEach((panel, i) => {
            panel.style.width = (this.panelOptions.spacing.enabled ? this.panelOptions.width.amount - this.panelOptions.spacing.amount : this.panelOptions.width.amount) + this.panelOptions.width.unit;
            panel.style.height = this.panelOptions.height.amount + this.panelOptions.height.unit;
        });
    }

    applyPanelTransforms() {
        const panels = this.panels;
        const translateZ = this.calcPanelZTranslation(panels.length);
        panels.forEach((panel, i) => {
            const rotY = this.calcPanelRotation(panels.length, i);
            panel.style.transform = `rotate${this.panelAxis}(${rotY}deg) translateZ(${translateZ + this.panelOptions.width.unit})`;
        });

        this.panelContainer.style.transform = `translateZ(${MathFunctions.invert(translateZ) + this.panelOptions.width.unit}) rotate${this.panelAxis}(${(this.panelOrientationIndex / panels.length) * -360}deg) `;
    }

    calcPanelRotation(panelsLength, i) {
        return (360 / panelsLength) * i;
    }

    calcPanelZTranslation(panelsLength) {
        return (this.panelOptions.width.amount / 2) / MathFunctions.getTanFromDegrees(180 / panelsLength);
    }
}