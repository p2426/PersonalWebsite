import * as THREE from 'three';
import { TheRoyalGameOfUrSettings } from './ur-settings';
import { Minigame } from '../minigame';
import { Scene } from '../../3js classes/scene';
import { Cube } from '../../3js classes/cube';
import { MathFunctions } from '../../mathfunctions';
import { Cursor } from '../../cursor';

export class TheRoyalGameOfUr extends Minigame {
    
    renderFPS = TheRoyalGameOfUrSettings.RenderFPS;
    logicFPS = TheRoyalGameOfUrSettings.LogicFPS;
    sceneSettings = TheRoyalGameOfUrSettings.sceneSettings;
    cameraSettings = TheRoyalGameOfUrSettings.cameraSettings;

    scene = new Scene(this.renderFPS, this.sceneSettings, this.cameraSettings);
    time = 0;

    boardArea = [8, 3];
    boardBlocks = [];

    cameraLerpTargetX = 0;
    cameraLerpTargetY = 8;
    cameraLerpTargetZ = 8;
    cameraLerpX = 0;
    cameraLerpY = 8;
    cameraLerpZ = 8;

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
        this.scene.setCameraTarget(3.5, 0, 0);

        // Objects / Textures
        const textureLoader = new THREE.TextureLoader();

        for (let z = 0; z < this.boardArea[1]; z++) {
            for (let x = 0; x < this.boardArea[0]; x++) {
                if ((z === 0 || z === 2) && (x === 4 || x === 5)) continue;
                let block = new Cube({
                    scale: {x: 1, y: 1, z: 1},
                    position: {x: x, y: 0, z: z},
                    colour: {r: 255, g: 255, b: 255},
                    material: new THREE.MeshStandardMaterial({
                        map: textureLoader.load("./textures/ur/rgu"+ z + "_" + x + ".png"),
                    }),
                })
                this.boardBlocks.push(block);
                this.scene.addObjectToScene(block);
            }
        }

        // Directional Light
        let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        let directionalLightTarget = new THREE.Object3D();
        this.scene.scene.add(directionalLight);
        this.scene.scene.add(directionalLightTarget);
        directionalLight.target = directionalLightTarget;
        directionalLightTarget.position.set(0, -1, -1);

        console.log(this.scene.objects);
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

            this.scene.setCameraPosition(this.cameraLerpX = MathFunctions.lerp(this.cameraLerpX, this.cameraLerpTargetX, this.deltaTime),
                                         this.cameraLerpY = MathFunctions.lerp(this.cameraLerpY, this.cameraLerpTargetY, this.deltaTime),
                                         this.cameraLerpZ = MathFunctions.lerp(this.cameraLerpZ, this.cameraLerpTargetZ, this.deltaTime));

            this.ray.setFromCamera({ x: Cursor.getNormalisedX(), y: Cursor.getNormalisedY() }, this.scene.camera );
            this.ray.hits = this.ray.intersectObjects(this.scene.objects.map(o => o.mesh), false);

            let overlayPos = new THREE.Vector3();
            overlayPos = this.ray.hits[0]?.face.normal.y > 0 ? overlayPos.addVectors(this.ray.hits[0].object.position, this.ray.hits[0].face.normal) : null;
            console.log(overlayPos);

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