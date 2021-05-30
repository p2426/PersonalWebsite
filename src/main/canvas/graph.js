import { Component } from "../component";
import { Canvas } from "./canvas";

export class Graph extends Canvas {

    // Publics - required by interface
    static initDataAttribute = 'graph-id';
    namespace = 'graph';
    dataAttributes = ['id', 'controls', 'animated'];
    customEvents = [];

    // Animation
    fps = 1;

    // Measurements/Data
    _xMeasurements = 10;
    _xMeasurementPos = {};
    _yMeasurements = 10;
    _yUnit = 100;
    _yUnitMax = undefined;
    _data = { 
        Monday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        Tuesday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        Wednesday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        Thursday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        Friday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        Saturday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        Sunday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
    };

    // Units
    _unitFont = '12px serif';
    _unitFontSize = 12;
    _unitLineLength = 5;

    // Plotting
    _pointRadius = 3;
    _pointPositions = {};

    // Graph offsets
    _topOffset = 10;
    _bottomOffset = 50;
    _rightOffset = 10;
    _leftOffset = 50;

    // Graph bounds
    get _graphBounds() {
        return {
            top: this._topOffset,
            bottom: (this._height - this._bottomOffset) + this._topOffset,
            right: this._width - this._rightOffset,
            left: this._leftOffset + this._unitLineLength
        }
    };

    // Controls
    _graphControlContainer = `<div class="flex flex--column"></div>`;
    _graphControls = {
        clearCanvas: {
            template: '<button type="button">Clear canvas</button>',
            type: 'button',
            click: this.clearCanvas.bind(this),
            instance: undefined,
        },
        redrawGraph: {
            template: '<button type="button">Redraw graph</button>',
            type: 'button',
            click: this.redrawGraph.bind(this),
            instance: undefined
        },
        randomiseData: {
            template: '<button type="button">Random data</button>',
            type: 'button',
            click: this.randomiseData.bind(this),
            instance: undefined
        },
        xTextOffset: {
            template: '<div><input type="range" min="1" max="100" value="50"/><label>X offset</label></div>',
            type: 'range',
            change: this.setXTextOffset.bind(this),
            instance: undefined
        },
        yTextOffset: {
            template: '<div><input type="range" min="1" max="100" value="50"/><label>Y offset</label></div>',
            type: 'range',
            change: this.setYTextOffset.bind(this),
            instance: undefined
        },
        setYUnit: {
            template: '<div><input type="number" min="1" max="10000" value="100"/><label>Units</label></div>',
            type: 'number',
            change: this.setYUnit.bind(this),
            instance: undefined
        },
        setAnimate: {
            template: '<div><input type="checkbox"/><label>Animate</label></div>',
            type: 'checkbox',
            change: this.setAnimate.bind(this),
            instance: undefined
        }
    };

    constructor(node) {
        super(node);
        this._startControls();
        this._interpretData();
        this.redrawGraph();
        this.plotPoints();
    }

    // Checks whether the element has controls enabled, and creates/binds elements based on templates
    _startControls() {
        if (this.attributes.controls === "true") {
            const graphControlContainer = this.createElementFrom(this._graphControlContainer);
            this.appendSibling(graphControlContainer);

            for (const [key, value] of Object.entries(this._graphControls)) {
                const element = this.createElementFrom(value.template);
                switch(value.type) {
                    case 'button':
                        value.instance = new GraphControlButton(element, value.click);
                        break;
                    case 'range':
                        value.instance = new GraphControlNumericInput(element, value.change);
                        break;
                    case 'input':
                        value.instance = new GraphControlNumericInput(element, value.change);
                        break;
                    case 'number':
                        value.instance = new GraphControlNumericInput(element, value.change);
                        break;
                    case 'checkbox':
                        value.instance = new GraphControlCheckbox(element, value.change);
                        break;
                    default: break;
                }
                graphControlContainer.appendChild(element);
            }
        }
    }

    // Given a y unit and some data, set up the graph to be drawn
    // @param {Number} measurement - eg. 10, 100, 1000, etc
    // @param {Object} data - in the form of { x: [], y: [] }
    _interpretData(measurement = this._yUnit, data = this._data) {
        const dataMin = 0;
        const dataMax = Math.max(...Object.values(data).flat());
        this._yUnitMax = Math.ceil(dataMax / measurement) * measurement;
        this._yMeasurements = this._yUnitMax / measurement;
        this._xMeasurements = Object.keys(data).length;
    }

    // Draws horizontal graph lines
    // Sections are + 1 to account for baseline of the graph, accounting for any offsets
    // @param {Number} sections - default 5
    drawHorizontalGraph(sections = 5) {
        this._context.font = this._unitFont;
        const textY = [];
        const textX = [];
        const textUnits = [];
        let interval = (this._height - this._bottomOffset) / sections;
        for (let i = 0; i < sections + 1; i++) {
            const lastLineOffset = i === sections ? -.5 : .5;
            const iterInterval = Math.round(interval * i);
            const y = iterInterval + lastLineOffset + this._topOffset;
            const x = this._leftOffset - this._unitLineLength;
            this._context.beginPath();
            this._context.moveTo(x, y);
            this._context.lineTo(this._width - this._rightOffset, y);
            this._context.stroke();
            textX.push(x);
            textY.push(y);
            textUnits.push(this._yUnit * i);
        }
        this.drawHorizontalUnitText(textX, textY, textUnits);
    }

    drawVerticalGraph(sections = 5) {
        sections = sections - 1;
        this._context.font = this._unitFont;
        const textY = [];
        const textX = [];
        const textUnits = [];
        let interval = (this._width - this._leftOffset - this._rightOffset) / sections;
        for (let i = 0; i < sections + 1; i++) {
            const lastLineOffset = i === sections ? -.5 : .5;
            const iterInterval = Math.round(interval * i);
            const x = this._leftOffset + (iterInterval + lastLineOffset);
            const y = (this._height - this._bottomOffset) + this._unitLineLength + this._topOffset;
            this._context.beginPath();
            this._context.moveTo(x, this._topOffset);
            this._context.lineTo(x, y);
            this._context.stroke();
            textX.push(x);
            textY.push(y);
            let qualitativeData = Object.keys(this._data)[i];
            textUnits.push(qualitativeData);
            this._xMeasurementPos[qualitativeData] = x;
        }
        this.drawVerticalUnitText(textX, textY, textUnits);
    }

    // Draws the unit text for each horizontal line
    // Lines are drawn from top to bottom (as per canvas orientation default), so units will need to be reversed
    drawHorizontalUnitText(x = [], y = [], units = []) {
        units = units.reverse();
        units.forEach((unit, index) => { 
            this._context.fillText(unit.toString(), x[index] - (this._context.measureText(unit).width + this._unitLineLength), y[index] + 3);
        });
    }

    drawVerticalUnitText(x = [], y = [], units = []) {
        units.forEach((unit, index) => { 
            this._context.fillText(unit.toString(), x[index] - (this._context.measureText(unit).width / 2), y[index] + (this._unitLineLength * 1.5) + (this._unitFontSize / 2));
        });
    }

    // Plots circular points where x meets y, for given data
    // @param {Object} data
    plotPoints(data = this._data) {
        for (const [key, value] of Object.entries(data)) {
            const localX = this._xMeasurementPos[key];
            const displacementY = this._graphBounds.bottom - this._graphBounds.top;
            this._pointPositions[key] = []; // Store point positions for line graph
            value = [value].flat();
            value.forEach(v => {
                const percentOfMax = Math.round(v / this._yUnitMax * 100);
                const localY = this._graphBounds.bottom - (displacementY * percentOfMax / 100);
                this._context.beginPath();
                this._context.arc(localX, localY, this._pointRadius, 0, Math.PI * 2);
                this._context.fill();
                this._pointPositions[key].push({ x: localX, y: localY });
            });
        }
        this.joinPlottedPoints();
    }

    // Draws lines between already plotted points
    joinPlottedPoints(points = this._pointPositions) {
        const xLen = Object.keys(points).length;
        const coords = Object.values(points);
        const yLen = Math.max(...Object.values(points).map(x => x.length));
        for (let i = 0; i < yLen; i++) {
            for (let ii = 0; ii < xLen; ii++) {
                this._context.beginPath();
                this._context.moveTo(coords[ii][i].x, coords[ii][i].y);
                const nextPoint = coords[ii + 1];
                if (nextPoint) {
                    this._context.lineTo(nextPoint[i].x, nextPoint[i].y);
                } else {
                    this._context.lineTo(coords[ii][i].x, coords[ii][i].y);
                }
                this._context.stroke();
            }
        }
    }

    // Clears and redraws graph with current dimensions
    redrawGraph() {
        this.clearCanvas();
        this._interpretData();
        this.drawVerticalGraph(this._xMeasurements);
        this.drawHorizontalGraph(this._yMeasurements);
        this.plotPoints();
    }

    // Text offsets
    // @param {Number} val
    setXTextOffset(val) {
        this._bottomOffset = val;
        this.redrawGraph();
    }

    // @param {Number} val
    setYTextOffset(val) {
        this._leftOffset = val;
        this.redrawGraph();
    }

    // Line length
    // @param {Number} val
    setUnitLineLength(val) {
        this._unitLineLength = val;
        this.redrawGraph();
    }

    // Y unit
    // @param {Number} val
    setYUnit(val) {
        this._yUnit = val;
        this._interpretData();
        this.redrawGraph();
    }

    // Animate
    // @param {Boolean} bool
    setAnimate(val) {
        this.setAttribute('animated', val.toString());
        this.startTime();
    }

    update() {
        this.randomiseData();
    }

    // Util
    randomiseData() {
        this._data = { 
            Monday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
            Tuesday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
            Wednesday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
            Thursday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
            Friday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
            Saturday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
            Sunday: [...Array(3)].map(i => Math.round(Math.random() * 1000)),
        };
        this.redrawGraph();
    }
}

// UI Controls Classes
class GraphControl extends Component {

    _graphFunction;

    constructor(node, graphFunction) {
        super(node);
        this._graphFunction = graphFunction;
    }
}

class GraphControlButton extends GraphControl {

    click(e) {
        this._graphFunction();
    }
}

class GraphControlCheckbox extends GraphControl {

    constructor(node, graphFunction) {
        super(node, graphFunction);
        this.element.checked = false;
    }

    change(e) {
        this._graphFunction(e.target.checked);
    }
}

class GraphControlNumericInput extends GraphControl {
    
    change(e) {
        this._graphFunction(Number(e.target.value));
    }
}