import { Component } from "../component";

export class Canvas extends Component {

    // Canvas coordinates are kept as default; 0,0 being the top left

    // Publics
    static initDataAttribute = 'canvas-id';
    namespace = 'canvas';
    dataAttributes = [];
    customEvents = [];

    // General
    _context = this.element.getContext('2d');
    _width = this.element.width;
    _height = this.element.height;

    // Time
    fps = 60;
    _time = {
        now: Date.now(),
        delta: Date.now(),
        then: Date.now(),
        interval: () => { return 1000 / this.fps },
        deltaTime: 0
    }

    constructor(node) {
        super(node);

        if (!this.element.getContext instanceof Function) {
            alert('Canvas tag is not supported on your browser.');
        }

        this.startTime();
    }

    // Starts time for a canvas with animations
    startTime() {
        if (this.attributes.animated === "true") {
            requestAnimationFrame(() => {
                this.startTime();
            });
    
            this._time.now = Date.now();
            this._time.delta = this._time.now - this._time.then;
    
            // Update will be called once the desired frame is met
            if (this._time.delta > this._time.interval()) {
                this._time.deltaTime = this._time.interval() / 1000;
                this._time.time += this._time.deltaTime;
                this.update();
                this._time.then = this._time.now - (this._time.delta % this._time.interval());
            }
        }
    }

    update() {
        console.log('frame');
    }

    clearCanvas() {
        this._context.clearRect(0, 0, this._width, this._height);
    }
}