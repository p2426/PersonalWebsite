import { Main } from './3js classes/main';
import { Line } from './3js classes/line';
import { Cube } from './3js classes/cube';
import { Sphere } from './3js classes/sphere';

var main;

// document.addEventListener("DOMContentLoaded", () => {
//     const iSize = 50;
//     const jSize = 50;    

//     main = new Main(undefined, undefined, undefined);
//     main.setCameraPosition(0, 40, -40);

//     for (var i = 0; i <= iSize; i+=2) {
//         for (var j = 0; j <= jSize; j+=2) {
//             let cube = new Cube(undefined, undefined, undefined, {x: i - (iSize / 2), y: 0, z: j - (jSize / 2) }, undefined, undefined, undefined)
//             cube.update = () => {
//                 cube.setColour(Math.random() * 255, Math.random() * 255, Math.random() * 255);
//             }
//             main.addObjectToScene(cube);
//         }
//     }

//     let line = new Line();
//     main.addObjectToScene(line);

//     let sphere = new Sphere();
//     main.addObjectToScene(sphere);

//     // Dispatching custom events with data
//     let test = 0;
//     console.log(test);

//     setTimeout(() => {
//         let e = new CustomEvent("TEST");
//         e.number = 1;
//         document.body.dispatchEvent(e);
//     }, 3000);

//     document.body.addEventListener("TEST", (e) => {
//         test = e.number;
//         console.log(test);
//     });
// });