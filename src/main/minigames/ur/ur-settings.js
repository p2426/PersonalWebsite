import * as THREE from 'three';

export class TheRoyalGameOfUrSettings {

    // Logic and rendering framerate are the same
    static RenderFPS = 150;
    static LogicFPS = 120;

    static gameSettings = {
        boardArea: [8, 3],
        gamePieceCount: 12
    }

    static sceneSettings = {
        parent: document.body,
        width: window.innerWidth,
        height: window.innerHeight,
        colour: new THREE.Color(1, 0, 0),
        antialias: true,
        alpha: true
    };

    static cameraSettings = { 
        enableKeys: true, 
        enableZoom: false, 
        leftKey: null, 
        upKey: null, 
        rightKey: null, 
        downKey: null, 
        rightMouse: null, 
        middleMouse: null, 
        leftMouse: null, 
        cameraPosition: { x: 0, y: 0, z: 0 },
        cameraTarget: { x: 0, y: 0, z: 0 }
    };
}