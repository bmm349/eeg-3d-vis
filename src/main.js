//import * as Three from 'three';

const Three = require('three');
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;


function init() {

	camera = new Three.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;

	scene = new Three.Scene();

	const geometry = new Three.BoxBufferGeometry(200, 30, 30);
	const material = new Three.MeshBasicMaterial();

	const mesh = new Three.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new Three.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

	const controls = new OrbitControls( camera, renderer.domElement );

	animate();

	}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

function print() {
	alert("fuck me");
}

module.exports.init = init;
module.exports.print = print;
