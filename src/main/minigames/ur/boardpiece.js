import * as THREE from 'three';
import { Cube } from '../../3js classes/cube';

export class BoardPiece extends Cube {

    pieceProperties = {
        occupied: null,     // instanceof GamePiece
        territory: null,    // 0 = neutral, 1 = war
        owner: null,        // 0 = anyone, 1 = player, 2 = computer
        special: null       // true/false
    }

    constructor(cubeSettings, pieceProperties = {occupied: null, territory: null, owner: null, special: null}) {
        super(cubeSettings);
        this.pieceProperties = pieceProperties;
    }

    getGamePieceSlot() {
        const position = this.getPosition();
        const scaleHeight = new THREE.Vector3(0, this.geometry.parameters.height / 1.5, 0);
        return this.pieceProperties.occupied ? new THREE.Vector3().addVectors(position, new THREE.Vector3().addVectors(scaleHeight, scaleHeight)) : new THREE.Vector3().addVectors(position, scaleHeight);
    }

    getOccupiedGamePiece() { return this.pieceProperties.occupied; }
    setOccupiedGamePiece(v) { this.pieceProperties.occupied = v; }

    getBoardPieceOwner() { return this.pieceProperties.owner; }

    isLegalMove(v) { return this.getBoardPieceOwner() === 0 ? true : this.getBoardPieceOwner() === v }
}