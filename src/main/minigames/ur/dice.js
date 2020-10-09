import * as THREE from 'three';
import { GLTFObject } from '../../3js classes/gltfobject';

export class Dice extends GLTFObject {

    constructor(settings) {
        super(settings);

        console.log(this.properties);
    }

    update() {}
}