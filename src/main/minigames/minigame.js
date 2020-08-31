import { CSSClasses } from "../ui/css-classes";

export class Minigame {
    entry = "entryContainer";
    home = "home";

    start(callback) {
        document.body.classList.add(CSSClasses.noOpacity, CSSClasses.noPointerEvents);
        setTimeout(() => {
            document.getElementById(this.entry).classList.add(CSSClasses.noDisplay);
            document.getElementById(this.home).classList.remove(CSSClasses.noOpacity, CSSClasses.noPointerEvents);
            document.body.classList.remove(CSSClasses.noOpacity, CSSClasses.noPointerEvents);
            callback();
        }, 300);
    }
}