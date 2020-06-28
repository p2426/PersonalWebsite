import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export class OBJObject {

    constructor(scene = undefined, materialPath = undefined, objectPath = undefined, 
        id = "unset", position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0},
        scale = {x: 1, y: 1, z: 1}, update = () => {}) {
        
        this.update = update;

        // load texture
        var mtlLoader = new MTLLoader();
        mtlLoader.setMaterialOptions({ side: THREE.FrontSide })
        mtlLoader.load(materialPath, (materials) => {
            materials.preload();

            // load model
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(objectPath, (object) => {

                this.mesh = object;
                scene.addObjectToScene(this);

                this.setId(id);
                this.setScale(scale.x, scale.y, scale.z);
                this.setPosition(position.x, position.y, position.z);
                this.setRotation(rotation.x, rotation.y, rotation.z);
                    
            }, (xhr) => {
                console.log('Model: ' + (xhr.loaded / xhr.total * 100 ) + '% loaded');
            }, (error) => {
                console.log("Could not load the model");
            });
        }, (xhr) => {
            console.log('Textures: ' + (xhr.loaded / xhr.total * 100 ) + '% loaded');
        }, (error) => {
            console.log("Could not load the textures");
        });

        console.log(this);
    }

    setRotation(x, y, z) {
        this.mesh.rotation.x = x;
        this.mesh.rotation.y = y;
        this.mesh.rotation.z = z;
    }

    setScale(x, y, z) {
        this.mesh.scale.x = x;
        this.mesh.scale.y = y;
        this.mesh.scale.z = z;
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    setId(string) {
        this.id = string;
    }

    getMesh() { return this.mesh }
}