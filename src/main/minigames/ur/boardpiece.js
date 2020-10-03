import * as THREE from 'three';
import { Cube } from '../../3js classes/cube';

export class BoardPiece extends Cube {

    pieceProperties = {
        occupied: null,     // true/false
        territory: null,    // 0 = neutral, 1 = war
        owner: null,        // 1 = player, 2 = computer
        special: null       // true/false
    }

    constructor(cubeSettings, pieceProperties = {occupied: null, territory: null, owner: null, special: null}) {
        super(cubeSettings);
        this.pieceProperties = pieceProperties;
    }
}