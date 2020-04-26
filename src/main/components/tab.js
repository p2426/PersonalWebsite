import { PageConstants } from '../constants/pageconstants';

export class Tab {

    #id;
    #element;
    #content;
    #closeButton;
    isFocused = false;

    constructor(parent, content) {
        this.#id = content.id;

        let element = document.createElement('DIV');
        element.classList.add("tab");
        parent.appendChild(element);

        element.innerHTML = `
            <p class="tab--content">${content.innerHTML}</p>
            <button class="tab--close">X</button>`;

        this.#element = element;
        this.#content = element.querySelector('.tab--content');
        this.#closeButton = element.querySelector('.tab--close');
        this.#bindEvents(element);
    }

    getId() { return this.#id }

    selectTab() { 
        this.#element.classList.add('tab--selected');
        this.isFocused = true;
    }

    deselectTab() { 
        this.#element.classList.remove('tab--selected');
        this.isFocused = false;
    }

    #bindEvents(element) {
        // Close Button
        // Dispatch Event for TabController to remove id from it's instances
        this.#closeButton.addEventListener('click', () => {
            element.remove();

            const e = new CustomEvent(PageConstants.E_TAB_REMOVE_CLICKED, {
                detail: {
                    id: this.#id
                }
            });
            document.body.dispatchEvent(e);
        });

        // Styling
        // Dispatch Event for TabController to remove styling from it's other Tabs
        this.selectTab();
        this.#content.addEventListener('click', () => {
            const e = new CustomEvent(PageConstants.E_TAB_CLICKED, {
                detail: {
                    id: this.#id
                }
            });
            document.body.dispatchEvent(e);
        });
    }
}