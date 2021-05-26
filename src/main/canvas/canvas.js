import { Component } from "../component";

export class Canvas extends Component {

    // Canvas coordinates are kept as default; 0,0 being the top left

    // Publics
    static initDataAttribute = 'canvas-id';
    namespace = 'canvas';
    dataAttributes = ['id', 'controls', 'animated'];
    customEvents = [];

    // General
    _context = this.element.getContext('2d');
    _width = this.element.width;
    _height = this.element.height;

    // Time
    _fps = 1;
    _time = {
        now: Date.now(),
        delta: Date.now(),
        then: Date.now(),
        interval: 1000 / this._fps,
        deltaTime: 0
    }

    // Controls
    _canvasControlContainer = `<div class="flex flex--column"></div>`;
    _canvasControls = {
        clearCanvas: {
            template: '<button type="button">Clear canvas</button>',
            click: this.clearCanvas.bind(this),
            instance: undefined,
        },
        redrawGraph: {
            template: '<button type="button">Redraw graph</button>',
            click: this.redrawGraph.bind(this),
            instance: undefined
        },
        randomiseAxisUnits: {
            template: '<button type="button">Random axis units</button>',
            click: this.randomiseAxisUnits.bind(this),
            instance: undefined
        }
    };

    constructor(node) {
        super(node);

        if (!this.element.getContext instanceof Function) {
            alert('Canvas tag is not supported on your browser.');
        }

        this._startControls();
        this._startTime();
        console.log(this.attributes);
    }

    // Starts time for a canvas with animations
    _startTime() {
        if (this.attributes.animated === "true") {
            requestAnimationFrame(() => {
                this._startTime();
            });
    
            this._time.now = Date.now();
            this._time.delta = this._time.now - this._time.then;
    
            // Logic to be targeted to the given framerate
            if (this._time.delta > this._time.interval) {
                this._time.deltaTime = this._time.interval / 1000;
                this._time.time += this._time.deltaTime;
                this._update();
                this._time.then = this._time.now - (this._time.delta % this._time.interval);
            }
        }
    }

    _update() {
        this.randomiseAxisUnits();
        console.log('frame -> randomising graph');
    }

    // Checks whether the element has controls enabled, and creates/binds elements based on templates
    _startControls() {
        if (this.attributes.controls === "true") {
            const canvasControlContainer = this.createElementFrom(this._canvasControlContainer);
            this.appendSibling(canvasControlContainer);

            for (const [key, value] of Object.entries(this._canvasControls)) {
                const element = this.createElementFrom(value.template);
                value.instance = new CanvasControlButton(element, value.click);
                canvasControlContainer.appendChild(element);
            }
        }
    }

    // Sections are + 1 to account for baseline of the graph
    drawHorizontalGraph(sections) {
        let interval = this._height / sections;
        for (let i = 0; i < sections + 1; i++) {
            const lastLineOffset = i === sections ? -.5 : .5;
            const iterInterval = Math.round(interval * i);
            this._context.beginPath();
            this._context.moveTo(0, iterInterval + lastLineOffset);
            this._context.lineTo(this._width, iterInterval + lastLineOffset);
            this._context.stroke();
        }
    }

    drawVerticalGraph(sections) {
        let interval = this._width / sections;
        for (let i = 0; i < sections + 1; i++) {
            const lastLineOffset = i === sections ? -.5 : .5;
            const iterInterval = Math.round(interval * i);
            this._context.beginPath();
            this._context.moveTo(iterInterval + lastLineOffset, 0);
            this._context.lineTo(iterInterval + lastLineOffset, this._height);
            this._context.stroke();
        }
    }

    clearCanvas() {
        this._context.clearRect(0, 0, this._width, this._height);
    }

    redrawGraph(horizontalUnits = 10, verticalUnits = 10) {
        this.clearCanvas();
        this.drawHorizontalGraph(horizontalUnits);
        this.drawVerticalGraph(verticalUnits);
    }

    randomiseAxisUnits() {
        this.clearCanvas();
        const x = Math.round((Math.random() * 24) + 1);
        const y = Math.round((Math.random() * 24) + 1);
        this.redrawGraph(x, y);
        // window.requestAnimationFrame(this.randomiseAxisUnits.bind(this));
    }
}

class CanvasControlButton extends Component {

    _canvasFunction;

    constructor(node, canvasFunction) {
        super(node);
        this._canvasFunction = canvasFunction;
    }

    click(e) {
        this._canvasFunction();
    }
}