import * as THREE from 'three';
import { MathFunctions } from '../../mathfunctions';
import { Sphere } from '../../3js classes/sphere';
import { TheRoyalGameOfUr } from './ur';

export class GamePiece extends Sphere {

    game;

    owner = null;   // 1 = player, 2 = computer

    startPosition;
    lerpPos = {x: 0, y: 0, z: 0};
    lerpSpeed = 6;

    properties = {
        update: this.update.bind(this)
    }

    constructor(settings, owner) {
        super(settings);
        this.setOwner(owner);

        this.startPosition = new THREE.Vector3().copy(this.getPosition());
        this.setLerpPosition(this.startPosition.x, this.startPosition.y, this.startPosition.z);
    }

    update() {
        if (TheRoyalGameOfUr.deltaTime) {
            this.setPosition(MathFunctions.lerp(this.getPosition().x, this.lerpPos.x, TheRoyalGameOfUr.deltaTime * this.lerpSpeed),
                             MathFunctions.lerp(this.getPosition().y, this.lerpPos.y, TheRoyalGameOfUr.deltaTime * this.lerpSpeed),
                             MathFunctions.lerp(this.getPosition().z, this.lerpPos.z, TheRoyalGameOfUr.deltaTime * this.lerpSpeed));
        }
    }

    resetPosition() {
        this.setLerpPosition(this.startPosition.x, this.startPosition.y, this.startPosition.z);
    }

    setLerpPosition(x, y, z) {
        this.lerpPos.x = x;
        this.lerpPos.y = y;
        this.lerpPos.z = z;
    }

    getOwner() { return this.owner; }
    setOwner(v) { this.owner = v; }
}