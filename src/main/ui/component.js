export class Component {

    element;

    constructor(node) {
        this.element = node;
    }

    toggleClass(namespace, classname) {
        this.element.classList.toggle(namespace + classname);
    }
}