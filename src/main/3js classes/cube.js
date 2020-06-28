import * as THREE from 'three';
import { SceneObject } from './sceneobject';

export class Cube extends SceneObject {
    constructor(id = "unset", shader = undefined, update = () => {}, scale = {x: 1, y: 1, z: 1}, segments = {x: 1, y: 1, z: 1},
        position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0}, colour = {r: 135, g: 206, b: 235}) {

        super();
        
        this.update = update;
        this.geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z,
            segments.x, segments.y, segments.z );

        if (shader) {
            this.shader = shader;
            this.material = new THREE.ShaderMaterial({
                side: THREE.DoubleSide,
                uniforms: shader.getUniforms(),
                vertexShader: shader.vertexShader.getContent(),
                fragmentShader: shader.fragmentShader.getContent()
            });
            shader.init(this.geometry);
        } else {
            this.material = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
            this.setColour(colour.r, colour.g, colour.b);
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.setId(id);
        this.setPosition(position.x, position.y, position.z);
        this.setRotation(rotation.x, rotation.y, rotation.z);
    }
}