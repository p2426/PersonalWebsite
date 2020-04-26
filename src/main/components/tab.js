import { PageConstants } from '../constants/pageconstants';

export class Tab {

    #id;

    constructor(parent, content) {
        this.#id = content.id;

        let element = document.createElement('DIV');
        parent.appendChild(element);

        element.innerHTML = `
        <div class="tab">
            <p>${content.innerHTML}</p>
            <button class="tab--close">X</button>
        </div>`;

        this.#bindEvent(element);
    }

    #bindEvent(element) {
        const closeButton = element.querySelector('.tab--close');
        closeButton.addEventListener('click', () => {
            element.remove();

            const e = new CustomEvent(PageConstants.E_TAB_REMOVE_CLICKED, {
                detail: {
                    id: this.#id
                }
            });
            document.body.dispatchEvent(e);
        });
    }
}