import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Main
export class Main {
	constructor(sceneSettings, cameraSettings, eventSettings) {
		this.objects = [];
		this.createScene(sceneSettings);
		this.setCameraSettings(cameraSettings);
		this.attachEvents(eventSettings);
		this.update();
	}

	createScene(sceneSettings = { parent: document.body, width: window.innerWidth, height: window.innerHeight - 3, colour: 0xff0000, }) {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(50, sceneSettings.width/sceneSettings.height, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.background = new THREE.Color(sceneSettings.colour);

		this.renderer.setSize(sceneSettings.width, sceneSettings.height);
    	sceneSettings.parent.appendChild(this.renderer.domElement);
	}

	setCameraSettings(cameraSettings = { enableKeys: true, enableZoom: false, 
		leftKey: 65, upKey: 87, rightKey: 68, downKey: 83, rightMouse: null, middleMouse: null, 
		leftMouse: THREE.MOUSE.ROTATE, cameraPosition: { x: 0, y: 0, z: 0 },
		cameraTarget: { x: 0, y: 0, z: 0 }}) {

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableKeys = cameraSettings.enableKeys;
		this.controls.enableZoom = cameraSettings.enableZoom;
		this.controls.keys = {
			LEFT: cameraSettings.leftKey,
			UP: cameraSettings.upKey,
			RIGHT: cameraSettings.rightKey,
			BOTTOM: cameraSettings.downKey
		}
		this.controls.mouseButtons = {
			LEFT: cameraSettings.leftMouse,
			MIDDLE: cameraSettings.middleMouse,
			RIGHT: cameraSettings.rightMouse
		}
		this.controls.target = new THREE.Vector3(cameraSettings.cameraTarget.x, cameraSettings.cameraTarget.y, cameraSettings.cameraTarget.z);
		this.setCameraPosition(cameraSettings.cameraPosition.x, cameraSettings.cameraPosition.y, cameraSettings.cameraPosition.z);
		this.controls.update();
	
		//Other Mouse events
		// $(document.body).mousedown(function(e) {
		//     switch(e.which) {
		//         case 1: {
		//             console.log("LMB was clicked");
		//             break;
		//         }
		//         case 2: {
		//             console.log("MMB was clicked");
		//             break;
		//         }
		//         case 3: {
		//             console.log("RMB was clicked");
		//             break;
		//         }
		//         default: break;
		//     }
		// });
	}

	attachEvents(eventSettings = { enableContentMenu: false }) {
		// Resize is essential
		window.addEventListener("resize", () => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		});

		// Disabling default rightclick menu
		// if (!eventSettings.enableContentMenu) {
		// 	window.oncontextmenu = () => { 
		// 		return false; 
		// 	}
		// }
	}

	update() {
		requestAnimationFrame(() => { 
			this.update(); 
		});

		this.objects.forEach((object) => {
			object.update();
		});
	
		this.renderer.render(this.scene, this.camera);
	}

	reRenderScene() {
		this.renderer.render(this.scene, this.camera);
	}

	addObjectToScene(obj) {
		this.objects.push(obj);
		this.scene.add(obj.getMesh());
	}

	removeObjectById(id) {
		let obj = this.objects.find(obj => obj.id === id);
		let index = this.objects.findIndex(obj => obj.id === id);
		this.objects.splice(index, 1);
		this.removeObject(obj);
	}

	removeObject(obj) {
		this.scene.remove(obj.getMesh());
	}

	setCameraPosition(x, y, z) {
		this.camera.position.set(x, y, z);
		this.controls.update();
	}

	setCameraTarget(x, y, z) {
		this.controls.target = new THREE.Vector3(x, y, z);
		this.controls.update();
	}
}