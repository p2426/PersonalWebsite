import * as THREE from 'three';
import { GLTFObject } from '../../3js classes/gltfobject';
import { TheRoyalGameOfUr } from './ur';

export class Dice extends GLTFObject {

    constructor(settings) {
        super(settings);

        this.mixer = new THREE.AnimationMixer(this.mesh);
    }

    start() {
        console.log(this.mesh.animations);
        var clip = new THREE.AnimationClip.findByName( this.mesh.animations, 'ConeAction' );
        var action = this.mixer.clipAction(clip, this.mesh);
        console.log(action);
        action.play();
    }

    update() {
        this.mixer.update(TheRoyalGameOfUr.deltaTime);
    }
}