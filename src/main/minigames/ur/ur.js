import * as THREE from 'three';
import { MathFunctions } from '../../mathfunctions';
import { Cursor } from '../../cursor';
import { TheRoyalGameOfUrSettings } from './ur-settings';
import { Minigame } from '../minigame';
import { Scene } from '../../3js classes/scene';
import { BoardCreator } from './boardcreator';
import { Cube } from '../../3js classes/cube';

export class TheRoyalGameOfUr extends Minigame {
    
    static deltaTime = 0;

    renderFPS = TheRoyalGameOfUrSettings.RenderFPS;
    logicFPS = TheRoyalGameOfUrSettings.LogicFPS;
    sceneSettings = TheRoyalGameOfUrSettings.sceneSettings;
    cameraSettings = TheRoyalGameOfUrSettings.cameraSettings;

    scene = new Scene(this.renderFPS, this.sceneSettings, this.cameraSettings);
    time = 0;

    gamePieceRay = new THREE.Raycaster();
    readyToRay = false;

    cameraLerpTarget = {x: 30, y: 5, z: 10};
    cameraOrbit = false;

    selectedGamePiece = null;

    constructor() {
        super();
        super.debug(
            () => {
                this.cameraLerpTarget = {x: 0, y: 10, z: 10};
                this.scene.setCameraTarget(3.5, 0, 0);
            },
            () => {
                this.cameraLerpTarget = {x: 10, y: 0, z: 0};
            },
            () => {
                this.cameraLerpTarget = {x: 3.5, y: 15, z: 0};
                this.scene.setCameraTarget(3.5, 0, -.01);
            },
            () => {
                this.cameraOrbit = !this.cameraOrbit;
            },
        );
        this.scene.resetSceneDimensions();
    }
    
    createAmbientLight() {
        let ambientLight = new THREE.AmbientLight(0xffffff, .2);
        this.scene.scene.add(ambientLight);
        return ambientLight;
    }

    createPointLight() {
        let pointLight = new THREE.PointLight(0xfff6db, 1, 20, 2);
        pointLight.position.set(0, 5, 0);
        pointLight.castShadow = true;
        pointLight.shadow.camera.near = .1;
        pointLight.shadow.camera.far = 20;
        this.scene.scene.add(pointLight);
        return pointLight;
    }

    start() {
        // Turn off alpha background
        this.scene.renderer.setClearAlpha(1);

        // Camera setup
        this.scene.setCameraPosition(this.cameraLerpTarget.x, this.cameraLerpTarget.y, this.cameraLerpTarget.z);
        this.scene.setCameraTarget(3.5, 0, 1);
        this.cameraLerpTarget = {x: 0, y: 10, z: 10};

        // Floor
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load("./textures/ur/Flooring_Stone_001_COLOR.png" , (floorMap) => {
            textureLoader.load("./textures/ur/Flooring_Stone_001_OCC.png", (floorAo) => {
                textureLoader.load("./textures/ur/Flooring_Stone_001_NRM.png", (floorNormal) => {
                    floorMap.minFilter = THREE.LinearFilter;
                    floorAo.minFilter = THREE.LinearFilter;
                    floorNormal.minFilter = THREE.LinearFilter;
                    for (let i = 1; i < 5; i++) {
                        for (let j = 1; j < 5; j++) {
                            let floor = new Cube({
                                id:         "floor",
                                scale:      {x: 15, y: 1, z: 15},
                                position:   {x: j * 15 - 30, y: -.8, z: i * 15 - 30},
                                colour:     {r: 255, g: 255, b: 255},
                                material:   new THREE.MeshStandardMaterial({
                                    map: floorMap,
                                    aoMap: floorAo,
                                    normalMap: floorNormal,
                                })
                            });
                        }
                    }
                });
            });
        });

        // Lights
        this.pointLight = this.createPointLight();
        this.ambientLight = this.createAmbientLight();

        // Set up the board
        this.boardCreator = new BoardCreator(BoardCreator.TYPE.STANDARD);

        // Events
        document.body.addEventListener('mousedown', () => {
            this.initialBoardPiece = null;
            this.lastLegalBoardPiece = null;

            if (this.gamePieceRay.hits[0]) {
                this.selectedGamePiece = this.gamePieceRay.hits[0].object.classRef;
                this.selectedGamePiece.setStartPosition(new THREE.Vector3().copy(this.selectedGamePiece.getPosition()));
                if (this.hoveredBoardPiece) {
                    this.initialBoardPiece = this.hoveredBoardPiece;
                    this.initialBoardPiece.setOccupiedGamePiece(null);
                }
            }
        });

        document.body.addEventListener('mouseup', () => {
            if (this.selectedGamePiece) {
                if (!this.hoveredBoardPiece) {
                    this.selectedGamePiece.setLerpPosition(this.selectedGamePiece.getStartPosition());
                    this.initialBoardPiece?.setOccupiedGamePiece(this.selectedGamePiece);
                    this.selectedGamePiece = null;
                } else {
                    const gamePieceOnBoardPiece = this.lastLegalBoardPiece.getOccupiedGamePiece();
                    if (gamePieceOnBoardPiece) {
                        if (gamePieceOnBoardPiece.getOwner() !== this.selectedGamePiece.getOwner()) {
                            gamePieceOnBoardPiece.resetPosition();
                            this.lastLegalBoardPiece.setOccupiedGamePiece(null);
                        } else {
                            this.selectedGamePiece.setLerpPosition(this.selectedGamePiece.getStartPosition());
                            this.initialBoardPiece?.setOccupiedGamePiece(this.selectedGamePiece);
                            this.selectedGamePiece = null;
                            return;
                        }
                    }
                    if (!this.hoveredBoardPiece.isLegalMove(this.selectedGamePiece.getOwner())) {
                        this.selectedGamePiece.setLerpPosition(this.selectedGamePiece.getStartPosition());
                        this.initialBoardPiece?.setOccupiedGamePiece(this.selectedGamePiece);
                        this.selectedGamePiece = null;
                        return;
                    }
                    this.selectedGamePiece.setLerpPosition(this.lastLegalBoardPiece.getGamePieceSlot());
                    this.lastLegalBoardPiece.setOccupiedGamePiece(this.selectedGamePiece);
                    this.selectedGamePiece = null;
                }
            }
        });

		document.body.addEventListener('AllObjectsCreated', (e) => {
            // Raycastable objects for rays
            this.ray.objects = this.scene.objects.filter(o => o.id === "boardPiece").map(o => o.mesh);
            this.gamePieceRay.objects = this.scene.objects.filter(o => o.id === "gamePiece").map(o => o.mesh);
            this.readyToRay = true;
        });
    }

    update() {
        requestAnimationFrame(() => {
            super.update();
            this.update();
        });

		this.now = Date.now();
        this.delta = this.now - this.then;

		// Logic to be targeted to the given framerate
		if (this.delta > this.interval) {
            this.deltaTime = this.interval / 1000;
            this.time += this.deltaTime;
            TheRoyalGameOfUr.deltaTime = this.deltaTime;
            // ************************************** //

            this.scene.setCameraPosition(MathFunctions.lerp(this.scene.getCameraPosition().x, this.cameraLerpTarget.x, this.deltaTime),
                                         MathFunctions.lerp(this.scene.getCameraPosition().y, this.cameraLerpTarget.y, this.deltaTime),
                                         MathFunctions.lerp(this.scene.getCameraPosition().z, this.cameraLerpTarget.z, this.deltaTime));

            if (this.readyToRay) {
                this.ray.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera);
                this.ray.hits = this.ray.intersectObjects(this.ray.objects, false);
                this.gamePieceRay.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera);
                this.gamePieceRay.hits = this.gamePieceRay.intersectObjects(this.gamePieceRay.objects, false);

                this.hoveredBoardPiece = this.ray.hits[0]?.object.classRef;
            }

            if (this.selectedGamePiece && this.hoveredBoardPiece) {
                if (this.hoveredBoardPiece.isLegalMove(this.selectedGamePiece.getOwner())) {
                    this.lastLegalBoardPiece = this.hoveredBoardPiece;
                    this.selectedGamePiece.setLerpPosition(this.lastLegalBoardPiece.getGamePieceSlot());
                }
            }

            // Orbit example, make sure that cameraTarget is in the middle of it?
            if (this.cameraOrbit) {
                this.cameraLerpTargetX = Math.cos(this.time) * 10;
                this.cameraLerpTargetY = 10;
                this.cameraLerpTargetZ = Math.sin(this.time) * 10;
            }

            // Orbit motion
            // Math.cos(this.time) * radius, 0, Math.sin(this.time) * radius

            // ********************************************** //
            this.then = this.now - (this.delta % this.interval);
        }
	}
}