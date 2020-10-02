import * as THREE from 'three';
import { TheRoyalGameOfUrSettings } from './ur-settings';
import { Minigame } from '../minigame';
import { Scene } from '../../3js classes/scene';
import { Cube } from '../../3js classes/cube';
import { SpriteObj } from '../../3js classes/spriteobj';
import { MathFunctions } from '../../mathfunctions';
import { Cursor } from '../../cursor';
import { Sphere } from '../../3js classes/sphere';
import { GamePiece } from './gamePiece';

export class TheRoyalGameOfUr extends Minigame {
    
    renderFPS = TheRoyalGameOfUrSettings.RenderFPS;
    logicFPS = TheRoyalGameOfUrSettings.LogicFPS;
    sceneSettings = TheRoyalGameOfUrSettings.sceneSettings;
    cameraSettings = TheRoyalGameOfUrSettings.cameraSettings;

    scene = new Scene(this.renderFPS, this.sceneSettings, this.cameraSettings);
    time = 0;

    boardArea = TheRoyalGameOfUrSettings.gameSettings.boardArea;
    boardBlocks = [];
    gamePieceCount = TheRoyalGameOfUrSettings.gameSettings.gamePieceCount;
    gamePieces = [];
    gamePieceRay = new THREE.Raycaster();

    cameraLerpTargetX = 0;
    cameraLerpTargetY = 8;
    cameraLerpTargetZ = 8;

    gamePieceGuidePos = new THREE.Vector3();
    selectedGamePiece = null;

    constructor() {
        super();
        super.debug(
            () => {
                this.cameraLerpTargetX = 0;
                this.cameraLerpTargetY = 10;
                this.cameraLerpTargetZ = 10;
                this.scene.setCameraTarget(3.5, 0, 0);
            },
            () => {
                this.cameraLerpTargetX = 10;
                this.cameraLerpTargetY = 0;
                this.cameraLerpTargetZ = 0;
            }
        );
        this.scene.resetSceneDimensions();
    }

    start() {
        // Camera Target
        this.scene.setCameraPosition(0, 10, 10);
        this.scene.setCameraTarget(3.5, 0, 0);

        // Objects / Textures
        const textureLoader = new THREE.TextureLoader();

        for (let z = 0; z < this.boardArea[1]; z++) {
            for (let x = 0; x < this.boardArea[0]; x++) {
                if ((z === 0 || z === 2) && (x === 4 || x === 5)) continue;
                const texture = textureLoader.load("./textures/ur/rgu"+ z + "_" + x + ".png");
                texture.minFilter = THREE.LinearFilter;
                let block = new Cube({
                    id: "block",
                    scale: {x: 1, y: 1, z: 1},
                    position: {x: x, y: 0, z: z},
                    colour: {r: 255, g: 255, b: 255},
                    material: new THREE.MeshStandardMaterial({map: texture})
                });
                this.boardBlocks.push(block);
                this.scene.addObjectToScene(block);
            }
        }

        // Game Pieces
        for (let i = 0; i < this.gamePieceCount; i++) {
            const gamePiece = new GamePiece({
                id: "gamePiece",
                material: new THREE.MeshStandardMaterial({ color: 0x87a6cc }),
                scale: {x: .6, y: .2, z: .6},
                position: {x: i, y: -.5, z: 3},
            }, this);
            this.gamePieces.push(gamePiece);
            this.scene.addObjectToScene(gamePiece);
        }

        // Directional Light
        let directionalLight = new THREE.DirectionalLight( 0xffffff, .5 );
        let directionalLightTarget = new THREE.Object3D();
        this.scene.scene.add(directionalLight);
        this.scene.scene.add(directionalLightTarget);
        directionalLight.target = directionalLightTarget;
        directionalLightTarget.position.set(0, -1, -1);

        // Raycastable objects for rays
        this.ray.objects = this.scene.objects.filter(o => o.id !== "gamePiece").map(o => o.mesh);
        this.gamePieceRay.objects = this.scene.objects.filter(o => o.id === "gamePiece").map(o => o.mesh);

        // DOM Events
        document.body.addEventListener('mousedown', () => {
            if (this.gamePieceRay.hits[0]) {
                this.selectedGamePiece = this.gamePieceRay.hits[0].object.classRef;
            }
        });
        document.body.addEventListener('mouseup', () => {
            if (this.selectedGamePiece) {
                if (!this.gamePieceGuidePos) {
                    this.selectedGamePiece.resetPosition();
                    this.selectedGamePiece = null;
                } else {
                    this.selectedGamePiece.setLerpPosition(this.gamePieceGuidePos.x, this.gamePieceGuidePos.y, this.gamePieceGuidePos.z);
                    this.selectedGamePiece = null;
                }
            }
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

            this.scene.setCameraPosition(MathFunctions.lerp(this.scene.getCameraPosition().x, this.cameraLerpTargetX, this.deltaTime),
                                         MathFunctions.lerp(this.scene.getCameraPosition().y, this.cameraLerpTargetY, this.deltaTime),
                                         MathFunctions.lerp(this.scene.getCameraPosition().z, this.cameraLerpTargetZ, this.deltaTime));

            this.ray.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera);
            this.ray.hits = this.ray.intersectObjects(this.ray.objects, false);
            this.gamePieceRay.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera);
            this.gamePieceRay.hits = this.gamePieceRay.intersectObjects(this.gamePieceRay.objects, false);

            this.gamePieceGuidePos = this.ray.hits[0]?.face.normal.y > 0 ? new THREE.Vector3().addVectors(this.ray.hits[0].object.position, new THREE.Vector3(0, .6, 0)) : null;

            if (this.selectedGamePiece && this.gamePieceGuidePos) {
                this.selectedGamePiece.setLerpPosition(this.gamePieceGuidePos.x, this.gamePieceGuidePos.y, this.gamePieceGuidePos.z);
            }

            // Orbit example, make sure that cameraTarget is in the middle of it?
            // this.cameraLerpTargetX = Math.cos(this.time) * 10;
            // this.cameraLerpTargetY = 10;
            // this.cameraLerpTargetZ = Math.sin(this.time) * 10;

            // Orbit motion
            // Math.cos(this.time) * radius, 0, Math.sin(this.time) * radius

			this.then = this.now - (this.delta % this.interval);
		}

	}
}