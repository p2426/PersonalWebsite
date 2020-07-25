import {Component} from './component';

export class EnterButton extends Component {

    static namespace = 'enter-button';
    static instances = [];

    #noDisplayClass = 'no--display';
    #noScrollClass = 'no--scroll';
    #noOpacityClass = 'no--opacity';
    #parentSelector = '.landing__content';

    static init(scope = document.body) {
        EnterButton.instances = scope.querySelectorAll('[' + ['data', EnterButton.namespace, 'id'].join('-') + ']');
        EnterButton.instances.forEach(node => new EnterButton(node));
    }

    constructor(node) {
        super(node);
    }

    click() {
        const parentEl = this.element.closest(this.#parentSelector);
        const htmlEl = document.documentElement;
        const mainContent = parentEl.nextElementSibling;

        parentEl.classList.add(this.#noOpacityClass);

        setTimeout(() => {
            parentEl.classList.add(this.#noDisplayClass);
            mainContent.classList.remove(this.#noDisplayClass);

            setTimeout(() => {
                htmlEl.classList.remove(this.#noScrollClass);
                mainContent.classList.remove(this.#noOpacityClass);
            }, 50);
        }, 400);
    }
}