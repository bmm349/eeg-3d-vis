'use strict';

const Three = require('three');
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');
const { FBXLoader } = require('three/examples/jsm/loaders/FBXLoader.js');
const { TrackballControls } = require('three/examples/jsm/controls/TrackballControls.js');
const { LineMaterial } = require('three/examples/jsm/lines/LineMaterial.js');
const { Wireframe }  = require('three/examples/jsm/lines/Wireframe.js');
const { WireframeGeometry2 } = require('three/examples/jsm/lines/WireframeGeometry2.js');
const { VertexNormalsHelper } = require('three/examples/jsm/helpers/VertexNormalsHelper.js');

let camera, scene, renderer, brainModel, controls, brainHighPoly;

let fatLineMaterial, wireframe;

let vnh;

/**
 * Designed to load all resources before initializing
 * Loads:
 * 	fbx files
 * 	vertex and fragment shaders
 */
const loadResources = async () => {

	Promise.all( [ loadBrainModel(), loadShaders(), loadBrainModelHighPoly() ] ).then( ( res ) => {

		console.log("all promises finished");
		init();

	});
}

// TODO Move Resource Loading To External File

const loadShaders = async () => {

	return new Promise((resolve, reject) => {

		var fileLoader = new Three.FileLoader();
	
		fileLoader.load('../src/shaders/standard.vert', 
		function ( shader ) 
		{
			//vertexShader = shader;
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});

		fileLoader.load('../src/shaders/standard.frag', 
		function ( shader ) 
		{
			//fragmentShader = shader;
			console.log("Loaded Shaders Properly");
			resolve();
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});		
	});
}

const loadBrainModel = async () => {

	return new Promise((resolve, reject) => {

		var modelLoader = new FBXLoader();

		modelLoader.load( '../src/models/brain-uv.fbx',

		function ( object ) {

			object.traverse( function ( child ) {

				if ( child.isMesh && child.geometry.isBufferGeometry ) {

					child.castShadow = true;
					child.receiveShadow = true;
					child.geometry.center();
					brainModel = child;
				}

			} );

			
			console.log("Loaded Brain Model");
			resolve();
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});

	});
}

const loadBrainModelHighPoly = async () => {

	return new Promise((resolve, reject) => {

		var modelLoader = new FBXLoader();

		modelLoader.load( '../src/models/brain-hp.fbx',

		function ( object ) {

			object.traverse( function ( child ) {

				if ( child.isMesh && child.geometry.isBufferGeometry ) {

					child.castShadow = true;
					child.receiveShadow = true;
					child.geometry.center();
					brainHighPoly = child;
				}

			} );

			
			console.log("Loaded Highpoly Brain Geometry");
			resolve();
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});

	});
}

const init = () => {

	camera = new Three.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( -100, 50, -300 );

	scene = new Three.Scene();
	scene.background = new Three.Color( 0x050505 );

	fatLineMaterial = new LineMaterial( { 

		color: 0x403c3b,
		linewidth: 2,
		dashed: false,
		opacity: 0.3

	 } );

	 var geometry = new WireframeGeometry2( brainModel.geometry );
	 wireframe = new Wireframe(geometry, fatLineMaterial );
	 wireframe.computeLineDistances();
	 wireframe.scale.set( 50, 50, 50 );
	 wireframe.rotateX( -Math.PI / 2 );
	 scene.add( wireframe );

	 var pointsMat = new Three.PointsMaterial({color:  0xFF7254 })
	 var pointCloud = new Three.Points( brainHighPoly.geometry, pointsMat );

	pointCloud.geometry.center();
	pointCloud.scale.set( 50,50,50 );
	pointCloud.position.set( 0,0,0 );
	pointCloud.rotateX( - Math.PI / 2 );
	scene.add( pointCloud );

	// Uncomment for Vertex normal display
	// vnh = new VertexNormalsHelper( pointCloud, 5 );
	// scene.add( vnh );

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

const onWindowResize = () => {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	controls.handleResize();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

const animate = () => {

	requestAnimationFrame( animate );

	controls.update();

	if ( vnh ) vnh.update();

	fatLineMaterial.resolution.set( window.innerWidth, window.innerHeight );

	renderer.render( scene, camera );

}

const print = () => {

	alert("fuck me");

}

module.exports.init = init;
module.exports.print = print;
module.exports.loadResources = loadResources;
