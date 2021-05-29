import { Component } from "../component";
import { Canvas } from "./canvas";

export class Graph extends Canvas {

    // Publics - required by interface
    static initDataAttribute = 'graph-id';
    namespace = 'graph';
    dataAttributes = ['id', 'controls', 'animated'];
    customEvents = [];

    // Measurements/Data
    _xMeasurements = 10;
    _xMeasurementPos = {};
    _yMeasurements = 10;
    _yUnit = 100;
    _yUnitMax = undefined;
    _data = { 
        Monday: 11,
        Tuesday: 67,
        Wednesday: 100,
        Thursday: 250,
        Friday: 333,
        Saturday: 412,
        Sunday: 477
    };

    // Units
    _unitFont = '12px serif';
    _unitFontSize = 12;
    _unitLineLength = 5;

    // Plotting
    _pointRadius = 5;

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
        randomiseMeasurements: {
            template: '<button type="button">Random measures</button>',
            type: 'button',
            click: this.randomiseMeasurements.bind(this),
            instance: undefined
        },
        xTextOffset: {
            template: '<input type="range" min="1" max="100" value="50"/>',
            type: 'range',
            change: this.setXTextOffset.bind(this),
            instance: undefined
        },
        yTextOffset: {
            template: '<input type="range" min="1" max="100" value="50"/>',
            type: 'range',
            change: this.setYTextOffset.bind(this),
            instance: undefined
        },
        setYUnit: {
            template: '<input type="input" value="100"/>',
            type: 'input',
            change: this.setYUnit.bind(this),
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
                        value.instance = new GraphControlSlider(element, value.change);
                        break;
                    case 'input':
                        value.instance = new GraphControlSlider(element, value.change);
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
        const dataMax = Math.max(...Object.values(data));
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
            const percentOfMax = Math.round(value / this._yUnitMax * 100);
            const localY = this._graphBounds.bottom - (displacementY * percentOfMax / 100);
            this._context.beginPath();
            this._context.arc(localX, localY, this._pointRadius, 0, Math.PI * 2);
            this._context.fill();
        }
    }

    // Clears and redraws graph with current dimensions
    redrawGraph(xMeasurements = this._xMeasurements, yMeasurements = this._yMeasurements) {
        this.clearCanvas();
        this.drawVerticalGraph(xMeasurements);
        this.drawHorizontalGraph(yMeasurements);
        this.plotPoints();
    }

    randomiseMeasurements() {
        this._xMeasurements = Math.round((Math.random() * 24) + 1);
        this._yMeasurements = Math.round((Math.random() * 24) + 1);
        this.redrawGraph();
    }

    // Text offsets
    setXTextOffset(val) {
        this._bottomOffset = val;
        this.redrawGraph();
    }

    setYTextOffset(val) {
        this._leftOffset = val;
        this.redrawGraph();
    }

    // Line length
    setUnitLineLength(val) {
        this._unitLineLength = val;
        this.redrawGraph();
    }

    // Y unit
    setYUnit(val) {
        this._yUnit = val;
        this._interpretData();
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

class GraphControlSlider extends GraphControl {
    
    change(e) {
        this._graphFunction(Number(e.target.value));
    }
}