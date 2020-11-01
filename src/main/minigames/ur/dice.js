import * as THREE from 'three';
import { GLTFObject } from '../../3js classes/gltfobject';
import { TheRoyalGameOfUr } from './ur';
import { MathFunctions } from '../../mathfunctions';

export class Dice extends GLTFObject {

    animationClips = {};

    constructor(settings) {
        super(settings);
        this.mixer = new THREE.AnimationMixer(this.mesh);
    }

    start() {
        this.animations.forEach(animation => {
            this.animationClips[animation.name] = new THREE.AnimationClip.findByName(this.animations, animation.name);
        });

        //this.rollTheDice();
    }

    update() {
        this.mixer.update(TheRoyalGameOfUr.deltaTime);
    }

    rollTheDice(callback) {
        this.playAnimation(`${this.properties.gltfChildName}Action`, callback);
    }

    playAnimation(name, callback) {
        const action = this.mixer.clipAction(this.animationClips[name], this.mesh);
        action.setLoop(false, 1);
        action.play();
        action.reset();
        setTimeout(() => {
            callback();
        }, this.animationClips[name].duration * 1000);
    }
}