import * as THREE from 'three';
import { BoardPiece } from './boardpiece';
import { GamePiece } from './gamepiece';

export class BoardCreator {

    static TYPE = {
        STANDARD: 'standard'
    }

    boardtype = {
        // Layout:
        // [nS, n, n, n, X, X, nS, n]
        // [ w, w, w, nS, w, w, w, w]
        // [nS, n, n, n, X, X, nS, n]

        // territory: 0 = neutral(n), 1 = war(w)
        standard: {
            boardArea: [8, 3],
            gamePieceCount: 7,
            pieceProperties: {
                // Top horizontal strip
                0: {occupied: false, territory: 0, owner: null, special: true},
                1: {occupied: false, territory: 0, owner: null, special: false},
                2: {occupied: false, territory: 0, owner: null, special: false},
                3: {occupied: false, territory: 0, owner: null, special: false},
                6: {occupied: false, territory: 0, owner: null, special: true},
                7: {occupied: false, territory: 0, owner: null, special: false},
                // Middle horizontal strip
                8: {occupied: false, territory: 1, owner: null, special: false},
                9: {occupied: false, territory: 1, owner: null, special: false},
                10: {occupied: false, territory: 1, owner: null, special: false},
                11: {occupied: false, territory: 0, owner: null, special: true},
                12: {occupied: false, territory: 1, owner: null, special: false},
                13: {occupied: false, territory: 1, owner: null, special: false},
                14: {occupied: false, territory: 1, owner: null, special: false},
                15: {occupied: false, territory: 1, owner: null, special: false},
                // Bottom horizontal strip
                16: {occupied: false, territory: 0, owner: null, special: true},
                17: {occupied: false, territory: 0, owner: null, special: false},
                18: {occupied: false, territory: 0, owner: null, special: false},
                19: {occupied: false, territory: 0, owner: null, special: false},
                22: {occupied: false, territory: 0, owner: null, special: true},
                23: {occupied: false, territory: 0, owner: null, special: false},
            }
        }
    }

    selectedBoardType = null;
    boardPieces = [];
    gamePieces = [];

    constructor(type) {
        this.textureLoader = new THREE.TextureLoader();
        this.createBoardPieces(type);
        this.createGamePiecesForPlayer(type, 1);
        this.createGamePiecesForPlayer(type, 2);
    }

    createBoardPieces(type) {
        for (let z = 0; z < this.boardtype[type].boardArea[1]; z++) {
            for (let x = 0; x < this.boardtype[type].boardArea[0]; x++) {
                if ((z === 0 || z === 2) && (x === 4 || x === 5)) continue;

                const texture = this.textureLoader.load("./textures/ur/rgu"+ z + "_" + x + ".png");
                texture.minFilter = THREE.LinearFilter;

                let boardPiece = new BoardPiece({
                    id:         "boardPiece",
                    scale:      {x: 1, y: .5, z: 1},
                    position:   {x: x, y: 0, z: z},
                    colour:     {r: 255, g: 255, b: 255},
                    material:   new THREE.MeshStandardMaterial({map: texture})
                }, this.boardtype[type].pieceProperties[z === 0 ? z + x : (z + x) + ((this.boardtype[type].boardArea[0] - 1) * z)]);

                this.boardPieces.push(boardPiece);
            }
        }
        return this.boardPieces;
    }

    getBoardPieces() { return this.boardPieces; }

    createGamePiecesForPlayer(type, player) {
        for (let i = 0; i < this.boardtype[type].gamePieceCount; i++) {
            const gamePiece = new GamePiece({
                id:         "gamePiece",
                scale:      {x: .6, y: .2, z: .6},
                position:   player === 1 ? {x: i, y: -.5, z: 3} : {x: i, y: -.5, z: -3},
                material:   new THREE.MeshStandardMaterial({ color: 0x87a6cc }),
            }, player);
            this.gamePieces.push(gamePiece);
        }
    }

    getGamePieces() { return this.gamePieces; }
}