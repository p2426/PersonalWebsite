import * as THREE from 'three';
import { SceneObject } from './sceneobject';

export class Cube extends SceneObject {
    constructor(id = "unset", scale = {x: 1, y: 1, z: 1}, segments = {x: 1, y: 1, z: 1},
        position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0}, colour = {r: 135, g: 206, b: 235}, 
        update = () => {}) {

        super();
        
        this.geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z,
             segments.x, segments.y, segments.z );
        this.material = new THREE.MeshBasicMaterial({
             color: 0x87ceeb });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.update = update;

        this.setId(id);
        this.setColour(colour.r, colour.g, colour.b);
        this.setPosition(position.x, position.y, position.z);
        this.setRotation(rotation.x, rotation.y, rotation.z);
    }
}