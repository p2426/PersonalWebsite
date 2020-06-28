export class SubjectItem {

    #element = null;
    type = null;
    state = null;

    #baseClass = "subject__identifier--item";
    #activeClass = this.#baseClass + "--active";

    constructor(type, element, state = false) {
        this.#element = element;
        this.type = type;
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