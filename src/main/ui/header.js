import {Component} from './component';

export class Header extends Component {

    static namespace = "header";

    static instances = [];

    #transitionTimeout = 2000;
    #transitionClass = '--up';

    constructor(node) {

        super(node);

        setTimeout(() => {
            this.toggleClass(Header.namespace, this.#transitionClass);
        }, this.#transitionTimeout);
    }

    static init(scope = document.body) {
        Header.instances = scope.querySelectorAll('[' + ['data', Header.namespace, 'id'].join('-') + ']');
        Header.instances.forEach(node => new Header(node));
    }
}