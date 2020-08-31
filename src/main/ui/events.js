import { TheRoyalGameOfUr } from "../minigames/the-royal-game-of-ur/the-royal-game-of-ur";

export class Events {

    static buttonIDs = ['home'];
    static minigameIDs = ['minigameUr'];
    static themakingofIDs = ['themakingofUr'];

    // Uses element id to attach a function name of the same id + uppercased eventType
    static attachEvents(ids, eventType) {
        const capitalEventType = eventType[0].toUpperCase() + eventType.substr(1);
        ids.forEach(id => {
            document.getElementById(id).addEventListener(eventType, 
            Events[id + capitalEventType] instanceof Function 
            ? 
            Events[id + capitalEventType] 
            : 
            console.warn('No function exists of: "' + id + capitalEventType + '" in the "Events" class'));
        });
    }

    static attachUIClickEvents() {
        Events.attachEvents(Events.buttonIDs.concat(Events.minigameIDs).concat(Events.themakingofIDs), 'click');
    }

    // -- UI
    // Home button - reload, as only 1 3JS scene can be open at a time, GC will collect
    static homeClick() {
        window.location.reload();
    }

    // -- Minigames
    static minigameUrClick() {
        new TheRoyalGameOfUr();
    }

    // -- The making of
    static themakingofUrClick() {
        console.log('Start the making of ur');
    }
}