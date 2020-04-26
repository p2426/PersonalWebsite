import { Tab } from './tab';
import { PageConstants } from '../constants/pageconstants';

export class TabBar {

    #selector;
    #element;
    #tabIDs = [];
    #allowDuplicates;

    constructor(selector, allowDuplicates) {
        this.#selector = selector;
        this.#allowDuplicates = allowDuplicates;
        this.#element = document.querySelector(this.#selector);
    }

    addTab(detail) {
        if (!this.#findTab(detail.id)) {
            this.#tabIDs.push(detail.id);
            new Tab(this.#element, detail);
        }
    }

    removeTab(detail) {
        if (this.#findTab(detail.id)) {
            this.#tabIDs.splice(this.#tabIDs.findIndex(id => id == detail.id), 1);
        }
    }

    #findTab(idToFind) {
        return this.#tabIDs.find(id => id == idToFind);
    }
}