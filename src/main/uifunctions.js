import { MathFunctions } from "./mathfunctions";

export class UIFunctions {
    static titleTexts = ["Under construction..", 
                         "Fetch decode execute..",
                         "Accessing components..",
                         "Recursively Shading.."];

    // Draws title text and animated it, based on the titleTexts array
    static drawTitleText(element, noDelay) {
        element.innerHTML = "";
    
        setTimeout(() => {
            UIFunctions.animateText(element,
                UIFunctions.titleTexts[MathFunctions.randomRange(0, UIFunctions.titleTexts.length - 1)],
                0, 0.05, 0.2);
            UIFunctions.drawTitleText(element);
        }, noDelay ? 0 : 6500);
    }

    // Displays text of an element 1 character at a time, at a random time between
    // delayStart and delayEnd in seconds
    static animateText(element, text, startAt, delayStart, delayEnd) {

        if (startAt == text.length) return;

        setTimeout(() => {
            element.innerHTML += text[startAt];
            startAt++;
            UIFunctions.animateText(element, text, startAt, delayStart, delayEnd);
        }, MathFunctions.randomRangeFloat(delayStart, delayEnd) * 1000);
    }
}