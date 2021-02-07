export class Component {

    static instances = {};
    static initDataAttribute = "";

    events = ["click", "mousemove", "change", "keypress", "resize", "wheel"];

    element;

    static init() {
        const instances = Array.from(document.querySelectorAll(`[data-${this.initDataAttribute}]`));
        instances.forEach(i => {
            this.instances[i.getAttribute(`data-${this.initDataAttribute}`)] = new this(i);
        });
        console.log(this.instances);
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