import { Tab } from './tab';
import { PageConstants } from '../constants/pageconstants';

export class TabBar {

    #selector;
    #element;
    #tabInstances = [];
    #leftTab;

    constructor(selector) {
        this.#selector = selector;
        this.#element = document.querySelector(this.#selector);
    }

    addTab(detail) {
        if (!this.#findTab(detail.id)) {
            this.#tabInstances.push(new Tab(this.#element, detail));
        }
    }

    removeTab(detail) {
        const tab = this.#findTab(detail.id);
        const instanceIndex = this.#tabInstances.indexOf(tab);
      
        this.#tabInstances.splice(instanceIndex, 1);

        if (tab.isFocused) {
            this.#focusLeftTab(instanceIndex);
        }
    }

    focusTab(detail) {
        this.#selectTab(detail.id);
        this.#deselectOtherTabs(detail.id);
    }

    #focusLeftTab(index) {
        const previousInstance = this.#tabInstances[index];
        const leftInstance = this.#tabInstances[index - 1];
        if (leftInstance) {
            this.#selectTab(leftInstance.getId());
        } else if (previousInstance) {
            this.#selectTab(previousInstance.getId());
        }
    }

    #selectTab(id) {
        this.#findTab(id).selectTab();
    }

    #deselectOtherTabs(id) {
        this.#tabInstances.forEach(tab => {
            if (tab.getId() != id) {
                tab.deselectTab();
            }
        });
    }

    #findTab(idToFind) {
        return this.#tabInstances.find(tab => tab.getId() == idToFind);
    }
}