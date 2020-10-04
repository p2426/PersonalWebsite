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
                0: {occupied: null, territory: 0, owner: 2, special: true},
                1: {occupied: null, territory: 0, owner: 2, special: false},
                2: {occupied: null, territory: 0, owner: 2, special: false},
                3: {occupied: null, territory: 0, owner: 2, special: false},
                6: {occupied: null, territory: 0, owner: 2, special: true},
                7: {occupied: null, territory: 0, owner: 2, special: false},
                // Middle horizontal strip
                8: {occupied: null, territory: 1, owner: 0, special: false},
                9: {occupied: null, territory: 1, owner: 0, special: false},
                10: {occupied: null, territory: 1, owner: 0, special: false},
                11: {occupied: null, territory: 0, owner: 0, special: true},
                12: {occupied: null, territory: 1, owner: 0, special: false},
                13: {occupied: null, territory: 1, owner: 0, special: false},
                14: {occupied: null, territory: 1, owner: 0, special: false},
                15: {occupied: null, territory: 1, owner: 0, special: false},
                // Bottom horizontal strip
                16: {occupied: null, territory: 0, owner: 1, special: true},
                17: {occupied: null, territory: 0, owner: 1, special: false},
                18: {occupied: null, territory: 0, owner: 1, special: false},
                19: {occupied: null, territory: 0, owner: 1, special: false},
                22: {occupied: null, territory: 0, owner: 1, special: true},
                23: {occupied: null, territory: 0, owner: 1, special: false},
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
                position:   player === 1 ? {x: i - (i/3), y: -.25, z: 3.5} : {x: i - (i/3), y: -.25, z: -1.5},
                material:   new THREE.MeshStandardMaterial({color: player === 1 ? 0x919191 : 0xeddec7 }),
            }, player);
            this.gamePieces.push(gamePiece);
        }
    }

    getGamePieces() { return this.gamePieces; }
}