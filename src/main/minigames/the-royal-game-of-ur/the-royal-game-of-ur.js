import * as THREE from 'three';
import { Minigame } from '../minigame';
import { Scene } from '../../3js classes/scene';
import { Cube } from '../../3js classes/cube';

export class TheRoyalGameOfUr extends Minigame {
    constructor() {
        super();
        super.start(this.start);
    }

    start() {
        // Initialise a Scene
        const mainSettings = {
            parent: document.body,
            width: window.innerWidth,
            height: window.innerHeight,
            colour: new THREE.Color(1, 0, 0),
            antialias: true,
            alpha: true
        };
        let scene = new Scene(mainSettings);
        scene.setCameraPosition(0, 10, -10);
        scene.setCameraTarget(0, 0, 0);

        let cube = new Cube({
            scale: {x: 10, y: .1, z: 10},
        });
        scene.addObjectToScene(cube);
    }
}