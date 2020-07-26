import { Component } from '../component';

export class TabContent extends Component {

    static namespace = 'tab-content-group';

    #scope;
    #id;

    constructor(node, scope = document.body) {
        super(node);
        this.#scope = scope;
        this.#id = this.element.getAttribute('data-' + TabContent.namespace + '-id');  
    }

    show() {
        this.element.classList.remove(this.noDisplayClass);

        setTimeout(() => {
            this.element.classList.remove(this.noOpacityClass);
        }, 50);
    }

    hide() {
        this.element.classList.add(this.noOpacityClass);
        this.element.classList.add(this.noDisplayClass);
    }

    getId() { return this.#id; }
}