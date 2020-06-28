import * as THREE from 'three';
import { SceneObject } from './sceneobject';

export class Sphere extends SceneObject {
    constructor(id = "unset", shader = undefined, radius = .5, segments = {w: 8, h: 8}, position = {x: 0, y: 0, z: 0},
        colour = {r: 135, g: 206, b: 235}) {

        super();

        this.geometry = new THREE.SphereBufferGeometry(radius, segments.w, segments.h);

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
    }
}