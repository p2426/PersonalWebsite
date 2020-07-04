// External Imports
import * as THREE from 'three';

// General Imports
import { UIFunctions } from './uifunctions';
import { MathFunctions } from './mathfunctions';

// UI
import { Header } from './ui/header';

// 3JS Classes
import { Main } from './3js classes/main';
import { Line } from './3js classes/line';
import { Cube } from './3js classes/cube';
import { Sphere } from './3js classes/sphere';
import { Atlas } from './3js classes/atlas';
import { OBJObject } from './3js classes/objobject';
import { CustomShader } from './shaders/customshader';
import { AtlasShader } from './shaders/atlasshader';

var main;

document.addEventListener("DOMContentLoaded", () => {
    // Initialise UI
    Header.init();

    // initialise scene, camera and renderer - packed in main
    //main = new Main();
    //main.setCameraPosition(0, 0, -20);
    //main.setCameraTarget(0, 0, 0);

    // lights
    // var light = new THREE.AmbientLight( 0x404040 );
    // main.scene.add(light);

    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // main.scene.add(directionalLight);

    // objects
    //var atlas = new Atlas("Atlas", new AtlasShader(), 2, {w: 30, h: 30});
    //main.addObjectToScene(atlas);
});