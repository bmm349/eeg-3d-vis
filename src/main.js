'use strict';

const Three = require('three');
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');
const { FBXLoader } = require('three/examples/jsm/loaders/FBXLoader.js');
const { TrackballControls } = require('three/examples/jsm/controls/TrackballControls.js');

let camera, scene, renderer, light, brainModel, controls;

function init() {

	camera = new Three.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 100, 200, 300 );

	scene = new Three.Scene();
	scene.background = new Three.Color( 0x050505 );

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

			// get cube001
			brainModel = object.children[0];

			console.log(brainModel);

			brainModel.geometry.center();

			scene.add( brainModel );
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

	controls = new TrackballControls( camera, renderer.domElement );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.keys = [ 65, 83, 68 ];

	animate();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	controls.handleResize();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	controls.update();

	if( brainModel ) {

		brainModel.rotation.z -= 0.05;

	}

	renderer.render( scene, camera );

}

function print() {

	alert("fuck me");

}

module.exports.init = init;
module.exports.print = print;
