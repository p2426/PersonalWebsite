import { CSSClasses } from "../ui/css-classes";

export class Minigame {

    now;
    delta;
    then;
    interval;
    logicFPS;

    constructor() {
        this.init();
    }

    init() {
        document.body.classList.add(CSSClasses.noOpacity, CSSClasses.noPointerEvents);
        setTimeout(() => {
            document.getElementById('entryContainer').classList.add(CSSClasses.noDisplay);
            document.getElementById('home').classList.remove(CSSClasses.noOpacity, CSSClasses.noPointerEvents);
            document.body.classList.remove(CSSClasses.noOpacity, CSSClasses.noPointerEvents);
            this.start();

            // Setup logic loop
            this.now = Date.now();
            this.delta = Date.now();
            this.then = Date.now();
            this.interval = 1000 / this.logicFPS;
            this.update();
        }, 300);
    }

    // "Interface" function, as starting point for minigame extensions
    start() { }

    // "Interface" function, as the main loop for minigame extensions
    update() { }

    // Argument positions represent number keys on keyboard, called by keypress, not 0 indexed
    debug(...args) {
        args.forEach((fn, index) => {
            document.addEventListener("keypress", (e) => {
                if (e.keyCode === (49 + index)) {
                    fn();
                }
            });
        });
    }
}