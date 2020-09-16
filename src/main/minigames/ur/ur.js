import * as THREE from 'three';
import { TheRoyalGameOfUrSettings } from './ur-settings';
import { Minigame } from '../minigame';
import { Scene } from '../../3js classes/scene';
import { Cube } from '../../3js classes/cube';

export class TheRoyalGameOfUr extends Minigame {
    
    renderFPS = TheRoyalGameOfUrSettings.RenderFPS;
    logicFPS = TheRoyalGameOfUrSettings.LogicFPS;
    sceneSettings = TheRoyalGameOfUrSettings.sceneSettings;
    cameraSettings = TheRoyalGameOfUrSettings.cameraSettings;

    scene = new Scene(this.renderFPS, this.sceneSettings, this.cameraSettings);
    time = 0;

    boardArea = [8, 3];
    boardBlocks = [];

    constructor() {
        super();
        super.debug(
            () => { this.scene.setCameraPosition(0, 10, 0); }
        );
        this.scene.resetSceneDimensions();
    }

    start() {
        // Camera
        this.scene.setCameraPosition(0, 10, 10);
        this.scene.setCameraTarget(0, 0, 0);

        // Objects
        const textureLoader = new THREE.TextureLoader();

        for (let z = 0; z < this.boardArea[1]; z++) {
            for (let x = 0; x < this.boardArea[0]; x++) {
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

        console.log(this.boardBlocks);

        // Directional Light
        let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        let directionalLightTarget = new THREE.Object3D();
        this.scene.scene.add(directionalLight);
        this.scene.scene.add(directionalLightTarget);
        directionalLight.target = directionalLightTarget;
        directionalLightTarget.position.set(0, -1, -1);
    }

    update() {
        requestAnimationFrame(() => {
            this.update();
        });

		this.now = Date.now();
		this.delta = this.now - this.then;

		// Logic to be targeted to the given framerate
		if (this.delta > this.interval) {
            this.time++;



			this.then = this.now - (this.delta % this.interval);
		}

	}
}