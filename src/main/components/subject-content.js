export class SubjectContent {

    #element = null;
    type = null;
    state = null;

    #baseClass = "subject__content";
    #activeClass = this.#baseClass + "--active";

    constructor(type, element, state = false) {
        this.type = type;
        this.#element = element;
        this.state
    }

    setState(state) {
        switch(state) {
            case true: {
                this.#element.classList.add(this.#activeClass);
                this.state = state;
                break;
            }
            case false: {
                this.#element.classList.remove(this.#activeClass);
                this.state = state;
                break;
            }
            default: break;
        }
    }
}