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
        //this.createBoardPieces(type);
        this.loadTexs();
        this.createGamePiecesForPlayer(type, 1);
        this.createGamePiecesForPlayer(type, 2);
    }

    // createBoardPieces(type) {
    //     for (let z = 0; z < this.boardtype[type].boardArea[1]; z++) {
    //         for (let x = 0; x < this.boardtype[type].boardArea[0]; x++) {
    //             if ((z === 0 || z === 2) && (x === 4 || x === 5)) continue;

    //             const texture = this.textureLoader.load("./textures/ur/rgu"+ z + "_" + x + ".png");
    //             texture.minFilter = THREE.LinearFilter;

    //             let boardPiece = new BoardPiece({
    //                 id:         "boardPiece",
    //                 scale:      {x: 1, y: .5, z: 1},
    //                 position:   {x: x, y: 0, z: z},
    //                 colour:     {r: 255, g: 255, b: 255},
    //                 material:   new THREE.MeshStandardMaterial({map: texture})
    //             }, this.boardtype[type].pieceProperties[z === 0 ? z + x : (z + x) + ((this.boardtype[type].boardArea[0] - 1) * z)]);

    //             this.boardPieces.push(boardPiece);
    //         }
    //     }
    //     return this.boardPieces;
    // }

    createBoardPieces(type) {

        for (let z = 0; z < 7; z++) {
            for (let x = 0; x < 17; x++) {
                
                if ((x === 9 && z === 0 || x === 9 && z === 6) || 
                    (x === 10 && z === 0 || x === 10 && z === 6) ||
                    (x === 11 && z === 0 || x === 11 && z === 6)) continue;

                this.textureLoader.load(
                    "./textures/ur/photoreal/originalurtopdown-" + String(x).padStart(2, '0') + "-" + String(z).padStart(2, '0') + ".png",
                    (tex) => {
                        tex.minFilter = THREE.LinearFilter;

                        const scaleX = 1 * (tex.image.width / 100);
                        const scaleZ = 1 * (tex.image.height / 100);

                        let boardPiece = new Cube({
                            id:         "cube",
                            scale:      {x: scaleX, y: .5, z: scaleZ},
                            position:   {x: x, y: 0, z: z},
                            colour:     {r: 255, g: 255, b: 255},
                            material:   new THREE.MeshStandardMaterial({map: tex})
                        });

                        this.boardPieces.push(boardPiece);
                        console.log(this.boardPieces);
                });
            }
        }

        // for (let z = 0; z < this.boardtype[type].boardArea[1]; z++) {
        //     for (let x = 0; x < this.boardtype[type].boardArea[0]; x++) {
        //         if ((z === 0 || z === 2) && (x === 4 || x === 5)) continue;

        //         const texture = this.textureLoader.load("./textures/ur/rgu"+ z + "_" + x + ".png");
        //         texture.minFilter = THREE.LinearFilter;

        //         let boardPiece = new BoardPiece({
        //             id:         "boardPiece",
        //             scale:      {x: 1, y: .5, z: 1},
        //             position:   {x: x, y: 0, z: z},
        //             colour:     {r: 255, g: 255, b: 255},
        //             material:   new THREE.MeshStandardMaterial({map: texture})
        //         }, this.boardtype[type].pieceProperties[z === 0 ? z + x : (z + x) + ((this.boardtype[type].boardArea[0] - 1) * z)]);

        //         this.boardPieces.push(boardPiece);
        //     }
        // }
        // return this.boardPieces;
    }

    loadTexs() {
        const xSize = 17;
        const zSize = 7;
        let currentX = 0;
        let currentZ = 0;
        let textures = [];
        const textureLoader = new THREE.TextureLoader();

        texPromise(currentX, currentZ);

        function texPromise(x, z) {
            new Promise((resolve, reject) => {

                if ((x === 9 && z === 0 || x === 9 && z === 6) || 
                (x === 10 && z === 0 || x === 10 && z === 6) ||
                (x === 11 && z === 0 || x === 11 && z === 6)) {
                    reject();
                } else {
                    const dir = "./textures/ur/photoreal/originalurtopdown-" + String(x).padStart(2, '0') + "-" + String(z).padStart(2, '0') + ".png"
                    textureLoader.load(dir, 
                        (tex) => { resolve(tex) },
                        undefined,
                        () => { reject() }
                    );
                }
                
            }).then((tex) => {
                textures.push(tex);
                console.log("finished loading texture:", z, x);
            }).catch(() => {
                console.log("lol something failed");
            }).finally(() => {
                currentX++;
                if (currentX == xSize) {
                    currentX = 0;
                    currentZ++;
                }
                if (currentZ !== zSize) {
                    texPromise(currentX, currentZ);
                }
            });
        }
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