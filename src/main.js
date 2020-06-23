//import * as Three from 'three';

const Three = require('three');
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');
const { FBXLoader } = require('three/examples/jsm/loaders/FBXLoader.js');

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, light;


function init() {

	camera = new Three.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 100, 200, 300 );

	scene = new Three.Scene();
	scene.background = new Three.Color( 0xa0a0a0 );
	scene.fog = new Three.Fog( 0xa0a0a0, 200, 1000 );

	light = new Three.HemisphereLight( 0xffffff, 0x444444 );
	light.position.set( 0, 200, 0 );
	scene.add( light );

	light = new Three.DirectionalLight( 0xffffff );
	light.position.set( 0, 200, 100 );
	light.castShadow = true;
	light.shadow.camera.top = 180;
	light.shadow.camera.bottom = - 100;
	light.shadow.camera.left = - 120;
	light.shadow.camera.right = 120;
	scene.add( light );

	// ground
	var mesh = new Three.Mesh( new Three.PlaneBufferGeometry( 2000, 2000 ), new Three.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	var grid = new Three.GridHelper( 2000, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add( grid );

	// model
	var loader = new FBXLoader();
	loader.load( '../src/models/brain-recenter.fbx', 
		function ( object ) {

			object.traverse( function ( child ) {

				if ( child.isMesh ) {

					child.castShadow = true;
					child.receiveShadow = true;

				}

			} );
			
			scene.add( object );
		},
		undefined, function (e) {
			
			// log any error if the fucking fbx doesnt load for no reason
			console.log(e);

		});


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
