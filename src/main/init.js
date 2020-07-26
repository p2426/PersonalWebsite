// External Imports
import * as THREE from 'three';

// General Imports
import { UIFunctions } from './uifunctions';
import { MathFunctions } from './mathfunctions';

// UI
import { EnterButton } from './ui/enter-button';
import { TabController } from './ui/tab/tab-controller';

// 3JS Classes
import { Scene } from './3js classes/scene';
import { Line } from './3js classes/line';
import { Cube } from './3js classes/cube';
import { Sphere } from './3js classes/sphere';
import { Atlas } from './3js classes/atlas';
import { OBJObject } from './3js classes/objobject';
import { CustomShader } from './shaders/customshader';
import { AtlasShader } from './shaders/atlasshader';

document.addEventListener("DOMContentLoaded", () => {
    // Initialise UI
    EnterButton.init();
    TabController.init();
    TabController.buttonInstances[0].click();

    // // Initialise a Scene
    // const mainSettings = {
    //     parent: document.body,
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //     colour: new THREE.Color(1, 1, 1)
    // };
    // let scene = new Scene(mainSettings);
    // scene.setCameraPosition(0, 10, -10);
    // scene.setCameraTarget(0, 0, 0);

    // // Textures
    // const textureLoader = new THREE.TextureLoader();

    // const floorNormalTex = textureLoader.load("textures/n_t_floor.png");
    // const floorDiffuseTex = textureLoader.load("textures/d_t_floor2.png");
    // floorNormalTex.minFilter = THREE.LinearFilter;
    // floorDiffuseTex.minFilter = THREE.LinearFilter;

    // // Floor
    // let cube = new Cube({
    //     scale: {x: 10, y: .1, z: 10},
    //     material: new THREE.MeshStandardMaterial({
    //         metalness: 0.1,
    //         roughness: 0.1,
    //         normalMap: floorNormalTex,
    //         map: floorDiffuseTex,
    //     })
    // });
    // scene.addObjectToScene(cube);

    // // Directional Light
    // let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // let directionalLightTarget = new THREE.Object3D();
    // scene.scene.add(directionalLight);
    // scene.scene.add(directionalLightTarget);
    // directionalLight.target = directionalLightTarget;
    // directionalLightTarget.position.set(1, -1, 0);

    // // objects
    // //var atlas = new Atlas("Atlas", new AtlasShader(), 2, {w: 30, h: 30});
    // //main.addObjectToScene(atlas);
});