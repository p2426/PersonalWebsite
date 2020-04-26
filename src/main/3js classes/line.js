import * as THREE from 'three';
import { SceneObject } from './sceneobject';

export class Line extends SceneObject {

    constructor(id = "unset", positions = [0, 0, 0, 0, 100, 0], colour = {r: 135, g: 206, b: 235}, 
        update = () => {}) {

        super();

        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.LineBasicMaterial({
             color: 0x87ceeb });
        this.mesh = new THREE.Line(this.geometry, this.material);
        this.update = update;

        this.setId(id);
        this.setColour(colour.r, colour.g, colour.b);
        this.setLinePositions(positions);
    }
}