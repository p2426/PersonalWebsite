import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { Main } from './3js classes/main';
import { Line } from './3js classes/line';
import { Cube } from './3js classes/cube';
import { Sphere } from './3js classes/sphere';
import { OBJObject } from './3js classes/objobject';

var main;

document.addEventListener("DOMContentLoaded", () => {
    main = new Main(undefined, undefined, undefined);
    main.setCameraPosition(3.4029755378533544, 1.29, -3.2182915445627263);
    main.setCameraTarget(4.592198329484963, .5, -6.4514489135553035);

    window.logCamera = () => {
        main.logCamera();
    }

    // light
    var light = new THREE.AmbientLight( 0x404040 );
    main.scene.add( light );

    // load texture
    var mtlLoader = new MTLLoader();
    mtlLoader.setMaterialOptions({ side: THREE.DoubleSide })
    mtlLoader.load('../../data/LondonSkyline.mtl', (materials) => {
        materials.preload();

        // load model
        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('../../data/LondonSkyline.obj', (object) => {

            main.scene.add(object); 
                
        });
    });
});