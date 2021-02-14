export class Component {

    static instances = {};
    static initDataAttribute = "";

    events = ["click", "mousemove", "change", "keypress", "keydown", "resize", "wheel"];
    customEvents = ["minigameStarted", "minigameReady", "carouselLoaded"];

    element;

    static init() {
        const instances = Array.from(document.querySelectorAll(`[data-${this.initDataAttribute}]`));
        instances.forEach(i => {
            this.instances[i.getAttribute(`data-${this.initDataAttribute}`)] = new this(i);
        });
    }

    static get(instanceName) {
        return this.instances[instanceName] || undefined;
    }

    constructor(node) {
        this.element = node;
        this.bindEvents();
    }

    bindEvents() {
        this.events.forEach(eventName => {
            if (this[eventName] instanceof Function) {
                let target;
                switch(eventName) {
                    case "keypress":
                        target = document;
                        break;
                    case "keydown":
                        target = document;
                        break;
                    case "resize":
                        target = window;
                        break;
                    default:
                        target = this.element;
                        break;
                }
                target?.addEventListener(eventName, this[eventName].bind(this));
            }
        });

        this.customEvents.forEach(eventName => {
            if (this[eventName] instanceof Function) {
                document.body.addEventListener(eventName, this[eventName].bind(this));
            }
        });
    }

    dispatchEvent(eventName, detail) {
        const e = new CustomEvent(eventName, {
            detail: detail
        });
        document.body.dispatchEvent(e);
    }

    static createElementFrom(templateLiteral) {
        const template = document.createElement('template');
        templateLiteral.trim();
        template.innerHTML = templateLiteral;
        return template.content.firstChild;
    }

    createElementFrom(templateLiteral) {
        return Component.createElementFrom(templateLiteral);
    }
}