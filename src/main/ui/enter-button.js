import {Component} from './component';

export class EnterButton extends Component {

    static namespace = 'enter-button';
    static instances = [];

    #parentSelector = '.landing__content';
    #footerSelector = 'footer';

    static init(scope = document.body) {
        EnterButton.instances = scope.querySelectorAll('[' + ['data', EnterButton.namespace, 'id'].join('-') + ']');
        EnterButton.instances.forEach(node => new EnterButton(node));
    }

    constructor(node) {
        super(node);
    }

    click(e) {
        const htmlEl = document.documentElement;
        const backgroundEl = document.body.firstElementChild;
        const parentEl = this.element.closest(this.#parentSelector);
        const mainContent = parentEl.nextElementSibling;
        const footerEl = document.getElementById(this.#footerSelector);

        parentEl.classList.add(this.noOpacityClass);

        setTimeout(() => {
            backgroundEl.classList.remove(this.flexCenterClass);
            backgroundEl.classList.add(this.flexTopClass);
            parentEl.classList.add(this.noDisplayClass);
            mainContent.classList.remove(this.noDisplayClass);
            footerEl.classList.remove(this.noDisplayClass);

            setTimeout(() => {
                htmlEl.classList.remove(this.noScrollClass);
                mainContent.classList.remove(this.noOpacityClass);
                footerEl.classList.remove(this.noOpacityClass);
            }, 50);
        }, 400);
    }
}