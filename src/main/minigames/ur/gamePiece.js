import * as THREE from 'three';
import { MathFunctions } from '../../mathfunctions';
import { Sphere } from '../../3js classes/sphere';
import { TheRoyalGameOfUr } from './ur';
import { OBJObject } from '../../3js classes/objobject';

export class GamePiece extends OBJObject {

    game;

    owner = null;   // 1 = player, 2 = computer

    initialPosition;
    startPosition;
    lerpPos = {x: 0, y: 0, z: 0};
    lerpSpeed = 6;

    constructor(settings) {
        super(settings);
    }

    start() {
        this.setOwner(this.properties.owner);
        this.initialPosition = new THREE.Vector3().copy(this.getPosition());
        this.startPosition = this.initialPosition;
        this.setLerpPosition(this.initialPosition);
    }

    update() {
        if (TheRoyalGameOfUr.deltaTime) {
            this.setPosition(MathFunctions.lerp(this.getPosition().x, this.lerpPos.x, TheRoyalGameOfUr.deltaTime * this.lerpSpeed),
                             MathFunctions.lerp(this.getPosition().y, this.lerpPos.y, TheRoyalGameOfUr.deltaTime * this.lerpSpeed),
                             MathFunctions.lerp(this.getPosition().z, this.lerpPos.z, TheRoyalGameOfUr.deltaTime * this.lerpSpeed));
        }
    }

    resetPosition() {
        this.setLerpPosition(this.initialPosition);
    }

    setLerpPosition(vec3) {
        this.lerpPos.x = vec3.x;
        this.lerpPos.y = vec3.y;
        this.lerpPos.z = vec3.z;
    }

    getOwner() { return this.owner; }
    setOwner(v) { this.owner = v; }

    getStartPosition() { return this.startPosition; }
    setStartPosition(vec3) { this.startPosition = vec3; }
}