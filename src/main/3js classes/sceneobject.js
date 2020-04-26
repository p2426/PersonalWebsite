import * as THREE from 'three';

export class SceneObject {
    constructor() {

    }

    getMesh() {
        return this.mesh;
    }

    getColour() {
        return this.material.color;
    }

    getPosition() {
        return this.mesh.position;
    }

    getRotation() {
        return this.mesh.rotation;
    }

    getId() {
        return this.id;
    }

    setColour(r, g, b) {
        this.material.color.setRGB(r / 255, g / 255, b / 255);
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    setLinePositions(arr) {
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    }

    setRotation(x, y, z) {
        this.mesh.rotation.x = x;
        this.mesh.rotation.y = y;
        this.mesh.rotation.z = z;
    }

    lookAt(x, y, z) {
        this.mesh.lookAt(x, y, z);
    }

    setId(string) {
        this.id = string;
    }
};