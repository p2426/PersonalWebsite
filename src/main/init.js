// External Imports
import * as THREE from 'three';

// General Imports
import { UIFunctions } from './uifunctions';
import { MathFunctions } from './mathfunctions';

// UI
import { Component } from './component';
import { LoadingOverlay } from './ui/components/loading-overlay';
import { Carousel } from './ui/components/carousel';
import { CarouselPanelIndicator } from './ui/components/carousel-panel-indicator';
import { CarouselPanelFlipper } from './ui/components/carousel-panel-flipper';
import { Scroller } from './ui/components/scroller';
import { Debugger } from './ui/components/debugger';
import { Home } from './ui/components/home';
import { GameInitialiser } from './ui/components/game-initialiser';

// 3JS Classes
import { Scene } from './3js classes/scene';
import { Line } from './3js classes/line';
import { Cube } from './3js classes/cube';
import { Sphere } from './3js classes/sphere';
import { Atlas } from './3js classes/atlas';
import { OBJObject } from './3js classes/objobject';
import { CustomShader } from './shaders/customshader';
import { AtlasShader } from './shaders/atlasshader';
import { Cursor } from './cursor';
import { Canvas } from './canvas/canvas';

// Main entry point
document.addEventListener("DOMContentLoaded", () => {
    // -- Static classes
    Cursor.init();

    // -- UI Components
    LoadingOverlay.init();
    CarouselPanelIndicator.init();
    Carousel.init();
    CarouselPanelFlipper.init();
    Scroller.init();
    Debugger.init();
    Home.init();
    GameInitialiser.init();
    Canvas.init();
    console.log("%c== Initialised Components ==", "background: #0ff; padding: 5px;");
    console.log(Component.instances);

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

    // Directional Light
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