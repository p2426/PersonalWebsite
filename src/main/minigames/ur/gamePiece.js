import * as THREE from 'three';
import { MathFunctions } from '../../mathfunctions';
import { Sphere } from '../../3js classes/sphere';
import { TheRoyalGameOfUr } from './ur';

export class GamePiece extends Sphere {

    game;

    owner = null;   // 1 = player, 2 = computer

    initialPosition;
    startPosition;
    lerpPos = {x: 0, y: 0, z: 0};
    lerpSpeed = 6;

    properties = {
        update: this.update.bind(this)
    }

    constructor(settings, owner) {
        super(settings);
        this.setOwner(owner);

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