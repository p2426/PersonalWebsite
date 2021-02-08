import { MathFunctions } from "../../mathfunctions";
import { Component } from "../component";

export class Carousel extends Component {

    static initDataAttribute = "carousel";

    scope = this.element;
    panelIndex = 0;

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
            amount: 10,
        },
    };

    constructor(node) {
        super(node);
        this.setPerspective();
        this.updatePanels();

        this.panels.forEach(panel => {
            panel.style.border = `5px solid rgb(${MathFunctions.randomRange(0, 255)}, ${MathFunctions.randomRange(0, 255)}, ${MathFunctions.randomRange(0, 255)})`;
        });
    }

    resize(e) {
        this.panelOptions.width.amount = window.innerWidth - 400;
        this.panelOptions.height.amount = window.innerHeight - 400;
        this.updatePanels();
    }

    wheel(e) {
        // don't rotate the Carousel when we are over a scrollable DIV on the surface of a panel
        const scrollableDiv = e.path.find(el => el.nodeName.toLowerCase() === "div");
        if (scrollableDiv.offsetHeight < scrollableDiv.scrollHeight) {
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
        return this.scope.querySelector('.carousel');
    }

    get panels() {
        return Array.from(this.scope.querySelectorAll('.carousel__panel'));
    }

    get panelTemplate() {
        return `<div class="carousel__panel">${this.panels.length + 1}</div>`;
    }

    setPerspective(amount = this.carouselOptions.perspective.amount, unit = this.carouselOptions.perspective.unit) {
        this.element.style.perspective = amount + unit;
    }

    setPanelIndex(i) {
        this.panelIndex = i;
        this.updatePanels();
    }

    nextPanel() {
        this.setPanelIndex(this.panelIndex += 1);
    }

    previousPanel() {
        this.setPanelIndex(this.panelIndex -= 1);
    }

    addPanel() {
        this.panelContainer.appendChild(this.createElementFrom(this.panelTemplate));
        this.updatePanels();
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
            const rotY = this.calcPanelYRotation(panels.length, i);
            panel.style.transform = `rotateY(${rotY}deg) translateZ(${translateZ + this.panelOptions.width.unit})`;
        });

        this.panelContainer.style.transform = `translateZ(${MathFunctions.invert(translateZ) + this.panelOptions.width.unit}) rotateY(${(this.panelIndex / panels.length) * -360}deg) `;
    }

    calcPanelYRotation(panelsLength, i) {
        return (360 / panelsLength) * i;
    }

    calcPanelZTranslation(panelsLength) {
        return (this.panelOptions.width.amount / 2) / MathFunctions.getTanFromDegrees(180 / panelsLength);
    }
}