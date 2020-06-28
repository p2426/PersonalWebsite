import { SubjectItem } from './subject-item';
import { SubjectContent } from './subject-content';

export class SubjectController {

    #scope;

    #items = [];
    #buttons = [];
    #contents = [];

    #itemSelector = '[data-subject-item]';
    #buttonSelector = '[data-subject-button]';
    #contentSelector = '[data-subject-content]';

    #itemAttribute = 'data-subject-item';
    #buttonAttribute = 'data-subject-button';
    #buttonContentAttribute = 'data-subject-button-content';
    #contentAttribute = 'data-subject-content';

    constructor(scope = document.body) {
        this.#scope = scope;

        this.#items = Array.from(this.#scope.querySelectorAll(this.#itemSelector))
                           .map(item => new SubjectItem(item.getAttribute(this.#itemAttribute), item));

        this.#contents = Array.from(this.#scope.querySelectorAll(this.#contentSelector))
                              .map(item => new SubjectContent(item.getAttribute(this.#contentAttribute), item));
        
        this.#buttons = Array.from(this.#scope.querySelectorAll(this.#buttonSelector));

        this.#buttons.forEach(button => button.addEventListener("click", () => {
            this.setActiveItem(button.getAttribute(this.#buttonAttribute));
            this.setActiveContent(button.getAttribute(this.#buttonContentAttribute));
        }));
    }

    setActiveItem(type) {
        this.#items.forEach(item => item.type == type ? item.setState(true) : item.setState(false));
    }

    setActiveContent(type) {
        this.#contents.forEach(item => item.type == type ? item.setState(true) : item.setState(false));
    }
}