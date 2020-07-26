import { Component } from '../component';

export class TabButton extends Component {

    static namespace = 'tab-button';

    #scope;
    #id;
    #contentGroups;

    constructor(node, scope = document.body, contentGroups) {
        super(node);
        this.#scope = scope;
        this.#id = this.element.getAttribute('data-' + TabButton.namespace + '-id');
        this.#contentGroups = contentGroups;
    }

    click(e) {
        this.#contentGroups.forEach(contentGroup => {
            contentGroup.getId() !== this.#id ? contentGroup.hide() : contentGroup.show();
        });
    }

    getId() { return this.#id; }
}