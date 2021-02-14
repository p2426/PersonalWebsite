import { Callbacks } from 'jquery';
import * as THREE from 'three';
import { Cube } from '../../3js classes/cube';
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
            boardArea: [17, 7],
            gamePieceCount: 7,
            pieceProperties: {
                // Top horizontal strip
                18: {occupied: null, territory: 0, owner: 2, special: true},
                20: {occupied: null, territory: 0, owner: 2, special: false},
                22: {occupied: null, territory: 0, owner: 2, special: false},
                24: {occupied: null, territory: 0, owner: 2, special: false},
                30: {occupied: null, territory: 0, owner: 2, special: true},
                32: {occupied: null, territory: 0, owner: 2, special: false},
                // Middle horizontal strip
                52: {occupied: null, territory: 1, owner: 0, special: false},
                54: {occupied: null, territory: 1, owner: 0, special: false},
                56: {occupied: null, territory: 1, owner: 0, special: false},
                58: {occupied: null, territory: 0, owner: 0, special: true},
                60: {occupied: null, territory: 1, owner: 0, special: false},
                62: {occupied: null, territory: 1, owner: 0, special: false},
                64: {occupied: null, territory: 1, owner: 0, special: false},
                66: {occupied: null, territory: 1, owner: 0, special: false},
                // Bottom horizontal strip
                86: {occupied: null, territory: 0, owner: 1, special: true},
                88: {occupied: null, territory: 0, owner: 1, special: false},
                90: {occupied: null, territory: 0, owner: 1, special: false},
                92: {occupied: null, territory: 0, owner: 1, special: false},
                98: {occupied: null, territory: 0, owner: 1, special: true},
                100: {occupied: null, territory: 0, owner: 1, special: false},
            }
        }
    }

    boardPieces = [];
    accBoardPieceXPos = 0;
    accBoardPieceZPos = 0;
    gamePieces = [];

    constructor(type) {
        this.textureLoader = new THREE.TextureLoader();
        this.createBoardPieces(type, 0, 0);
        this.createGamePiecesForPlayer(type, 1);
        this.createGamePiecesForPlayer(type, 2);
    }

    createBoardPieces(type, x, z) {
        new Promise((resolve, reject) => {
            if ((x === 9 && z === 0 || x === 9 && z === 6) || 
            (x === 10 && z === 0 || x === 10 && z === 6) ||
            (x === 11 && z === 0 || x === 11 && z === 6)) {
                reject();
            } else {
                if (x === 12 && z === 0 || x === 12 && z === 6) {
                    this.accBoardPieceXPos += 2.65;
                }
                if (x === 9 && z === 1 || x === 10 && z === 1 || x === 11 && z === 1) {
                    this.accBoardPieceZPos = 1.26;
                }
                if (x === 12 && z === 1) {
                    this.accBoardPieceZPos = .3;
                }
                this.textureLoader.load(
                    "./textures/ur/photoreal/originalurtopdown-" + String(x).padStart(2, '0') + "-" + String(z).padStart(2, '0') + ".png", 
                    (texture) => { 
                        resolve(texture);
                    },
                    (progress) => {
                        
                    },
                    (error) => { 
                        reject();
                    }
                );
            }
        }).then((texture) => {
            texture.minFilter = THREE.LinearFilter;

            const scaleX = texture.image.width / 100;
            const scaleZ = texture.image.height / 100;

            // Determine whether the object will be just a Cube or a BoardPiece
            let boardPiece;
            const id = z === 0 ? z + x : (z + x) + ((this.boardtype[type].boardArea[0] - 1) * z);
            if (this.boardtype[type].pieceProperties[id]) {
                boardPiece = new BoardPiece({
                    id:         "boardPiece",
                    scale:      {x: scaleX, y: .5, z: scaleZ},
                    position:   {x: (scaleX / 2 + this.accBoardPieceXPos) - 3, y: 0, z: (scaleZ / 2 + this.accBoardPieceZPos) - 2},
                    colour:     {r: 255, g: 255, b: 255},
                    material:   new THREE.MeshStandardMaterial({map: texture})
                },  this.boardtype[type].pieceProperties[id]);
            } else {
                boardPiece = new Cube({
                    id:         "cube",
                    scale:      {x: scaleX, y: .5, z: scaleZ},
                    position:   {x: (scaleX / 2 + this.accBoardPieceXPos) - 3, y: 0, z: (scaleZ / 2 + this.accBoardPieceZPos) - 2},
                    colour:     {r: 255, g: 255, b: 255},
                    material:   new THREE.MeshStandardMaterial({map: texture})
                });
            }

            this.boardPieces.push(boardPiece);

            this.accBoardPieceXPos += scaleX;
            if (x === 16) {
                this.accBoardPieceZPos += scaleZ;
            }
        }).catch(() => {
            
        }).finally(() => {
            x++;
            if (x === this.boardtype[type].boardArea[0]) {
                x = 0;
                this.accBoardPieceXPos = 0;
                z++;
            }
            if (z !== this.boardtype[type].boardArea[1]) {
                this.createBoardPieces(type, x, z);
            } else {
                // Fire an event to setup the rays now that all BoardPieces are set up
                const e = new CustomEvent('AllObjectsCreated');
                document.body.dispatchEvent(e);
            }
        });
    }

    getBoardPieces() { return this.boardPieces; }

    createGamePiecesForPlayer(type, player) {
        for (let i = 0; i < this.boardtype[type].gamePieceCount; i++) {
            const gamePiece = new GamePiece({
                id:         "gamePiece",
                objectPath: "./models/ur/gamepiece.obj",
                texturePath: "./textures/ur/photoreal/gamepiece-" + player + "-" + i + ".png",
                scale:      {x: .4, y: .2, z: .4},
                position:   player === 1 ? {x: i - 2, y: -.25, z: 4} : {x: i - 2, y: -.25, z: -3},
                owner: player
            });
            this.gamePieces.push(gamePiece);
        }
    }

    getGamePieces() { return this.gamePieces; }
}