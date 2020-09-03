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

    constructor() {
        super();
        super.debug(
            () => { this.scene.setCameraPosition(0, 10, 0); }
        );
    }

    start() {
        // Camera
        this.scene.setCameraPosition(0, 10, -10);
        this.scene.setCameraTarget(0, 0, 0);

        // Objects
        let cube = new Cube({
            scale: {x: 10, y: .1, z: 10},  
        });
        this.scene.addObjectToScene(cube);
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

            console.log(this.time);

			this.then = this.now - (this.delta % this.interval);
		}

	}
}