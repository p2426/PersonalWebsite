import * as THREE from 'three';
import { SceneObject } from './sceneobject';

export class Sphere extends SceneObject {
    constructor(id = "unset", radius = .5, segments = {w: 8, h: 8}, position = {x: 0, y: 0, z: 0},
        colour = {r: 135, g: 206, b: 235}, update = () => {}) {

        super();
        
        this.geometry = new THREE.SphereBufferGeometry(radius, segments.w, segments.h);
        this.material = new THREE.MeshBasicMaterial({
             color: 0x87ceeb });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.update = update;

        this.setId(id);
        this.setColour(colour.r, colour.g, colour.b);
        this.setPosition(position.x, position.y, position.z);
    }
}