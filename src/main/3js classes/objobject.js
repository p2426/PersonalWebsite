import * as THREE from 'three';
import { SceneObject } from './sceneobject';

export class OBJObject extends SceneObject {

    constructor(obj = undefined, id = "unset", position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0},
        colour = {r: 135, g: 206, b: 235}, update = () => {}) {

        super();
        
        this.geometry = obj;
        this.material = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry.geometry, this.material);
        //this.mesh.scale.set(this.geometry.scale.x, this.geometry.scale.y, this.geometry.scale.z);
        this.update = update;

        this.setId(id);
        //this.setColour(colour.r, colour.g, colour.b);
        this.setPosition(position.x, position.y, position.z);
        this.setRotation(rotation.x, rotation.y, rotation.z);
    }
}