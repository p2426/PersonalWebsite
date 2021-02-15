export class Cursor {

    x;
    y;

    static instance;

    static init() {
        Cursor.instance = new Cursor();

        document.addEventListener('mousemove', (e) => {
            Cursor.setX(e.clientX);
            Cursor.setY(e.clientY);
        });
    }

    static setX(x) { Cursor.instance.x = x; }
    static getX(x) { return Cursor.instance.x; }
    static getNormalisedX(x) { return (Cursor.getX() / window.innerWidth) * 2 - 1; }

    static setY(y) { Cursor.instance.y = y; }
    static getY(y) { return Cursor.instance.y; }
    static getNormalisedY(y) { return -(Cursor.getY() / window.innerHeight) * 2 + 1; }
    
    static getCoords(x, y) { return [ Cursor.getX(), Cursor.getY() ] }
    static getNormalisedCoords(x, y) { return [ Cursor.getNormalisedX(), Cursor.getNormalisedY() ] }
}