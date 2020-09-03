export class Component {

    events = ["click", "mousemove"];

    element;

    constructor(node) {
        this.element = node;
        this.bindEvents();
    }

    bindEvents() {
        this.events.forEach(eventName => {
            if (this[eventName] instanceof Function) {
                this.element?.addEventListener(eventName, this[eventName].bind(this));
            }
        });
    }
}