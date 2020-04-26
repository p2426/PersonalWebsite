import { PageConstants } from '../constants/pageconstants';

export class Accordion {

    #id;
    #element;
    #listHeaderSelector;
    #listHeaderInstances = [];
    #listItemSelector;
    #listIteminstances = [];
    #closedClass = "accordion--closed";

    constructor(id, listHeaderSelector, listItemSelector) {
        this.#id = id;
        this.#listHeaderSelector = listHeaderSelector;
        this.#listItemSelector = listItemSelector;
        this.#element = document.getElementById(this.#id);

        this.bindEvents();
    }

    bindEvents() {
        this.#listHeaderInstances = this.#element.querySelectorAll(this.#listHeaderSelector);
        this.#listHeaderInstances.forEach(item => {
            item.addEventListener('click', item.clickEvent = () => {
                item.nextElementSibling.classList.toggle(this.#closedClass);
            });
        });

        this.#listIteminstances = this.#element.querySelectorAll(this.#listItemSelector);

        for (let i = 0; i < this.#listIteminstances.length; i++) {
            const item = this.#listIteminstances[i];

            item.addEventListener('click', item.clickEvent = () => {
                const e = new CustomEvent(PageConstants.E_ACCORDION_ITEM_CLICKED, {
                    detail: {
                        id: i,
                        innerHTML: item.innerHTML
                    }
                });
                document.body.dispatchEvent(e);
            });
        }
    }

    unbindEvents() {
        this.#listHeaderInstances.forEach(item => {
            item.removeEventListener('click', item.clickEvent, false);
        });

        this.#listIteminstances.forEach(item => {
            item.removeEventListener('click', item.clickEvent, false);
        });
    }
}