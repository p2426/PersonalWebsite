import { Component } from "../component";
import { Canvas } from "./canvas";

export class Graph extends Canvas {

    // Publics
    static initDataAttribute = 'graph-id';
    namespace = 'graph';
    dataAttributes = ['id', 'controls', 'animated'];
    customEvents = [];

    // Dimensions
    _xDimensions = 10;
    _yDimensions = 10;

    // Offsets
    _xTextOffset = 50;
    _yTextOffset = 50;

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
        randomiseDimensions: {
            template: '<button type="button">Random axis units</button>',
            type: 'button',
            click: this.randomiseDimensions.bind(this),
            instance: undefined
        },
        xTextOffset: {
            template: '<input type="range" min="1" max="100" value="50">',
            type: 'range',
            change: this.setXTextOffset.bind(this),
            instance: undefined
        },
        yTextOffset: {
            template: '<input type="range" min="1" max="100" value="50">',
            type: 'range',
            change: this.setYTextOffset.bind(this),
            instance: undefined
        }
    };

    constructor(node) {
        super(node);
        this._startControls();
        this.redrawGraph();
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
                    default: break;
                }
                graphControlContainer.appendChild(element);
            }
        }
    }

    // Sections are + 1 to account for baseline of the graph
    drawHorizontalGraph(sections) {
        let interval = (this._height - this._xTextOffset) / sections;
        for (let i = 0; i < sections + 1; i++) {
            const lastLineOffset = i === sections ? -.5 : .5;
            const iterInterval = Math.round(interval * i);
            this._context.beginPath();
            this._context.moveTo(this._yTextOffset, iterInterval + lastLineOffset);
            this._context.lineTo(this._width, iterInterval + lastLineOffset);
            this._context.stroke();
        }
    }

    drawVerticalGraph(sections) {
        let interval = (this._width - this._yTextOffset) / sections;
        for (let i = 0; i < sections + 1; i++) {
            const lastLineOffset = i === sections ? -.5 : .5;
            const iterInterval = Math.round(interval * i);
            this._context.beginPath();
            this._context.moveTo(this._yTextOffset + (iterInterval + lastLineOffset), 0);
            this._context.lineTo(this._yTextOffset + (iterInterval + lastLineOffset), (this._height - this._xTextOffset));
            this._context.stroke();
        }
    }

    redrawGraph() {
        this.clearCanvas();
        this.drawHorizontalGraph(this._xDimensions);
        this.drawVerticalGraph(this._yDimensions);
    }

    randomiseDimensions() {
        this._xDimensions = Math.round((Math.random() * 24) + 1);
        this._yDimensions = Math.round((Math.random() * 24) + 1);
        this.redrawGraph();
    }

    setXTextOffset(val) {
        this._xTextOffset = val;
        this.redrawGraph();
    }

    setYTextOffset(val) {
        this._yTextOffset = val;
        this.redrawGraph();
    }
}

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