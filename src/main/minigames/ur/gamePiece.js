import * as THREE from 'three';
import { MathFunctions } from '../../mathfunctions';
import { Sphere } from '../../3js classes/sphere';

export class GamePiece extends Sphere {

    game;

    startPosition;
    lerpPosX;
    lerpPosY;
    lerpPosZ;

    properties = {
        update: this.update.bind(this)
    }

    constructor(settings, game) {
        super(settings);
        this.game = game;
        this.startPosition = new THREE.Vector3().copy(this.getPosition());
        this.setLerpPosition(this.startPosition.x, this.startPosition.y, this.startPosition.z);
    }

    update() {
        if (this.game.deltaTime) {
            this.setPosition(MathFunctions.lerp(this.getPosition().x, this.lerpPosX, this.game.deltaTime * 6),
                            MathFunctions.lerp(this.getPosition().y, this.lerpPosY, this.game.deltaTime * 6),
                            MathFunctions.lerp(this.getPosition().z, this.lerpPosZ, this.game.deltaTime * 6));
        }
    }

    resetPosition() {
        //this.setPosition(this.startPosition.x, this.startPosition.y, this.startPosition.z);
        this.setLerpPosition(this.startPosition.x, this.startPosition.y, this.startPosition.z);
    }

    setLerpPosition(x, y, z) {
        this.lerpPosX = x;
        this.lerpPosY = y;
        this.lerpPosZ = z;
    }
}