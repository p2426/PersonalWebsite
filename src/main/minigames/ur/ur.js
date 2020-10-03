import * as THREE from 'three';
import { TheRoyalGameOfUrSettings } from './ur-settings';
import { Minigame } from '../minigame';
import { Scene } from '../../3js classes/scene';
import { Cube } from '../../3js classes/cube';
import { SpriteObj } from '../../3js classes/spriteobj';
import { MathFunctions } from '../../mathfunctions';
import { Cursor } from '../../cursor';
import { Sphere } from '../../3js classes/sphere';
import { GamePiece } from './gamepiece';
import { BoardCreator } from './boardcreator';

export class TheRoyalGameOfUr extends Minigame {
    
    static deltaTime = 0;

    renderFPS = TheRoyalGameOfUrSettings.RenderFPS;
    logicFPS = TheRoyalGameOfUrSettings.LogicFPS;
    sceneSettings = TheRoyalGameOfUrSettings.sceneSettings;
    cameraSettings = TheRoyalGameOfUrSettings.cameraSettings;

    scene = new Scene(this.renderFPS, this.sceneSettings, this.cameraSettings);
    time = 0;

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
    
    createAmbientLight() {
        let ambientLight = new THREE.AmbientLight(0xffffff, .2);
        this.scene.scene.add(ambientLight);
        return ambientLight;
    }

    createPointLight() {
        let pointLight = new THREE.PointLight(0xfff6db, 1, 20, 2);
        pointLight.position.set(1, 3, 0);
        pointLight.castShadow = true;
        pointLight.shadow.camera.near = .1;
        pointLight.shadow.camera.far = 20;
        this.scene.scene.add(pointLight);
        return pointLight;
    }

    start() {
        // Camera Target
        this.scene.setCameraPosition(0, 10, 10);
        this.scene.setCameraTarget(3.5, 0, 0);

        // Lights
        this.pointLight = this.createPointLight();
        this.ambientLight = this.createAmbientLight();

        // Set up the board
        this.boardCreator = new BoardCreator(BoardCreator.TYPE.STANDARD);
        this.boardCreator.getBoardPieces().forEach(piece => {
            this.scene.addObjectToScene(piece);
        });
        this.boardCreator.getGamePieces().forEach(piece => {
            this.scene.addObjectToScene(piece);
        });
        
        // Raycastable objects for rays
        this.ray.objects = this.scene.objects.filter(o => o.id === "boardPiece").map(o => o.mesh);
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
            TheRoyalGameOfUr.deltaTime = this.deltaTime;
            // ******************************** //

            this.scene.setCameraPosition(MathFunctions.lerp(this.scene.getCameraPosition().x, this.cameraLerpTargetX, this.deltaTime),
                                         MathFunctions.lerp(this.scene.getCameraPosition().y, this.cameraLerpTargetY, this.deltaTime),
                                         MathFunctions.lerp(this.scene.getCameraPosition().z, this.cameraLerpTargetZ, this.deltaTime));

            this.ray.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera);
            this.ray.hits = this.ray.intersectObjects(this.ray.objects, false);
            this.gamePieceRay.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera);
            this.gamePieceRay.hits = this.gamePieceRay.intersectObjects(this.gamePieceRay.objects, false);

            this.gamePieceGuidePos = this.ray.hits[0]?.face.normal.y > 0 ? new THREE.Vector3().addVectors(this.ray.hits[0].object.position, new THREE.Vector3(0, .35, 0)) : null;

            // console.log(this.ray.hits[0]?.object.classRef);

            if (this.selectedGamePiece && this.gamePieceGuidePos) {
                this.selectedGamePiece.setLerpPosition(this.gamePieceGuidePos.x, this.gamePieceGuidePos.y, this.gamePieceGuidePos.z);
            }

            // Orbit example, make sure that cameraTarget is in the middle of it?
            // this.cameraLerpTargetX = Math.cos(this.time) * 10;
            // this.cameraLerpTargetY = 10;
            // this.cameraLerpTargetZ = Math.sin(this.time) * 10;

            // Orbit motion
            // Math.cos(this.time) * radius, 0, Math.sin(this.time) * radius

            // ********************************************** //
			this.then = this.now - (this.delta % this.interval);
		}

	}
}