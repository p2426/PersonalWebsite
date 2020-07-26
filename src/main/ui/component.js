export class Component {

    events = ["click"];

    noDisplayClass = 'no--display';
    noScrollClass = 'no--scroll';
    noOpacityClass = 'no--opacity';
    flexCenterClass = 'flex--center';
    flexTopClass = 'flex--top';

    element;

    constructor(node) {
        this.element = node;
        this.bindEvents();
    }

    toggleClass(namespace, classname) {
        this.element.classList.toggle(namespace + classname);
    }

    bindEvents() {
        this.events.forEach(eventName => {
            if (this[eventName] instanceof Function) {
                this.element?.addEventListener(eventName, this[eventName].bind(this));
            }
        });
    }
}